import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createFixtureBatch } from '../../lib/fixtures.ts';
import { importGarmin } from '../../lib/garmin.ts';
import { useStudy } from './StudyContext';

const pageStyle = {
  minHeight: '100%',
  overflowY: 'auto' as const,
  padding: '56px 20px 40px',
  background: 'linear-gradient(155deg, #f4f2f3 0%, #fff8eb 56%, #f4f2f3 100%)',
  color: '#212121',
};

const cardStyle = {
  borderRadius: 24,
  padding: 24,
  background: 'rgba(255,255,255,.76)',
  boxShadow: '0 10px 30px rgba(83,69,58,.08)',
};

const buttonStyle = {
  width: '100%',
  minHeight: 48,
  border: 0,
  borderRadius: 999,
  padding: '12px 18px',
  font: 'inherit',
  fontWeight: 600,
  cursor: 'pointer',
};

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { state, storageError, dispatch } = useStudy();
  const [consented, setConsented] = useState(Boolean(state.consentAt));
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  const begin = () => {
    if (!state.consentAt) dispatch({ type: 'consent' });
  };

  const useSample = () => {
    if (!consented || busy) return;
    setBusy(true);
    setStatus('Loading sample data…');
    try {
      begin();
      dispatch({ type: 'import', batch: createFixtureBatch(new Date()) });
      setStatus('Sample data is ready.');
      navigate('/');
    } catch {
      setStatus('Sample data could not be loaded. Try again.');
      setBusy(false);
    }
  };

  const connect = async () => {
    if (!consented || busy) return;
    setBusy(true);
    setStatus('Connecting to Garmin…');
    try {
      begin();
      const result = await importGarmin(new Date());
      dispatch({ type: 'import', batch: result.batch, fallbackReason: result.fallbackReason });
      setStatus(result.fallbackReason ?? 'Garmin data is connected.');
      navigate('/');
    } catch {
      setStatus('Garmin could not be connected. Try again or use sample data.');
      setBusy(false);
    }
  };

  return (
    <main style={pageStyle} aria-labelledby="onboarding-title">
      <div style={{ maxWidth: 420, margin: '0 auto', display: 'grid', gap: 20 }}>
        <header style={{ padding: '12px 4px 4px' }}>
          <p style={{ margin: '0 0 10px', color: '#625c57', fontSize: 14, letterSpacing: '.06em', textTransform: 'uppercase' }}>Lumin · local study</p>
          <h1 id="onboarding-title" style={{ margin: 0, fontSize: 32, lineHeight: 1.12, letterSpacing: '-.03em' }}>A little context for what your body notices.</h1>
          <p style={{ margin: '14px 0 0', fontSize: 17, lineHeight: 1.5, color: '#625c57' }}>
            Lumin helps you notice meaningful changes in Garmin signals and what was happening in your life. It does not diagnose emotion or health.
          </p>
        </header>

        <section style={cardStyle} aria-labelledby="privacy-title">
          <h2 id="privacy-title" style={{ margin: 0, fontSize: 20 }}>Private by default</h2>
          <p style={{ margin: '10px 0 0', lineHeight: 1.5 }}>
            Imported signals and context stay in this browser. You can export your study data as JSON or delete it at any time. Lumin is informational, not medical.
          </p>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 20, minHeight: 44, lineHeight: 1.45 }}>
            <input
              type="checkbox"
              checked={consented}
              onChange={(event) => setConsented(event.target.checked)}
              style={{ width: 22, height: 22, marginTop: 1, flex: '0 0 auto' }}
            />
            <span>I understand this local study uses my permission to import signals and save them in this browser.</span>
          </label>
        </section>

        <section style={cardStyle} aria-labelledby="source-title">
          <h2 id="source-title" style={{ margin: 0, fontSize: 20 }}>Choose a starting point</h2>
          <p style={{ margin: '10px 0 18px', lineHeight: 1.5, color: '#625c57' }}>
            Garmin connection happens through the local app. No password, token, or MFA code is entered here.
          </p>
          <div style={{ display: 'grid', gap: 12 }}>
            <button type="button" onClick={connect} disabled={!consented || busy} style={{ ...buttonStyle, background: '#212121', color: '#fff', opacity: !consented || busy ? .55 : 1 }}>
              {busy ? 'Connecting…' : 'Connect Garmin'}
            </button>
            <button type="button" onClick={useSample} disabled={!consented || busy} style={{ ...buttonStyle, background: '#f4fdaf', color: '#212121', opacity: !consented || busy ? .55 : 1 }}>
              Use sample data
            </button>
          </div>
          <p role="status" aria-live="polite" style={{ minHeight: 24, margin: '16px 0 0', color: '#625c57', lineHeight: 1.4 }}>{status}</p>
        </section>

        {storageError && <p role="alert" style={{ ...cardStyle, margin: 0, color: '#8a2d24' }}>{storageError}</p>}
      </div>
    </main>
  );
}
