import { calculateBaselines, detectEvents, deriveSignalState } from './analysis.ts';
import { CONTEXT_TAGS, METRIC_DETAILS, mergeReadings, validateBatch } from './model.ts';
import { summarizeWeek } from './summary.ts';
import type {
  ContextLog,
  ContextTag,
  Dataset,
  ImportBatch,
  NotificationPreferences,
  ProductEvent,
  SignalEvent,
  Source,
  StudyState,
} from './model.ts';

export const STORAGE_KEY = 'lumin.study.v1';
const STORAGE_ERROR = 'Changes could not be saved on this device. Export your data before leaving.';
const SOURCES: Source[] = ['garmin', 'export', 'fixture'];
const DEFAULT_PREFERENCES: NotificationPreferences = { paused: false, quietStart: '22:00', quietEnd: '07:00' };

export type StudyAction =
  | { type: 'consent' }
  | { type: 'import'; batch: ImportBatch; fallbackReason?: string }
  | { type: 'source'; source: Source }
  | { type: 'context'; eventId: string; tags: ContextTag[]; note: string; elapsedMs: number }
  | { type: 'delete-context'; eventId: string }
  | { type: 'prompt'; eventId: string; status: 'opened' | 'dismissed' | 'snoozed' }
  | { type: 'preferences'; preferences: NotificationPreferences }
  | { type: 'disconnect' }
  | { type: 'summary-viewed' }
  | { type: 'feedback'; useful: boolean; comment: string };

export function initialStudy(): StudyState {
  return {
    schemaVersion: 1,
    datasets: {},
    preferences: { ...DEFAULT_PREFERENCES },
    analytics: [],
    connection: { status: 'disconnected' },
  };
}

function cloneDataset(dataset: Dataset): Dataset {
  return {
    batch: { ...dataset.batch, readings: [...dataset.batch.readings], supportedMetrics: [...dataset.batch.supportedMetrics], warnings: [...dataset.batch.warnings] },
    events: dataset.events.map((event) => ({ ...event, evidence: event.evidence.map((evidence) => ({ ...evidence })) })),
    logs: dataset.logs.map((log) => ({ ...log, tags: [...log.tags] })),
  };
}

function cloneState(state: StudyState): StudyState {
  return {
    ...state,
    datasets: Object.fromEntries(Object.entries(state.datasets).map(([source, dataset]) => [source, cloneDataset(dataset!)])) as StudyState['datasets'],
    preferences: { ...state.preferences },
    analytics: state.analytics.map((event) => ({ ...event, properties: { ...event.properties } })),
    connection: { ...state.connection },
    feedback: state.feedback ? { ...state.feedback } : undefined,
  };
}

function addAnalytics(state: StudyState, event: ProductEvent, identity: string): void {
  const exists = state.analytics.some((item) => item.name === event.name && item.source === event.source && item.properties.identity === identity);
  if (!exists) state.analytics.push({ ...event, properties: { ...event.properties, identity } });
}

function dayOf(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function summaryWindowEventCount(dataset: Dataset | undefined, now: Date): number {
  if (!dataset) return 0;
  const to = dayOf(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - 86_400_000));
  const from = dayOf(new Date(Date.parse(`${to}T00:00:00.000Z`) - 6 * 86_400_000));
  return dataset.events.filter((event) => { const day = event.startedAt.slice(0, 10); return day >= from && day <= to; }).length;
}

function dateFrom(value: string): Date {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid date');
  return date;
}

function validPreferences(preferences: NotificationPreferences): NotificationPreferences {
  const clock = /^\d{2}:\d{2}$/;
  if (!preferences || typeof preferences.paused !== 'boolean' || !clock.test(preferences.quietStart) || !clock.test(preferences.quietEnd)) {
    throw new Error('Invalid notification preferences');
  }
  for (const value of [preferences.quietStart, preferences.quietEnd]) {
    const [hours, minutes] = value.split(':').map(Number);
    if (hours > 23 || minutes > 59) throw new Error('Invalid notification preferences');
  }
  return { ...preferences };
}

