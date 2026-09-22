export type Source = 'garmin' | 'export' | 'fixture';
export type Metric =
  | 'heart_rate'
  | 'hrv'
  | 'sleep_duration'
  | 'sleep_quality'
  | 'stress'
  | 'activity'
  | 'body_battery';
export type SignalState = 'insufficient_data' | 'stable' | 'shifted' | 'recovering';

export interface MetricReading {
  userId: 'local';
  source: Source;
  sourceRecordId: string;
  metric: Metric;
  observedAt: string;
  day: string;
  value: number;
  unit: string;
  quality: 'valid' | 'estimated' | 'missing';
  granularity: 'day';
}

export interface Evidence {
  metric: Metric;
  observedValue: number;
  baselineCenter: number;
  deviation: number;
  direction: 'above' | 'below';
}

export interface SignalEvent {
  id: string;
  userId: 'local';
  source: Source;
  startedAt: string;
  endedAt: string;
  state: SignalState;
  ruleVersion: 'daily-v1';
  evidence: Evidence[];
  promptStatus: 'pending' | 'opened' | 'dismissed' | 'logged';
  snoozedUntil?: string;
}

export const CONTEXT_TAGS = [
  'Meeting',
  'Conflict',
  'Caffeine',
  'Exercise',
  'Excitement',
  'Poor sleep',
  'Meal',
  'Commute',
  'Illness',
  'Nothing noticeable',
] as const;
export type ContextTag = (typeof CONTEXT_TAGS)[number];

export interface ContextLog {
  id: string;
  eventId: string;
  tags: ContextTag[];
  note?: string;
  createdAt: string;
  updatedAt: string;
  sample?: boolean;
}

export interface ImportBatch {
  schemaVersion: 1;
  source: Source;
  readings: MetricReading[];
  supportedMetrics: Metric[];
  importedAt: string;
  warnings: string[];
}

export interface Baseline {
  metric: Metric;
  historicalDays: number;
  center: number;
  mad: number;
  ready: boolean;
  throughDay: string;
}

export interface NotificationPreferences {
  paused: boolean;
  quietStart: string;
  quietEnd: string;
}

export interface Dataset {
  batch: ImportBatch;
  events: SignalEvent[];
  logs: ContextLog[];
}

export interface ProductEvent {
  name:
    | 'onboarding_started'
    | 'data_source_connected'
    | 'baseline_ready'
    | 'signal_event_created'
    | 'prompt_opened'
    | 'context_logged'
    | 'weekly_summary_viewed'
    | 'useful_connection_reported';
  at: string;
  source?: Source;
  properties: Record<string, string | number | boolean | string[]>;
}

export interface StudyState {
  schemaVersion: 1;
  consentAt?: string;
  activeSource?: Source;
  datasets: Partial<Record<Source, Dataset>>;
  preferences: NotificationPreferences;
  analytics: ProductEvent[];
  connection: {
    status: 'disconnected' | 'connected' | 'needs_attention';
    lastSyncAt?: string;
    message?: string;
  };
  feedback?: { useful: boolean; comment: string; at: string };
}

export interface Association {
  id: string;
  tag: ContextTag;
  metric: Metric;
  direction: 'above' | 'below';
  count: number;
  total: number;
  from: string;
  to: string;
  eventIds: string[];
  statement: string;
}

export const METRIC_DETAILS = {
  heart_rate: { label: 'Resting heart rate', unit: 'bpm', min: 20, max: 250 },
  hrv: { label: 'Overnight HRV', unit: 'ms', min: 1, max: 400 },
  sleep_duration: { label: 'Sleep duration', unit: 'min', min: 0, max: 1440 },
  sleep_quality: { label: 'Sleep score', unit: 'index', min: 0, max: 100 },
  stress: { label: 'Garmin stress measure', unit: 'index', min: 0, max: 100 },
  activity: { label: 'Activity duration', unit: 'min', min: 0, max: 1440 },
  body_battery: { label: 'Body Battery', unit: 'index', min: 0, max: 100 },
} as const;

