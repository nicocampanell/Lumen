# Lumin MVP product requirements document

## 1. Summary

Lumin connects to Garmin and helps users understand what changes in their body signals may mean in the context of everyday life. Garmin collects the measurements; Lumin helps the user attach meaning.

Lumin is not a diagnostic system and does not infer emotion. It detects meaningful deviations from an individual baseline, explains the measured changes in plain language, and asks the user what was happening.

## 2. Problem

Garmin users can see heart rate, HRV, sleep, stress, activity, and Body Battery, but often cannot connect those values to meetings, conflict, caffeine, exercise, excitement, poor sleep, or other lived context.

The problem is not missing data. It is the gap between signal and personal interpretation.

## 3. Target user

Primary user:

- Age 22–35.
- Uses Garmin daily and already checks sleep, stress, recovery, or Body Battery.
- Is a student or young professional.
- Frequently feels “off,” tense, distracted, or depleted without knowing why.
- Wants help understanding patterns, not an app that tells them how they feel.

Jobs to be done:

- When several body signals change, help me notice it without making me monitor a dashboard.
- Help me quickly capture what was happening so I can learn my own patterns.
- Show me recurring associations in language I can understand and verify.

## 4. Value proposition

> Garmin senses the body. Lumin helps the user understand the context.

Differentiation:

- Personal baseline, not a population threshold.
- Context capture at the moment of a meaningful change.
- Plain-language physiological description, not an emotion label.
- Patterns built from the user’s own tags, not a universal emotional dictionary.

## 5. MVP goals and success metrics

| Goal | Metric | Success threshold |
| --- | --- | --- |
| Low-friction setup | Users who connect Garmin or finish the fallback data flow | 8 of 10 |
| Repeated context capture | Users who log at least three context events in two weeks | 7 of 10 |
| Unique value | Users reporting a connection they would not have noticed from Garmin alone | At least 70% |

Decision gate: continue if at least 7 of 10 users repeatedly log context and report useful pattern discovery. Otherwise narrow the product to one use case such as work stress or recovery.

## 6. Scope

### In scope

- Accountless or lightweight study onboarding.
- Consent and clear non-medical disclaimer.
- Garmin connection, export import, or sample-data fallback.
- Historical data import sufficient to seed a personal baseline.
- Baseline status and data-quality messaging.
- Multi-signal deviation detection.
- One restrained prompt per meaningful event.
- Quick context tags and optional short note.
- Event history with the contributing measured signals.
- Weekly summary of recurring associations.
- Notification preferences and pause control.
- Study instrumentation and final usefulness question.

### Out of scope

- Live stress dashboard.
- Constant notifications.
- AI emotional diagnosis.
- Medical advice or treatment recommendations.
- Social sharing and Circles.
- Custom earring hardware, EDA sensing, thermal sensing, or haptics.
- Support for non-Garmin wearables.
- Subscription billing.

## 7. Core user flows

### 7.1 Onboarding and connection

1. User sees the value proposition and data-use explanation.
2. User acknowledges that Lumin is informational, not medical.
3. User connects Garmin or chooses the study fallback.
4. Lumin imports historical signals.
5. User sees one of three states: baseline building, baseline ready, or data needs attention.

Acceptance criteria:

- The user can complete the flow without understanding API or metric terminology.
- No screen promises a metric before confirming the connected device supplies it.
- The app explains what is stored and how to disconnect or delete it.

### 7.2 Signal event and prompt

1. The detector finds at least two meaningful deviations in the configured window.
2. Lumin creates one event and starts a cooldown.
3. The user receives: “Something shifted. What was happening around this time?”
4. The event detail lists measured changes relative to the user’s baseline.

Acceptance criteria:

- Copy uses observations such as “heart rate was above your usual range” rather than “you were anxious.”
- A user can dismiss or snooze the prompt.
- The same episode does not produce repeated notifications.
- No prompt is sent when data quality is insufficient.

