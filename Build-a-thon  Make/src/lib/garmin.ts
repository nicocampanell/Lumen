import { createFixtureBatch } from './fixtures.ts';
import { validateBatch, type ImportBatch } from './model.ts';

const FALLBACK = 'Garmin is unavailable; showing sample data.';

export async function importGarmin(now: Date, fetcher: typeof fetch = fetch, timeoutMs = 95_000): Promise<{
  batch: ImportBatch;
  fallbackReason?: string;
}> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error('Garmin import timed out'));
    }, timeoutMs);
  });
  try {
    const response = await Promise.race([fetcher('/api/lumin/garmin/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ days: 28 }),
      signal: controller.signal,
    }), timeout]);
    if (!response.ok) throw new Error('Garmin unavailable');
    const payload = await Promise.race([response.json(), timeout]);
    const batch = validateBatch(payload, now);
    if (batch.source !== 'garmin' || batch.readings.length === 0) throw new Error('Invalid Garmin batch');
    return { batch };
  } catch {
    return { batch: createFixtureBatch(now), fallbackReason: FALLBACK };
  } finally {
    if (timer) clearTimeout(timer);
  }
}
