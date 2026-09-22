import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { decodeMcpResponse, garminBridge, normalizeGarmin } from '../server/garmin.ts';
import { importGarmin } from '../src/lib/garmin.ts';

test('MCP JSON and SSE carry the same JSON-RPC result', () => {
  const message = { jsonrpc: '2.0', id: 4, result: { content: [{ type: 'text', text: '{"date":"2026-09-15"}' }] } };
  assert.deepEqual(decodeMcpResponse(JSON.stringify(message), 'application/json', 4), message.result);
  assert.deepEqual(decodeMcpResponse(`event: message\ndata: ${JSON.stringify(message)}\n\n`, 'text/event-stream', 4), message.result);
});

test('missing Garmin fields never become zero measurements', async () => {
  const now = new Date('2026-09-16T12:00:00Z');
  const b = normalizeGarmin([
    { tool: 'get_heart_rates_summary', payload: { date: '2026-09-15', resting_heart_rate_bpm: 61 } },
    { tool: 'get_stress_summary', payload: { date: '2026-09-15', avg_stress_level: -1 } },
    { tool: 'get_hrv_trend', payload: { trend: [{ date: '2026-09-15' }] } },
  ], now);
  assert.equal(b.readings.length, 1);
  assert.deepEqual(b.supportedMetrics, ['heart_rate']);
  const fallback = await importGarmin(now, (async () => { throw new Error('offline'); }) as typeof fetch);
  assert.equal(fallback.batch.source, 'fixture');
  assert.ok(fallback.fallbackReason);
});

test('range payloads normalize only verified Garmin fields', () => {
  const now = new Date('2026-09-16T12:00:00Z');
  const batch = normalizeGarmin([
    { tool: 'get_sleep_summary_range', payload: { nights: [{ date: '2026-09-15', sleep_seconds: 27_000, sleep_score: 82 }] } },
    { tool: 'get_body_battery', payload: [{ date: '2026-09-15', body_battery_level: 0 }] },
    { tool: 'get_heart_rates_summary', payload: { date: '2026-09-17', resting_heart_rate_bpm: 55 } },
  ], now);
  assert.deepEqual(batch.supportedMetrics, ['sleep_duration', 'sleep_quality', 'body_battery']);
  assert.deepEqual(batch.readings.map((reading) => [reading.metric, reading.value]), [
    ['body_battery', 0], ['sleep_duration', 450], ['sleep_quality', 82],
  ]);
  assert.ok(batch.warnings.some((warning) => warning.includes('heart_rate')));
});

test('client keeps a valid real batch and falls back on malformed JSON', async () => {
  const now = new Date('2026-09-16T12:00:00Z');
  const real = normalizeGarmin([
    { tool: 'get_heart_rates_summary', payload: { date: '2026-09-15', resting_heart_rate_bpm: 61 } },
  ], now);
  const imported = await importGarmin(now, (async () => new Response(JSON.stringify(real), { status: 200 })) as typeof fetch);
  assert.equal(imported.batch.source, 'garmin');
  const fallback = await importGarmin(now, (async () => new Response('{', { status: 200 })) as typeof fetch);
  assert.equal(fallback.batch.source, 'fixture');
  assert.ok(fallback.fallbackReason);
});

test('SSE ignores notifications and unrelated response ids', () => {
  const notification = JSON.stringify({ jsonrpc: '2.0', method: 'notifications/progress', params: {} });
  const wanted = JSON.stringify({ jsonrpc: '2.0', id: 7, result: { structuredContent: { ok: true } } });
  assert.deepEqual(
    decodeMcpResponse(`data: ${notification}\n\ndata: ${wanted.slice(0, 1)}\ndata: ${wanted.slice(1)}\n\n`, 'text/event-stream', 7),
    { structuredContent: { ok: true } },
  );
});

test('malformed result from one tool does not discard valid readings from another', () => {
  const now = new Date('2026-09-16T12:00:00Z');
  const batch = normalizeGarmin([
    { tool: 'get_sleep_summary_range', payload: { content: [{ type: 'text', text: '{' }] } },
    { tool: 'get_heart_rates_summary', payload: { date: '2026-09-15', resting_heart_rate_bpm: 61 } },
  ], now);
  assert.equal(batch.readings.length, 1);
  assert.ok(batch.warnings.some((warning) => warning.includes('sleep')));
});

