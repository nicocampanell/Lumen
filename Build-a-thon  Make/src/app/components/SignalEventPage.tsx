import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { CONTEXT_TAGS, formatDay, METRIC_DETAILS } from '../../lib/model.ts';
import type { ContextTag, SignalEvent } from '../../lib/model.ts';
import { useStudy } from './StudyContext';

const actionStyle = {
  minHeight: 44,
  border: '1px solid var(--color-divider)',
  borderRadius: 999,
  padding: '8px 16px',
  background: 'var(--color-surface)',
  color: 'var(--color-ink)',
  cursor: 'pointer',
};

const primaryStyle = { ...actionStyle, background: 'var(--color-ink)', color: '#fff', borderColor: 'var(--color-ink)' };

export function eventRange(event: SignalEvent): string {
  const start = event.startedAt.slice(0, 10);
  const endDate = new Date(event.endedAt);
  if (endDate.getUTCHours() === 0 && endDate.getUTCMinutes() === 0 && endDate.getUTCSeconds() === 0 && endDate.getUTCMilliseconds() === 0) endDate.setUTCDate(endDate.getUTCDate() - 1);
  const end = endDate.toISOString().slice(0, 10);
  return start === end ? formatDay(start) : `${formatDay(start)}–${formatDay(end)}`;
}

function leadEvidence(event: SignalEvent) {
  const evidence = event.evidence.find((item) => item.metric === 'heart_rate') ?? event.evidence[0];
  if (!evidence) return 'Lumin observed a signal change in your data.';
  return `${METRIC_DETAILS[evidence.metric].label} was ${evidence.direction} your usual range.`;
}

export function evidenceSummary(event: SignalEvent): string {
  return `Evidence spanning ${eventRange(event)}: ${leadEvidence(event)}`;
}

export function getPersistenceNotice(storageError: string | undefined, status: string, error: string): { status: string; error: string } {
  return storageError ? { status: '', error: storageError } : { status, error };
}