const PRODUCT_NAMES = new Set(['onboarding_started', 'data_source_connected', 'baseline_ready', 'signal_event_created', 'prompt_opened', 'context_logged', 'weekly_summary_viewed', 'useful_connection_reported']);
const SIGNAL_STATES = new Set(['insufficient_data', 'stable', 'shifted', 'recovering']);
const PROMPT_STATUSES = new Set(['pending', 'opened', 'dismissed', 'logged']);

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function validAnalyticsProperties(value: unknown): value is Record<string, string | number | boolean | string[]> {
  if (!record(value)) return false;
  return Object.values(value).every((item) => {
    if (typeof item === 'number') return Number.isFinite(item);
    if (typeof item === 'string' || typeof item === 'boolean') return true;
    return Array.isArray(item) && item.every((entry) => typeof entry === 'string');
  });
}

function validateStoredDataset(source: Source, input: unknown, now: Date): Dataset {
  if (!record(input) || !Array.isArray(input.events) || !Array.isArray(input.logs)) throw new Error('Malformed saved dataset');
  const batch = validateBatch(input.batch, now);
  if (batch.source !== source) throw new Error('Malformed saved dataset source');
  const eventIds = new Set<string>();
  const events: SignalEvent[] = [];
  for (const value of input.events) {
    if (!record(value) || typeof value.id !== 'string' || value.id.length === 0 || value.userId !== 'local' || value.source !== source || !validDate(value.startedAt) || !validDate(value.endedAt) || Date.parse(value.startedAt) > Date.parse(value.endedAt) || !SIGNAL_STATES.has(String(value.state)) || value.ruleVersion !== 'daily-v1' || !PROMPT_STATUSES.has(String(value.promptStatus)) || !Array.isArray(value.evidence)) throw new Error('Malformed saved signal event');
    if (eventIds.has(value.id)) throw new Error('Duplicate saved signal event');
    eventIds.add(value.id);
    if (value.snoozedUntil !== undefined && !validDate(value.snoozedUntil)) throw new Error('Malformed saved snooze');
    const evidence = value.evidence.map((item) => {
      if (!record(item) || typeof item.metric !== 'string' || !Object.prototype.hasOwnProperty.call(METRIC_DETAILS, item.metric) || typeof item.observedValue !== 'number' || !Number.isFinite(item.observedValue) || typeof item.baselineCenter !== 'number' || !Number.isFinite(item.baselineCenter) || typeof item.deviation !== 'number' || !Number.isFinite(item.deviation) || (item.direction !== 'above' && item.direction !== 'below')) throw new Error('Malformed saved evidence');
      return { metric: item.metric as SignalEvent['evidence'][number]['metric'], observedValue: item.observedValue, baselineCenter: item.baselineCenter, deviation: item.deviation, direction: item.direction as 'above' | 'below' };
    });
    events.push({ id: value.id, userId: 'local', source, startedAt: value.startedAt, endedAt: value.endedAt, state: value.state as SignalEvent['state'], ruleVersion: 'daily-v1', evidence, promptStatus: value.promptStatus as SignalEvent['promptStatus'], ...(value.snoozedUntil ? { snoozedUntil: value.snoozedUntil } : {}) });
  }
  const logs: ContextLog[] = [];
  const logIds = new Set<string>();
  for (const value of input.logs) {
    if (!record(value) || typeof value.id !== 'string' || value.id.length === 0 || logIds.has(value.id) || typeof value.eventId !== 'string' || !eventIds.has(value.eventId) || !Array.isArray(value.tags) || value.tags.some((tag) => !CONTEXT_TAGS.includes(tag as ContextTag)) || new Set(value.tags).size !== value.tags.length || (value.note !== undefined && (typeof value.note !== 'string' || value.note.length > 500)) || !validDate(value.createdAt) || !validDate(value.updatedAt) || (value.sample !== undefined && typeof value.sample !== 'boolean')) throw new Error('Malformed saved context log');
    logIds.add(value.id);
    logs.push({ id: value.id, eventId: value.eventId, tags: [...value.tags] as ContextTag[], ...(value.note !== undefined ? { note: value.note } : {}), createdAt: value.createdAt, updatedAt: value.updatedAt, ...(value.sample !== undefined ? { sample: value.sample } : {}) });
  }
  return { batch, events, logs };
}

