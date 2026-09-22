import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { formatDay, METRIC_DETAILS } from '../../lib/model.ts';
import { summarizeWeek } from '../../lib/summary.ts';
import { useStudy } from './StudyContext';

const buttonStyle = {
  minHeight: 44,
  border: '1px solid var(--color-divider)',
  borderRadius: 999,
  padding: '8px 16px',
  background: 'var(--color-surface)',
  color: 'var(--color-ink)',
  cursor: 'pointer',
};

export const supportLinkStyle = { color: 'var(--color-blue)', minHeight: 44, display: 'inline-flex', alignItems: 'center' } as const;

function range(now: Date): { from: string; to: string } {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const to = new Date(today - 86_400_000);
  const from = new Date(to.getTime() - 6 * 86_400_000);
  return { from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10) };
}

export function getWeeklyPersistenceNotice(storageError: string | undefined, status: string): { status: string; error: string } {
  return storageError ? { status: '', error: storageError } : { status, error: '' };
}

export default function WeeklySummaryPage() {
  const { state, dataset, dispatch, storageError } = useStudy();
  const sampleSource = state.activeSource === 'fixture';
  const now = new Date();
  const dates = range(now);
  const associations = useMemo(() => summarizeWeek(dataset, now), [dataset, now.toISOString().slice(0, 10)]);
  const markedWeek = useRef<string>();
  const [feedbackChoice, setFeedbackChoice] = useState<boolean | undefined>(state.feedback?.useful);
  const [comment, setComment] = useState(state.feedback?.comment ?? '');
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const pendingFeedbackStatus = useRef(false);

  useEffect(() => {
    const key = `${state.activeSource ?? 'none'}:${dates.from}:${dates.to}`;
    if (markedWeek.current === key) return;
    markedWeek.current = key;
    dispatch({ type: 'summary-viewed' });
  }, [dates.from, dates.to, dispatch, state.activeSource]);

  useEffect(() => {
    if (!pendingFeedbackStatus.current) return;
    pendingFeedbackStatus.current = false;
    if (!storageError) setFeedbackStatus('Thanks — your feedback is saved on this device.');
  }, [state.feedback, storageError]);

  const events = new Map((dataset?.events ?? []).map((event) => [event.id, event]));
  const saveFeedback = () => {
    if (feedbackChoice === undefined) return;
    setFeedbackStatus('');
    pendingFeedbackStatus.current = true;
    try {
      dispatch({ type: 'feedback', useful: feedbackChoice, comment });
    } catch {
      pendingFeedbackStatus.current = false;
      setFeedbackStatus('Feedback could not be saved. Try again.');
    }
  };
  const persistenceNotice = getWeeklyPersistenceNotice(storageError, feedbackStatus);

  return (
    <main className="lumin-page" aria-labelledby="summary-title">
      <Link to="/events" style={{ color: 'var(--color-blue)', minHeight: 44, display: 'inline-flex', alignItems: 'center', marginBottom: 8 }}>← Events</Link>
      <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 8 }}>Lumin · Weekly summary</p>
      <h1 id="summary-title" style={{ fontSize: 30, lineHeight: 1.15, marginBottom: 8 }}>Your recent signals</h1>
      {sampleSource && <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 8 }}>Sample measurements from the fixture dataset — not your own Garmin data.</p>}
      <p className="lumin-muted" style={{ marginBottom: 20 }}>{formatDay(dates.from)}–{formatDay(dates.to)}. Counts show the observations available in this selected source.</p>

      {associations.length === 0 ? (
        <section className="lumin-card" aria-live="polite" style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Not enough information yet</h2>
          <p className="lumin-muted">Add context to more signal events and Lumin can show repeated associations. An association is not a diagnosis or proof of causality.</p>
        </section>
      ) : (
        <section aria-labelledby="associations-title" style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
          <h2 id="associations-title" style={{ fontSize: 20 }}>Associations in this week</h2>
          {associations.map((association) => {
            const sampleContext = association.eventIds.some((id) => dataset?.logs.some((log) => log.eventId === id && log.sample));
            return (
              <article className="lumin-card" key={association.id}>
                {sampleSource && <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 8 }}>Sample measurements — not your own learning.</p>}
                {sampleContext && <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 8 }}>Sample context — this seeded example is not your own learning.</p>}
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{association.statement}</h3>
                <p className="lumin-muted" style={{ marginBottom: 12 }}>This is an association in your recent data, not a diagnosis.</p>
                <ul style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>
                  {association.eventIds.map((eventId) => {
                    const event = events.get(eventId);
                    if (!event) return null;
                    return <li key={eventId}><Link to={`/events/${encodeURIComponent(eventId)}`} style={supportLinkStyle}>{formatDay(event.startedAt.slice(0, 10))} · {METRIC_DETAILS[association.metric].label}</Link></li>;
                  })}
                </ul>
              </article>
            );
          })}
        </section>
      )}

      <section className="lumin-card" aria-labelledby="feedback-title">
        <h2 id="feedback-title" style={{ fontSize: 20, marginBottom: 10 }}>Did Lumin help you notice a connection you would not have noticed from Garmin alone?</h2>
        <fieldset style={{ border: 0, padding: 0, margin: '0 0 14px' }}>
          <legend className="lumin-muted" style={{ marginBottom: 8 }}>Your answer</legend>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <label style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 8 }}><input type="radio" name="feedback-useful" checked={feedbackChoice === true} onChange={() => setFeedbackChoice(true)} />Yes</label>
            <label style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 8 }}><input type="radio" name="feedback-useful" checked={feedbackChoice === false} onChange={() => setFeedbackChoice(false)} />No</label>
          </div>
        </fieldset>
        <label htmlFor="feedback-comment" style={{ display: 'block', marginBottom: 8 }}>Optional note</label>
        <textarea id="feedback-comment" maxLength={500} value={comment} onChange={(e) => setComment(e.target.value)} rows={3} style={{ width: '100%', border: '1px solid var(--color-divider)', borderRadius: 16, padding: 12, resize: 'vertical', marginBottom: 6 }} />
        <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 12 }}>{comment.length}/500</p>
        <button type="button" className="lumin-button" style={buttonStyle} onClick={saveFeedback} disabled={feedbackChoice === undefined}>Save feedback</button>
        <p aria-live="polite" style={{ minHeight: 24, marginTop: 10 }}>{persistenceNotice.error || persistenceNotice.status}</p>
      </section>
    </main>
  );
}
