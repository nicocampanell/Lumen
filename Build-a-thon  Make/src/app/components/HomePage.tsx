import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'framer-motion';
import Scene from '../../components/Scene';
import TimeBar from '../../components/TimeBar';
import { deriveSignalState, detectEvents } from '../../lib/analysis.ts';
import { formatDay } from '../../lib/model.ts';
import { deriveSignalVisual, PAGE_TRANSITION } from '../../lib/signal-visuals.ts';
import { useEmotionColors } from './EmotionContext';
import { useStudy } from './StudyContext';

function dayLabel(day: string): string {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${day}T00:00:00.000Z`));
}

export default function HomePage() {
  const { state, dataset, storageError } = useStudy();
  const { activeIndex, setActiveIndex, setEmotion } = useEmotionColors();
  const reducedMotion = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const sourceRef = useRef<string | undefined>(state.activeSource);
  const days = useMemo(() => [...new Set((dataset?.batch.readings ?? []).map((reading) => reading.day))].sort(), [dataset]);
  const sourceChanged = !initializedRef.current || sourceRef.current !== state.activeSource;
  const selectedIndex = sourceChanged && days.length ? days.length - 1 : Math.max(0, Math.min(activeIndex, Math.max(0, days.length - 1)));
  const selectedDay = days[selectedIndex];
  const selectedReadings = dataset?.batch.readings.filter((reading) => !selectedDay || reading.day <= selectedDay) ?? [];
  const reference = selectedDay ? new Date(`${selectedDay}T23:59:59.999Z`) : new Date();
  const historicalEvents = selectedDay ? detectEvents(selectedReadings, [], reference) : [];
  const currentState = deriveSignalState(dataset?.batch.readings ?? [], dataset?.events ?? [], new Date());
  const historicalState = deriveSignalState(selectedReadings, historicalEvents, reference);
  const measuredState = selectedIndex === days.length - 1 ? currentState : historicalState;
  const visual = deriveSignalVisual(selectedReadings, selectedDay, measuredState);
  const timelineItems = days.map((day) => ({ label: dayLabel(day), ariaLabel: `Recorded day ${formatDay(day)}` }));

  useEffect(() => {
    if (!initializedRef.current || sourceRef.current !== state.activeSource) {
      sourceRef.current = state.activeSource;
      initializedRef.current = true;
      setActiveIndex(Math.max(0, days.length - 1));
    } else if (days.length && activeIndex > days.length - 1) {
      setActiveIndex(days.length - 1);
    }
  }, [activeIndex, days.length, setActiveIndex, state.activeSource]);

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
        <TimeBar activeIndex={selectedIndex} onSelect={setActiveIndex} items={timelineItems} />
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
