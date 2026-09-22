import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { deriveSignalVisual, focusVisibilityOption, signalVisual, SIGNAL_TEXT } from '../src/lib/signal-visuals.ts';
import type { Metric, MetricReading } from '../src/lib/model.ts';

function reading(metric: Metric, day: string, value: number): MetricReading {
  return {
    userId: 'local', source: 'fixture', sourceRecordId: `${metric}-${day}`, metric,
    observedAt: `${day}T12:00:00.000Z`, day, value,
    unit: metric === 'heart_rate' ? 'bpm' : metric === 'hrv' ? 'ms' : metric === 'activity' || metric === 'sleep_duration' ? 'min' : 'index',
    quality: 'valid', granularity: 'day',
  };
}

function signalReadings(current: { heart_rate: number; stress: number; hrv: number; activity: number }): MetricReading[] {
  const result: MetricReading[] = [];
  for (let day = 1; day <= 7; day += 1) {
    const date = `2026-09-${String(day).padStart(2, '0')}`;
    result.push(reading('heart_rate', date, 60), reading('stress', date, 30), reading('hrv', date, 60), reading('activity', date, 30));
  }
  for (const [metric, value] of Object.entries(current) as [Metric, number][]) result.push(reading(metric, '2026-09-08', value));
  return result;
}

test('all measured states have text and calm valid palettes', () => {
  for (const state of ['insufficient_data', 'stable', 'shifted', 'recovering'] as const) {
    const preset = signalVisual(state);
    assert.ok(SIGNAL_TEXT[state].length > 10);
    assert.ok(preset.speed <= 0.8);
    assert.ok([...preset.color1, ...preset.color2].every((n) => n >= 0 && n <= 1));
  }
});

test('Garmin deviations continuously shape facets, axes, color, and flow', () => {
  const steady = deriveSignalVisual(signalReadings({ heart_rate: 60, stress: 30, hrv: 60, activity: 30 }), '2026-09-08', 'stable');
  const moderate = deriveSignalVisual(signalReadings({ heart_rate: 68, stress: 45, hrv: 50, activity: 60 }), '2026-09-08', 'shifted');
  const strong = deriveSignalVisual(signalReadings({ heart_rate: 76, stress: 60, hrv: 40, activity: 90 }), '2026-09-08', 'shifted');

  assert.ok(steady.facetStrength < moderate.facetStrength && moderate.facetStrength < strong.facetStrength);
  assert.ok(steady.speed < moderate.speed && moderate.speed < strong.speed);
  assert.ok(strong.color1[0] > moderate.color1[0] && moderate.color1[0] > steady.color1[0]);
  assert.ok(strong.axisScale[0] > moderate.axisScale[0] && moderate.axisScale[0] > steady.axisScale[0]);
  assert.ok(strong.axisScale[1] > moderate.axisScale[1] && moderate.axisScale[1] > steady.axisScale[1]);
  assert.ok(strong.facetDetail >= moderate.facetDetail);
});

test('Home sends the continuous Garmin visual into a faceted shader', () => {
  const home = readFileSync(new URL('../src/app/components/HomePage.tsx', import.meta.url), 'utf8');
  const scene = readFileSync(new URL('../src/components/Scene.jsx', import.meta.url), 'utf8');
  const shader = readFileSync(new URL('../src/components/Orb/orbShaders.js', import.meta.url), 'utf8');

  assert.match(home, /deriveSignalVisual\(selectedReadings, selectedDay, dayState\)/);
  assert.match(home, /<Scene visual=\{visual\}/);
  assert.match(scene, /uFacetStrength/);
  assert.match(scene, /uFacetDetail/);
  assert.match(scene, /uAxisScale/);
  assert.match(scene, /return \{ \.\.\.DEFAULT_PRESET, \.\.\.candidate \}/);
  assert.match(shader, /uniform float uFacetStrength/);
  assert.match(shader, /uniform vec3 uAxisScale/);
});

test('Circle selector keeps keyboard selection and reduced-motion drag release immediate', () => {
  const source = readFileSync(new URL('../src/app/components/CirclesPage.tsx', import.meta.url), 'utf8');
  assert.match(source, /visibilityOptions\.map\(\(opt, i\) =>/);
  assert.match(source, /const next = \(i \+ direction \+ visibilityOptions\.length\) % visibilityOptions\.length/);
  assert.match(source, /const radioGroup = e\.currentTarget\.parentElement/);
  assert.match(source, /focusVisibilityOption\(radioGroup, next\)/);
  assert.match(source, /if \(reduceMotion\) \{\s*x\.set\(getTargetX\(activeIdx\)\)/s);
  assert.match(source, /if \(suppressClickRef\.current\) \{\s*suppressClickRef\.current = false;\s*return;/s);
});

test('reachable visual transitions use the approved 240ms motion contract', () => {
  const files = [
    '../src/app/components/HomePage.tsx',
    '../src/imports/Insight.tsx',
    '../src/imports/NavBar.tsx',
    '../src/app/components/CirclesPage.tsx',
  ];
  const sources = files.map((file) => readFileSync(new URL(file, import.meta.url), 'utf8'));
  for (const source of sources) assert.doesNotMatch(source, /(?:1\.5s|0\.15s|0\.18s)/);
  assert.match(sources[0], /background 0\.24s cubic-bezier\(0\.25, 0\.1, 0\.25, 1\)/);
  assert.match(sources[1], /color 0\.24s cubic-bezier\(0\.25, 0\.1, 0\.25, 1\)/);
  assert.match(sources[2], /background 0\.24s cubic-bezier\(0\.25, 0\.1, 0\.25, 1\)/);
  assert.match(sources[2], /color 0\.24s cubic-bezier\(0\.25, 0\.1, 0\.25, 1\)/);
  assert.match(sources[3], /opacity 0\.24s cubic-bezier\(0\.25, 0\.1, 0\.25, 1\)/);
  assert.match(sources[3], /duration: 0\.24, ease: \[0\.25, 0\.1, 0\.25, 1\]/);
});

test('visibility focus survives deferred callback after event dispatch', () => {
  let focused = -1;
  const radios = [0, 1].map((index) => ({ focus: () => { focused = index; } }));
  const group = { querySelectorAll: () => radios } as unknown as ParentNode;
  const event = { currentTarget: group } as { currentTarget: ParentNode | null };
  const capturedGroup = event.currentTarget;

  // React clears currentTarget after dispatch; the callback must use the captured group.
  event.currentTarget = null;
  queueMicrotask(() => focusVisibilityOption(capturedGroup, 1));
  return new Promise<void>((resolve) => queueMicrotask(() => {
    assert.equal(focused, 1);
    resolve();
  }));
});
