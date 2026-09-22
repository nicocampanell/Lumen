import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createFixtureBatch } from '../src/lib/fixtures.ts';
import type { Dataset, SignalEvent, StudyState } from '../src/lib/model.ts';
import {
  eligiblePrompt,
  exportStudy,
  initialStudy,
  loadStudy,
  saveStudy,
  updateStudy,
} from '../src/lib/study.ts';
import { summarizeWeek } from '../src/lib/summary.ts';

const now = new Date('2026-09-16T12:00:00Z');

function fixtureStudy(): StudyState {
  let state = updateStudy(initialStudy(), { type: 'consent' }, now);
  state = updateStudy(state, { type: 'import', batch: createFixtureBatch(now) }, now);
  return state;
}

function sourceBatch(source: 'garmin' | 'export', mode: 'stable' | 'shifted') {
  const batch = createFixtureBatch(now, mode);
  return {
    ...batch,
    source,
    readings: batch.readings.map((reading) => ({
      ...reading,
      source,
      sourceRecordId: `${source}:${reading.sourceRecordId}`,
    })),
  } as const;
}

test('context survives replay, empty tags are allowed, and preferences suppress prompts', () => {
  let state = fixtureStudy();
  const event = state.datasets.fixture!.events.at(-1)!;
  state = updateStudy(state, { type: 'context', eventId: event.id, tags: [], note: 'A short note', elapsedMs: 1500 }, now);
  state = updateStudy(state, { type: 'import', batch: createFixtureBatch(now) }, now);
  assert.equal(state.datasets.fixture!.logs.find((log) => log.eventId === event.id)?.note, 'A short note');
  state = updateStudy(state, { type: 'preferences', preferences: { paused: true, quietStart: '22:00', quietEnd: '07:00' } }, now);
  assert.equal(eligiblePrompt(state, now), undefined);
  assert.ok(!JSON.stringify(state.analytics).includes('A short note'));
  assert.equal(saveStudy({ setItem() { throw new Error('full'); } }, state), 'Changes could not be saved on this device. Export your data before leaving.');
  assert.ok(loadStudy({ getItem: () => '{bad' }).error);
  assert.ok(summarizeWeek(state.datasets.fixture, now).every((association) => association.count >= 3 && association.total >= association.count));
});

test('fixture and live datasets stay isolated and import milestones are idempotent', () => {
  let state = fixtureStudy();
  const garmin = { ...createFixtureBatch(now), source: 'garmin' as const, readings: createFixtureBatch(now).readings.map((reading) => ({ ...reading, source: 'garmin' as const, sourceRecordId: reading.sourceRecordId.replace('fixture', 'garmin') })) };
  state = updateStudy(state, { type: 'import', batch: garmin }, now);
  state = updateStudy(state, { type: 'import', batch: garmin }, now);
  assert.ok(state.datasets.fixture);
  assert.ok(state.datasets.garmin);
  assert.notEqual(state.datasets.fixture, state.datasets.garmin);
  assert.equal(state.analytics.filter((event) => event.name === 'data_source_connected' && event.source === 'garmin').length, 1);
  assert.equal(state.analytics.filter((event) => event.name === 'signal_event_created' && event.source === 'garmin').length, 4);
  assert.equal(state.datasets.fixture!.logs.filter((log) => log.sample).length, 3);
});

test('context edits preserve creation, delete dismisses, and invalid input is rejected', () => {
  let state = fixtureStudy();
  const event = state.datasets.fixture!.events[0];
  state = updateStudy(state, { type: 'context', eventId: event.id, tags: ['Meeting', 'Meeting'], note: 'x'.repeat(600), elapsedMs: 0 }, now);
  const first = state.datasets.fixture!.logs[0];
  assert.deepEqual(first.tags, ['Meeting']);
  assert.equal(first.note?.length, 500);
  state = updateStudy(state, { type: 'context', eventId: event.id, tags: ['Conflict'], note: '', elapsedMs: 1 }, new Date('2026-09-16T13:00:00Z'));
  const edited = state.datasets.fixture!.logs[0];
  assert.equal(edited.createdAt, first.createdAt);
  assert.equal(edited.updatedAt, '2026-09-16T13:00:00.000Z');
  assert.throws(() => updateStudy(state, { type: 'context', eventId: 'missing', tags: [], note: '', elapsedMs: 1 }, now), /event/i);
  assert.throws(() => updateStudy(state, { type: 'context', eventId: event.id, tags: ['not-a-tag' as never], note: '', elapsedMs: 1 }, now), /tag/i);
  state = updateStudy(state, { type: 'delete-context', eventId: event.id }, now);
  assert.equal(state.datasets.fixture!.logs.some((log) => log.eventId === event.id), false);
  assert.equal(state.datasets.fixture!.events.find((item) => item.id === event.id)?.promptStatus, 'dismissed');
});