function validateStoredState(input: unknown, now: Date): StudyState {
  if (!record(input) || input.schemaVersion !== 1 || !record(input.datasets) || !record(input.preferences) || !Array.isArray(input.analytics) || !record(input.connection)) throw new Error('Malformed saved state');
  const preferences = validPreferences(input.preferences as NotificationPreferences);
  if (input.activeSource !== undefined && !SOURCES.includes(input.activeSource as Source)) throw new Error('Malformed saved source');
  if (input.consentAt !== undefined && !validDate(input.consentAt)) throw new Error('Malformed saved consent');
  const datasets: StudyState['datasets'] = {};
  for (const [source, dataset] of Object.entries(input.datasets)) {
    if (!SOURCES.includes(source as Source)) throw new Error('Malformed saved source');
    datasets[source as Source] = validateStoredDataset(source as Source, dataset, now);
  }
  if (input.activeSource !== undefined && !datasets[input.activeSource as Source]) throw new Error('Malformed active source');
  if (!['disconnected', 'connected', 'needs_attention'].includes(String(input.connection.status)) || (input.connection.lastSyncAt !== undefined && !validDate(input.connection.lastSyncAt)) || (input.connection.message !== undefined && typeof input.connection.message !== 'string')) throw new Error('Malformed saved connection');
  const analytics: ProductEvent[] = [];
  for (const value of input.analytics) {
    if (!record(value) || !PRODUCT_NAMES.has(String(value.name)) || !validDate(value.at) || (value.source !== undefined && !SOURCES.includes(value.source as Source)) || !validAnalyticsProperties(value.properties)) throw new Error('Malformed saved analytics');
    analytics.push({ name: value.name as ProductEvent['name'], at: value.at, ...(value.source ? { source: value.source as Source } : {}), properties: value.properties as ProductEvent['properties'] });
  }
  if (input.feedback !== undefined && (!record(input.feedback) || typeof input.feedback.useful !== 'boolean' || typeof input.feedback.comment !== 'string' || input.feedback.comment.length > 500 || !validDate(input.feedback.at))) throw new Error('Malformed saved feedback');
  return { schemaVersion: 1, ...(input.consentAt ? { consentAt: input.consentAt } : {}), ...(input.activeSource ? { activeSource: input.activeSource as Source } : {}), datasets, preferences, analytics, connection: { status: input.connection.status as StudyState['connection']['status'], ...(input.connection.lastSyncAt ? { lastSyncAt: input.connection.lastSyncAt } : {}), ...(input.connection.message ? { message: input.connection.message } : {}) }, ...(input.feedback ? { feedback: { useful: input.feedback.useful, comment: input.feedback.comment, at: input.feedback.at } } : {}) };
}

function activeDataset(state: StudyState): Dataset {
  if (!state.activeSource || !state.datasets[state.activeSource]) throw new Error('No data source is selected');
  return state.datasets[state.activeSource]!;
}

function appendSeedLogs(dataset: Dataset, now: Date): void {
  const sampleEvents = dataset.events.slice(0, 3);
  for (const event of sampleEvents) {
    if (dataset.logs.some((log) => log.eventId === event.id)) continue;
    dataset.logs.push({
      id: `${dataset.batch.source}:sample:${event.id}`,
      eventId: event.id,
      tags: ['Meeting'],
      note: 'Sample context',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      sample: true,
    });
  }
  const sampleIds = new Set(sampleEvents.map((event) => event.id));
  dataset.events = dataset.events.map((event) => sampleIds.has(event.id) ? { ...event, promptStatus: 'logged' } : event);
}

function importDataset(state: StudyState, batch: ImportBatch, fallbackReason: string | undefined, now: Date): void {
  const validated = validateBatch(batch, now);
  const source = validated.source;
  const old = state.datasets[source];
  if (source === 'fixture' && old) {
    state.activeSource = source;
    state.connection = { status: fallbackReason ? 'needs_attention' : 'connected', lastSyncAt: now.toISOString(), ...(fallbackReason ? { message: fallbackReason } : {}) };
    return;
  }
  const readings = mergeReadings(old?.batch.readings ?? [], validated.readings);
  const mergedBatch = validateBatch({
    ...validated,
    readings,
    warnings: [...new Set([...(old?.batch.warnings ?? []), ...validated.warnings])],
  }, now);
  const events = detectEvents(readings, old?.events ?? [], now);
  const loggedIds = new Set((old?.logs ?? []).map((log) => log.eventId));
  for (const event of old?.events ?? []) {
    if (loggedIds.has(event.id) && !events.some((item) => item.id === event.id)) events.push({ ...event, promptStatus: 'logged', snoozedUntil: undefined });
  }
  const dataset: Dataset = {
    batch: mergedBatch,
    events: events.map((event) => loggedIds.has(event.id) ? { ...event, promptStatus: 'logged', snoozedUntil: undefined } : event),
    logs: old?.logs.map((log) => ({ ...log, tags: [...log.tags] })) ?? [],
  };
  if (!old && source === 'fixture') appendSeedLogs(dataset, now);
  state.datasets[source] = dataset;
  state.activeSource = source;
  state.connection = {
    status: fallbackReason ? 'needs_attention' : 'connected',
    lastSyncAt: now.toISOString(),
    ...(fallbackReason ? { message: fallbackReason } : {}),
  };
  addAnalytics(state, {
    name: 'data_source_connected', at: now.toISOString(), source,
    properties: { source_type: source, supported_metrics: validated.supportedMetrics },
  }, source);
  const latestDay = readings.reduce((latest, reading) => reading.day > latest ? reading.day : latest, '');
  const baselines = latestDay ? calculateBaselines(readings, latestDay).filter((baseline) => baseline.ready) : [];
  if (baselines.length >= 2) {
    addAnalytics(state, {
      name: 'baseline_ready', at: now.toISOString(), source,
      properties: { metric_count: baselines.length, historical_days: Math.min(...baselines.map((baseline) => baseline.historicalDays)) },
    }, source);
  }
  for (const event of events) {
    addAnalytics(state, {
      name: 'signal_event_created', at: now.toISOString(), source,
      properties: { contributing_metrics: event.evidence.map((evidence) => evidence.metric), rule_version: event.ruleVersion },
    }, event.id);
  }
}

