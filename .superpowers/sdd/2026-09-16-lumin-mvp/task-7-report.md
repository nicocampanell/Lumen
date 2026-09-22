# Task 7 — Signal visuals, restrained fluidity, and sample Circles

## Changed files

- `Build-a-thon  Make/src/lib/signal-visuals.ts`
- `Build-a-thon  Make/tests/motion.test.ts`
- `Build-a-thon  Make/src/components/Scene.jsx`
- `Build-a-thon  Make/src/app/components/MiniOrb.tsx`
- `Build-a-thon  Make/src/app/components/CirclesPage.tsx`
- `Build-a-thon  Make/src/app/components/CircleDetailPage.tsx`
- `Build-a-thon  Make/src/styles/index.css`
- `.superpowers/sdd/2026-09-16-lumin-mvp/task-7-report.md`

## Motion decisions

| Area | Before | After | Purpose |
| --- | --- | --- | --- |
| Signal meaning | Emotion-shaped presets and copy | Four deterministic signal states with neutral, stable, shifted, and recovering palettes/copy | Keeps visual feedback tied to signal state without diagnosing emotion |
| Main orb | Continuous RAF, unbounded delta, fixed particle counts, renderer-only teardown | Capped DPR, compact/reduced particle counts, hidden-tab pause, delta clamp, exponential interpolation, geometry/material/listener disposal | Keeps the incumbent renderer fluid and bounded |
| Reduced motion | CSS-only fallback; Three.js still animated | One static render, no RAF/time/rotation/bursts; rerender only on preset/size changes | Makes reduced motion real across JS/Three |
| WebGL failure | Renderer initialization could throw into the app | Static CSS orb fallback on initialization/context failure | Preserves a usable signal visual without WebGL |
| Mini orbs | Continuous ambient loop | Same static/reduced/hidden policy while preserving `preset`/`size` props | Keeps Circles lightweight and compatible |
| Circles copy | Emotion/heart-rate/health-like fixture blurbs and real invitation wording | Explicit fictional sample notes, persistent Sample Circles/Sample signals/Sharing preview labels, display-name preview only, “Nothing is sent,” Leave sample circle | Prevents real-person or sharing inference |
| Direct manipulation | Drag/pinch only in detail canvas | Existing drag/pinch retained; arrow keys and +/- added; selector supports arrow keys | Keyboard alternative to gesture-only controls |
| Selector interaction | Drag release could spring in reduced mode; captured-drag click could reselect the projected orb; deferred radio focus read cleared React event state | Reduced-mode release snaps directly, keyboard radio changes capture the group before scheduling focus through a tiny helper, and the next click after a real drag is ignored | Keeps reduced motion still, preserves keyboard position after dispatch, and prevents pointer-capture click races |
| Modal behavior | Phone input, send CTA, 28px close, Escape only | Sample name, Preview invitation, explicit no-send confirmation, dialog semantics, focus trap, 44px close/controls, Escape | Makes local demo safe and accessible |

## Verification

- `node --test tests/motion.test.ts` — pass (palette, selector source regression, and deferred-focus executable regression)
- `node --test tests/*.test.ts` — 43 pass
- `pnpm build` — pass (existing Vite chunk-size warning only)
- Impeccable detector on changed UI files — no deterministic findings

## Concerns

- WebGL/static fallback and reduced-motion behavior still merit a browser pass on the target 390×844 and 320px widths.
- Existing Circles photos remain remote fixture assets; no invitation/contact/share flow was added.