test('client timeout covers response body decoding', async () => {
  const now = new Date('2026-09-16T12:00:00Z');
  const real = normalizeGarmin([
    { tool: 'get_heart_rates_summary', payload: { date: '2026-09-15', resting_heart_rate_bpm: 61 } },
  ], now);
  const fetcher = (async () => ({
    ok: true,
    json: () => new Promise((resolve) => setTimeout(() => resolve(real), 40)),
  })) as typeof fetch;
  const imported = await importGarmin(now, fetcher, 5);
  assert.equal(imported.batch.source, 'fixture');
});

function createHandler(fetcher: typeof fetch = (async () => { throw new Error('unexpected upstream call'); }) as typeof fetch, timeoutMs = 1_000) {
  let handler: (req: any, res: any) => Promise<void> | void;
  garminBridge({ fetcher, timeoutMs }).configureServer?.({
    middlewares: { use: (_path: string, callback: typeof handler) => { handler = callback; } },
  } as any);
  return async (headers: Record<string, string>, body = '{"days":28}', method = 'POST') => {
    const req = Readable.from([body]) as any;
    req.method = method;
    req.headers = headers;
    const response = { statusCode: 200, headers: new Map<string, string>(), setHeader(name: string, value: string) { this.headers.set(name, value); }, end(value: string) { done({ status: this.statusCode, headers: this.headers, body: JSON.parse(value) }); } };
    let done!: (value: { status: number; headers: Map<string, string>; body: unknown }) => void;
    const result = new Promise<{ status: number; headers: Map<string, string>; body: unknown }>((resolve) => { done = resolve; });
    await handler!(req, response);
    return result;
  };
}

test('bridge denies non-loopback host, origin, method, and body', async () => {
  const call = createHandler();
  const valid = { host: '127.0.0.1:5173', origin: 'http://127.0.0.1:5173', 'content-type': 'application/json' };
  assert.equal((await call({ ...valid, host: '127.0.0.1:8000' })).status, 403);
  assert.equal((await call({ host: valid.host, 'content-type': valid['content-type'] })).status, 403);
  assert.equal((await call({ ...valid, origin: 'https://evil.example' })).status, 403);
  assert.equal((await call({ ...valid, 'content-type': 'text/plain' })).status, 403);
  assert.equal((await call(valid, '{"days":28}', 'GET')).status, 405);
  assert.equal((await call(valid, '{"days":27}')).status, 400);
  assert.equal((await call(valid, '{"days":28,"extra":true}')).status, 400);
  assert.equal((await call(valid, 'x'.repeat(1025))).status, 400);
});

test('tool-call session expiry reinitializes once and cleanup sends negotiated protocol', async () => {
  const now = new Date('2026-09-16T12:00:00Z');
  let initializeCount = 0;
  let toolCalls = 0;
  let deleteHeaders: Headers | undefined;
  const fetcher = (async (_input, init = {}) => {
    if (init.method === 'DELETE') {
      deleteHeaders = new Headers(init.headers);
      return new Response(null, { status: 204 });
    }
    const body = JSON.parse(String(init.body));
    if (body.method === 'initialize') {
      initializeCount += 1;
      return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { protocolVersion: '2025-03-26' } }), { headers: { 'content-type': 'application/json', 'mcp-session-id': `session-${initializeCount}` } });
    }
    if (body.method === 'notifications/initialized') return new Response('', { status: 202 });
    if (body.method === 'tools/list') return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { tools: [{ name: 'get_heart_rates_summary' }] } }), { headers: { 'content-type': 'application/json' } });
    toolCalls += 1;
    if (initializeCount === 1) return new Response('expired', { status: 404 });
    const day = body.params.arguments.date;
    return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { content: [{ type: 'text', text: JSON.stringify({ date: day, resting_heart_rate_bpm: 61 }) }] } }), { headers: { 'content-type': 'application/json' } });
  }) as typeof fetch;
  const call = createHandler(fetcher);
  const result = await call({ host: '127.0.0.1:5173', origin: 'http://127.0.0.1:5173', 'content-type': 'application/json' });
  assert.equal(result.status, 200);
  assert.equal(initializeCount, 2);
  assert.ok(toolCalls > 1);
  assert.equal(deleteHeaders?.get('MCP-Protocol-Version'), '2025-03-26');
  assert.equal(deleteHeaders?.get('Mcp-Session-Id'), 'session-2');
});

