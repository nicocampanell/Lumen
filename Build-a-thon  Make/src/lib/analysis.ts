import { METRIC_DETAILS } from './model.ts';
import type {
  Baseline,
  Evidence,
  Metric,
  MetricReading,
  SignalEvent,
  SignalState,
  Source,
} from './model.ts';

export const DETECTION_CONFIG = {
  version: 'daily-v1',
  lookbackDays: 14,
  minHistoricalDays: 7,
  robustThreshold: 3,
  windowHours: 24,
  cooldownHours: 24,
  staleHours: 72,
  minimumAbsoluteChange: {
    heart_rate: 8,
    hrv: 10,
    sleep_duration: 60,
    sleep_quality: 12,
    stress: 15,
    activity: 30,
    body_battery: 15,
  },
} as const;

const DAY_MS = 86_400_000;
const METRICS = Object.keys(METRIC_DETAILS) as Metric[];
const SLEEP_FAMILY = 'sleep';

function parseDay(day: string): Date {
  const date = new Date(`${day}T00:00:00.000Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== day) {
    throw new Error('Invalid calendar day');
  }
  return date;
}

function dayString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(day: string, days: number): string {
  return dayString(new Date(parseDay(day).getTime() + days * DAY_MS));
}

function dayDifference(a: string, b: string): number {
  return Math.round((parseDay(b).getTime() - parseDay(a).getTime()) / DAY_MS);
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle];
}

function qualityRank(quality: MetricReading['quality']): number {
  return quality === 'valid' ? 0 : quality === 'estimated' ? 1 : 2;
}

function readingOrder(a: MetricReading, b: MetricReading): number {
  const quality = qualityRank(a.quality) - qualityRank(b.quality);
  if (quality !== 0) return quality;
  const observed = Date.parse(b.observedAt) - Date.parse(a.observedAt);
  if (observed !== 0) return observed;
  return a.sourceRecordId.localeCompare(b.sourceRecordId);
}

function deduplicate(readings: MetricReading[]): MetricReading[] {
  const selected = new Map<string, MetricReading>();
  for (const reading of readings) {
    if (!METRICS.includes(reading.metric)) continue;
    const key = `${reading.source}\u0000${reading.metric}\u0000${reading.day}`;
    const existing = selected.get(key);
    if (!existing || readingOrder(reading, existing) < 0) selected.set(key, reading);
  }
  return [...selected.values()].sort((a, b) => {
    const byDay = a.day.localeCompare(b.day);
    if (byDay !== 0) return byDay;
    const byMetric = a.metric.localeCompare(b.metric);
    if (byMetric !== 0) return byMetric;
    return a.sourceRecordId.localeCompare(b.sourceRecordId);
  });
}

function metricFamily(metric: Metric): string {
  return metric === 'sleep_duration' || metric === 'sleep_quality' ? SLEEP_FAMILY : metric;
}

function validBeforeNow(reading: MetricReading, now: Date): boolean {
  const observed = Date.parse(reading.observedAt);
  return reading.quality === 'valid' && Number.isFinite(observed) && observed <= now.getTime();
}

function baselineForMetric(readings: MetricReading[], metric: Metric, beforeDay: string): Baseline {
  const firstDay = addDays(beforeDay, -DETECTION_CONFIG.lookbackDays);
  const historical = deduplicate(readings).filter(
    (reading) => reading.metric === metric && reading.quality === 'valid' && reading.day >= firstDay && reading.day < beforeDay,
  );
  const values = historical.map((reading) => reading.value);
  const center = median(values);
  const mad = median(values.map((value) => Math.abs(value - center)));
  return {
    metric,
    historicalDays: new Set(historical.map((reading) => reading.day)).size,
    center,
    mad,
    ready: new Set(historical.map((reading) => reading.day)).size >= DETECTION_CONFIG.minHistoricalDays,
    throughDay: addDays(beforeDay, -1),
  };
}

export function calculateBaselines(readings: MetricReading[], beforeDay: string): Baseline[] {
  parseDay(beforeDay);
  return METRICS.map((metric) => baselineForMetric(readings, metric, beforeDay));
}

function evidenceFor(reading: MetricReading, baseline: Baseline): Evidence {
  const deviation = reading.value - baseline.center;
  return {
    metric: reading.metric,
    observedValue: reading.value,
    baselineCenter: baseline.center,
    deviation,
    direction: deviation >= 0 ? 'above' : 'below',
  };
}

function shifted(reading: MetricReading, baseline: Baseline): boolean {
  if (!baseline.ready || reading.quality !== 'valid') return false;
  const magnitude = Math.abs(reading.value - baseline.center);
  const threshold = Math.max(
    DETECTION_CONFIG.minimumAbsoluteChange[reading.metric],
    DETECTION_CONFIG.robustThreshold * 1.4826 * baseline.mad,
  );
  return magnitude >= threshold;
}

function eventEnd(day: string): string {
  return `${addDays(day, 1)}T00:00:00.000Z`;
}

function eventStart(day: string): string {
  return `${day}T00:00:00.000Z`;
}

function strongerEvidence(current: Evidence, next: Evidence): Evidence {
  return Math.abs(next.deviation) > Math.abs(current.deviation) ? next : current;
}

interface Episode {
  source: Source;
  firstDay: string;
  lastDay: string;
  evidence: Evidence[];
}

function episodesFor(readings: MetricReading[], now: Date): Episode[] {
  const usable = deduplicate(readings).filter((reading) => validBeforeNow(reading, now));
  const episodes: Episode[] = [];
  const sources = [...new Set(usable.map((reading) => reading.source))].sort();
  for (const source of sources) {
    const sourceReadings = usable.filter((reading) => reading.source === source);
    const days = [...new Set(sourceReadings.map((reading) => reading.day))].sort();
    const candidates: Array<{ day: string; evidence: Evidence[] }> = [];
    for (const day of days) {
      const baselines = new Map(calculateBaselines(sourceReadings, day).map((baseline) => [baseline.metric, baseline]));
      const qualifying = sourceReadings
        .filter((reading) => reading.day === day)
        .filter((reading) => shifted(reading, baselines.get(reading.metric)!));
      const families = new Set(qualifying.map((reading) => metricFamily(reading.metric)));
      if (families.size < 2) continue;
      candidates.push({
        day,
        evidence: qualifying.map((reading) => evidenceFor(reading, baselines.get(reading.metric)!)),
      });
    }
    for (const candidate of candidates) {
      const previous = episodes.at(-1);
      if (previous && previous.source === source && dayDifference(previous.lastDay, candidate.day) === 1) {
        const byMetric = new Map(previous.evidence.map((evidence) => [evidence.metric, evidence]));
        for (const evidence of candidate.evidence) {
          const existing = byMetric.get(evidence.metric);
          byMetric.set(evidence.metric, existing ? strongerEvidence(existing, evidence) : evidence);
        }
        previous.lastDay = candidate.day;
        previous.evidence = [...byMetric.values()].sort((a, b) => a.metric.localeCompare(b.metric));
      } else {
        episodes.push({ source, firstDay: candidate.day, lastDay: candidate.day, evidence: candidate.evidence.sort((a, b) => a.metric.localeCompare(b.metric)) });
      }
    }
  }
  return episodes.sort((a, b) => a.firstDay.localeCompare(b.firstDay) || a.source.localeCompare(b.source));
}

function hydrateEpisode(episode: Episode, previous: SignalEvent | undefined): SignalEvent {
  const id = `${episode.source}:daily-v1:${episode.firstDay}`;
  const event: SignalEvent = {
    id,
    userId: 'local',
    source: episode.source,
    startedAt: eventStart(episode.firstDay),
    endedAt: eventEnd(episode.lastDay),
    state: 'shifted',
    ruleVersion: 'daily-v1',
    evidence: episode.evidence,
    promptStatus: previous?.promptStatus ?? 'pending',
  };
  if (previous?.snoozedUntil !== undefined) event.snoozedUntil = previous.snoozedUntil;
  return event;
}

export function detectEvents(readings: MetricReading[], previous: SignalEvent[], now: Date): SignalEvent[] {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new Error('Invalid current time');
  const detected = episodesFor(readings, now);
  const previousById = new Map(previous.map((event) => [event.id, event]));
  const events = detected.map((episode) => {
    const id = `${episode.source}:daily-v1:${episode.firstDay}`;
    return hydrateEpisode(episode, previousById.get(id));
  });
  const detectedIds = new Set(events.map((event) => event.id));
  for (const event of previous) {
    if (!detectedIds.has(event.id) && event.promptStatus === 'logged') events.push({ ...event, evidence: [...event.evidence] });
  }
  return events.sort((a, b) => a.startedAt.localeCompare(b.startedAt) || a.id.localeCompare(b.id));
}

function completeReadyFamilies(readings: MetricReading[], day: string): { families: Set<string>; shiftedFamilies: Set<string> } {
  const current = deduplicate(readings).filter((reading) => reading.day === day && reading.quality === 'valid');
  const baselines = new Map(calculateBaselines(readings, day).map((baseline) => [baseline.metric, baseline]));
  const families = new Set<string>();
  const shiftedFamilies = new Set<string>();
  for (const reading of current) {
    const baseline = baselines.get(reading.metric)!;
    if (!baseline.ready) continue;
    const family = metricFamily(reading.metric);
    families.add(family);
    if (shifted(reading, baseline)) shiftedFamilies.add(family);
  }
  return { families, shiftedFamilies };
}

export function deriveSignalState(readings: MetricReading[], events: SignalEvent[], now: Date): SignalState {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new Error('Invalid current time');
  const valid = deduplicate(readings).filter((reading) => validBeforeNow(reading, now));
  if (valid.length === 0) return 'insufficient_data';
  const newest = valid.reduce((latest, reading) => (Date.parse(reading.observedAt) > Date.parse(latest.observedAt) ? reading : latest));
  if (now.getTime() - Date.parse(newest.observedAt) > DETECTION_CONFIG.staleHours * 3_600_000) return 'insufficient_data';

  const latestDay = newest.day;
  const current = completeReadyFamilies(valid, latestDay);
  if (current.families.size < 2) return 'insufficient_data';

  const sourceSet = new Set(valid.filter((reading) => reading.day === latestDay).map((reading) => reading.source));
  const relevantEvents = events
    .filter((event) => sourceSet.has(event.source))
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  const latestEvent = relevantEvents[0];
  const hasMultiSignalShift = current.shiftedFamilies.size >= 2;
  if (!latestEvent) return hasMultiSignalShift ? 'shifted' : 'stable';

  const eventLastDay = latestEvent.endedAt.slice(0, 10);
  const eventEndDay = addDays(eventLastDay, -1);
  const relation = dayDifference(eventEndDay, latestDay);
  if (relation <= 0) return hasMultiSignalShift ? 'shifted' : 'stable';
  if (relation === 1 && current.shiftedFamilies.size === 0) {
    const eventAge = now.getTime() - Date.parse(latestEvent.endedAt);
    if (eventAge <= DETECTION_CONFIG.staleHours * 3_600_000) return 'recovering';
  }
  return hasMultiSignalShift ? 'shifted' : 'stable';
}
