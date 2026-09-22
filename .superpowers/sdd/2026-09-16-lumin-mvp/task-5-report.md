# Task 5 — Onboarding, connection/privacy controls, and honest profile

## Changed files

- `Build-a-thon  Make/src/app/components/OnboardingPage.tsx`
- `Build-a-thon  Make/src/app/components/ProfilePage.tsx`
- `Build-a-thon  Make/tests/onboarding.test.mjs`

## TDD evidence

- RED: `node --test tests/onboarding.test.mjs` failed because `OnboardingPage.tsx` did not exist.
- GREEN: the source-contract test passes after implementation.

## Verification

- `node --test tests/onboarding.test.mjs` — pass
- `node --test tests/*.test.ts tests/*.test.mjs` — pass (45/45)
- `pnpm build` — pass; only the existing Vite chunk-size and Node `module.register()` deprecation warnings were emitted.

## Contract coverage

- Onboarding uses a native labeled consent checkbox to gate Connect Garmin and Use sample data, has no credential fields, explains local browser storage/export/delete, and states “Lumin is informational, not medical.”
- Garmin import is a single pending state using the existing `importGarmin` fallback; success/fallback/error feedback is announced through status text.
- Profile replaces fabricated recovery/temperature/sweat claims with active source, sync state, baseline readiness, supported metrics, and a conditional recorded heart-rate link.
- Profile provides reversible source switching, Garmin retry, sample selection, native pause/time controls, disconnect semantics, local JSON export, bounded version-1 signal import, and accessible native confirmation for Delete all Lumin data.
- Signal imports validate their original source/user contract before converting records to the isolated `export` dataset; invalid files leave existing study data unchanged and imported logs are not reinstated.
- No dependencies, routes, global styles, credentials, or analytics payloads were added.

## Concerns

- Live Garmin authentication and browser interaction checks remain pending for the Task 8 private authentication/browser checkpoint; no credentials or live account data were used here.

## Review remediation

- Profile imports now route to onboarding until consent exists; Profile itself never dispatches implicit consent.
- A request token invalidates late Garmin results when disconnecting, selecting another saved source, choosing sample data, or opening signal-file import.
- Quiet-hour fields keep local drafts while editing and commit only complete valid times on blur, with explicit feedback for incomplete values.
- The native file input is removed from the tab order and marked hidden to assistive technology; the visible button is the sole keyboard trigger.
- Disconnect now announces that imports stopped while saved readings remain available, and the connection status is exposed as a live status message.

## Review verification

- `node --test tests/onboarding.test.mjs tests/study.test.ts tests/model.test.ts tests/garmin.test.ts` — pass (32/32).
- `node --test tests/onboarding.test.mjs` — pass (3/3), including executable stale-Garmin/file-completion race probes.
- Full `node --test tests/*.test.ts tests/*.test.mjs` — pass (50/50).
- `pnpm build` — pass; existing Vite chunk-size and Node deprecation warnings only.

## Async lifecycle remediation

- Delete All now invalidates the shared request token before resetting provider state.
- Component unmount invalidates the token without attempting a state update during cleanup.
- File imports capture the token before `file.text()`, check it after the await and again before dispatch, so disconnect/delete/source changes cannot import late data into a reset or newly selected dataset.
