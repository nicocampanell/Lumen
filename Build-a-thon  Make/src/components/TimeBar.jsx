import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const LINE_W = 1
const GAP = 10
const STEP = LINE_W + GAP
const HEIGHTS = Array.from({ length: 25 }, (_, i) => [16, 8, 10, 12, 10, 8][i % 6] ?? 16)
const BLACK_INDICES = [0, 4, 8, 12, 16, 20, 24]
const BAR_W = (HEIGHTS.length - 1) * STEP + LINE_W
const MAX_H = 16

function tickForIndex(index, count) {
  if (count <= 1) return 0
  return Math.round((index / (count - 1)) * (HEIGHTS.length - 1))
}

export default function TimeBar({ activeIndex = 0, onSelect = () => {}, items = [] }) {
  const barRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const safeItems = Array.isArray(items) && items.length ? items : [{ label: 'Latest', ariaLabel: 'Latest recorded day' }]
  const ticks = useMemo(() => safeItems.map((_, index) => tickForIndex(index, safeItems.length)), [safeItems.length])
  const selected = Math.max(0, Math.min(activeIndex, safeItems.length - 1))
  const activeTick = ticks[selected] ?? 0
  const selectorX = activeTick * STEP + LINE_W / 2

  const xToIndex = useCallback((clientX) => {
    const rect = barRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(clientX - rect.left, BAR_W))
    onSelect(Math.round((x / BAR_W) * (safeItems.length - 1)))
  }, [onSelect, safeItems.length])

  useEffect(() => {
    const element = barRef.current
    if (!element) return undefined
    const onWheel = (event) => {
      if (event.deltaY === 0 || safeItems.length <= 1) return
      event.preventDefault()
      onSelect(Math.max(0, Math.min(selected + (event.deltaY > 0 ? 1 : -1), safeItems.length - 1)))
    }
    element.addEventListener('wheel', onWheel, { passive: false })
    return () => element.removeEventListener('wheel', onWheel)
  }, [onSelect, safeItems.length, selected])

  const onPointerDown = useCallback((event) => {
    setDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
    xToIndex(event.clientX)
  }, [xToIndex])

  const onPointerMove = useCallback((event) => {
    if (dragging) xToIndex(event.clientX)
  }, [dragging, xToIndex])

  const onKeyDown = useCallback((event) => {
    let next = selected
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next += 1
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next -= 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = safeItems.length - 1
    if (next !== selected) {
      event.preventDefault()
      onSelect(Math.max(0, Math.min(next, safeItems.length - 1)))
    }
  }, [onSelect, safeItems.length, selected])

  return (
    <div className="flex flex-col items-center">
      <div
        ref={barRef}
        role="slider"
        tabIndex={0}
        aria-label="Time of day"
        aria-valuemin={0}
        aria-valuemax={safeItems.length - 1}
        aria-valuenow={selected}
        aria-valuetext={safeItems[selected]?.ariaLabel ?? safeItems[selected]?.label}
        style={{ width: BAR_W, minHeight: 64, padding: '24px 0', position: 'relative', cursor: 'pointer', touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        onKeyDown={onKeyDown}
      >
        <div style={{ display: 'flex', alignItems: 'center', height: MAX_H, gap: GAP }}>
          {HEIGHTS.map((height, index) => (
            <div key={index} aria-hidden="true" style={{ width: LINE_W, height, backgroundColor: '#212121', opacity: BLACK_INDICES.includes(index) ? 1 : 0.3, borderRadius: 1, flexShrink: 0 }} />
          ))}
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 31, width: BAR_W, height: 2, backgroundColor: '#212121', opacity: 0.16, borderRadius: 1 }} />
        <div style={{ position: 'absolute', left: selectorX - 1.5, top: 4, width: 3, height: 64, pointerEvents: 'none', transition: dragging ? 'none' : 'left 0.24s cubic-bezier(0.25, 0.1, 0.25, 1)' }}>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: 1, height: 64, backgroundColor: '#F05B51', opacity: 0.35 }} />
          <div style={{ position: 'absolute', top: 20, width: 3, height: 24, backgroundColor: '#F05B51', borderRadius: 1.5 }} />
        </div>
        <div style={{ display: 'flex', position: 'relative', marginTop: 4, width: BAR_W }} aria-hidden="true">
          {(safeItems.length > 1 ? BLACK_INDICES : [0]).map((tickIndex) => {
            const itemIndex = safeItems.length > 1 ? Math.round((tickIndex / (HEIGHTS.length - 1)) * (safeItems.length - 1)) : 0
            return <span key={tickIndex} className="text-[12px]" style={{ position: 'absolute', left: tickIndex * STEP, transform: 'translateX(-50%)', color: '#212121', opacity: 0.55, fontSize: 12 }}>{safeItems[itemIndex]?.label}</span>
          })}
        </div>
      </div>
    </div>
  )
}