test('prompt policy handles snooze expiry, crossing-midnight quiet hours, and stale events', () => {
  let state = fixtureStudy();
  const event = state.datasets.fixture!.events.at(-1)!;
  assert.equal(eligiblePrompt(state, now)?.id, event.id);
  state = updateStudy(state, { type: 'prompt', eventId: event.id, status: 'snoozed' }, now);
  assert.equal(eligiblePrompt(state, now), undefined);
  assert.equal(eligiblePrompt(state, new Date('2026-09-16T13:01:00Z'))?.id, event.id);
  state = updateStudy(state, { type: 'preferences', preferences: { paused: false, quietStart: '22:00', quietEnd: '07:00' } }, now);
  assert.equal(eligiblePrompt(state, new Date(2026, 8, 16, 23, 0)), undefined);
  assert.equal(eligiblePrompt(state, new Date(2026, 8, 17, 8, 0))?.id, event.id);
  assert.equal(eligiblePrompt(state, new Date('2026-09-19T12:00:00Z')), undefined);
});

test('context-bearing events stay logged through prompt actions and corrected imports', () => {
  let state = updateStudy(initialStudy(), { type: 'consent' }, now);
  state = updateStudy(state, { type: 'import', batch: sourceBatch('garmin', 'shifted') }, now);
  const event = state.datasets.garmin!.events.at(-1)!;
  state = updateStudy(state, { type: 'context', eventId: event.id, tags: ['Meeting'], note: 'Context', elapsedMs: 1 }, now);
  for (const status of ['opened', 'dismissed', 'snoozed'] as const) {
    state = updateStudy(state, { type: 'prompt', eventId: event.id, status }, now);
    assert.equal(state.datasets.garmin!.events.find((item) => item.id === event.id)?.promptStatus, 'logged');
  }
  state = updateStudy(state, { type: 'import', batch: sourceBatch('garmin', 'stable') }, now);
  const dataset = state.datasets.garmin!;
  assert.equal(dataset.events.some((item) => item.id === event.id && item.promptStatus === 'logged'), true);
  assert.equal(dataset.logs.filter((log) => log.eventId === event.id).length, 1);
  assert.equal(eligiblePrompt(state, now), undefined);
  assert.equal(loadStudy({ getItem: () => exportStudy(state) }).state.datasets.garmin!.logs.length, dataset.logs.length);
});

test('storage errors and versions are reported without overwriting, export is versioned', () => {
  const state = fixtureStudy();
  assert.equal(loadStudy({ getItem: () => JSON.stringify({ schemaVersion: 99 }) }).error, 'Saved Lumin data uses an unsupported version. Export it before resetting.');
  assert.equal(loadStudy({ getItem: () => null }).state.schemaVersion, 1);
  const saved: Record<string, string> = {};
  assert.equal(saveStudy({ setItem: (key, value) => { saved[key] = value; } }, state), undefined);
  assert.equal(JSON.parse(saved['lumin.study.v1']).schemaVersion, 1);
  const exported = JSON.parse(exportStudy(state));
  assert.equal(exported.schemaVersion, 1);
  assert.equal(exported.state.schemaVersion, 1);
  assert.equal(loadStudy({ getItem: () => exportStudy(state) }).state.datasets.fixture?.batch.readings.length, state.datasets.fixture?.batch.readings.length);
});

test('invalid saved data keeps an exact recovery payload for download before reset', () => {
  const unsupported = JSON.stringify({ schemaVersion: 99, credentials: 'must remain opaque' });
  assert.equal(loadStudy({ getItem: () => unsupported }).recoveryExport, unsupported);
  const corrupt = '{"schemaVersion":1,"state":';
  assert.equal(loadStudy({ getItem: () => corrupt }).recoveryExport, corrupt);
  assert.equal(loadStudy({ getItem: () => null }).recoveryExport, undefined);
});

test('persisted state validation rejects corrupt records, references, tags, and analytics', () => {
  const state = fixtureStudy();
  const corrupt = structuredClone(state) as StudyState;
  corrupt.datasets.fixture!.events[0].evidence[0].observedValue = Number.NaN;
  assert.ok(loadStudy({ getItem: () => JSON.stringify(corrupt) }).error);
  const badReference = structuredClone(state) as StudyState;
  badReference.datasets.fixture!.logs[0].eventId = 'missing-event';
  assert.ok(loadStudy({ getItem: () => JSON.stringify(badReference) }).error);
  const badAnalytics = structuredClone(state) as StudyState;
  badAnalytics.analytics.push({ name: 'context_logged', at: now.toISOString(), source: 'other' as never, properties: {} });
  assert.ok(loadStudy({ getItem: () => JSON.stringify(badAnalytics) }).error);
});

