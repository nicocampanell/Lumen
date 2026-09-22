import { Link, useNavigate } from 'react-router';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import svgPaths from '../../imports/svg-hsxds2s6nd';
import { useEmotionColors } from './EmotionContext';
import { useStudy } from './StudyContext';
import { deriveSignalState } from '../../lib/analysis.ts';
import { formatDay } from '../../lib/model.ts';
import { PAGE_TRANSITION, SIGNAL_TEXT } from '../../lib/signal-visuals.ts';

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 24,
      }}
    >
      <div style={{ transform: 'scaleY(-1) rotate(180deg)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            clipRule="evenodd"
            d={svgPaths.p20abd800}
            fill="#000"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <p
        style={{
          fontFamily: "'General Sans Variable','General Sans',sans-serif",
          fontWeight: 500,
          fontSize: 20,
          lineHeight: '32px',
          color: '#000',
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        Back
      </p>
    </button>
  );
}

function Polygon({
  gradientId,
  rotateDeg,
  left,
  top,
  containerW,
  containerH,
  color1,
  color2,
}: {
  gradientId: string;
  rotateDeg: number;
  left: number;
  top: number;
  containerW: number;
  containerH: number;
  color1?: string;
  color2?: string;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: containerW,
        height: containerH,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }}
    >
      <div style={{ transform: `rotate(${rotateDeg}deg)` }}>
        <div style={{ position: 'relative', width: 418, height: 341 }}>
          <div style={{ position: 'absolute', inset: '1.5% 1.57% 0 0' }}>
            <svg
              style={{ display: 'block', width: '100%', height: '100%' }}
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 411.443 335.879"
            >
              <path
                d={svgPaths.p275fab00}
                fill={`url(#${gradientId})`}
                opacity="0.35"
              />
              <defs>
                <radialGradient
                  cx="0"
                  cy="0"
                  gradientTransform="translate(209 165.379) rotate(90) scale(170.5 209)"
                  gradientUnits="userSpaceOnUse"
                  id={gradientId}
                  r="1"
                >
                  <stop stopColor={color1 || '#FECCDA'} />
                  <stop offset="1" stopColor={color2 || '#E5CC50'} stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const nextStepsCSS = `
  .insight-next-steps {
    position: relative;
    border-radius: 20px;
    overflow: visible;
  }
  .insight-next-steps-bg {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    pointer-events: none;
  }
  .insight-next-steps-gradient {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 353 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%" width="100%" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(19.95 5.2297 -2.6788 15.115 139.5 72.973)"><stop stop-color="rgba(191,179,251,1)" offset="0"/><stop stop-color="rgba(255,236,177,0.4)" offset="1"/></radialGradient></defs></svg>');
    background-size: cover;
  }
  .insight-next-steps-overlay {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: rgba(255,255,255,0.51);
    mix-blend-mode: color-dodge;
  }
`;

function NextStepsSquigglyBorder() {
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
      viewBox="0 0 350 200"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="squiggle-nextsteps" x="-15%" y="-40%" width="130%" height="180%">
          <feTurbulence type="turbulence" baseFrequency="0.004 0.014" numOctaves={3} seed={5} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={20} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <path
        d="M 20,1.5 L 330,1.5 Q 348.5,1.5 348.5,20 L 348.5,180 Q 348.5,198.5 330,198.5 L 20,198.5 Q 1.5,198.5 1.5,180 L 1.5,20 Q 1.5,1.5 20,1.5 Z"
        fill="none"
        stroke="rgba(229,204,80,0.85)"
        strokeWidth="2.5"
        filter="url(#squiggle-nextsteps)"
      />
    </svg>
  );
}

export default function InsightPage() {
  const navigate = useNavigate();
  const { css: emotionCSS } = useEmotionColors();
  const { state, dataset, storageError } = useStudy();
  const reducedMotion = useReducedMotion();
  const latestDay = dataset?.batch.readings.reduce((latest, reading) => reading.day > latest ? reading.day : latest, '') ?? '';
  const currentState = deriveSignalState(dataset?.batch.readings ?? [], dataset?.events ?? [], new Date());
  const eventCount = dataset?.events.length ?? 0;

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#f4f2f3',
        overflow: 'hidden',
      }}
      >
      <style>{nextStepsCSS}</style>
      {storageError && <p role="alert" style={{ position: 'absolute', top: 54, left: 20, right: 20, zIndex: 3, padding: 12, borderRadius: 16, background: '#fff0ee', color: '#8a2d24', fontSize: 12 }}>{storageError}</p>}
      {dataset && <p className="lumin-muted" style={{ position: 'absolute', top: storageError ? 112 : 54, left: 20, right: 20, zIndex: 3, textAlign: 'center', fontSize: 12 }}>Source: {dataset.batch.source === 'fixture' ? 'Sample data (fixture)' : dataset.batch.source}{state.connection.message ? ` · ${state.connection.message}` : ''}</p>}

      {/* ── Polygon top-right ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration }}
      >
        <Polygon
          gradientId="insight-poly-top"
          rotateDeg={-39.16}
          left={-160}
          top={-240}
          containerW={750}
          containerH={700}
          color1={emotionCSS.color1}
          color2={emotionCSS.color2}
        />
      </motion.div>

      {/* ── Polygon bottom-left ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration, delay: reducedMotion ? 0 : 0.06 }}
      >
        <Polygon
          gradientId="insight-poly-bottom"
          rotateDeg={-166}
          left={-290}
          top={470}
          containerW={700}
          containerH={620}
          color1={emotionCSS.color1}
          color2={emotionCSS.color2}
        />
      </motion.div>

      {/* ── Scrollable content ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch' as any,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: 60,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* ── Header area ── */}
          <div style={{ height: 54, flexShrink: 0 }} />

          {/* Back button row */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration }}
            style={{ paddingLeft: 15 }}
          >
            <BackButton onClick={() => navigate('/')} />
          </motion.div>

          {/* Centered title + status */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration, delay: reducedMotion ? 0 : 0.04 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              marginTop: 4,
            }}
          >
            <h1
              style={{
                fontFamily: "'Switzer Variable','Switzer',sans-serif",
                fontWeight: 500,
                fontSize: 24,
                lineHeight: '36px',
                letterSpacing: '-0.5px',
                color: '#000',
                margin: 0,
                textAlign: 'center',
              }}
            >
              Insights
            </h1>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <motion.div
                animate={reducedMotion ? undefined : {
                  scale: [1, 1.15, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: reducedMotion ? 0 : 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#5CC950',
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "'General Sans Variable','General Sans',sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: '24px',
                  color: '#000',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {latestDay ? `Latest recorded day · ${formatDay(latestDay)}` : 'No recorded day yet'}
              </p>
            </div>
          </motion.div>

          {/* ── Content sections ── */}
          {/* Outer padding matches card edges; text sections get extra 16px to align with text inside card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 32,
            }}
          >
            {/* Next Steps card with squiggly border */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration, delay: reducedMotion ? 0 : 0.08 }}
              className="insight-next-steps"
              style={{ width: '100%' }}
            >
              <div className="insight-next-steps-bg">
                <div className="insight-next-steps-gradient" />
                <div className="insight-next-steps-overlay" />
              </div>
              <NextStepsSquigglyBorder />
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  padding: '12px 16px',
                  color: '#000',
                }}
              >
                <p
                  style={{
                    fontFamily: "'General Sans Variable','General Sans',sans-serif",
                    fontWeight: 500,
                    fontSize: 20,
                    lineHeight: '32px',
                    margin: 0,
                  }}
                >
                  Next steps
                </p>
                <p
                  style={{
                    fontFamily: "'General Sans Variable','General Sans',sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: '24px',
                    margin: 0,
                  }}
                >
                  {eventCount ? 'Review the measured differences and add context about what was happening around that day.' : 'Keep recording daily signals until Lumin can compare them with your usual range.'}
                </p>
                <Link to={eventCount ? '/events' : '/profile'} style={{ color: 'var(--color-blue)', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>{eventCount ? 'Review events' : 'Check data source'}</Link>
              </div>
            </motion.div>

            {/* Body's Mood — text aligned with text inside card (16px inset) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration, delay: reducedMotion ? 0 : 0.11 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                width: '100%',
                color: '#000',
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "'General Sans Variable','General Sans',sans-serif",
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: '32px',
                  margin: 0,
                }}
              >
                Current signal state
              </p>
              <p
                style={{
                  fontFamily: "'General Sans Variable','General Sans',sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: '24px',
                  margin: 0,
                }}
              >
                {SIGNAL_TEXT[currentState]}. This summary uses recorded daily signals and does not infer emotion.
              </p>
            </motion.div>

            {/* What your body is saying — text aligned with text inside card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...PAGE_TRANSITION, duration: reducedMotion ? 0 : PAGE_TRANSITION.duration, delay: reducedMotion ? 0 : 0.14 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                width: '100%',
                color: '#000',
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "'General Sans Variable','General Sans',sans-serif",
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: '32px',
                  margin: 0,
                }}
              >
                What is measured
              </p>
              <p
                style={{
                  fontFamily: "'General Sans Variable','General Sans',sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: '24px',
                  margin: 0,
                }}
              >
                {dataset ? `${dataset.batch.readings.length} recorded metric values from ${dataset.batch.supportedMetrics.length} supported metrics are available in the selected source.` : 'Connect Garmin or use sample data to see measured values here.'}
              </p>
              <Link to="/weekly" style={{ color: 'var(--color-blue)', minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>Open weekly summary</Link>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </MotionConfig>
  );
}
