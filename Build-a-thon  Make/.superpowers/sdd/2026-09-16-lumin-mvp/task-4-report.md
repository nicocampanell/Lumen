# Task 4 report — local Garmin bridge and fixture fallback

## Changed files

- `server/garmin.ts` — loopback-only Vite middleware, MCP JSON/SSE decoding, fixed read allowlist/session, bounded concurrency/timeouts, Garmin normalization, and sanitized 503 responses.
- `src/lib/garmin.ts` — native-fetch import client with validation, timeout, and fixture fallback.
- `tests/garmin.test.ts` — protocol, normalization, invalid-field, fallback, real-batch, and SSE regression checks.
- `vite.config.ts` — bridge plugin plus `127.0.0.1:5173` strict dev-server settings.
- `README.md` — terminal-only Garmin authentication/startup instructions and token/disconnect boundaries.

## TDD evidence

- RED: `node --test tests/garmin.test.ts` failed with `ERR_MODULE_NOT_FOUND` for `server/garmin.ts` before implementation.
- GREEN: `node --test tests/garmin.test.ts` passes all 5 tests.

## Verification

- `node --test tests/garmin.test.ts` — PASS (5/5).
- `npm run build` — PASS (Vite production build; existing chunk-size warning only).
- `npm test` — blocked by the pre-existing/downstream missing `src/lib/analysis.ts` imported by `tests/analysis.test.ts` (Task 2 ownership), while model and Garmin tests pass.

## Concerns / limits

- No live Garmin authentication or account data was used; private-terminal verification remains for the integration checkpoint.
- The bridge intentionally falls back to sample data when upstream MCP is unavailable, returns no readings, or returns malformed/invalid data.
