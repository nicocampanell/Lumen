import type { Plugin } from 'vite';
import { METRIC_DETAILS, validateBatch, type ImportBatch, type Metric, type MetricReading } from '../src/lib/model.ts';

const MCP_URL = 'http://127.0.0.1:8000/mcp';
const MCP_VERSION = '2025-03-26';
const ALLOWED_TOOLS = new Set([
  'get_sleep_summary_range',
  'get_hrv_trend',
  'get_body_battery',
  'get_heart_rates_summary',
  'get_stress_summary',
]);
const API_ERROR = 'Garmin is unavailable. Reconnect locally or continue with sample data.';
const LOOPBACK_HOSTS = new Set(['127.0.0.1:5173', 'localhost:5173']);
const LOOPBACK_ORIGINS = new Set(['http://127.0.0.1:5173', 'http://localhost:5173']);

function record(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : undefined;
}

function decodeJson(text: string): unknown {
  try { return JSON.parse(text); } catch { throw new Error('Malformed MCP response'); }
}

function rpcResult(value: unknown, requestId: number): unknown {
  const message = record(value);
  if (!message || message.jsonrpc !== '2.0') throw new Error('Malformed MCP response');
  if (message.id !== requestId) throw new Error('Unexpected MCP response id');
  if (message.error) throw new Error('MCP request failed');
  const result = message.result;
  const resultRecord = record(result);
  if (!resultRecord || resultRecord.isError === true) throw new Error('MCP tool failed');
  return result;
}

export function decodeMcpResponse(text: string, contentType: string, requestId: number): unknown {
  if (!contentType.toLowerCase().includes('text/event-stream')) return rpcResult(decodeJson(text), requestId);
  const messages: unknown[] = [];
  let data: string[] = [];
  const flush = () => {
    if (!data.length) return;
    const raw = data.join('\n');
    data = [];
    if (raw.trim()) messages.push(decodeJson(raw));
  };
  for (const line of text.replace(/\r\n/g, '\n').split('\n')) {
    if (line.startsWith('data:')) data.push(line.slice(5).trimStart());
    else if (line === '') flush();
  }
  flush();
  for (const message of messages) {
    const item = record(message);
    if (item?.id === requestId) return rpcResult(message, requestId);
  }
  throw new Error('Missing MCP response');
}

function valueFromPayload(payload: unknown): unknown {
  const outer = record(payload);
  if (!outer) return payload;
  if ('structuredContent' in outer && outer.structuredContent !== undefined) return outer.structuredContent;
  if (Array.isArray(outer.content)) {
    const text = outer.content.find((item) => record(item)?.type === 'text');
    const textValue = record(text)?.text;
    if (typeof textValue === 'string') {
      try { return JSON.parse(textValue); } catch { throw new Error('Malformed Garmin tool result'); }
    }
  }
  return payload;
}