function quietNow(preferences: NotificationPreferences, now: Date): boolean {
  if (preferences.quietStart === preferences.quietEnd) return false;
  const toMinutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
  const current = now.getHours() * 60 + now.getMinutes();
  const start = toMinutes(preferences.quietStart);
  const end = toMinutes(preferences.quietEnd);
  return start < end ? current >= start && current < end : current >= start || current < end;
}

function eventForActive(state: StudyState, eventId: string): { dataset: Dataset; event: SignalEvent } {
  const dataset = activeDataset(state);
  const event = dataset.events.find((item) => item.id === eventId);
  if (!event) throw new Error('Event is not in the selected data source');
  return { dataset, event };
}

export function updateStudy(input: StudyState, action: StudyAction, now: Date): StudyState {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new Error('Invalid current time');
  const state = cloneState(input);
  if (action.type === 'consent') {
    if (!state.consentAt) {
      state.consentAt = now.toISOString();
      addAnalytics(state, { name: 'onboarding_started', at: now.toISOString(), properties: { study_cohort: 'local-demo' } }, 'local-demo');
    }
    return state;
  }
  if (action.type === 'import') {
    if (!state.consentAt) throw new Error('Consent is required before importing data');
    importDataset(state, action.batch, action.fallbackReason, now);
    return state;
  }
  if (action.type === 'source') {
    if (!SOURCES.includes(action.source) || !state.datasets[action.source]) throw new Error('Data source is not available');
    state.activeSource = action.source;
    return state;
  }
  if (action.type === 'preferences') {
    state.preferences = validPreferences(action.preferences);
    return state;
  }
  if (action.type === 'disconnect') {
    state.connection = { status: 'disconnected', lastSyncAt: state.connection.lastSyncAt };
    return state;
  }
  if (action.type === 'context') {
    const { dataset, event } = eventForActive(state, action.eventId);
    const tags = [...new Set(action.tags)];
    if (tags.some((tag) => !CONTEXT_TAGS.includes(tag))) throw new Error('Invalid context tag');
    if (typeof action.note !== 'string') throw new Error('Invalid context note');
    if (typeof action.elapsedMs !== 'number' || !Number.isFinite(action.elapsedMs) || action.elapsedMs < 0) throw new Error('Invalid context completion time');
    const note = action.note.slice(0, 500);
    const existing = dataset.logs.find((log) => log.eventId === event.id);
    const log: ContextLog = {
      id: existing?.id ?? `${state.activeSource}:context:${event.id}`,
      eventId: event.id,
      tags,
      ...(note ? { note } : {}),
      createdAt: existing?.createdAt ?? now.toISOString(),
      updatedAt: now.toISOString(),
    };
    dataset.logs = existing ? dataset.logs.map((item) => item.id === existing.id ? log : item) : [...dataset.logs, log];
    dataset.events = dataset.events.map((item) => item.id === event.id ? { ...item, promptStatus: 'logged', snoozedUntil: undefined } : item);
    addAnalytics(state, {
      name: 'context_logged', at: now.toISOString(), source: state.activeSource,
      properties: { tag_count: tags.length, note_present: note.trim().length > 0, completion_ms: Number.isFinite(action.elapsedMs) ? Math.max(0, action.elapsedMs) : 0 },
    }, event.id);
    return state;
  }
  if (action.type === 'delete-context') {
    const { dataset, event } = eventForActive(state, action.eventId);
    dataset.logs = dataset.logs.filter((log) => log.eventId !== event.id);
    dataset.events = dataset.events.map((item) => item.id === event.id ? { ...item, promptStatus: 'dismissed', snoozedUntil: undefined } : item);
    return state;
  }
  if (action.type === 'prompt') {
    const { dataset, event } = eventForActive(state, action.eventId);
    if (dataset.logs.some((log) => log.eventId === event.id)) {
      dataset.events = dataset.events.map((item) => item.id === event.id ? { ...item, promptStatus: 'logged', snoozedUntil: undefined } : item);
      return state;
    }
    if (action.status === 'snoozed') {
      dataset.events = dataset.events.map((item) => item.id === event.id ? { ...item, promptStatus: 'pending', snoozedUntil: new Date(now.getTime() + 3_600_000).toISOString() } : item);
      return state;
    }
    dataset.events = dataset.events.map((item) => item.id === event.id ? { ...item, promptStatus: action.status, snoozedUntil: undefined } : item);
    if (action.status === 'opened' && event.promptStatus === 'pending') {
      addAnalytics(state, {
        name: 'prompt_opened', at: now.toISOString(), source: event.source,
        properties: { event_age_ms: Math.max(0, now.getTime() - dateFrom(event.endedAt).getTime()), delivery_type: 'in_app' },
      }, event.id);
    }
    return state;
  }
  if (action.type === 'summary-viewed') {
    const dataset = state.activeSource ? state.datasets[state.activeSource] : undefined;
    const associations = summarizeWeek(dataset, now);
    addAnalytics(state, {
      name: 'weekly_summary_viewed', at: now.toISOString(), source: state.activeSource,
      properties: { event_count: summaryWindowEventCount(dataset, now), association_count: associations.length },
    }, `${state.activeSource ?? 'none'}:${dayOf(now)}`);
    return state;
  }
  if (action.type === 'feedback') {
    const comment = action.comment.slice(0, 500);
    state.feedback = { useful: action.useful, comment, at: now.toISOString() };
    addAnalytics(state, {
      name: 'useful_connection_reported', at: now.toISOString(), source: state.activeSource,
      properties: { useful: action.useful, comment_present: comment.trim().length > 0 },
    }, `${dayOf(now)}:${action.useful}`);
    return state;
  }
  return state;
}

