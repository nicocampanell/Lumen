import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { formatDay } from '../../lib/model.ts';
import { useStudy } from './StudyContext';

const buttonStyle = { minHeight: 44, border: '1px solid var(--color-divider)', borderRadius: 999, padding: '8px 16px', background: 'var(--color-surface)', color: 'var(--color-ink)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' };

export default function HeartRatePageWrapper() {
  const navigate = useNavigate();
  const { state, dataset } = useStudy();
  const readings = useMemo(() => (dataset?.batch.readings ?? []).filter((reading) => reading.metric === 'heart_rate' && reading.quality === 'valid').sort((a, b) => b.day.localeCompare(a.day)), [dataset]);
  const latest = readings[0];

  return (
    <main className="lumin-page" style={{ paddingTop: 72, background: 'linear-gradient(155deg, #f4f2f3 0%, #fff8eb 56%, #f4f2f3 100%)' }} aria-labelledby="heart-rate-title">
      <button type="button" onClick={() => navigate('/profile')} style={{ ...buttonStyle, border: 0, background: 'transparent', paddingLeft: 0, marginBottom: 12 }}>← Back to profile</button>
      <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 8 }}>Recorded daily signal</p>
      <h1 id="heart-rate-title" style={{ fontSize: 30, lineHeight: 1.15, marginBottom: 8 }}>Resting heart rate</h1>
      {state.activeSource === 'fixture' && <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 14 }}>Sample measurements from the fixture dataset — not your own Garmin data.</p>}

      {!latest ? (
        <section className="lumin-card" aria-live="polite">
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>No recorded values yet</h2>
          <p className="lumin-muted">Connect Garmin or import a signal dataset that includes daily resting heart rate.</p>
        </section>
      ) : (
        <>
          <section className="lumin-card" aria-labelledby="latest-heart-rate" style={{ marginBottom: 16, background: 'rgba(255,255,255,.82)' }}>
            <p className="lumin-muted" style={{ fontSize: 12, marginBottom: 8 }}>Latest recorded day · {formatDay(latest.day)}</p>
            <h2 id="latest-heart-rate" style={{ fontSize: 36, lineHeight: 1.1, marginBottom: 8 }}>{latest.value} {latest.unit}</h2>
            <p className="lumin-muted">Source: {state.activeSource ?? latest.source}. Daily records show a day, not a precise time.</p>
          </section>
          <section className="lumin-card" aria-labelledby="daily-values-title">
            <h2 id="daily-values-title" style={{ fontSize: 20, marginBottom: 12 }}>Daily recorded values</h2>
            <div style={{ display: 'grid', gap: 8 }}>
              {readings.map((reading) => <div key={`${reading.day}-${reading.sourceRecordId}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid var(--color-divider)', paddingTop: 10 }}><span>{formatDay(reading.day)}</span><strong>{reading.value} {reading.unit}</strong></div>)}
            </div>
          </section>
        </>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}><Link to="/events" style={buttonStyle}>Review signal events</Link></div>
    </main>
  );
}
