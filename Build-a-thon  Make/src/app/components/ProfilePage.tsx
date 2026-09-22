import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { importGarmin } from '../../lib/garmin.ts';
import { calculateBaselines } from '../../lib/analysis.ts';
import { createFixtureBatch } from '../../lib/fixtures.ts';
import { exportStudy } from '../../lib/study.ts';
import { METRIC_DETAILS, validateBatch, type ImportBatch, type Metric, type Source } from '../../lib/model.ts';
import { useStudy } from './StudyContext';

function BgBlobs() {
  return <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 30% at 95% 0%, rgba(254,204,218,.8), transparent 70%), radial-gradient(ellipse 80% 32% at 0% 100%, rgba(191,179,251,.7), transparent 70%)' }} />;
}

const cardStyle = {
  borderRadius: 24,
  padding: 20,
  background: 'rgba(255,255,255,.78)',
  boxShadow: '0 4px 18px rgba(0,0,0,.07)',
};

const buttonStyle = {
  minWidth: 44,
  minHeight: 44,
  border: 0,
  borderRadius: 999,
  padding: '10px 16px',
  font: 'inherit',
  fontWeight: 600,
  cursor: 'pointer',
};

function sourceLabel(source: Source | undefined): string {
  if (source === 'garmin') return 'Garmin';
  if (source === 'fixture') return 'Sample data';
  if (source === 'export') return 'Imported file';
  return 'No source connected';
}

function metricLabel(metric: Metric): string {
  return METRIC_DETAILS[metric].label;
}