export default function SignalEventPage() {
  const { eventId } = useParams();
  const { state, dataset, dispatch, storageError } = useStudy();
  const event = dataset?.events.find((item) => item.id === eventId);
  const log = event ? dataset?.logs.find((item) => item.eventId === event.id) : undefined;
  const sampleSource = state.activeSource === 'fixture';
  const loadedEventId = useRef<string>();
  const openedEventId = useRef<string>();
  const openedAt = useRef(Date.now());
  const [tags, setTags] = useState<ContextTag[]>([]);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const pendingStatus = useRef<string>();

  useEffect(() => {
    const nextStatus = pendingStatus.current;
    if (!nextStatus) return;
    pendingStatus.current = undefined;
    if (!storageError) setStatus(nextStatus);
  }, [dataset, storageError]);

  useEffect(() => {
    if (!event || openedEventId.current === event.id) return;
    openedEventId.current = event.id;
    openedAt.current = Date.now();
    if (event.promptStatus === 'pending') dispatch({ type: 'prompt', eventId: event.id, status: 'opened' });
  }, [dispatch, event]);

  useEffect(() => {
    if (!event || loadedEventId.current === event.id) return;
    loadedEventId.current = event.id;
    setTags(log?.tags ?? []);
    setNote(log?.note ?? '');
    setStatus('');
    setError('');
  }, [event, log]);

  if (!event) {
    return (
      <main className="lumin-page" aria-labelledby="missing-event-title">
        <h1 id="missing-event-title" style={{ fontSize: 28, marginBottom: 12 }}>Event unavailable</h1>
        <p className="lumin-muted" style={{ marginBottom: 20 }}>This event is not in the selected data source</p>
        <Link to="/events" className="lumin-button" style={{ ...actionStyle, display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>Events</Link>
      </main>
    );
  }

  const saveContext = () => {
    setError('');
    setStatus('');
    pendingStatus.current = 'Context saved on this device.';
    try {
      dispatch({ type: 'context', eventId: event.id, tags, note, elapsedMs: Math.max(0, Date.now() - openedAt.current) });
    } catch {
      pendingStatus.current = undefined;
      setError('Context could not be saved. Try again.');
    }
  };

  const promptAction = (action: 'dismissed' | 'snoozed') => {
    setError('');
    setStatus('');
    pendingStatus.current = action === 'dismissed' ? 'Not now saved.' : 'Snoozed for an hour.';
    try {
      dispatch({ type: 'prompt', eventId: event.id, status: action });
    } catch {
      pendingStatus.current = undefined;
      setError('That action could not be saved. Try again.');
    }
  };

  const deleteContext = () => {
    setError('');
    setStatus('');
    pendingStatus.current = 'Context deleted.';
    try {
      dispatch({ type: 'delete-context', eventId: event.id });
      setTags([]);
      setNote('');
    } catch {
      pendingStatus.current = undefined;
      setError('Context could not be deleted. Try again.');
    }
  };

  const persistenceNotice = getPersistenceNotice(storageError, status, error);

  return (
    <main className="lumin-page" aria-labelledby="event-title">
      <Link to="/events" style={{ color: 'var(--color-blue)', minHeight: 44, display: 'inline-flex', alignItems: 'center', marginBottom: 8 }}>← Events</Link>
      <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 8 }}>Observation range</p>
      <h1 id="event-title" style={{ fontSize: 28, lineHeight: 1.2, marginBottom: 8 }}>{eventRange(event)}</h1>
      {sampleSource && <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 12 }}>Sample measurements from the fixture dataset — not your own Garmin data.</p>}
      <p style={{ fontSize: 18, lineHeight: 1.45, marginBottom: 20 }}>{evidenceSummary(event)}</p>

      <section className="lumin-card" aria-labelledby="evidence-title" style={{ marginBottom: 16 }}>
        <h2 id="evidence-title" style={{ fontSize: 20, marginBottom: 8 }}>What changed</h2>
        <p className="lumin-muted" style={{ marginBottom: 12 }}>These measured differences contributed to the event. They describe a change from your usual range, not a diagnosis.</p>
        <details>
          <summary style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>See measured differences</summary>
          <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
            {event.evidence.map((evidence) => (
              <div key={evidence.metric} style={{ borderTop: '1px solid var(--color-divider)', paddingTop: 10 }}>
                <strong>{METRIC_DETAILS[evidence.metric].label}</strong>
                <p className="lumin-muted" style={{ marginTop: 4 }}>
                  {evidence.direction === 'above' ? 'Above' : 'Below'} your usual range · observed {evidence.observedValue} {METRIC_DETAILS[evidence.metric].unit} · usual center {evidence.baselineCenter} {METRIC_DETAILS[evidence.metric].unit}
                </p>
              </div>
            ))}
          </div>
        </details>
      </section>

      <section className="lumin-card" aria-labelledby="context-title" style={{ marginBottom: 16 }}>
        <h2 id="context-title" style={{ fontSize: 20, marginBottom: 8 }}>What was happening around this time?</h2>
        <p className="lumin-muted" style={{ marginBottom: 14 }}>Choose any that fit. Leaving everything blank is okay.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {CONTEXT_TAGS.map((tag) => {
            const selected = tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={selected}
                onClick={() => setTags(selected ? tags.filter((item) => item !== tag) : [...tags, tag])}
                style={{ ...actionStyle, background: selected ? 'var(--color-lime)' : 'var(--color-surface)', borderColor: selected ? 'var(--color-ink)' : 'var(--color-divider)' }}
              >
                {selected && <span aria-hidden="true">✓ </span>}{tag}
              </button>
            );
          })}
        </div>
        <label htmlFor="context-note" style={{ display: 'block', marginBottom: 8 }}>A short note, if you like</label>
        <textarea id="context-note" maxLength={500} value={note} onChange={(e) => setNote(e.target.value)} rows={4} style={{ width: '100%', border: '1px solid var(--color-divider)', borderRadius: 16, padding: 12, resize: 'vertical' }} />
        <p className="lumin-muted" style={{ fontSize: 12, marginTop: 6 }}>{note.length}/500</p>
        {log?.sample && <p className="lumin-muted" style={{ fontSize: 12 }}>Sample context — this seeded example is not your own learning.</p>}
      </section>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        <button type="button" className="lumin-button" style={primaryStyle} onClick={saveContext}>Save context</button>
        {!log && <>
          <button type="button" className="lumin-button" style={actionStyle} onClick={() => promptAction('dismissed')}>Not now</button>
          <button type="button" className="lumin-button" style={actionStyle} onClick={() => promptAction('snoozed')}>Snooze for an hour</button>
        </>}
        {log && <button type="button" className="lumin-button" style={{ ...actionStyle, color: 'var(--color-ink)', borderColor: 'var(--color-coral)' }} onClick={deleteContext}>Delete context</button>}
      </div>
      <div aria-live="polite" style={{ minHeight: 24 }}>
        {persistenceNotice.status && <p>{persistenceNotice.status}</p>}
        {persistenceNotice.error && <p style={{ color: 'var(--color-ink)' }}>{persistenceNotice.error}</p>}
      </div>
      <p className="lumin-muted" style={{ fontSize: 12, marginTop: 12 }}>Source: {state.activeSource ?? 'selected data source'}</p>
    </main>
  );
}
