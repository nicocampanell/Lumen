import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createFixtureBatch } from '../src/lib/fixtures.ts';
import { detectEvents } from '../src/lib/analysis.ts';
import { initialStudy, updateStudy, exportStudy, loadStudy } from '../src/lib/study.ts';
import { summarizeWeek } from '../src/lib/summary.ts';

const appSource = readFileSync(new URL('../src/app/App.tsx', import.meta.url), 'utf8');
const routesSource = readFileSync(new URL('../src/app/routes.tsx', import.meta.url), 'utf8');
const homeSource = readFileSync(new URL('../src/app/components/HomePage.tsx', import.meta.url), 'utf8');
const timeBarSource = readFileSync(new URL('../src/components/TimeBar.jsx', import.meta.url), 'utf8');

test('sample loop exports reloadable context and evidenced weekly associations', () => {
  const now = new Date('2026-09-16T12:00:00Z');
  let s = updateStudy(initialStudy(), { type: 'consent' }, now);
  s = updateStudy(s, { type: 'import', batch: createFixtureBatch(now) }, now);
  const latest = s.datasets.fixture!.events.at(-1)!;
  s = updateStudy(s, { type: 'context', eventId: latest.id, tags: ['Meeting'], note: 'Preparing the demo', elapsedMs: 2000 }, now);
  const reloaded = loadStudy({ getItem: () => exportStudy(s) }).state;
  assert.equal(reloaded.datasets.fixture!.logs.find((l) => l.eventId === latest.id)?.note, 'Preparing the demo');
  const summaries = summarizeWeek(reloaded.datasets.fixture, now);
  assert.ok(summaries.length > 0);
  assert.ok(summaries.every((a) => a.eventIds.every((id) => reloaded.datasets.fixture!.events.some((e) => e.id === id))));
  assert.ok(!JSON.stringify(reloaded.analytics).includes('Preparing the demo'));
});

test('integration mounts study state, exposes the complete route set, and uses recorded timeline items', () => {
  assert.match(appSource, /StudyProvider/);
  for (const path of ["path: 'onboarding'", "path: 'events'", "path: 'events/:eventId'", "path: 'weekly'", "path: 'circles'", "path: 'circle'"]) {
    assert.match(routesSource, new RegExp(path.replace(/[/:]/g, '\\$&')));
  }
  assert.doesNotMatch(homeSource, /emotionPresets/);
  assert.match(timeBarSource, /items/);
  assert.match(timeBarSource, /ArrowLeft|ArrowRight|Home|End/);
  assert.match(timeBarSource, /addEventListener\('wheel', onWheel, \{ passive: false \}\)/);
  assert.match(timeBarSource, /Math\.round\(\(x \/ BAR_W\) \* \(safeItems\.length - 1\)\)/);
  assert.match(timeBarSource, /event\.deltaY === 0/);
  assert.match(homeSource, /role="status" aria-live="polite" style=\{\{ position: 'relative'/);
  assert.doesNotMatch(homeSource, /bottom: 236/);
});

test('historical timeline state re-derives a clipped episode from the readings prefix', () => {
  const now = new Date('2026-09-16T12:00:00Z');
  const readings = createFixtureBatch(now).readings;
  const selectedDay = '2026-09-12';
  const prefix = readings.filter((reading) => reading.day <= selectedDay);
  const events = detectEvents(prefix, [], new Date(`${selectedDay}T23:59:59.999Z`));
  assert.ok(events.every((event) => event.endedAt <= `${selectedDay}T23:59:59.999Z`));
  assert.ok(events.every((event) => event.evidence.every((evidence) => prefix.some((reading) => reading.metric === evidence.metric && reading.day <= selectedDay))));
});
