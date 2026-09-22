import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'framer-motion';
import Scene from '../../components/Scene';
import TimeBar from '../../components/TimeBar';
import { deriveSignalState } from '../../lib/analysis.ts';
import { formatDay } from '../../lib/model.ts';
import { deriveSignalVisual, PAGE_TRANSITION } from '../../lib/signal-visuals.ts';
import { useEmotionColors } from './EmotionContext';
import { useStudy } from './StudyContext';

const TIME_OF_DAY_ITEMS = [
  { label: '0', ariaLabel: '0 hours · midnight to 4 AM · sleeping' },
  { label: '4', ariaLabel: '4 hours · early morning · sleeping' },
  { label: '8', ariaLabel: '8 hours · working out and more activated' },
  { label: '12', ariaLabel: '12 hours · relaxed middle of the day' },
  { label: '16', ariaLabel: '16 hours · focused afternoon' },
  { label: '20', ariaLabel: '20 hours · winding down' },
  { label: '24', ariaLabel: '24 hours · end of day' },
];

export default function HomePage() {
  const { dataset, storageError } = useStudy();
  const { activeIndex, setActiveIndex, setEmotion } = useEmotionColors();
  const reducedMotion = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const days = useMemo(() => [...new Set((dataset?.batch.readings ?? []).map((reading) => reading.day))].sort(), [dataset]);
  const selectedDay = days[days.length - 1];
  const selectedReadings = dataset?.batch.readings.filter((reading) => !selectedDay || reading.day <= selectedDay) ?? [];
  const currentState = deriveSignalState(dataset?.batch.readings ?? [], dataset?.events ?? [], new Date());
  const visual = deriveSignalVisual(selectedReadings, selectedDay, currentState);
  useEffect(() => setEmotion({ color1: visual.color1, color2: visual.color2 }), [setEmotion, visual.color1, visual.color2]);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let raf: number;
    const start = performance.now();
    const animate = () => {
      const t = (performance.now() - start) / 1000;
      if (glowRef.current) glowRef.current.style.transform = `translate(calc(-50% + ${Math.sin(t * 0.4) * 3}px), calc(-60% + ${Math.sin(t * 0.6) * 6 + Math.sin(t * 1.3) * 2}px))`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const color = visual.color1.map((channel) => Math.round(channel * 255)).join(', ');
  const eventCount = dataset?.events.length ?? 0;

  return (
    <main style={{ position: 'relative', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <div style={{ height: 16, flexShrink: 0 }} />
      <div className="flex items-center justify-between" style={{ paddingLeft: 24, paddingRight: 20, position: 'relative', zIndex: 2 }}>
        <motion.h1 className="text-[24px]" style={{ fontWeight: 500, color: '#212121' }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration }}>Morning, Nico</motion.h1>
        <Link to="/events" aria-label={`Open Events${eventCount ? `, ${eventCount} recorded` : ''}`} style={{ minWidth: 78, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 70, background: 'linear-gradient(90deg, rgba(240,91,81,.2), rgba(247,247,247,0))', color: '#8a2d24', textDecoration: 'none', fontSize: 14 }}>
          Events{eventCount ? ` · ${eventCount}` : ''}
        </Link>
      </div>

      <motion.div style={{ marginTop: 28, position: 'relative', zIndex: 2 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration, delay: reducedMotion ? 0 : 0.1 }}>
        <TimeBar activeIndex={activeIndex} onSelect={setActiveIndex} items={TIME_OF_DAY_ITEMS} />
      </motion.div>

      <div ref={glowRef} aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', width: 750, height: 750, borderRadius: '50%', background: `radial-gradient(circle, rgba(${color}, .5) 0%, rgba(${color}, .2) 35%, rgba(${color}, 0) 65%)`, pointerEvents: 'none', transition: 'background 0.24s cubic-bezier(0.25, 0.1, 0.25, 1)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', width: 390, height: 390, pointerEvents: 'none', zIndex: 1 }}>
        <Scene visual={visual} reducedMotion={Boolean(reducedMotion)} style={{ width: '100%', height: '100%' }} />
      </div>

      <div role="status" aria-live="polite" style={{ position: 'relative', zIndex: 2, margin: '10px 24px 0', paddingBottom: 20, textAlign: 'center' }}>
        <p className="lumin-muted" style={{ fontSize: 12 }}>{dataset ? `Last update · ${formatDay(dataset.batch.importedAt.slice(0, 10))}` : 'No update yet'}</p>
        {storageError && <p role="alert" style={{ color: '#8a2d24', fontSize: 12, marginTop: 4 }}>{storageError}</p>}
      </div>
    </main>
  );
}