const METRICS = Object.keys(METRIC_DETAILS) as Metric[];
const SOURCES: Source[] = ['garmin', 'export', 'fixture'];
const QUALITIES = ['valid', 'estimated', 'missing'] as const;
const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseDay(day: unknown): Date {
  if (typeof day !== 'string' || !DAY_PATTERN.test(day)) throw new Error('Invalid calendar day');
  const parsed = new Date(`${day}T00:00:00.000Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== day) {
    throw new Error('Invalid calendar day');
  }
  return parsed;
}

function assertDate(value: unknown, message: string): Date {
  if (typeof value !== 'string') throw new Error(message);
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error(message);
  return date;
}

function compareReadings(a: MetricReading, b: MetricReading): number {
  const byTime = Date.parse(a.observedAt) - Date.parse(b.observedAt);
  if (byTime !== 0) return byTime;
  const byMetric = a.metric.localeCompare(b.metric);
  return byMetric !== 0 ? byMetric : a.sourceRecordId.localeCompare(b.sourceRecordId);
}

function normalizeReading(input: unknown, source: Source, now: Date): MetricReading {
  if (!isRecord(input)) throw new Error('Invalid metric reading');
  const metric = input.metric;
  if (typeof metric !== 'string' || !METRICS.includes(metric as Metric)) throw new Error('Unknown metric');
  const details = METRIC_DETAILS[metric as Metric];
  if (input.userId !== 'local') throw new Error('Invalid user');
  if (input.source !== source) throw new Error('Mismatched source');
  if (typeof input.sourceRecordId !== 'string' || input.sourceRecordId.trim() === '') throw new Error('Invalid source record id');
  const dayDate = parseDay(input.day);
  if (dayDate.getTime() > Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())) {
    throw new Error('Future day');
  }
  if (typeof input.observedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}/.test(input.observedAt)) {
    throw new Error('Invalid observation timestamp');
  }
  parseDay(input.observedAt.slice(0, 10));
  const observedAt = assertDate(input.observedAt, 'Invalid observation timestamp');
  if (observedAt.toISOString().slice(0, 10) !== input.day) throw new Error('Timestamp does not match day');
  if (typeof input.value !== 'number' || !Number.isFinite(input.value)) throw new Error('Invalid metric value');
  if (input.value < details.min || input.value > details.max) throw new Error('Metric value out of range');
  if (input.unit !== details.unit) throw new Error('Invalid metric unit');
  if (!QUALITIES.includes(input.quality as (typeof QUALITIES)[number])) throw new Error('Invalid reading quality');
  if (input.granularity !== 'day') throw new Error('Invalid reading granularity');
  return {
    userId: 'local',
    source,
    sourceRecordId: input.sourceRecordId,
    metric: metric as Metric,
    observedAt: input.observedAt,
    day: input.day as string,
    value: input.value,
    unit: details.unit,
    quality: input.quality as MetricReading['quality'],
    granularity: 'day',
  };
}

export function mergeReadings(a: MetricReading[], b: MetricReading[]): MetricReading[] {
  const merged = new Map<string, MetricReading>();
  for (const reading of [...a, ...b]) {
    const key = `${reading.source}\u0000${reading.sourceRecordId}`;
    const existing = merged.get(key);
    if (existing && existing.metric !== reading.metric) throw new Error('Conflicting duplicate metric');
    merged.set(key, reading);
  }
  return [...merged.values()].sort(compareReadings);
}

export function validateBatch(input: unknown, now: Date): ImportBatch {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new Error('Invalid current time');
  if (!isRecord(input) || input.schemaVersion !== 1) throw new Error('Unsupported batch schema');
  if (typeof input.source !== 'string' || !SOURCES.includes(input.source as Source)) throw new Error('Invalid batch source');
  if (!Array.isArray(input.readings) || input.readings.length > 20_000) throw new Error('Invalid readings');
  const source = input.source as Source;
  const normalized = input.readings.map((reading) => normalizeReading(reading, source, now));
  const readings = mergeReadings([], normalized);
  if (typeof input.importedAt !== 'string' || !Number.isFinite(Date.parse(input.importedAt))) throw new Error('Invalid import timestamp');
  if (!Array.isArray(input.warnings) || input.warnings.some((warning) => typeof warning !== 'string')) throw new Error('Invalid warnings');
  const supportedMetrics = METRICS.filter((metric) => readings.some((reading) => reading.metric === metric && reading.quality === 'valid'));
  return {
    schemaVersion: 1,
    source,
    readings,
    supportedMetrics,
    importedAt: input.importedAt,
    warnings: [...input.warnings] as string[],
  };
}

export function formatDay(day: string): string {
  const parsed = parseDay(day);
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(parsed);
}
