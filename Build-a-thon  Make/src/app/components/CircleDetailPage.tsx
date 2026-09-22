/**
 * CircleDetailPage — the floating-orb network view for a specific circle.
 * Reached by navigating to /circle with router state { groupIdx }.
 * Scrollable in all directions + pinch/wheel zoom.
 */
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import MiniOrb from "./MiniOrb";
import type { MiniOrbPreset } from "./MiniOrb";

/* ═══════════════════════════ SHARED TYPES ═══════════════════════════ */

export interface GroupData {
  name: string;
  count: number;
  members: string[];
  preset: MiniOrbPreset;
  memberPresets: MiniOrbPreset[];
}

/* ═══════════════════════════ CSS ═══════════════════════════ */

const PAGE_CSS = `
  /* Float animations */
  @keyframes cd-float-a { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
  @keyframes cd-float-b { 0%,100%{transform:translateY(-5px)} 50%{transform:translateY(7px)} }
  @keyframes cd-float-c { 0%,100%{transform:translateY(4px)} 42%{transform:translateY(-9px)} }
  @keyframes cd-float-d { 0%,100%{transform:translateY(-3px)} 56%{transform:translateY(8px)} }
  @keyframes cd-float-e { 0%,100%{transform:translateY(6px)} 44%{transform:translateY(-8px)} }
  @keyframes cd-float-f { 0%,100%{transform:translateY(-4px)} 48%{transform:translateY(9px)} }
  .cd-float-a { animation: cd-float-a 6.2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }
  .cd-float-b { animation: cd-float-b 7.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }
  .cd-float-c { animation: cd-float-c 8.2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }
  .cd-float-d { animation: cd-float-d 6.8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }
  .cd-float-e { animation: cd-float-e 7.9s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }
  .cd-float-f { animation: cd-float-f 9.1s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }

  /* Glow pulse — centered behind orb */
  @keyframes cd-glow { 0%,100%{opacity:0.55;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.85;transform:translate(-50%,-50%) scale(1.08)} }
  .cd-glow { animation: cd-glow 4.8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }

  /* Glass back button */
  .cd-glass-back {
    background: linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 100%);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.35);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.04);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.18s ease, transform 0.14s ease;
  }
  .cd-glass-back:hover { box-shadow: 0 6px 22px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.7); }
  .cd-glass-back:active { transform: scale(0.93); }

  /* Glass zoom buttons */
  .cd-glass-btn {
    background: linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 100%);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.35);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.04);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow 0.18s ease, transform 0.14s ease;
  }
  .cd-glass-btn:hover { box-shadow: 0 6px 22px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.7); }
  .cd-glass-btn:active { transform: scale(0.93); }
`;

/* ═══════════════════════ ORB LAYOUT HELPERS ═══════════════════════ */

const FLOAT_CLASSES = ["cd-float-a", "cd-float-b", "cd-float-c", "cd-float-d", "cd-float-e", "cd-float-f"];

/**
 * Returns (cx, cy) positions for each member scattered on the canvas.
 * "You" is always centered; others radiate outward, staggered left/right.
 */
function buildMemberPositions(members: string[], canvasW: number, canvasH: number) {
  const n = members.length;
  const cx = canvasW / 2;
  const cy = canvasH / 2;

  if (n === 1) return [{ cx, cy }];

  // For 2 members: side-by-side center
  if (n === 2) {
    return [
      { cx: cx - 100, cy: cy - 30 },
      { cx: cx + 100, cy: cy + 30 },
    ];
  }

  // For 3+: "You" in center, others placed in an organic radial scatter
  const positions: { cx: number; cy: number }[] = [];
  const youIdx = members.findIndex((m) => m === "You");

  // Place You at center
  const centerPos = { cx, cy };

  // Radial placement for others with slight randomness per-index for organic feel
  const offsets = [
    { dx: -130, dy: -110 },
    { dx: 135,  dy: -80  },
    { dx: -140, dy: 110  },
    { dx: 130,  dy: 130  },
    { dx: 0,    dy: -155 },
    { dx: -10,  dy: 160  },
    { dx: -160, dy: 10   },
    { dx: 160,  dy: -10  },
  ];

  let offsetIdx = 0;
  for (let i = 0; i < n; i++) {
    if (i === youIdx) {
      positions.push(centerPos);
    } else {
      const off = offsets[offsetIdx % offsets.length];
      positions.push({ cx: cx + off.dx, cy: cy + off.dy });
      offsetIdx++;
    }
  }

  return positions;
}

/* ═══════════════════════ CONSTANTS ═══════════════════════ */

const MIN_SCALE = 0.3;
const MAX_SCALE = 3.0;
const DOT_SPACING = 22;