export function eligiblePrompt(state: StudyState, now: Date): SignalEvent | undefined {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime()) || state.preferences.paused || quietNow(state.preferences, now)) return undefined;
  const dataset = state.activeSource ? state.datasets[state.activeSource] : undefined;
  if (!dataset) return undefined;
  if (deriveSignalState(dataset.batch.readings, dataset.events, now) === 'insufficient_data') return undefined;
  return [...dataset.events]
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
    .find((event) => {
      if (event.promptStatus !== 'pending') return false;
      if (event.snoozedUntil && dateFrom(event.snoozedUntil).getTime() > now.getTime()) return false;
      const age = now.getTime() - dateFrom(event.endedAt).getTime();
      return age >= 0 && age <= 72 * 3_600_000;
    });
}

export function loadStudy(storage: Pick<Storage, 'getItem'>): { state: StudyState; error?: string; recoveryExport?: string } {
  let raw: string | null = null;
  try {
    raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { state: initialStudy() };
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || (parsed as { schemaVersion?: unknown }).schemaVersion !== 1) {
      return { state: initialStudy(), error: 'Saved Lumin data uses an unsupported version. Export it before resetting.', recoveryExport: raw };
    }
    const candidate = record(parsed) && record(parsed.state) && parsed.state.schemaVersion === 1 ? parsed.state : parsed;
    return { state: validateStoredState(candidate, new Date()) };
  } catch {
    return { state: initialStudy(), error: 'Saved Lumin data could not be read. Export it before resetting.', ...(raw ? { recoveryExport: raw } : {}) };
  }
}

export function saveStudy(storage: Pick<Storage, 'setItem'>, state: StudyState): string | undefined {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return undefined;
  } catch {
    return STORAGE_ERROR;
  }
}

export function exportStudy(state: StudyState): string {
  return JSON.stringify({ schemaVersion: 1, state });
}
