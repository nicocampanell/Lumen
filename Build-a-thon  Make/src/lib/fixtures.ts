import type { ImportBatch, Metric, MetricReading } from './model.ts';

const FIXTURE_METRICS: Metric[] = ['heart_rate', 'hrv', 'stress', 'sleep_duration'];

function dayString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function dayAtOffset(start: Date, offset: number): string {
  return dayString(new Date(start.getTime() + offset * 86_400_000));
}

export function createFixtureBatch(now: Date, mode: 'stable' | 'single' | 'shifted' = 'shifted'): ImportBatch {
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) throw new Error('Invalid fixture time');
  const currentDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const start = new Date(currentDay.getTime() - 28 * 86_400_000);
  const readings: MetricReading[] = [];
  for (let offset = 0; offset < 28; offset += 1) {
    const day = dayAtOffset(start, offset);
    const changed = [21, 23, 25, 27].includes(offset);
    const heartRate = changed && mode !== 'stable' ? 90 : 60 + (offset % 2);
    const hrv = changed && mode === 'shifted' ? 25 : 48 + (offset % 2) * 2;
    const values: Record<Metric, { value: number; unit: string }> = {
      heart_rate: { value: heartRate, unit: 'bpm' },
      hrv: { value: hrv, unit: 'ms' },
      stress: { value: 20 + (offset % 2) * 2, unit: 'index' },
      sleep_duration: { value: 450 + (offset % 2) * 10, unit: 'min' },
      sleep_quality: { value: 80, unit: 'index' },
      activity: { value: 30, unit: 'min' },
      body_battery: { value: 70, unit: 'index' },
    };
    for (const metric of FIXTURE_METRICS) {
      readings.push({
        userId: 'local',
        source: 'fixture',
        sourceRecordId: `fixture-${day}-${metric}`,
        metric,
        observedAt: `${day}T12:00:00.000Z`,
        day,
        value: values[metric].value,
        unit: values[metric].unit,
        quality: 'valid',
        granularity: 'day',
      });
    }
  }
  return {
    schemaVersion: 1,
    source: 'fixture',
    readings,
    supportedMetrics: [...FIXTURE_METRICS],
    importedAt: now.toISOString(),
    warnings: [],
  };
}
