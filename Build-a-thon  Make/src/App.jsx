// App component
import { useRef, useEffect } from 'react'
import Scene from './components/Scene'
import TimeBar from './components/TimeBar'
import { useScrollEmotion } from './hooks/useScrollEmotion'
import StatusBar from './imports/StatusBar'
import NavBar from './imports/NavBar'
import Insight from './imports/Insight'

export default function App() {
  const { activeIndex, setActiveIndex, currentEmotion } = useScrollEmotion()
  const glowRef = useRef(null)

  // Animate glow to follow orb's floating motion
  useEffect(() => {
    let raf
    const start = performance.now()
    const animate = () => {
      const t = (performance.now() - start) / 1000
      const y = Math.sin(t * 0.6) * 6 + Math.sin(t * 1.3) * 2
      const x = Math.sin(t * 0.4) * 3
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-60% + ${y}px))`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Safety check: ensure emotion is loaded
  if (!currentEmotion) {
    return null
  }

  return (
    <div
      className="relative mx-auto flex flex-col"
      style={{
        width: 390,
        height: 844,
        backgroundColor: '#F4F2F3',
        borderRadius: 44,
        overflow: 'hidden',
      }}
    >
      {/* Status bar area */}
      <div style={{ paddingTop: 8, flexShrink: 0 }}>
        <StatusBar />
      </div>

      {/* 16px spacing between status bar and Morning, Nico */}
      <div style={{ height: 16, flexShrink: 0 }} />

      {/* Header: Morning, Nico + Notification pill */}
      <div className="flex items-center justify-between" style={{ paddingLeft: 24 }}>
        <h1 className="text-[24px]" style={{ fontWeight: 500, color: '#212121' }}>
          Morning, Nico
        </h1>

        {/* Notification pill — bleeds off right edge */}
        <div
          className="flex flex-col justify-center"
          style={{
            padding: '8px 16px 8px 24px',
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '70px 0 0 70px',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[14px]" style={{ fontWeight: 300, color: '#212121' }}>
              Cortisol Spike
            </span>
            <span className="text-[14px]" style={{ fontWeight: 300, color: '#F05B51' }}>
              4:32
            </span>
          </div>
          <span className="text-[14px]" style={{ fontWeight: 300, color: '#212121', opacity: 0.4 }}>
            07+ Notifications
          </span>
        </div>
      </div>

      {/* Time bar */}
      <div style={{ marginTop: 46 }}>
        <TimeBar activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>

      {/* Ambient glow — background light emanating from orb */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: 750,
          height: 750,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${Math.round(currentEmotion.color1[0] * 255)}, ${Math.round(currentEmotion.color1[1] * 255)}, ${Math.round(currentEmotion.color1[2] * 255)}, 0.5) 0%, rgba(${Math.round(currentEmotion.color1[0] * 255)}, ${Math.round(currentEmotion.color1[1] * 255)}, ${Math.round(currentEmotion.color1[2] * 255)}, 0.2) 35%, rgba(${Math.round(currentEmotion.color1[0] * 255)}, ${Math.round(currentEmotion.color1[1] * 255)}, ${Math.round(currentEmotion.color1[2] * 255)}, 0) 65%)`,
          pointerEvents: 'none',
          transition: 'background 1.5s ease',
          zIndex: 0,
        }}
      />

      {/* Orb — absolutely centered in the frame */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          width: 390,
          height: 390,
          pointerEvents: 'none',
        }}
      >
        <Scene
          emotion={currentEmotion}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Insight card — 16px above NavBar */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: 40,
          right: 40,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Insight />
        <NavBar />
      </div>
    </div>
  )
}