test('fixture replay keeps its original anchored history and merged live metrics are revalidated', () => {
  let state = fixtureStudy();
  const original = state.datasets.fixture!;
  state = updateStudy(state, { type: 'import', batch: createFixtureBatch(new Date('2026-09-17T12:00:00Z')) }, new Date('2026-09-17T12:00:00Z'));
  assert.deepEqual(state.datasets.fixture!.batch.readings, original.batch.readings);
  const oneMetric = createFixtureBatch(now).readings.filter((reading) => reading.metric === 'heart_rate').map((reading) => ({ ...reading, source: 'garmin' as const, sourceRecordId: reading.sourceRecordId.replace('fixture', 'garmin') }));
  const batch = { ...createFixtureBatch(now), source: 'garmin' as const, readings: oneMetric, supportedMetrics: ['heart_rate' as const] };
  state = updateStudy(state, { type: 'import', batch }, now);
  assert.deepEqual(state.datasets.garmin!.batch.supportedMetrics, ['heart_rate']);
  const second = { ...createFixtureBatch(now), source: 'garmin' as const, readings: createFixtureBatch(now).readings.filter((reading) => reading.metric === 'hrv').map((reading) => ({ ...reading, source: 'garmin' as const, sourceRecordId: reading.sourceRecordId.replace('fixture', 'garmin') })) };
  state = updateStudy(state, { type: 'import', batch: second }, now);
  assert.deepEqual(state.datasets.garmin!.batch.supportedMetrics, ['heart_rate', 'hrv']);
});

test('prompt eligibility requires fresh, sufficient analysis and summary analytics use the window/source', () => {
  let state = fixtureStudy();
  const fixture = state.datasets.fixture!;
  const pending = fixture.events.at(-1)!;
  const insufficient = { ...state, datasets: { fixture: { ...fixture, batch: { ...fixture.batch, readings: fixture.batch.readings.filter((reading) => reading.day === '2026-09-15') } } } };
  assert.equal(eligiblePrompt(insufficient, now), undefined);
  state = updateStudy(state, { type: 'summary-viewed' }, now);
  state = updateStudy(state, { type: 'feedback', useful: true, comment: 'Helpful' }, now);
  const viewed = state.analytics.find((event) => event.name === 'weekly_summary_viewed')!;
  assert.equal(viewed.properties.event_count, 4);
  assert.equal(state.analytics.find((event) => event.name === 'useful_connection_reported')?.source, 'fixture');
  assert.equal(pending.promptStatus, 'pending');
});

test('provider computes and persists transitions outside React state updaters', async () => {
  const source = await readFile(new URL('../src/app/components/StudyContext.tsx', import.meta.url), 'utf8');
  assert.match(source, /stateRef/);
  assert.doesNotMatch(source, /setState\(\(previous\)[\s\S]*saveStudy/);
  assert.match(source, /removeItem\(STORAGE_KEY\)/);
});

test('summary uses the seven completed days and a 3-of-4 denominator', () => {
  const base = fixtureStudy().datasets.fixture!;
  const eventTemplate = base.events[0];
  const events: SignalEvent[] = [0, 1, 2, 3].map((index) => ({
    ...eventTemplate,
    id: `fixture:manual:${index}`,
    startedAt: `2026-09-${10 + index}T00:00:00.000Z`,
    endedAt: `2026-09-${11 + index}T00:00:00.000Z`,
    evidence: [{ ...eventTemplate.evidence[0], metric: 'heart_rate', direction: index === 3 ? 'below' : 'above' }],
    promptStatus: 'logged',
  }));
  const logs = events.map((event, index) => ({ id: `log-${index}`, eventId: event.id, tags: ['Meeting' as const], createdAt: now.toISOString(), updatedAt: now.toISOString() }));
  const outside = { ...events[0], id: 'fixture:manual:outside', startedAt: '2026-09-08T00:00:00.000Z', endedAt: '2026-09-09T00:00:00.000Z' };
  const dataset: Dataset = {
    ...base,
    events: [...events, outside],
    logs: [...logs, { ...logs[0], id: 'duplicate-log' }, { id: 'outside-log', eventId: outside.id, tags: ['Meeting' as const], createdAt: now.toISOString(), updatedAt: now.toISOString() }],
  };
  const associations = summarizeWeek(dataset, now);
  assert.equal(associations.length, 1);
  assert.equal(associations[0].count, 3);
  assert.equal(associations[0].total, 4);
  assert.equal(associations[0].from, '2026-09-09');
  assert.equal(associations[0].to, '2026-09-15');
  assert.match(associations[0].statement, /3 of 4/);
  assert.equal(summarizeWeek(dataset, new Date('2026-09-20T12:00:00Z')).length, 0);
});
