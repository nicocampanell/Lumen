import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBatch, mergeReadings } from '../src/lib/model.ts';
import { createFixtureBatch } from '../src/lib/fixtures.ts';

const now = new Date('2026-09-16T12:00:00Z');

test('fixture is versioned, validated and idempotent', () => {
  const batch = validateBatch(createFixtureBatch(now), now);
  assert.equal(batch.source, 'fixture');
  assert.equal(new Set(batch.readings.map((r) => r.day)).size, 28);
  assert.equal(mergeReadings(batch.readings, batch.readings).length, batch.readings.length);
  assert.throws(() => validateBatch({ ...batch, readings: [{ ...batch.readings[0], value: Number.NaN }] }, now));
  assert.throws(() => validateBatch({ ...batch, readings: [{ ...batch.readings[0], unit: 'cortisol' }] }, now));
  assert.throws(() => validateBatch({ ...batch, readings: [{ ...batch.readings[0], userId: 'someone-else' }] }, now));
});

test('rejects invalid calendar and future days while preserving valid zero values', () => {
  const batch = createFixtureBatch(now);
  const reading = batch.readings[0];
  assert.throws(() => validateBatch({ ...batch, readings: [{ ...reading, day: '2026-02-30', observedAt: '2026-02-30T12:00:00Z' }] }, now));
  assert.throws(() => validateBatch({ ...batch, readings: [{ ...reading, day: '2026-09-17', observedAt: '2026-09-17T12:00:00Z' }] }, now));
  assert.throws(() => validateBatch({ ...batch, readings: [{ ...reading, source: 'garmin' }] }, now));
  const zeroStress = { ...reading, metric: 'stress' as const, unit: 'index', value: 0 };
  const valid = validateBatch({ ...batch, readings: [zeroStress] }, now);
  assert.equal(valid.readings[0].value, 0);
});

test('requires valid-quality readings for supported metric inference', () => {
  const batch = createFixtureBatch(now);
  const estimated = { ...batch.readings[0], quality: 'estimated' as const };
  const validated = validateBatch({ ...batch, readings: [estimated] }, now);
  assert.deepEqual(validated.supportedMetrics, []);
});

test('rejects timestamps whose calendar date was normalized by parsing', () => {
  const batch = createFixtureBatch(now);
  const reading = batch.readings[0];
  assert.throws(() => validateBatch({
    ...batch,
    readings: [{ ...reading, day: '2026-03-02', observedAt: '2026-02-30T12:00:00Z' }],
  }, now));
});
