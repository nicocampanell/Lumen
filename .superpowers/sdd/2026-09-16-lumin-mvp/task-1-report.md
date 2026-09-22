# Task 1 report — canonical daily import and representative fixture

## Files changed

- `Build-a-thon  Make/src/lib/model.ts`
  - Added the canonical domain contracts, metric details, UTC day formatting, atomic batch validation, and deterministic source/record upsert merging.
- `Build-a-thon  Make/src/lib/fixtures.ts`
  - Added the deterministic 28-completed-day fixture generator with stable, single-metric, and paired-metric shift modes.
- `Build-a-thon  Make/tests/model.test.ts`
  - Added native Node tests for fixture validation/idempotence, invalid values/units/users, invalid calendar/future/mixed-source records, and valid zero-valued stress.
- `Build-a-thon  Make/package.json`
  - Added only the requested `test` script: `node --test tests/*.test.ts`.

## RED

Command:

```text
node --test tests/model.test.ts
```

Expected failure observed before production modules existed:

```text
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../src/lib/model.ts'
✖ tests/model.test.ts
```

## GREEN

Command:

```text
npm test
```

Result:

```text
✔ fixture is versioned, validated and idempotent
✔ rejects invalid calendar and future days while preserving valid zero values
ℹ tests 2
ℹ pass 2
ℹ fail 0
```

Additional verification:

```text
npm run build
```

Result: Vite production build completed successfully. Vite emitted its existing large-chunk warning and Node emitted its existing `module.register()` deprecation warning; neither affected the build.

## Self-review

- Validation rejects malformed schema/source/user/record IDs, mixed record sources, unknown metrics/quality, mismatched day/timestamp, invalid calendar days, future days, non-finite/out-of-range values, invalid units/granularity, malformed timestamps/warnings, and batches over 20,000 records.
- Validation is atomic because it normalizes every record before returning a batch; a thrown record error returns no partial batch.
- Duplicate source + record IDs are upserted deterministically and conflicting duplicate metrics are rejected; output is sorted by observation time, metric, and record ID.
- Supported metrics are inferred from normalized non-missing readings rather than trusted from input.
- Fixture days run from 2026-08-19 through 2026-09-15 for the required test date, with shifts on Sep 9, 11, 13, and 15.
- No new dependency, route, UI, analytics, or unrelated file was changed.

## Contract deviation

None known. The fixture batch leaves `warnings` empty because its `source: 'fixture'` and downstream labeling provide the dataset separation; no warning text was specified by the Task 1 contract.

## Review remediation

The review identified two validator issues, both fixed within Task 1:

- Added a RED regression proving estimated-only readings do not populate `supportedMetrics`; inference now requires `quality === 'valid'`.
- Added a RED regression for `2026-02-30T12:00:00Z`; timestamp validation now checks the timestamp’s literal calendar prefix before JavaScript parsing, rejecting parser-normalized impossible dates.

Remediation verification:

- RED: `npm test` reported 2 passing and 2 failing tests for the new assertions.
- GREEN: `npm test` reports 4 passing and 0 failing tests.
- Build: `npm run build` completed successfully (existing Vite chunk-size and Node deprecation warnings only).