function toExportBatch(candidate: unknown, now: Date): ImportBatch {
  const original = validateBatch(candidate, now);
  const converted = {
    ...original,
    source: 'export' as const,
    importedAt: now.toISOString(),
    readings: original.readings.map((reading) => ({
      ...reading,
      source: 'export' as const,
      sourceRecordId: `export:${original.source}:${reading.sourceRecordId}`,
      userId: 'local' as const,
    })),
  };
  return validateBatch(converted, now);
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);
  const requestToken = useRef(0);
  const { state, dataset, storageError, recoveryExport, dispatch, deleteAllData } = useStudy();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [quietStart, setQuietStart] = useState(state.preferences.quietStart);
  const [quietEnd, setQuietEnd] = useState(state.preferences.quietEnd);

  useEffect(() => setQuietStart(state.preferences.quietStart), [state.preferences.quietStart]);
  useEffect(() => setQuietEnd(state.preferences.quietEnd), [state.preferences.quietEnd]);
  useEffect(() => () => {
    requestToken.current += 1;
  }, []);

  const baselines = dataset?.batch.readings.length
    ? calculateBaselines(dataset.batch.readings, dataset.batch.readings.reduce((latest, item) => item.day > latest ? item.day : latest, ''))
    : [];
  const readyMetrics = baselines.filter((baseline) => baseline.ready);
  const supportedMetrics = dataset?.batch.supportedMetrics ?? [];

  const cancelPending = () => {
    requestToken.current += 1;
    setBusy(false);
  };

  const requireConsent = () => {
    if (state.consentAt) return true;
    setMessage('Choose your privacy consent on onboarding before importing data.');
    navigate('/onboarding');
    return false;
  };

  const connectGarmin = async () => {
    if (busy) return;
    if (!requireConsent()) return;
    const token = ++requestToken.current;
    setBusy(true);
    setError('');
    setMessage('Connecting to Garmin…');
    try {
      const result = await importGarmin(new Date());
      if (token !== requestToken.current) return;
      dispatch({ type: 'import', batch: result.batch, fallbackReason: result.fallbackReason });
      setMessage(result.fallbackReason ?? 'Garmin data is connected.');
    } catch {
      setError('Garmin could not be connected. Try again or choose sample data.');
      setMessage('');
    } finally {
      if (token === requestToken.current) setBusy(false);
    }
  };

  const useSample = () => {
    if (!requireConsent()) return;
    cancelPending();
    try {
      dispatch({ type: 'import', batch: createFixtureBatch(new Date()) });
      setError('');
      setMessage('Sample data is ready.');
    } catch {
      setError('Sample data could not be loaded.');
    }
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!state.consentAt) {
      event.target.value = '';
      requireConsent();
      return;
    }
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const fileToken = requestToken.current;
    setError('');
    setMessage('');
    if (file.size > 5 * 1024 * 1024) {
      setError('That file is larger than 5 MiB. Choose a smaller Lumin JSON export.');
      return;
    }
    try {
      const text = await file.text();
      if (fileToken !== requestToken.current) return;
      const parsed: unknown = JSON.parse(text);
      const record = parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : undefined;
      const exportedState = record?.state && typeof record.state === 'object' ? record.state as Record<string, unknown> : undefined;
      const datasets = exportedState?.datasets && typeof exportedState.datasets === 'object' ? exportedState.datasets as Record<string, unknown> : undefined;
      const selectedSource = typeof exportedState?.activeSource === 'string' ? exportedState.activeSource : undefined;
      const selectedDataset = selectedSource && datasets ? datasets[selectedSource] : undefined;
      const candidate = selectedDataset && typeof selectedDataset === 'object' && 'batch' in selectedDataset
        ? (selectedDataset as { batch: unknown }).batch
        : record?.batch ?? parsed;
      const batch = toExportBatch(candidate, new Date());
      if (fileToken !== requestToken.current) return;
      cancelPending();
      dispatch({ type: 'import', batch });
      setMessage('Signal data imported into the separate imported dataset.');
    } catch {
      setError('This file is not a valid version-1 signal export. Existing data was kept.');
    }
  };

  const downloadJson = (contents: string, filename: string, success: string) => {
    try {
      const url = URL.createObjectURL(new Blob([contents], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      setMessage(success);
    } catch {
      setError('Your data could not be exported from this browser.');
    }
  };

  const downloadExport = () => downloadJson(exportStudy(state), 'lumin-study.json', 'Your Lumin data export is ready.');
  const downloadRecovery = () => {
    if (recoveryExport) downloadJson(recoveryExport, 'lumin-recovery.json', 'Your raw recovery copy is ready.');
  };

  const deleteData = () => {
    if (typeof window !== 'undefined' && window.confirm('Delete all Lumin data from this browser? This cannot be undone.')) {
      cancelPending();
      deleteAllData();
      setMessage('All Lumin data was deleted from this browser.');
    }
  };

  const changePreferences = (next: Partial<typeof state.preferences>) => {
    dispatch({ type: 'preferences', preferences: { ...state.preferences, ...next } });
  };

  const commitQuietHour = (key: 'quietStart' | 'quietEnd', value: string) => {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
      setError('Enter a complete quiet-hour time, such as 22:00.');
      return;
    }
    setError('');
    changePreferences({ [key]: value });
  };

  const switchSource = (source: Source) => {
    cancelPending();
    dispatch({ type: 'source', source });
  };

  const disconnect = () => {
    cancelPending();
    dispatch({ type: 'disconnect' });
    setMessage('Disconnected. Saved readings stay here; only future Lumin imports are stopped.');
  };

  const openImport = () => {
    if (!requireConsent()) return;
    cancelPending();
    fileInput.current?.click();
  };

  return (
    <main style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#F4F2F3' }}>
      <BgBlobs />
      <div className="lumin-page" style={{ position: 'relative', zIndex: 1, paddingTop: 72 }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'grid', gap: 16 }}>
          <header style={{ padding: '0 4px 4px' }}>
            <p style={{ margin: 0, color: '#625c57', fontSize: 14 }}>Local study profile</p>
            <h1 style={{ margin: '6px 0 0', fontSize: 30, letterSpacing: '-.03em' }}>Your signals, honestly.</h1>
            <p style={{ margin: '8px 0 0', color: '#625c57', lineHeight: 1.45 }}>Manage the source, privacy, and notification choices for this browser.</p>
          </header>

          <section style={cardStyle} aria-labelledby="connection-title">
            <h2 id="connection-title" style={{ margin: 0, fontSize: 20 }}>Connection</h2>
            <p style={{ margin: '8px 0 0', lineHeight: 1.45 }}><strong>Active source:</strong> {sourceLabel(state.activeSource)}</p>
            <p style={{ margin: '4px 0 0', color: '#625c57', lineHeight: 1.45 }}>{state.connection.lastSyncAt ? `Last sync: ${new Date(state.connection.lastSyncAt).toLocaleString()}` : 'No data has been imported yet.'}</p>
            <p role="status" aria-live="polite" style={{ margin: '8px 0 0', color: state.connection.status === 'disconnected' ? '#625c57' : '#28633e' }}><strong>Import status:</strong> {state.connection.status === 'disconnected' ? 'Disconnected. Saved readings stay here.' : state.connection.status === 'needs_attention' ? 'Needs attention. Your saved data is preserved.' : 'Connected.'}</p>
            {state.connection.message && <p role="status" style={{ margin: '8px 0 0', color: '#8a4f00' }}>{state.connection.message}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
              <button type="button" disabled={busy} onClick={connectGarmin} style={{ ...buttonStyle, background: '#212121', color: '#fff', opacity: busy ? .6 : 1 }}>{busy ? 'Connecting…' : 'Retry Garmin'}</button>
              <button type="button" onClick={useSample} style={{ ...buttonStyle, background: '#f4fdaf' }}>Use sample data</button>
            </div>
            <p style={{ margin: '14px 0 0', color: '#625c57', lineHeight: 1.45 }}>Disconnect stops Lumin imports. Your local Garmin sign-in is managed separately.</p>
            <button type="button" onClick={disconnect} style={{ ...buttonStyle, marginTop: 12, background: 'transparent', border: '1px solid rgba(83,69,58,.28)' }}>Disconnect Lumin</button>
            {Object.keys(state.datasets).length > 1 && <div style={{ marginTop: 16 }}><p style={{ margin: '0 0 8px', fontWeight: 600 }}>Saved data sources</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{(Object.keys(state.datasets) as Source[]).map((source) => <button key={source} type="button" onClick={() => switchSource(source)} aria-pressed={state.activeSource === source} style={{ ...buttonStyle, background: state.activeSource === source ? '#212121' : '#fff', color: state.activeSource === source ? '#fff' : '#212121', border: '1px solid rgba(83,69,58,.2)' }}>{sourceLabel(source)}</button>)}</div></div>}
          </section>

          <section style={cardStyle} aria-labelledby="baseline-title">
            <h2 id="baseline-title" style={{ margin: 0, fontSize: 20 }}>What this account supplies</h2>
            {!dataset ? <p style={{ margin: '10px 0 0', color: '#625c57' }}>No signal data yet. Connect Garmin or use the sample dataset to begin learning your usual range.</p> : <>
              <p style={{ margin: '10px 0 0', lineHeight: 1.45 }}>{readyMetrics.length} of {supportedMetrics.length || 'the available'} supported metrics have enough history for a baseline.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>{supportedMetrics.map((metric) => <span key={metric} style={{ padding: '7px 11px', borderRadius: 999, background: '#f4f2f3', fontSize: 14 }}>{metricLabel(metric)}</span>)}</div>
              {supportedMetrics.length === 0 && <p style={{ margin: '10px 0 0', color: '#625c57' }}>Supported metric details are not available yet.</p>}
            </>}
          </section>

          {supportedMetrics.includes('heart_rate') && <button type="button" onClick={() => navigate('/heartrate')} style={{ ...cardStyle, border: 0, textAlign: 'left', font: 'inherit', cursor: 'pointer' }}><strong style={{ fontSize: 18 }}>Resting heart rate</strong><span style={{ display: 'block', marginTop: 6, color: '#625c57' }}>View recorded daily values and their source.</span></button>}

          <section style={cardStyle} aria-labelledby="notifications-title">
            <h2 id="notifications-title" style={{ margin: 0, fontSize: 20 }}>Notifications</h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 44, marginTop: 12 }}><input type="checkbox" checked={state.preferences.paused} onChange={(event) => changePreferences({ paused: event.target.checked })} style={{ width: 22, height: 22 }} /> Pause in-app signal prompts</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}><label>Quiet hours start<input type="time" value={quietStart} onChange={(event) => setQuietStart(event.target.value)} onBlur={() => commitQuietHour('quietStart', quietStart)} style={{ display: 'block', width: '100%', minHeight: 44, marginTop: 6, padding: 8 }} /></label><label>Quiet hours end<input type="time" value={quietEnd} onChange={(event) => setQuietEnd(event.target.value)} onBlur={() => commitQuietHour('quietEnd', quietEnd)} style={{ display: 'block', width: '100%', minHeight: 44, marginTop: 6, padding: 8 }} /></label></div>
          </section>

          <section style={cardStyle} aria-labelledby="data-title">
            <h2 id="data-title" style={{ margin: 0, fontSize: 20 }}>Your local data</h2>
            <p style={{ margin: '8px 0 0', color: '#625c57', lineHeight: 1.45 }}>Browser storage is local to this device and is not presented as encrypted. Export a copy before clearing it.</p>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              <button type="button" onClick={downloadExport} style={{ ...buttonStyle, background: '#fff', border: '1px solid rgba(83,69,58,.28)', textAlign: 'left' }}>Export JSON</button>
              {recoveryExport && <div><p style={{ margin: 0, color: '#8a2d24', lineHeight: 1.45 }}>Saved data could not be loaded. Download the raw recovery copy before resetting.</p><button type="button" onClick={downloadRecovery} style={{ ...buttonStyle, marginTop: 8, background: '#fff0ee', color: '#8a2d24', border: '1px solid rgba(138,45,36,.25)', textAlign: 'left' }}>Download recovery copy before resetting</button></div>}
              <button type="button" onClick={openImport} style={{ ...buttonStyle, background: '#fff', border: '1px solid rgba(83,69,58,.28)', textAlign: 'left' }}>Import signal data</button>
              <input ref={fileInput} type="file" accept="application/json,.json" onChange={handleFile} aria-label="Choose Lumin JSON signal data" tabIndex={-1} aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />
              <button type="button" onClick={deleteData} style={{ ...buttonStyle, background: '#fff0ee', color: '#8a2d24', border: '1px solid rgba(138,45,36,.25)', textAlign: 'left' }}>Delete all Lumin data</button>
            </div>
          </section>

          {(message || error || storageError) && <p role={error || storageError ? 'alert' : 'status'} aria-live="polite" style={{ ...cardStyle, margin: 0, color: error || storageError ? '#8a2d24' : '#625c57' }}>{error || storageError || message}</p>}
        </div>
      </div>
    </main>
  );
}
