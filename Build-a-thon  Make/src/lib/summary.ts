import { METRIC_DETAILS } from './model.ts';
import type { Association, ContextTag, Dataset, Metric, SignalEvent } from './model.ts';

const DAY_MS = 86_400_000;
const QUALIFIER = 'This is an association in your recent data, not a diagnosis.';

function dayOf(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function parseDay(day: string): Date {
  const date = new Date(`${day}T00:00:00.000Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== day) {
    throw new Error('Invalid calendar day');
  }
  return date;
}

function addDays(day: string, amount: number): string {
  return dayOf(new Date(parseDay(day).getTime() + amount * DAY_MS));
}

export function summarizeWeek(dataset: Dataset | undefined, now: Date): Association[] {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new Error('Invalid current time');
  if (!dataset) return [];
  const to = addDays(dayOf(now), -1);
  const from = addDays(to, -6);
  const events = new Map(dataset.events.map((event) => [event.id, event]));
  const tagged = new Map<ContextTag, Map<string, SignalEvent>>();
  for (const log of dataset.logs) {
    const event = events.get(log.eventId);
    if (!event) continue;
    const day = event.startedAt.slice(0, 10);
    if (day < from || day > to) continue;
    for (const tag of new Set(log.tags)) {
      if (!tagged.has(tag)) tagged.set(tag, new Map());
      tagged.get(tag)!.set(event.id, event);
    }
  }
  const associations: Association[] = [];
  for (const [tag, taggedEvents] of tagged) {
    const total = taggedEvents.size;
    const byEvidence = new Map<string, Set<string>>();
    for (const event of taggedEvents.values()) {
      for (const evidence of event.evidence) {
        const key = `${evidence.metric}\u0000${evidence.direction}`;
        if (!byEvidence.has(key)) byEvidence.set(key, new Set());
        byEvidence.get(key)!.add(event.id);
      }
    }
    for (const [key, ids] of byEvidence) {
      if (ids.size < 3) continue;
      const [metric, direction] = key.split('\u0000') as [Metric, 'above' | 'below'];
      const label = METRIC_DETAILS[metric].label;
      const directionText = direction === 'above' ? 'above' : 'below';
      const eventIds = [...ids].sort();
      associations.push({
        id: `${tag}:${metric}:${direction}:${from}:${to}`,
        tag,
        metric,
        direction,
        count: eventIds.length,
        total,
        from,
        to,
        eventIds,
        statement: `${label} was ${directionText} your usual range in ${eventIds.length} of ${total} events tagged ${tag}.`,
      });
    }
  }
  return associations.sort((a, b) => a.tag.localeCompare(b.tag) || a.metric.localeCompare(b.metric) || a.direction.localeCompare(b.direction));
}

export { QUALIFIER };