test('cleanup errors fail safely without exposing upstream details', async () => {
  const fetcher = (async (_input, init = {}) => {
    const body = JSON.parse(String(init.body ?? '{}'));
    if (init.method === 'DELETE') return new Response('secret upstream failure', { status: 500 });
    if (body.method === 'initialize') return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { protocolVersion: '2025-03-26' } }), { headers: { 'content-type': 'application/json', 'mcp-session-id': 'session' } });
    if (body.method === 'notifications/initialized') return new Response('', { status: 202 });
    if (body.method === 'tools/list') return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { tools: [{ name: 'get_heart_rates_summary' }] } }), { headers: { 'content-type': 'application/json' } });
    const day = body.params.arguments.date;
    return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { content: [{ type: 'text', text: JSON.stringify({ date: day, resting_heart_rate_bpm: 61 }) }] } }), { headers: { 'content-type': 'application/json' } });
  }) as typeof fetch;
  const call = createHandler(fetcher);
  const result = await call({ host: '127.0.0.1:5173', origin: 'http://127.0.0.1:5173', 'content-type': 'application/json' });
  assert.equal(result.status, 200);
  assert.equal((result.body as any).source, 'garmin');
  assert.ok((result.body as any).warnings.some((warning: string) => warning.includes('cleanup')));
});

test('session expiry drains sibling calls before cleanup and retry', async () => {
  let initializeCount = 0;
  let toolCalls = 0;
  let activeCalls = 0;
  let cleanupOverlapped = false;
  const fetcher = (async (_input, init = {}) => {
    if (init.method === 'DELETE') {
      cleanupOverlapped ||= activeCalls > 0;
      return new Response(null, { status: 405 });
    }
    const body = JSON.parse(String(init.body));
    if (body.method === 'initialize') {
      initializeCount += 1;
      return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { protocolVersion: '2025-03-26' } }), { headers: { 'content-type': 'application/json', 'mcp-session-id': `session-${initializeCount}` } });
    }
    if (body.method === 'notifications/initialized') return new Response('', { status: 202 });
    if (body.method === 'tools/list') return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { tools: [{ name: 'get_heart_rates_summary' }] } }), { headers: { 'content-type': 'application/json' } });
    toolCalls += 1;
    activeCalls += 1;
    if (initializeCount === 1 && toolCalls === 1) {
      activeCalls -= 1;
      return new Response(null, { status: 404 });
    }
    await new Promise((resolve) => setTimeout(resolve, 15));
    activeCalls -= 1;
    if (initializeCount === 1) return new Response(null, { status: 404 });
    const day = body.params.arguments.date;
    return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { content: [{ type: 'text', text: JSON.stringify({ date: day, resting_heart_rate_bpm: 61 }) }] } }), { headers: { 'content-type': 'application/json' } });
  }) as typeof fetch;
  const call = createHandler(fetcher);
  const result = await call({ host: '127.0.0.1:5173', origin: 'http://127.0.0.1:5173', 'content-type': 'application/json' });
  assert.equal(result.status, 200);
  assert.equal(initializeCount, 2);
  assert.equal(cleanupOverlapped, false);
});

test('repeated session expiry stops after the single allowed retry', async () => {
  let initializeCount = 0;
  const fetcher = (async (_input, init = {}) => {
    if (init.method === 'DELETE') return new Response(null, { status: 405 });
    const body = JSON.parse(String(init.body));
    if (body.method === 'initialize') {
      initializeCount += 1;
      return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { protocolVersion: '2025-03-26' } }), { headers: { 'content-type': 'application/json', 'mcp-session-id': `session-${initializeCount}` } });
    }
    if (body.method === 'notifications/initialized') return new Response('', { status: 202 });
    if (body.method === 'tools/list') return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { tools: [{ name: 'get_heart_rates_summary' }] } }), { headers: { 'content-type': 'application/json' } });
    return new Response(null, { status: 404 });
  }) as typeof fetch;
  const call = createHandler(fetcher);
  const result = await call({ host: '127.0.0.1:5173', origin: 'http://127.0.0.1:5173', 'content-type': 'application/json' });
  assert.equal(result.status, 503);
  assert.equal(initializeCount, 2);
});

