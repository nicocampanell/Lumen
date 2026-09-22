import test from 'node:test';
import assert from 'node:assert/strict';
import { createFixtureBatch } from '../src/lib/fixtures.ts';
import type { MetricReading } from '../src/lib/model.ts';
import { calculateBaselines, detectEvents, deriveSignalState } from '../src/lib/analysis.ts';

const now = new Date('2026-09-16T12:00:00Z');

test('requires aligned distinct metrics and deduplicates replay', () => {
  assert.equal(detectEvents(createFixtureBatch(now, 'stable').readings, [], now).length, 0);
  assert.equal(detectEvents(createFixtureBatch(now, 'single').readings, [], now).length, 0);
  const readings = createFixtureBatch(now).readings;
  const events = detectEvents(readings, [], now);
  assert.equal(events.length, 4);
  assert.ok(events.every((event) => new Set(event.evidence.map((value) => value.metric)).size >= 2));
  assert.deepEqual(detectEvents(readings, events, now), events);
  assert.equal(deriveSignalState(readings, events, now), 'shifted');
});

test('baseline excludes the target and future days', () => {
  const readings = createFixtureBatch(now).readings;
  const before = '2026-09-15';
  assert.deepEqual(
    calculateBaselines(readings, before),
    calculateBaselines(readings.filter((reading) => reading.day < before), before),
  );
  assert.equal(detectEvents(readings.filter((reading) => reading.day >= '2026-09-12'), [], now).length, 0);
});

test('shuffled readings produce the same events and old logged events survive a shorter import', () => {
  const readings = createFixtureBatch(now).readings;
  const events = detectEvents(readings, [], now);
  const shuffled = [...readings].reverse();
  assert.deepEqual(detectEvents(shuffled, [], now), events);

  const logged = { ...events[0], promptStatus: 'logged' as const };
  const shortened = detectEvents(readings.filter((reading) => reading.day >= '2026-09-12'), [logged], now);
  assert.equal(shortened.some((event) => event.id === logged.id && event.promptStatus === 'logged'), true);
});

test('same-metric duplicates cannot satisfy the two-family rule', () => {
  const batch = createFixtureBatch(now, 'stable');
  const targetDay = '2026-09-15';
  const changed = batch.readings.map((reading) =>
    reading.day === targetDay && reading.metric === 'heart_rate'
      ? { ...reading, value: 90 }
      : reading,
  );
  changed.push({ ...changed.find((reading) => reading.day === targetDay && reading.metric === 'heart_rate')!, sourceRecordId: 'duplicate-heart-rate', value: 100 });
  assert.equal(detectEvents(changed, [], now).length, 0);
});

test('sleep duration and quality alone are one family', () => {
  const batch = createFixtureBatch(now, 'stable');
  const withSleepQuality = batch.readings.flatMap((reading): MetricReading[] => {
    if (reading.metric !== 'sleep_duration') return [reading];
    return [reading, {
      ...reading,
      metric: 'sleep_quality',
      sourceRecordId: `${reading.sourceRecordId}-quality`,
      unit: 'index',
      value: 80,
    }];
  });
  const readings = withSleepQuality.map((reading) => {
    if (reading.day !== '2026-09-15') return reading;
    if (reading.metric === 'sleep_duration') return { ...reading, value: 600 };
    if (reading.metric === 'sleep_quality') return { ...reading, value: 40 };
    return reading;
  });
  assert.equal(calculateBaselines(readings, '2026-09-15').find((baseline) => baseline.metric === 'sleep_quality')?.ready, true);
  assert.equal(detectEvents(readings, [], now).length, 0);
});

test('one shifted metric does not produce a shifted signal state', () => {
  const priorEvents = detectEvents(createFixtureBatch(now).readings, [], now);
  const readings = createFixtureBatch(now, 'stable').readings.map((reading) =>
    reading.day === '2026-09-15' && reading.metric === 'heart_rate'
      ? { ...reading, value: 90 }
      : reading,
  );
  assert.equal(deriveSignalState(readings, priorEvents, now), 'stable');
});

test('contiguous qualifying days merge into the first episode', () => {
  const batch = createFixtureBatch(now, 'stable');
  const readings = batch.readings.map((reading) => {
    if (reading.day === '2026-09-12' || reading.day === '2026-09-13') {
      if (reading.metric === 'heart_rate') return { ...reading, value: 90 };
      if (reading.metric === 'hrv') return { ...reading, value: 25 };
    }
    return reading;
  });
  const events = detectEvents(readings, [], now);
  assert.equal(events.length, 1);
  assert.equal(events[0].id, 'fixture:daily-v1:2026-09-12');
  assert.equal(events[0].endedAt, '2026-09-14T00:00:00.000Z');
  assert.deepEqual(new Set(events[0].evidence.map((evidence) => evidence.metric)), new Set(['heart_rate', 'hrv']));
});

test('estimated readings cannot qualify, and zero MAD still uses the absolute floor', () => {
  const shifted = createFixtureBatch(now).readings.map((reading) =>
    reading.metric === 'hrv' ? { ...reading, quality: 'estimated' as const } : reading,
  );
  assert.equal(detectEvents(shifted, [], now).length, 0);

  const constant = createFixtureBatch(now, 'stable').readings.map((reading) => {
    const value = reading.metric === 'heart_rate' ? 60 : reading.metric === 'hrv' ? 50 : reading.value;
    if (reading.day !== '2026-09-15') return { ...reading, value };
    if (reading.metric === 'heart_rate') return { ...reading, value: 68 };
    if (reading.metric === 'hrv') return { ...reading, value: 40 };
    return { ...reading, value };
  });
  assert.equal(detectEvents(constant, [], now).length, 1);
});

test('stale newest readings suppress the active signal state', () => {
  const readings = createFixtureBatch(now).readings;
  const events = detectEvents(readings, [], now);
  assert.equal(deriveSignalState(readings, events, new Date('2026-09-20T12:00:00Z')), 'insufficient_data');
});

test('baseline readiness requires seven distinct valid days', () => {
  const readings = createFixtureBatch(now).readings.filter((reading) => reading.day >= '2026-09-10');
  const baselines = calculateBaselines(readings, '2026-09-16');
  assert.ok(baselines.every((baseline) => !baseline.ready));
});
