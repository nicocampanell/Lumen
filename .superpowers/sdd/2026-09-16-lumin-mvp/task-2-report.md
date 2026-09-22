# Task 2 report — personal baselines and explainable daily episodes

## Files changed

- `Build-a-thon  Make/src/lib/analysis.ts`
  - Added deterministic UTC daily baselines using median/MAD, seven-day readiness, robust absolute thresholds, metric-family alignment, merged daily episodes, replay status/snooze preservation, logged-history retention, and signal-state derivation.
- `Build-a-thon  Make/tests/analysis.test.ts`
  - Added required RED/GREEN coverage plus regressions for baseline leakage, shuffled-input determinism, duplicate metrics, sleep-family grouping, contiguous episode merging, estimated readings, zero MAD, stale state, and readiness.

## RED

Command:

```text
node --test tests/analysis.test.ts
```

Expected failure observed before `analysis.ts` existed:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../src/lib/analysis.ts'
✖ tests/analysis.test.ts
```

## GREEN

Focused command:

```text
node --test tests/analysis.test.ts
```

Result: 9 tests passed, 0 failed.

Task 1 + Task 2 command:

```text
node --test tests/model.test.ts tests/analysis.test.ts
```

Result: 13 tests passed, 0 failed.

Full test command:

```text
npm test
```

Result: 15 tests passed, 0 failed. The repository’s concurrent Garmin tests were included by the existing test glob.

Build command:

```text
npm run build
```

Result: Vite production build completed successfully. Existing large-chunk and Node `module.register()` deprecation warnings remain non-fatal.

## Concerns

- `deriveSignalState` treats a complete, current day immediately after a recent episode as `recovering`; after a longer stable gap it returns `stable`.
- Detection retains old events only when their prior status is `logged`, as required for shortened imports; newly detected historical episodes remain inspectable and pending.
- `Baseline.throughDay` is the calendar day immediately before the exclusive `beforeDay` cutoff, including when that day has no record.

## Astra regression repair

- Strengthened the signal-state regression with prior shifted events supplied: one shifted metric remains `stable`, proving state derivation requires the same two-family qualification as detection.
- Added valid historical `sleep_quality` readings, shifted both sleep metrics on the target day, and asserted the sleep-quality baseline is ready; duration + quality still count as one family and create no event.

Verification after repair:

```text
node --test tests/analysis.test.ts — 10 passed, 0 failed
npm test — 19 passed, 0 failed
npm run build — completed successfully (existing chunk-size and Node deprecation warnings only)
```
