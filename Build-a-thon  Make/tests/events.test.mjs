import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { promisify } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const execFileAsync = promisify(execFile);
const esbuild = fileURLToPath(new URL('../node_modules/.pnpm/esbuild@0.25.12/node_modules/esbuild/bin/esbuild', import.meta.url));

async function loadExports(relativePath) {
  const directory = await mkdtemp(join(tmpdir(), 'lumin-events-'));
  const output = join(directory, 'component.mjs');
  try {
    await execFileAsync(esbuild, [
      fileURLToPath(new URL(relativePath, import.meta.url)),
      '--bundle',
      '--platform=node',
      '--format=esm',
      `--outfile=${output}`,
      '--log-level=error',
    ]);
    return await import(`${pathToFileURL(output).href}?${Date.now()}`);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test('context editor exposes pressed state and a bounded note', async () => {
  const source = await readFile(new URL('../src/app/components/SignalEventPage.tsx', import.meta.url), 'utf8');
  assert.match(source, /aria-pressed/);
  assert.match(source, /maxLength=\{500\}/);
  assert.match(source, /What was happening around this time\?/);
});

test('event and summary wiring preserves source honesty', async () => {
  const eventSource = await readFile(new URL('../src/app/components/SignalEventPage.tsx', import.meta.url), 'utf8');
  const eventsSource = await readFile(new URL('../src/app/components/EventsPage.tsx', import.meta.url), 'utf8');
  const summarySource = await readFile(new URL('../src/app/components/WeeklySummaryPage.tsx', import.meta.url), 'utf8');
  assert.match(eventSource, /Sample measurements/);
  assert.match(eventSource, /color: 'var\(--color-ink\)'/);
  assert.match(eventsSource, /to="\/weekly"/);
  assert.match(eventsSource, /endedAt/);
  assert.match(summarySource, /state\.activeSource === 'fixture'/);
  assert.match(summarySource, /minHeight: 44/);
});

test('provider errors win across repeated failed saves without entering local state', async () => {
  const eventPage = await loadExports('../src/app/components/SignalEventPage.tsx');
  const weeklyPage = await loadExports('../src/app/components/WeeklySummaryPage.tsx');
  const providerError = 'Storage is full.';
  const localState = { status: 'Context saved on this device.', error: '' };
  const firstRender = eventPage.getPersistenceNotice(providerError, localState.status, localState.error);
  const secondRender = eventPage.getPersistenceNotice(providerError, localState.status, localState.error);
  assert.deepEqual(firstRender, { status: '', error: providerError });
  assert.deepEqual(secondRender, firstRender);
  assert.equal(localState.error, '', 'provider errors stay outside local error state');
  assert.deepEqual(eventPage.getPersistenceNotice(undefined, localState.status, localState.error), { status: localState.status, error: '' });
  assert.deepEqual(weeklyPage.getWeeklyPersistenceNotice(providerError, 'Thanks — your feedback is saved on this device.'), { status: '', error: providerError });
});

test('weekly feedback retry renders success only after provider error clears', async () => {
  const weeklyPage = await loadExports('../src/app/components/WeeklySummaryPage.tsx');
  const success = 'Thanks — your feedback is saved on this device.';
  assert.deepEqual(weeklyPage.getWeeklyPersistenceNotice('Storage is full.', success), { status: '', error: 'Storage is full.' });
  assert.deepEqual(weeklyPage.getWeeklyPersistenceNotice(undefined, success), { status: success, error: '' });
});

test('event range excludes the exclusive end and support links retain 44px targets', async () => {
  const eventsPage = await loadExports('../src/app/components/EventsPage.tsx');
  const weeklyPage = await loadExports('../src/app/components/WeeklySummaryPage.tsx');
  assert.equal(eventsPage.eventRange({ startedAt: '2026-09-16T00:00:00.000Z', endedAt: '2026-09-17T00:00:00.000Z' }), 'September 16');
  assert.equal(eventsPage.eventRange({ startedAt: '2026-09-16T00:00:00.000Z', endedAt: '2026-09-18T00:00:00.000Z' }), 'September 16–September 17');
  assert.equal(eventsPage.eventRange({ startedAt: '2026-09-16T00:00:00.000Z', endedAt: '2026-09-18T12:00:00.000Z' }), 'September 16–September 18');
  assert.equal(weeklyPage.supportLinkStyle.minHeight, 44);
  assert.equal(weeklyPage.supportLinkStyle.display, 'inline-flex');
});

test('event detail describes evidence across its exclusive-end-aware range', async () => {
  const eventPage = await loadExports('../src/app/components/SignalEventPage.tsx');
  const event = {
    startedAt: '2026-09-16T00:00:00.000Z',
    endedAt: '2026-09-18T00:00:00.000Z',
    evidence: [{ metric: 'heart_rate', direction: 'above', observedValue: 90, baselineCenter: 60 }],
  };
  assert.equal(eventPage.eventRange(event), 'September 16–September 17');
  assert.match(eventPage.evidenceSummary(event), /Evidence spanning September 16–September 17/);
});