/* ═══════════════════════ ORB SIZE ═══════════════════════ */

function getOrbSize(name: string) {
  if (name === "You") return 110;
  return 92 + Math.floor(name.length % 3) * 6; // slight variation by name
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function CircleDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { group } = (location.state ?? {}) as { group?: GroupData };

  // Fallback if no state (e.g., direct URL visit)
  if (!group) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: "#f4f2f3" }}>
        <button onClick={() => navigate("/circles")} style={{ padding: "12px 24px", borderRadius: 24, background: "#212121", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'General Sans Variable',sans-serif" }}>
          Back to Circles
        </button>
      </div>
    );
  }

  return <CanvasView group={group} onBack={() => navigate("/circles")} />;
}

/* ═══════════════════════ CANVAS VIEW ═══════════════════════ */

function CanvasView({ group, onBack }: { group: GroupData; onBack: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 });

  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const isPinching = useRef(false);
  const lastPinchDist = useRef(0);
  const pointersMap = useRef<Map<number, { x: number; y: number }>>(new Map());

  // Canvas size — large enough to pan around
  const CANVAS_W = 390;
  const CANVAS_H = 700;

  /* ── Clamp pan within reasonable bounds ── */
  const clamp = useCallback((x: number, y: number, scale: number) => {
    const el = containerRef.current;
    if (!el) return { x, y, scale };
    const cw = el.clientWidth;
    const ch = el.clientHeight;
    const pad = 100;
    const minX = Math.min(0, cw - CANVAS_W * scale - pad);
    const maxX = Math.max(0, pad);
    const minY = Math.min(0, ch - CANVAS_H * scale - pad);
    const maxY = Math.max(0, pad);
    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y)),
      scale,
    };
  }, [CANVAS_W, CANVAS_H]);

  const zoomAt = useCallback((factor: number, px: number, py: number) => {
    setView((v) => {
      const ns = Math.max(MIN_SCALE, Math.min(MAX_SCALE, v.scale * factor));
      const sf = ns / v.scale;
      return clamp(px - (px - v.x) * sf, py - (py - v.y) * sf, ns);
    });
  }, [clamp]);

  /* ── Pointer drag ── */
  const onPointerDown = (e: React.PointerEvent) => {
    pointersMap.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointersMap.current.size === 1 && !isPinching.current) {
      dragging.current = true;
      setIsDragging(true);
      lastPointer.current = { x: e.clientX, y: e.clientY };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    pointersMap.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (!dragging.current || isPinching.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    setView((v) => clamp(v.x + dx, v.y + dy, v.scale));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointersMap.current.delete(e.pointerId);
    if (pointersMap.current.size < 2) isPinching.current = false;
    if (pointersMap.current.size === 0) { dragging.current = false; setIsDragging(false); }
  };

  /* ── Pinch ── */
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      isPinching.current = true;
      dragging.current = false;
      setIsDragging(false);
      lastPinchDist.current = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY
      );
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 2 || !isPinching.current) return;
    const dist = Math.hypot(
      e.touches[1].clientX - e.touches[0].clientX,
      e.touches[1].clientY - e.touches[0].clientY
    );
    if (lastPinchDist.current > 0) {
      const rect = containerRef.current!.getBoundingClientRect();
      const mx = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      const my = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
      zoomAt(dist / lastPinchDist.current, mx, my);
    }
    lastPinchDist.current = dist;
  };
  const onTouchEnd = () => { isPinching.current = false; lastPinchDist.current = 0; };

  /* ── Scroll wheel zoom ── */
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const rect = containerRef.current!.getBoundingClientRect();
    zoomAt(e.deltaY < 0 ? 1.1 : 0.91, e.clientX - rect.left, e.clientY - rect.top);
  }, [zoomAt]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const zoomBtn = (factor: number) => {
    const el = containerRef.current!;
    zoomAt(factor, el.clientWidth / 2, el.clientHeight / 2);
  };

  /* ── Dot grid ── */
  const dotPx = DOT_SPACING * view.scale;
  const dotX = ((view.x % dotPx) + dotPx) % dotPx;
  const dotY = ((view.y % dotPx) + dotPx) % dotPx;

  /* ── Compute orb positions ── */
  const positions = buildMemberPositions(group.members, CANVAS_W, CANVAS_H);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#f4f2f3", overflow: "hidden" }}>
      <style>{PAGE_CSS}</style>

      {/* Moving dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.13) 1.5px, transparent 1.5px)",
          backgroundSize: `${dotPx}px ${dotPx}px`,
          backgroundPosition: `${dotX}px ${dotY}px`,
        }}
      />

      {/* Pan/zoom area */}
      <div
        ref={containerRef}
        style={{
          position: "absolute", inset: 0,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none", touchAction: "none", zIndex: 1,
        }}
        tabIndex={0}
        aria-label="Sample signals canvas. Use arrow keys to pan and plus or minus to zoom."
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const dx = e.key === "ArrowLeft" ? 24 : e.key === "ArrowRight" ? -24 : 0;
            const dy = e.key === "ArrowUp" ? 24 : e.key === "ArrowDown" ? -24 : 0;
            setView((v) => clamp(v.x + dx, v.y + dy, v.scale));
          } else if (e.key === "+" || e.key === "=") {
            e.preventDefault();
            zoomBtn(1.1);
          } else if (e.key === "-") {
            e.preventDefault();
            zoomBtn(0.91);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Transformed canvas */}
        <div
          style={{
            position: "absolute",
            width: CANVAS_W,
            height: CANVAS_H,
            transformOrigin: "0 0",
            transform: `translate(${view.x}px,${view.y}px) scale(${view.scale})`,
            willChange: "transform",
          }}
        >
          {group.members.map((name, i) => {
            const preset = group.memberPresets[i];
            const pos = positions[i];
            const size = getOrbSize(name);
            const floatClass = FLOAT_CLASSES[i % FLOAT_CLASSES.length];
            const [r, g, b] = preset.color1;
            const R = Math.round(r * 255);
            const G = Math.round(g * 255);
            const B = Math.round(b * 255);
            const glowSize = size * 2.7;

            return (
              <div
                key={name}
                className={floatClass}
                style={{
                  position: "absolute",
                  // top-left corner of orb so that orb center = pos
                  left: pos.cx - size / 2,
                  top: pos.cy - size / 2,
                  width: size,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  pointerEvents: "none",
                }}
              >
                {/* Glow — centered exactly on the orb */}
                <div
                  className="cd-glow"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: size / 2,
                    transform: "translate(-50%, -50%)",
                    width: glowSize,
                    height: glowSize,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 50% 50%,
                      rgba(${R},${G},${B},0.42) 0%,
                      rgba(${R},${G},${B},0.16) 38%,
                      rgba(${R},${G},${B},0.04) 60%,
                      transparent 72%)`,
                    filter: "blur(24px)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                {/* Orb */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <MiniOrb preset={preset} size={size} />
                </div>

                {/* Name */}
                <p
                  style={{
                    fontFamily: "'General Sans Variable','General Sans',sans-serif",
                    fontWeight: name === "You" ? 600 : 500,
                    fontSize: name === "You" ? 15 : 14,
                    lineHeight: "20px",
                    color: "#212121",
                    margin: 0,
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    textShadow: "0 1px 4px rgba(244,242,243,0.95), 0 0 8px rgba(244,242,243,0.8)",
                  }}
                >
                  {name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Group name label — top left ── */}
      <div
        style={{
          position: "absolute",
          top: 44,
          left: 20,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "'Switzer Variable','Switzer',sans-serif",
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: "-0.4px",
            color: "#212121",
            margin: 0,
            textShadow: "0 1px 6px rgba(244,242,243,0.9)",
          }}
        >
          {group.name}
        </p>
        <p style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: "18px", color: "#625c57", margin: "4px 0 0" }}>
          Sample Circles · Sample signals · demo people
        </p>
      </div>

      {/* ── Back button — right edge, glass pill ── */}
      <div style={{ position: "absolute", right: 0, top: 44, zIndex: 20 }}>
        <button
          className="cd-glass-back"
          onClick={onBack}
          style={{ borderRadius: "296px 0 0 296px", padding: "10px 14px 10px 20px" }}
          aria-label="Back to Circles"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17 7L10 14L17 21" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Zoom controls — bottom right ── */}
      <div
        style={{
          position: "absolute", right: 20, bottom: 28, zIndex: 20,
          display: "flex", flexDirection: "column", gap: 10,
        }}
      >
        <button className="cd-glass-btn" style={{ width: 46, height: 46, borderRadius: "50%" }} onClick={() => zoomBtn(1.3)} aria-label="Zoom in on sample signals">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10h12" stroke="#212121" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
        <button className="cd-glass-btn" style={{ width: 46, height: 46, borderRadius: "50%" }} onClick={() => zoomBtn(0.77)} aria-label="Zoom out on sample signals">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12" stroke="#212121" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          className="cd-glass-btn"
          style={{ width: 46, height: 46, borderRadius: "50%" }}
          onClick={() => setView(clamp(0, 0, 1))}
          title="Reset view"
          aria-label="Reset sample signal view"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="3" stroke="#212121" strokeWidth="2" />
            <path d="M9 1v2M9 15v2M1 9h2M15 9h2" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