function dateValue(value: unknown, now: Date): string | undefined {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00.000Z`);
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value || date > today) return undefined;
  return value;
}

function addReading(readings: MetricReading[], warnings: string[], now: Date, metric: Metric, day: unknown, value: unknown, unit: string) {
  const date = dateValue(day, now);
  const details = METRIC_DETAILS[metric];
  if (!date || typeof value !== 'number' || !Number.isFinite(value) || value < details.min || value > details.max) {
    warnings.push(`Skipped invalid ${metric} reading`);
    return;
  }
  readings.push({
    userId: 'local', source: 'garmin', sourceRecordId: `garmin:${date}:${metric}`, metric,
    observedAt: `${date}T00:00:00.000Z`, day: date, value, unit, quality: 'valid', granularity: 'day',
  });
}

function listPayload(payload: unknown, key: string): unknown[] {
  if (Array.isArray(payload)) return payload;
  const value = record(payload)?.[key];
  return Array.isArray(value) ? value : [];
}

export function normalizeGarmin(results: { tool: string; payload: unknown; day?: string }[], now: Date): ImportBatch {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new Error('Invalid current time');
  const readings: MetricReading[] = [];
  const warnings: string[] = [];
  for (const result of results) {
    try {
      if (!ALLOWED_TOOLS.has(result.tool)) { warnings.push(`Skipped unavailable tool ${result.tool}`); continue; }
      const payload = valueFromPayload(result.payload);
      const item = record(payload);
      if (result.tool === 'get_heart_rates_summary') addReading(readings, warnings, now, 'heart_rate', item?.date ?? result.day, item?.resting_heart_rate_bpm, 'bpm');
      else if (result.tool === 'get_stress_summary') addReading(readings, warnings, now, 'stress', item?.date ?? result.day, item?.avg_stress_level, 'index');
      else if (result.tool === 'get_sleep_summary_range') {
        for (const night of listPayload(payload, 'nights')) {
          const value = record(night);
          addReading(readings, warnings, now, 'sleep_duration', value?.date, typeof value?.sleep_seconds === 'number' ? value.sleep_seconds / 60 : undefined, 'min');
          addReading(readings, warnings, now, 'sleep_quality', value?.date, value?.sleep_score, 'index');
        }
      } else if (result.tool === 'get_hrv_trend') {
        for (const trend of listPayload(payload, 'trend')) {
          const value = record(trend);
          addReading(readings, warnings, now, 'hrv', value?.date, value?.last_night_avg_hrv_ms, 'ms');
        }
      } else if (result.tool === 'get_body_battery') {
        for (const battery of listPayload(payload, 'body_battery')) {
          const value = record(battery);
          addReading(readings, warnings, now, 'body_battery', value?.date, value?.body_battery_level, 'index');
        }
      }
    } catch {
      warnings.push(`Skipped malformed ${result.tool} result`);
    }
  }
  const batch = {
    schemaVersion: 1 as const, source: 'garmin' as const, readings,
    supportedMetrics: [], importedAt: now.toISOString(), warnings,
  };
  return validateBatch(batch, now);
}

type Session = { id?: string; version?: string; nextId: number; deadline: number; fetcher: typeof fetch };

async function fetchWithDeadline(fetcher: typeof fetch, input: RequestInfo | URL, init: RequestInit, deadline: number): Promise<{ response: Response; text: string }> {
  const controller = new AbortController();
  const remaining = deadline - Date.now();
  if (remaining <= 0) throw new Error('MCP import timed out');
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error('MCP import timed out'));
    }, remaining);
  });
  try {
    const response = await Promise.race([fetcher(input, { ...init, signal: controller.signal }), timeout]);
    const text = await Promise.race([response.text(), timeout]);
    return { response, text };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function mcpCall(session: Session, method: string, params: Record<string, unknown>, notification = false): Promise<unknown> {
  const remaining = session.deadline - Date.now();
  if (remaining <= 0) throw new Error('MCP import timed out');
  const id = session.nextId++;
  const headers: Record<string, string> = {
    Accept: 'application/json, text/event-stream', 'Content-Type': 'application/json',
  };
  if (session.id) headers['Mcp-Session-Id'] = session.id;
  if (session.version) headers['MCP-Protocol-Version'] = session.version;
  const body: Record<string, unknown> = { jsonrpc: '2.0', method, params };
  if (!notification) body.id = id;
  const { response, text } = await fetchWithDeadline(session.fetcher, MCP_URL, { method: 'POST', headers, body: JSON.stringify(body) }, Math.min(session.deadline, Date.now() + 10_000));
  if (response.headers.get('mcp-session-id')) session.id = response.headers.get('mcp-session-id')!;
  if (response.headers.get('mcp-protocol-version')) session.version = response.headers.get('mcp-protocol-version')!;
  if (!response.ok) throw new Error(response.status === 401 || response.status === 404 ? 'MCP session expired' : 'MCP unavailable');
  if (notification || response.status === 202) return undefined;
  return decodeMcpResponse(text, response.headers.get('content-type') ?? 'application/json', id);
}

async function closeMcpSession(session: Session): Promise<void> {
  if (!session.id) return;
  const headers: Record<string, string> = { 'Mcp-Session-Id': session.id };
  if (session.version) headers['MCP-Protocol-Version'] = session.version;
  const { response } = await fetchWithDeadline(session.fetcher, MCP_URL, { method: 'DELETE', headers }, Math.min(session.deadline, Date.now() + 2_000));
  if (response.status === 405) return;
  if (!response.ok) throw new Error('MCP cleanup failed');
}

async function importFromMcpSession(now: Date, deadline: number, fetcher: typeof fetch): Promise<ImportBatch> {
  const session: Session = { nextId: 1, deadline, fetcher };
  let operationError: unknown;
  let batch: ImportBatch | undefined;
  try {
    const initialized = record(await mcpCall(session, 'initialize', {
      protocolVersion: MCP_VERSION, capabilities: {}, clientInfo: { name: 'lumin-local', version: '1.0.0' },
    }));
    if (typeof initialized?.protocolVersion === 'string') session.version = initialized.protocolVersion;
    await mcpCall(session, 'notifications/initialized', {}, true);
    const listed = record(await mcpCall(session, 'tools/list', {}));
    const tools = Array.isArray(listed?.tools) ? listed.tools.map((tool) => record(tool)?.name).filter((name): name is string => typeof name === 'string') : [];
    const available = new Set(tools.filter((tool) => ALLOWED_TOOLS.has(tool)));
    const warnings = [...ALLOWED_TOOLS].filter((tool) => !available.has(tool)).map((tool) => `Garmin tool unavailable: ${tool}`);
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const days = Array.from({ length: 28 }, (_, index) => new Date(today.getTime() - (index + 1) * 86_400_000).toISOString().slice(0, 10));
    const startDate = days.at(-1)!;
    const endDate = days[0];
    const tasks: (() => Promise<{ tool: string; payload: unknown; day?: string }>)[] = [];
    const rangeArgs = { start_date: startDate, end_date: endDate };
    for (const tool of ['get_sleep_summary_range', 'get_hrv_trend', 'get_body_battery']) if (available.has(tool)) {
      tasks.push(() => mcpCall(session, 'tools/call', { name: tool, arguments: rangeArgs }).then((payload) => ({ tool, payload })));
    }
    for (const day of days) for (const tool of ['get_heart_rates_summary', 'get_stress_summary']) if (available.has(tool)) {
      tasks.push(() => mcpCall(session, 'tools/call', { name: tool, arguments: { date: day } }).then((payload) => ({ tool, payload, day })));
    }
    const results: { tool: string; payload: unknown; day?: string }[] = [];
    let nextTask = 0;
    let expired = false;
    const worker = async () => {
      while (!expired && nextTask < tasks.length) {
        const task = tasks[nextTask++];
        try { results.push(await task()); } catch (error) {
          if (error instanceof Error && error.message === 'MCP session expired') { expired = true; throw error; }
          warnings.push('A Garmin reading could not be imported');
        }
      }
    };
    const workerResults = await Promise.allSettled([worker(), worker()]);
    const expiry = workerResults.find((result) => result.status === 'rejected' && result.reason instanceof Error && result.reason.message === 'MCP session expired');
    if (expiry?.status === 'rejected') throw expiry.reason;
    batch = normalizeGarmin(results, now);
    batch.warnings = [...warnings, ...batch.warnings];
    if (!batch.readings.length) throw new Error('No Garmin readings');
    return batch;
  } catch (error) {
    operationError = error;
    throw error;
  } finally {
    try { await closeMcpSession(session); } catch (error) {
      if (!operationError) {
        if (batch) batch.warnings.push('Garmin session cleanup failed');
        else throw error;
      }
    }
  }
}

async function importFromMcp(now: Date, fetcher: typeof fetch, timeoutMs: number): Promise<ImportBatch> {
  const deadline = Date.now() + timeoutMs;
  try {
    return await importFromMcpSession(now, deadline, fetcher);
  } catch (error) {
    if (error instanceof Error && error.message === 'MCP session expired') return importFromMcpSession(now, deadline, fetcher);
    throw error;
  }
}

async function readBody(req: import('http').IncomingMessage): Promise<string> {
  let body = '';
  for await (const chunk of req) {
    body += String(chunk);
    if (Buffer.byteLength(body) > 1024) throw new Error('Request too large');
  }
  return body;
}

function send(res: import('http').ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

export function garminBridge(options: { fetcher?: typeof fetch; timeoutMs?: number } = {}): Plugin {
  const fetcher = options.fetcher ?? fetch;
  const timeoutMs = options.timeoutMs ?? 90_000;
  return {
    name: 'lumin-garmin-bridge',
    configureServer(server) {
      server.middlewares.use('/api/lumin/garmin/import', async (req, res) => {
        if (!LOOPBACK_HOSTS.has(req.headers.host ?? '')) return send(res, 403, { error: 'Forbidden' });
        if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
        const origin = req.headers.origin;
        if (!origin || !LOOPBACK_ORIGINS.has(origin)) return send(res, 403, { error: 'Forbidden' });
        if (!(req.headers['content-type'] ?? '').toLowerCase().startsWith('application/json')) return send(res, 403, { error: 'Forbidden' });
        let body: unknown;
        try {
          body = JSON.parse(await readBody(req));
        } catch {
          return send(res, 400, { error: 'Invalid request' });
        }
        if (!record(body) || Object.keys(body).length !== 1 || body.days !== 28) return send(res, 400, { error: 'Invalid request' });
        try {
          const batch = await importFromMcp(new Date(), fetcher, timeoutMs);
          send(res, 200, batch);
        } catch {
          send(res, 503, { error: API_ERROR });
        }
      });
    },
  };
}
