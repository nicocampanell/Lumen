import { calculateBaselines, DETECTION_CONFIG } from './analysis.ts';
import type { Metric, MetricReading, SignalState } from './model.ts';

export const SIGNAL_TEXT: Record<SignalState, string> = {
  insufficient_data: 'Learning your usual range',
  stable: 'Signals are near your usual range',
  shifted: 'Several signals shifted from your usual range',
  recovering: 'Signals are moving back toward your usual range',
};

export interface SignalVisual {
  color1: number[];
  color2: number[];
  distortion: number;
  speed: number;
  noiseScale: number;
  facetStrength: number;
  facetDetail: number;
  axisScale: [number, number, number];
}

const SIGNAL_VISUALS: Record<SignalState, SignalVisual> = {
  insufficient_data: {
    color1: [0.5, 0.55, 0.62],
    color2: [0.25, 0.3, 0.4],
    distortion: 0.08,
    speed: 0.12,
    noiseScale: 0.8,
    facetStrength: 0,
    facetDetail: 0.35,
    axisScale: [1, 1, 1],
  },
  stable: {
    color1: [0.28, 0.52, 0.86],
    color2: [0.12, 0.24, 0.58],
    distortion: 0.18,
    speed: 0.34,
    noiseScale: 1.2,
    facetStrength: 0.08,
    facetDetail: 0.45,
    axisScale: [1, 1, 1],
  },
  shifted: {
    color1: [0.96, 0.68, 0.24],
    color2: [0.82, 0.3, 0.22],
    distortion: 0.36,
    speed: 0.68,
    noiseScale: 1.8,
    facetStrength: 0.42,
    facetDetail: 0.85,
    axisScale: [1.04, 1.1, 0.96],
  },
  recovering: {
    color1: [0.66, 0.58, 0.82],
    color2: [0.28, 0.34, 0.68],
    distortion: 0.2,
    speed: 0.24,
    noiseScale: 1.1,
    facetStrength: 0.16,
    facetDetail: 0.55,
    axisScale: [1, 0.98, 1.04],
  },
};

export function signalVisual(state: SignalState): SignalVisual {
  return SIGNAL_VISUALS[state] ?? SIGNAL_VISUALS.insufficient_data;
}

const COOL_1 = [0.28, 0.52, 0.86];
const COOL_2 = [0.12, 0.24, 0.58];
const WARM_1 = [0.96, 0.68, 0.24];
const WARM_2 = [0.82, 0.3, 0.22];

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

function mix(a: number[], b: number[], amount: number): number[] {
  return a.map((value, index) => value + (b[index] - value) * amount);
}

function average(values: Array<number | undefined>): number {
  const present = values.filter((value): value is number => value !== undefined);
  return present.length ? present.reduce((sum, value) => sum + value, 0) / present.length : 0;
}

/** Continuous visual dimensions derived from daily Garmin deviation ratios, not inferred emotion. */
export function deriveSignalVisual(readings: MetricReading[], day: string | undefined, state: SignalState): SignalVisual {
  if (!day || state === 'insufficient_data') return signalVisual('insufficient_data');

  const baselines = new Map(calculateBaselines(readings, day).map((baseline) => [baseline.metric, baseline]));
  const scores = new Map<Metric, number>();
  for (const reading of readings) {
    if (reading.day !== day || reading.quality !== 'valid') continue;
    const baseline = baselines.get(reading.metric);
    if (!baseline?.ready) continue;
    const threshold = Math.max(
      DETECTION_CONFIG.minimumAbsoluteChange[reading.metric],
      DETECTION_CONFIG.robustThreshold * 1.4826 * baseline.mad,
    );
    scores.set(reading.metric, clamp((reading.value - baseline.center) / (threshold * 2), -1, 1));
  }
  if (scores.size < 2) return signalVisual('insufficient_data');

  const value = (metric: Metric): number | undefined => scores.get(metric);
  const intensity = average([...scores.values()].map(Math.abs));
  const strain = average([value('heart_rate'), value('stress'), value('hrv') === undefined ? undefined : -value('hrv')!, value('body_battery') === undefined ? undefined : -value('body_battery')!]);
  const sleepDebt = average([value('sleep_duration') === undefined ? undefined : -value('sleep_duration')!, value('sleep_quality') === undefined ? undefined : -value('sleep_quality')!]);
  const activity = value('activity') ?? 0;
  const warmth = clamp(Math.max(0, strain) * 0.72 + Math.max(0, sleepDebt) * 0.2 + intensity * 0.08);

  return {
    color1: mix(COOL_1, WARM_1, warmth),
    color2: mix(COOL_2, WARM_2, warmth),
    distortion: 0.12 + intensity * 0.28,
    speed: 0.18 + intensity * 0.36 + Math.abs(activity) * 0.12,
    noiseScale: 1 + intensity * 0.9,
    facetStrength: 0.08 + intensity * 0.42,
    facetDetail: 0.35 + clamp((scores.size - 2) / 5) * 0.35 + intensity * 0.3,
    axisScale: [1 + activity * 0.08, 1 + strain * 0.12, 1 - sleepDebt * 0.08],
  };
}

export const PAGE_TRANSITION = {
  duration: 0.24,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

export function focusVisibilityOption(container: ParentNode | null, index: number): void {
  const radios = container?.querySelectorAll<HTMLElement>('[role="radio"]');
  radios?.[index]?.focus();
}