### 7.3 Context logging

1. User selects zero or more tags.
2. User may enter a short note.
3. User saves in a few seconds.
4. The event history reflects the entry.

Initial tags:

- Meeting
- Conflict
- Caffeine
- Exercise
- Excitement
- Poor sleep
- Meal
- Commute
- Illness
- Nothing noticeable

Acceptance criteria:

- Logging requires no long-form journaling.
- “Nothing noticeable” is a first-class answer.
- Tags can be changed later.

### 7.4 Weekly summary

1. Lumin groups completed events by context and signal direction.
2. It shows associations only when enough observations exist.
3. The user can open supporting events.
4. The user marks whether the summary was useful.

Example:

> Your heart rate was above its usual afternoon range in 3 of 4 events tagged “meeting.” This is an association in your recent data, not a diagnosis.

Acceptance criteria:

- Every claim states its supporting count and time range.
- Summaries avoid causal language.
- Sparse data produces “not enough information yet,” not a weak inference.

## 8. Functional requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-1 | Import signals through a replaceable Garmin/fixture adapter | Must |
| FR-2 | Normalize readings into a common internal schema | Must |
| FR-3 | Track baseline readiness per metric | Must |
| FR-4 | Detect configurable multi-signal deviations | Must |
| FR-5 | Enforce prompt cooldown and notification preferences | Must |
| FR-6 | Create, edit, and delete context logs | Must |
| FR-7 | Display evidence for each event | Must |
| FR-8 | Generate count-backed weekly associations | Must |
| FR-9 | Export or delete study data | Must |
| FR-10 | Record experiment events needed for success metrics | Must |
| FR-11 | Render the orb from physiological signal state, not emotional labels | Should |
| FR-12 | Support offline context logging and later synchronization | Should |

## 9. Non-functional requirements

- Privacy: collect only data required for the study; encrypt data in transit and at rest in any hosted version.
- Safety: no diagnosis, medical recommendation, or crisis assessment.
- Explainability: every event must show which measurements contributed.
- Accessibility: WCAG 2.2 AA target; 44 × 44 px touch targets; reduced-motion support; no color-only meaning.
- Reliability: detection is deterministic and idempotent for the same readings.
- Performance: the mobile shell becomes interactive quickly on a typical phone; the orb must gracefully reduce particle count or animation.
- Observability: failures in import, baseline calculation, event creation, and notification delivery are visible to the team.

## 10. Analytics

Required events:

| Event | Required properties |
| --- | --- |
| `onboarding_started` | study cohort |
| `data_source_connected` | source type, supported metrics |
| `baseline_ready` | metric count, historical days |
| `signal_event_created` | contributing metrics, rule version |
| `prompt_opened` | event age, delivery type |
| `context_logged` | tag count, note present, completion time |
| `weekly_summary_viewed` | event count, association count |
| `useful_connection_reported` | yes/no, optional comment present |

Do not send raw biometric values or free-text notes to product analytics.

## 11. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Garmin access is delayed or device coverage varies | Fixture and export-import adapters; choose a defined device cohort |
| Physiology has multiple explanations | Describe deviations, ask for context, avoid emotion and causal claims |
| Too many prompts create anxiety or fatigue | Multi-signal rule, cooldown, quiet hours, pause control |
| Two weeks is short for a stable baseline | Import historical data; surface confidence/readiness; use robust statistics |
| Orb implies certainty the system does not have | Pair it with text state and measured evidence; include insufficient-data state |
| Existing prototype scope distracts the study | Remove Circles from navigation and focus all testing on the interpretation loop |

## 12. Open decisions

- Supported Garmin models and minimum available metrics.
- Direct integration versus export/import for the first ten users.
- Baseline duration and time-of-day bucket size after inspecting real data.
- Detection thresholds and cooldown, calibrated with sample users.
- Whether a hosted backend is needed for the study or local-first storage is sufficient.

