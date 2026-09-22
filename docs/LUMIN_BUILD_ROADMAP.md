# Lumin build roadmap

## Product decision

Build the Garmin-first interpretation loop now. Keep the earring, EDA/thermal sensing, haptic alerts, and Circles as a future vision.

The two source artifacts describe different scopes:

- The Figma deck presents the broad vision: interoception, an earring with thermal and EDA sensing, a living orb, haptic prompts, and mutual social Circles.
- The written brief defines the testable MVP: Garmin data, personal baselines, one contextual prompt, context logging, and weekly pattern summaries. It explicitly excludes live dashboards, constant notifications, emotional diagnosis, social sharing, and medical recommendations.

For the next build cycle, the written brief should be the product contract. The deck supplies the story, tone, interface direction, and long-term roadmap.

## What exists today

The current React/Vite prototype already contains:

- A polished 390 × 844 mobile shell with home, insight, notification, profile, heart-rate, and Circles routes.
- A distinctive Three.js particle orb driven by hard-coded “emotion” presets.
- A timeline selector, insight card, notification list, metric charts, and motion treatments.
- Strong visual continuity with the deck: soft neutral surfaces, blurred color fields, rounded glass cards, General Sans/Switzer typography, and a calm, non-clinical feel.

It does not yet contain the MVP product loop:

- No Garmin authorization or import flow.
- No normalized biometric data model or persistence.
- No personal-baseline calculation or multi-signal deviation detection.
- No working “Something shifted” prompt or context-entry flow.
- No weekly pattern summary generated from real or sample data.
- No experiment analytics, onboarding completion, or test-user feedback capture.

The current UI is primarily a high-fidelity demo. Several screens use hard-coded interpretations, and the Circles implementation is substantial but outside the MVP.

## Next steps, in order

### 1. Lock the experiment contract

Before adding more UI, align the prototype and presentation around one sentence:

> Lumin helps Garmin users connect meaningful changes in their body signals with what was happening in their life, without diagnosing emotion.

Use these three launch gates:

1. 8 of 10 users connect Garmin or complete the sample-data fallback.
2. 7 of 10 users log at least three context events in two weeks.
3. At least 70% report one useful connection they would not have noticed in Garmin alone.

### 2. Cut the prototype to the learning loop

Keep:

- Home/orb as an ambient summary.
- Insight explanation.
- Triggered event prompt.
- Context logging.
- Event history.
- Weekly pattern summary.
- Profile/settings for connection state, privacy, and notification controls.

Defer:

- Circles and all social sharing.
- Earring setup and haptic behavior.
- EDA and skin-temperature claims that Garmin cannot reliably supply for the chosen device cohort.
- Live metric dashboards and minute-by-minute monitoring.
- Emotional labels such as “stressed,” “anxious,” or “cortisol spike.”

The current Circles code can stay in the repository, but remove it from primary navigation during the test. Do not spend a cycle refactoring it.

### 3. Build one fixture-backed vertical slice

Use representative JSON before waiting on Garmin access. The first complete path should be:

1. User completes onboarding and chooses sample data.
2. Seven or more days of historical signals seed a baseline.
3. A fixture introduces a multi-signal deviation.
4. Lumin creates one signal event.
5. The user sees: “Something shifted. What was happening around this time?”
6. The user selects one or more context tags and may add a short note.
7. The event appears in history.
8. A weekly summary shows one cautious association with supporting counts.

Do not build a generic analytics platform. This single loop is the product test.

### 4. Replace emotion presets with signal states

The orb should not encode an inferred emotion. Drive it from an explainable `SignalState`:

- `stable`: no meaningful multi-signal deviation.
- `shifted`: an event crossed the detection rule.
- `recovering`: signals are returning toward baseline.
- `insufficient_data`: the baseline is not ready.

Color and motion can communicate intensity and recency, but every state needs a text equivalent. The app copy describes measured change, never a hidden mental state.

### 5. Add the minimum data and detection layer

Implement one normalization boundary for Garmin and fixture data. Start with the most reliable available metrics for the selected devices—resting or continuous heart rate, HRV where available, sleep duration/quality, stress, activity, and Body Battery.

For the class MVP:

- Seed from historical data where available.
- Use a rolling personal baseline, preferably median plus median absolute deviation, because it is robust to outliers.
- Compare within similar time-of-day windows where the data supports it.
- Create an event only when at least two signals deviate within a bounded window.
- Add a cooldown so one episode does not produce repeated prompts.
- Keep thresholds configurable for calibration, but expose no user-facing “score.”

### 6. Instrument the test

Track only the events needed to answer the launch gates:

- `onboarding_started`
- `data_source_connected`
- `baseline_ready`
- `signal_event_created`
- `prompt_opened`
- `context_logged`
- `weekly_summary_viewed`
- `useful_connection_reported`

Add a short end-of-test question: “Did Lumin help you notice a connection you would not have noticed from Garmin alone?” Include yes/no and one optional sentence.

### 7. Integrate Garmin after the fixture loop works

Keep Garmin behind a small adapter so limited API access does not block the study. The application should accept either:

- Authorized Garmin data.
- Exported user data transformed into the normalized schema.
- Versioned sample fixtures.

Only pursue production-grade synchronization after the prompt and logging behavior proves valuable.

## Suggested two-cycle plan

### Cycle 1 — working product loop

- Reframe onboarding and navigation around Garmin-first scope.
- Add fixture import and normalized metric types.
- Implement baseline readiness, event detection, cooldown, and context logging.
- Persist locally for the prototype.
- Build event history and one weekly summary.
- Add the eight experiment events.

Exit condition: a tester can complete the full loop without developer intervention.

### Cycle 2 — test readiness

- Add Garmin connection or export-import path.
- Replace remaining diagnostic copy.
- Add notification preferences and privacy/consent copy.
- Test reduced motion, keyboard/focus behavior, screen-reader labels, and color-independent states.
- Run the two-week study with ten Garmin users.

Exit condition: the team can calculate all three launch gates from the study data.

## Decisions needed this week

1. Confirm Garmin-first MVP as the source of truth.
2. Choose the initial Garmin device cohort so unavailable metrics do not become requirements.
3. Decide whether the study uses direct Garmin access, export/import, or sample fixtures.
4. Choose the initial context taxonomy: meeting, conflict, caffeine, exercise, excitement, poor sleep, meal, commute, illness, and nothing noticeable is enough.
5. Remove “cortisol spike,” direct emotional labels, “Vera,” and “Lumen” naming drift from the prototype and deck.

