# Lumin MVP system design

## 1. Architecture choice

Use a modular monolith, not microservices.

For the class prototype, the shortest path is a local-first React app with versioned fixtures and deterministic detection. Add one small backend only when direct Garmin authorization, scheduled synchronization, cross-device persistence, or remote notifications require it.

```text
Garmin / export / fixture
          │
          ▼
   Source adapter
          │
          ▼
 Normalized readings ──► Baseline calculator
          │                      │
          └──────────────┬───────┘
                         ▼
                 Deviation detector
                         │
                         ▼
                    Signal event
                    ┌────┴────┐
                    ▼         ▼
              User prompt   Event history
                    │
                    ▼
                Context log
                    │
                    ▼
               Weekly summary
```

## 2. Deployment stages

### Stage A — study prototype

- Existing Vite/React client.
- IndexedDB or browser storage for study data.
- Fixture and export-import source adapters.
- Detection and summary generation in the client.
- Local notification simulation or in-app inbox.

This is sufficient to test whether the interaction is valuable.

### Stage B — connected pilot

- React client remains the presentation layer.
- Small API application owns authorization, encrypted tokens, ingestion, and persistence.
- PostgreSQL stores normalized data and product state.
- One scheduled worker performs synchronization, detection, and summary generation.
- Push/email notification provider is optional; begin with one channel.

Keep the API and worker in one codebase and one deployment until load proves otherwise.

## 3. Modules

### Client

- Onboarding and consent.
- Connection/baseline status.
- Home signal state and orb.
- Event detail and context logging.
- Event history and weekly summaries.
- Notification and privacy settings.
- Experiment feedback.

### Source adapters

Each adapter returns the same normalized records:

- `GarminAdapter`
- `ExportAdapter`
- `FixtureAdapter`

No product component should know which source produced a reading.

### Ingestion

- Fetch or receive source records.
- Validate timestamps, units, and ownership.
- Convert to canonical units.
- Upsert idempotently using source plus external record ID or a stable content key.
- Record supported and missing metrics per connection.

### Baseline calculator

- Calculate per-user, per-metric reference bands.
- Prefer rolling median and median absolute deviation over mean and standard deviation for noisy wearable data.
- Optionally bucket by time of day when there is enough density.
- Store the algorithm version and readiness state.

### Deviation detector

- Compare new observations with the active baseline.
- Require at least two qualifying metric deviations in a bounded time window.
- Reject events with insufficient or stale data.
- Merge overlapping detections into one event.
- Enforce cooldown and quiet-hour policies.
- Persist the exact evidence and rule version.

### Pattern summarizer

- Aggregate completed events by context tag, time window, and signal direction.
- Require a minimum supporting count.
- Produce templated, count-backed language.
- Do not use an LLM in the MVP. Deterministic templates are safer and easier to evaluate.

## 4. Canonical domain model

```ts
type Metric =
  | 'heart_rate'
  | 'hrv'
  | 'sleep_duration'
  | 'sleep_quality'
  | 'stress'
  | 'activity'
  | 'body_battery';

type SignalState =
  | 'insufficient_data'
  | 'stable'
  | 'shifted'
  | 'recovering';

interface MetricReading {
  userId: string;
  source: 'garmin' | 'export' | 'fixture';
  sourceRecordId: string;
  metric: Metric;
  observedAt: string;
  value: number;
  unit: string;
  quality: 'valid' | 'estimated' | 'missing';
}

interface SignalEvent {
  id: string;
  userId: string;
  startedAt: string;
  endedAt?: string;
  state: SignalState;
  ruleVersion: string;
  evidence: Array<{
    metric: Metric;
    observedValue: number;
    baselineCenter: number;
    deviation: number;
    direction: 'above' | 'below';
  }>;
  promptStatus: 'pending' | 'opened' | 'dismissed' | 'logged';
}

interface ContextLog {
  id: string;
  eventId: string;
  tags: string[];
  note?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 5. Persistent tables for a connected pilot

| Table | Purpose |
| --- | --- |
| `users` | Study identity and timezone |
| `consents` | Consent version and timestamp |
| `data_connections` | Source type, status, supported metrics, encrypted credential reference |
| `metric_readings` | Canonical time-series readings |
| `baselines` | Per-user, per-metric reference data and algorithm version |
| `signal_events` | Deduplicated detected events and evidence |
| `context_logs` | User tags and optional note |
| `weekly_summaries` | Generated association statements and supporting event IDs |
| `notification_preferences` | Pause, quiet hours, and channel |
| `product_events` | Minimal experiment analytics without raw health values or note text |

Indexes should prioritize `(user_id, metric, observed_at)`, event time, and unique source record IDs.

## 6. Detection rule v0

Start deliberately simple:

1. Import enough history to establish a baseline for each available metric.
2. For a reading or aggregate, compute a robust deviation from the relevant baseline bucket.
3. Mark a metric as shifted when it crosses its calibrated threshold and data quality is valid.
4. Create an event when at least two metrics shift within a configurable window.
5. Merge detections belonging to the same episode.
6. Start a configurable cooldown before another prompt.

Store thresholds in one versioned configuration object. Real wearable data varies by device and person, so keep this calibration seam; do not expose it as a user setting.

Smallest runnable check:

- A stable fixture produces no event.
- A fixture with one shifted metric produces no event.
- A fixture with two aligned shifts produces exactly one event.
- Reprocessing the same fixture still produces exactly one event.

## 7. API surface for Stage B

```text
POST   /connections/garmin/start
GET    /connections/garmin/callback
GET    /connections
DELETE /connections/:id

GET    /baseline/status
GET    /signal-events
GET    /signal-events/:id
POST   /signal-events/:id/context
PATCH  /context-logs/:id
DELETE /context-logs/:id

GET    /weekly-summaries/current
POST   /feedback/useful-connection
GET    /settings/notifications
PUT    /settings/notifications
DELETE /me/data
```

For the study prototype, mirror these boundaries as local TypeScript functions so the client does not need to be rewritten when a backend is added.

## 8. Privacy and safety

- Minimize scope to the metrics used by the detector.
- Keep authorization credentials server-side in Stage B and encrypt them.
- Separate free-text notes from analytics.
- Support disconnect and data deletion.
- Log access to sensitive records in any hosted pilot.
- Never place raw values or context notes in notification bodies.
- Display the non-medical boundary during onboarding and near summaries.
- Provide a pause control without requiring an explanation.

## 9. Failure states

| Failure | User experience | System response |
| --- | --- | --- |
| Connection expires | “Reconnect Garmin” | Stop sync; preserve existing logs |
| Metric unavailable | Explain that the connected device does not provide it | Recalculate eligibility using available metrics |
| Baseline not ready | “Learning your usual range” | Suppress detection and prompts |
| Partial import | Show last successful sync | Retry idempotently |
| Sparse weekly data | “Not enough information yet” | Generate no association |
| Notification denied | Keep event in the in-app inbox | Do not repeatedly request permission |

## 10. What not to build yet

- Event streaming infrastructure.
- Separate services for ingestion, detection, summaries, or notifications.
- A feature store or machine-learning pipeline.
- LLM-generated health interpretations.
- A generic wearable integration framework beyond the three adapters required for the test.

Add these only when measured product usage creates the need.

