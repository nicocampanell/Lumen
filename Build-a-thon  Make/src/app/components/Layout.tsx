import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import NavBar from '../../imports/NavBar';
import Insight from '../../imports/Insight';
import { EmotionProvider, useEmotionColors } from './EmotionContext';
import { useStudy } from './StudyContext';
import { PAGE_TRANSITION } from '../../lib/signal-visuals.ts';

const tabRoutes: Record<string, string> = { home: '/', events: '/events', profile: '/profile' };
const routeToTab: Record<string, string> = { '/': 'home', '/events': 'events', '/profile': 'profile' };

function insightBodyForTimeIndex(index: number): string {
  if (index === 0) return 'Midnight to 6 AM is a quiet window for sleeping and letting the body recover.';
  if (index === 1) return '6 to 8 AM can be more activated—working out, getting moving, and feeling a little stressed can all show up here.';
  if (index === 2) return 'This middle part of the day looks like a calmer window for focus and relaxed work.';
  if (index === 3) return 'Keep the afternoon simple: choose one thing, then give yourself a clean reset.';
  return 'As evening arrives, let the day soften and make room for rest.';
}

export default function Layout() {
  return <EmotionProvider><LayoutInner /></EmotionProvider>;
}

function LayoutInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useStudy();
  const reducedMotion = useReducedMotion();
  const headingRef = useRef<string>('');
  const activeTab = routeToTab[location.pathname] || 'home';
  const isOnboarding = location.pathname === '/onboarding';
  const isProfile = location.pathname === '/profile';
  const isInsight = location.pathname === '/insight';
  const isHeartRate = location.pathname === '/heartrate';
  const isCircleDetail = location.pathname === '/circle';
  const isEventDetail = /^\/events\/[^/]+$/.test(location.pathname);
  const hideOverlay = isOnboarding || isEventDetail;
  const { emotion, activeIndex, css: emotionCSS } = useEmotionColors();

  useEffect(() => {
    if (headingRef.current === location.pathname) return;
    headingRef.current = location.pathname;
    const active = document.activeElement;
    if (active instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      const current = document.activeElement;
      if (current instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(current.tagName)) return;
      const heading = document.querySelector('h1');
      if (heading instanceof HTMLElement) {
        if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    });
    return () => { cancelled = true; };
  }, [location.pathname, reducedMotion]);

  if (!state.consentAt && !isOnboarding && !isProfile) return <Navigate to="/onboarding" replace />;

  const handleTabChange = (tabId: string) => { const path = tabRoutes[tabId]; if (path) navigate(path); };
  const pageTransition = reducedMotion ? { duration: 0 } : PAGE_TRANSITION;
  const insightBody = insightBodyForTimeIndex(activeIndex);

  return (
    <div
      className="relative mx-auto flex flex-col"
      style={{ width: 'min(390px, 100vw)', height: 'min(844px, 100dvh)', paddingBottom: 'env(safe-area-inset-bottom, 0px)', backgroundColor: '#F4F2F3', borderRadius: 44, overflow: 'hidden' }}
    >
      <div className="relative flex-1" style={{ minHeight: 0, overflow: isProfile || isInsight || isHeartRate || isCircleDetail ? 'hidden' : 'auto' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname} initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }} transition={pageTransition} style={{ height: '100%' }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {!hideOverlay && !isInsight && !isHeartRate && !isCircleDetail && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)', zIndex: 9, pointerEvents: 'none' }} />}

      {!hideOverlay && (
        <div style={{ position: 'absolute', bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))', left: 40, right: 40, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {location.pathname === '/' && <motion.div style={{ width: '100%' }} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration, delay: reducedMotion ? 0 : 0.1 }}><Insight emotionColors={emotion} title="Insight" body={insightBody} actionLabel="meet you" onMeetYou={() => navigate('/insight')} /></motion.div>}
          {!isHeartRate && !isCircleDetail && <NavBar activeTab={activeTab} onTabChange={handleTabChange} emotionGradient={emotionCSS.gradient} emotionColor1={emotionCSS.color1} emotionColor2={emotionCSS.color2} />}
        </div>
      )}
    </div>
  );
}
