import { Link, useNavigate } from 'react-router';
import { eligiblePrompt } from '../../lib/study.ts';
import { formatDay } from '../../lib/model.ts';
import type { SignalEvent } from '../../lib/model.ts';
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

function eventDay(event: SignalEvent): string {
  return event.startedAt.slice(0, 10);
}

export function eventRange(event: SignalEvent): string {
  const start = event.startedAt.slice(0, 10);
  const endDate = new Date(event.endedAt);
  if (endDate.getUTCHours() === 0 && endDate.getUTCMinutes() === 0 && endDate.getUTCSeconds() === 0 && endDate.getUTCMilliseconds() === 0) {
    endDate.setUTCDate(endDate.getUTCDate() - 1);
  }
  const end = endDate.toISOString().slice(0, 10);
  return start === end ? formatDay(start) : `${formatDay(start)}–${formatDay(end)}`;
}

function statusLabel(event: SignalEvent): string {
  if (event.promptStatus === 'logged') return 'Context logged';
  if (event.promptStatus === 'dismissed') return 'Dismissed';
  if (event.promptStatus === 'opened') return 'Opened';
  if (event.snoozedUntil) return 'Snoozed';
  return 'Needs context';
}

export default function EventsPage() {
  const navigate = useNavigate();
  const { state, dataset } = useStudy();
  const now = new Date();
  const prompt = eligiblePrompt(state, now);
  const events = [...(dataset?.events ?? [])].sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  const sample = state.activeSource === 'fixture';

  return (
    <main className="lumin-page" aria-labelledby="events-title">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div>
          <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 8 }}>Lumin · Events</p>
          <h1 id="events-title" style={{ fontSize: 30, lineHeight: 1.15, marginBottom: 8 }}>Signal events</h1>
          <p className="lumin-muted" style={{ lineHeight: 1.45 }}>Review measured changes and add what was happening around them.</p>
        </div>
        {sample && <span style={{ borderRadius: 999, padding: '6px 10px', background: 'var(--color-lime)', fontSize: 12 }}>Sample data</span>}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '20px 0' }}>
        <Link to="/weekly" className="lumin-button" style={{ ...buttonStyle, display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>Weekly summary</Link>
        <button type="button" className="lumin-button" style={buttonStyle} onClick={() => navigate('/')}>Back home</button>
      </div>

      {prompt && (
        <section className="lumin-card" aria-labelledby="prompt-title" style={{ marginBottom: 16, background: 'var(--color-cream)' }}>
          <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 8 }}>A recent event</p>
          <h2 id="prompt-title" style={{ fontSize: 20, marginBottom: 12 }}>Something shifted. What was happening around this time?</h2>
          <p className="lumin-muted" style={{ marginBottom: 16 }}>On {formatDay(eventDay(prompt))}, Lumin noticed a change in several signals.</p>
          <Link to={`/events/${encodeURIComponent(prompt.id)}`} className="lumin-button" style={{ ...buttonStyle, display: 'inline-flex', alignItems: 'center', textDecoration: 'none', background: 'var(--color-ink)', color: '#fff' }}>Open event</Link>
        </section>
      )}

      {events.length === 0 ? (
        <section className="lumin-card" aria-live="polite">
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>No signal events yet</h2>
          <p className="lumin-muted">Lumin will show an event once there is enough measured history to compare with your usual range.</p>
        </section>
      ) : (
        <section aria-labelledby="events-list-title">
          <h2 id="events-list-title" style={{ fontSize: 20, marginBottom: 12 }}>Recent events</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {events.map((event) => {
              const day = eventDay(event);
              return (
                <article className="lumin-card" key={event.id} style={{ display: 'grid', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                    <h3 style={{ fontSize: 18 }}>{formatDay(day)}</h3>
                    <span className="lumin-muted" style={{ fontSize: 12 }}>{statusLabel(event)}</span>
                  </div>
                  <p className="lumin-muted">{eventRange(event)} · {event.evidence.length} measured signal{event.evidence.length === 1 ? '' : 's'} contributed to this event.</p>
                  <Link to={`/events/${encodeURIComponent(event.id)}`} style={{ color: 'var(--color-blue)', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>View evidence and context</Link>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
