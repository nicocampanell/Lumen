# Task 9 UI report

Final bounded review of reachable UI geometry, accessibility, and motion contracts.

## Before | After | Why

| Area | Before | After | Why |
| --- | --- | --- | --- |
| Heart Rate clearance | Back target began in the floating status-bar region | Reused Profile's `paddingTop: 72` clearance | Keeps the 44px target reachable without overlap |
| NavBar inactive labels | Inactive labels/icons used `#898989` | Uses `var(--color-muted)` | Keeps the existing accessible muted token at 4.5:1+ contrast |
| NavBar selection and color motion | Pill and icon/label colors used 380ms overshoot or 1.5s fades | Uses 240ms `cubic-bezier(0.25, 0.1, 0.25, 1)` | Matches the approved motion contract |
| Home/Layout/Insight entrances | Reachable entrances ranged from 450–800ms with delayed heading focus | Shared 240ms transition/easing, staged within 400ms; heading focus uses a microtask | Keeps navigation responsive and avoids keyboard delays |
| Circles modal/feedback motion | Modal sheets used springs; hover/toggle feedback used 150–180ms transitions | Modal sheets and reachable feedback use 240ms approved easing; reduced motion remains immediate | Springs remain only on direct manipulation; non-direct motion is consistent and accessible |
| Motion regression coverage | Existing tests covered selector reduced-motion behavior only | Added an executable source probe for forbidden 1.5s/150ms/180ms values and approved 240ms easing | Prevents recurrence of the reviewed motion-contract regressions |

## Verification

- Focused: `node --test tests/motion.test.ts tests/integration.test.ts` — 7 passed.
- Full: `pnpm test` — 59 passed, 0 failed.
- Build: `pnpm build` — passed; existing Vite chunk-size warning only.
- Impeccable detector over owned reachable files — clean (`[]`).

Browser automation and private Garmin authentication remain outside this bounded repair; no credentials or authentication state were inspected.