test('server deadline covers response body decoding across the one retry', async () => {
  let initializeCount = 0;
  let retrySignal: AbortSignal | undefined;
  const fetcher = (async (_input, init = {}) => {
    if (init.method === 'DELETE') return new Response(null, { status: 405 });
    const body = JSON.parse(String(init.body));
    if (body.method === 'initialize') {
      initializeCount += 1;
      if (initializeCount === 2) {
        retrySignal = init.signal;
        return { ok: true, status: 200, headers: new Headers({ 'content-type': 'application/json', 'mcp-session-id': 'session-2' }), text: () => new Promise<string>((resolve) => setTimeout(() => resolve(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { protocolVersion: '2025-03-26' } })), 100)) } as Response;
      }
      return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { protocolVersion: '2025-03-26' } }), { headers: { 'content-type': 'application/json', 'mcp-session-id': 'session-1' } });
    }
    if (body.method === 'notifications/initialized') return new Response('', { status: 202 });
    if (body.method === 'tools/list') return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { tools: [{ name: 'get_heart_rates_summary' }] } }), { headers: { 'content-type': 'application/json' } });
    return new Response(null, { status: 404 });
  }) as typeof fetch;
  const call = createHandler(fetcher, 10);
  const result = await call({ host: '127.0.0.1:5173', origin: 'http://127.0.0.1:5173', 'content-type': 'application/json' });
  assert.equal(result.status, 503);
  assert.equal(initializeCount, 2);
  assert.equal(retrySignal?.aborted, true);
});

test('partial timeout results return valid readings with warnings', async () => {
  const fetcher = (async (_input, init = {}) => {
    if (init.method === 'DELETE') return new Response(null, { status: 405 });
    const body = JSON.parse(String(init.body));
    if (body.method === 'initialize') return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { protocolVersion: '2025-03-26' } }), { headers: { 'content-type': 'application/json', 'mcp-session-id': 'session' } });
    if (body.method === 'notifications/initialized') return new Response('', { status: 202 });
    if (body.method === 'tools/list') return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { tools: [{ name: 'get_heart_rates_summary' }, { name: 'get_stress_summary' }] } }), { headers: { 'content-type': 'application/json' } });
    if (body.params.name === 'get_stress_summary') return { ok: true, status: 200, headers: new Headers({ 'content-type': 'application/json' }), text: () => new Promise<string>((resolve) => setTimeout(() => resolve('{}'), 100)) } as Response;
    const day = body.params.arguments.date;
    return new Response(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { content: [{ type: 'text', text: JSON.stringify({ date: day, resting_heart_rate_bpm: 61 }) }] } }), { headers: { 'content-type': 'application/json' } });
  }) as typeof fetch;
  const call = createHandler(fetcher, 40);
  const result = await call({ host: '127.0.0.1:5173', origin: 'http://127.0.0.1:5173', 'content-type': 'application/json' });
  assert.equal(result.status, 200);
  assert.equal((result.body as any).source, 'garmin');
  assert.ok((result.body as any).readings.length > 0);
  assert.ok((result.body as any).warnings.length > 0);
});

test('JSON-RPC and MCP tool errors are rejected without leaking details', () => {
  assert.throws(() => decodeMcpResponse(JSON.stringify({ jsonrpc: '2.0', id: 4, error: { message: 'secret' } }), 'application/json', 4), /MCP request failed/);
  assert.throws(() => decodeMcpResponse(JSON.stringify({ jsonrpc: '2.0', id: 4, result: { isError: true } }), 'application/json', 4), /MCP tool failed/);
});

test('structured and text payloads normalize, missing tools warn, and empty real batches fall back', async () => {
  const now = new Date('2026-09-16T12:00:00Z');
  const batch = normalizeGarmin([
    { tool: 'get_heart_rates_summary', payload: { structuredContent: { date: '2026-09-15', resting_heart_rate_bpm: 61 } } },
    { tool: 'get_stress_summary', payload: { content: [{ type: 'text', text: JSON.stringify({ date: '2026-09-15', avg_stress_level: 20 }) }] } },
    { tool: 'missing_tool', payload: {} },
  ], now);
  assert.equal(batch.readings.length, 2);
  assert.ok(batch.warnings.some((warning) => warning.includes('missing_tool')));
  const fallback = await importGarmin(now, (async () => new Response(JSON.stringify({ schemaVersion: 1, source: 'garmin', readings: [], supportedMetrics: [], importedAt: now.toISOString(), warnings: [] }), { status: 200 })) as typeof fetch);
  assert.equal(fallback.batch.source, 'fixture');
});
