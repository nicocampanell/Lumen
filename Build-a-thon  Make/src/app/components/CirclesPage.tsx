import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router";
import imgCanvas from "figma:asset/f0d9440aaea1a5df257044e12a049543f70c5e9d.png";
import MiniOrb from "./MiniOrb";
import type { MiniOrbPreset } from "./MiniOrb";
import svgPaths from "../../imports/svg-hh2du68m3b";
import { focusVisibilityOption } from "../../lib/signal-visuals";

/* ═══════════════════════════ DATA ═══════════════════════════ */

// Profile photos keyed by member name
const MEMBER_PHOTOS: Record<string, string> = {
  "Elena Park": "https://images.unsplash.com/photo-1643646805556-350c057663dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "David Park": "https://images.unsplash.com/photo-1738566061505-556830f8b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Mia Park": "https://images.unsplash.com/photo-1772146345330-e35689b58b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Jake Torres": "https://images.unsplash.com/photo-1617746652974-0be48cd984d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Priya Nair": "https://images.unsplash.com/photo-1710425804836-a1de39056b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Alex Rivera": "https://images.unsplash.com/photo-1765700325742-b52f566bf6dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Morgan Lee": "https://images.unsplash.com/photo-1694299352873-0c29d862e87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Sam Park": "https://images.unsplash.com/photo-1770027611367-0cdc230f4fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Zoe Wu": "https://images.unsplash.com/photo-1765248149215-b0c913b904fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Jin Oh": "https://images.unsplash.com/photo-1641760395906-8bf9c07b5a2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Kai Johnson": "https://images.unsplash.com/photo-1641760395906-8bf9c07b5a2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Luna Diaz": "https://images.unsplash.com/photo-1749318104909-ee768bac4d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "River Santos": "https://images.unsplash.com/photo-1617746652974-0be48cd984d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Ash Patel": "https://images.unsplash.com/photo-1770027611367-0cdc230f4fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "Jade Liu": "https://images.unsplash.com/photo-1589800887183-e22983ea361c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
};

// Clearly fictional copy keeps the local Circles demo separate from real people or physiology.
const MEMBER_BRIEFINGS: Record<string, Record<string, string>> = {
  "Elena Park": {
    Intimate: "Sample note: warm afternoon · Sample signal preview",
    Close: "Sample note: a quiet afternoon",
    Loose: "Sample signals only",
  },
  "David Park": {
    Intimate: "Sample note: focused morning · Sample signal preview",
    Close: "Sample note: steady morning",
    Loose: "Sample signals only",
  },
  "Mia Park": {
    Intimate: "Sample note: busy afternoon · Sample signal preview",
    Close: "Sample note: lively afternoon",
    Loose: "Sample signals only",
  },
  "Jake Torres": {
    Intimate: "Sample note: packed morning · Sample signal preview",
    Close: "Sample note: full morning",
    Loose: "Sample signals only",
  },
  "Priya Nair": {
    Intimate: "Sample note: project sprint · Sample signal preview",
    Close: "Sample note: productive morning",
    Loose: "Sample signals only",
  },
  "Alex Rivera": {
    Intimate: "Sample note: active day · Sample signal preview",
    Close: "Sample note: energetic afternoon",
    Loose: "Sample signals only",
  },
  "Morgan Lee": {
    Intimate: "Sample note: social lunch · Sample signal preview",
    Close: "Sample note: bright lunch break",
    Loose: "Sample signals only",
  },
  "Sam Park": {
    Intimate: "Sample note: quiet break · Sample signal preview",
    Close: "Sample note: thoughtful afternoon",
    Loose: "Sample signals only",
  },
  "Zoe Wu": {
    Intimate: "Sample note: creative session · Sample signal preview",
    Close: "Sample note: sketching ideas",
    Loose: "Sample signals only",
  },
  "Jin Oh": {
    Intimate: "Sample note: clear schedule · Sample signal preview",
    Close: "Sample note: composed afternoon",
    Loose: "Sample signals only",
  },
  "Kai Johnson": {
    Intimate: "Sample note: afternoon outing · Sample signal preview",
    Close: "Sample note: out exploring",
    Loose: "Sample signals only",
  },
  "Luna Diaz": {
    Intimate: "Sample note: evening reading · Sample signal preview",
    Close: "Sample note: slow evening",
    Loose: "Sample signals only",
  },
  "River Santos": {
    Intimate: "Sample note: spontaneous plans · Sample signal preview",
    Close: "Sample note: changing plans",
    Loose: "Sample signals only",
  },
  "Ash Patel": {
    Intimate: "Sample note: grounded routine · Sample signal preview",
    Close: "Sample note: consistent day",
    Loose: "Sample signals only",
  },
  "Jade Liu": {
    Intimate: "Sample note: morning goals · Sample signal preview",
    Close: "Sample note: bright morning",
    Loose: "Sample signals only",
  },
  "You": { Intimate: "Sample signal preview", Close: "Sample signal preview", Loose: "Sample signals only" },
};

interface GroupData {
  name: string;
  count: number;
  members: string[];
  preset: MiniOrbPreset;
  memberPresets: MiniOrbPreset[];
}

const GROUPS: GroupData[] = [
  {
    name: "Family",
    count: 4,
    members: ["Elena Park", "David Park", "Mia Park", "You"],
    preset: { color1: [0.98, 0.78, 0.85], color2: [0.9, 0.5, 0.35], distortion: 0.3, speed: 0.6, noiseScale: 1.5 },
    memberPresets: [
      { color1: [0.98, 0.78, 0.85], color2: [0.85, 0.45, 0.3], distortion: 0.25, speed: 0.55, noiseScale: 1.4 },
      { color1: [0.95, 0.65, 0.7], color2: [0.8, 0.35, 0.45], distortion: 0.35, speed: 0.7, noiseScale: 1.8 },
      { color1: [0.99, 0.9, 0.8], color2: [0.95, 0.7, 0.4], distortion: 0.2, speed: 0.45, noiseScale: 1.2 },
      { color1: [0.6, 0.7, 0.95], color2: [0.3, 0.4, 0.8], distortion: 0.3, speed: 0.6, noiseScale: 1.5 },
    ],
  },
  {
    name: "Roommates",
    count: 3,
    members: ["Jake Torres", "Priya Nair", "You"],
    preset: { color1: [0.5, 0.72, 0.95], color2: [0.2, 0.4, 0.82], distortion: 0.2, speed: 0.5, noiseScale: 1.2 },
    memberPresets: [
      { color1: [0.5, 0.72, 0.95], color2: [0.2, 0.4, 0.82], distortion: 0.25, speed: 0.55, noiseScale: 1.3 },
      { color1: [0.3, 0.55, 0.9], color2: [0.1, 0.25, 0.75], distortion: 0.15, speed: 0.4, noiseScale: 1.0 },
      { color1: [0.6, 0.7, 0.95], color2: [0.3, 0.4, 0.8], distortion: 0.3, speed: 0.6, noiseScale: 1.5 },
    ],
  },
  {
    name: "Coworkers",
    count: 6,
    members: ["Alex Rivera", "Morgan Lee", "Sam Park", "Zoe Wu", "Jin Oh", "You"],
    preset: { color1: [0.95, 0.85, 0.35], color2: [0.8, 0.52, 0.12], distortion: 0.4, speed: 0.8, noiseScale: 2.0 },
    memberPresets: [
      { color1: [0.95, 0.85, 0.35], color2: [0.8, 0.52, 0.12], distortion: 0.4, speed: 0.8, noiseScale: 2.0 },
      { color1: [0.9, 0.7, 0.2], color2: [0.75, 0.45, 0.08], distortion: 0.35, speed: 0.7, noiseScale: 1.8 },
      { color1: [0.98, 0.92, 0.5], color2: [0.88, 0.65, 0.2], distortion: 0.3, speed: 0.6, noiseScale: 1.5 },
      { color1: [0.92, 0.75, 0.25], color2: [0.78, 0.48, 0.1], distortion: 0.45, speed: 0.9, noiseScale: 2.2 },
      { color1: [0.85, 0.65, 0.15], color2: [0.7, 0.4, 0.05], distortion: 0.25, speed: 0.55, noiseScale: 1.3 },
      { color1: [0.6, 0.7, 0.95], color2: [0.3, 0.4, 0.8], distortion: 0.3, speed: 0.6, noiseScale: 1.5 },
    ],
  },
  {
    name: "Friends",
    count: 5,
    members: ["Kai Johnson", "Luna Diaz", "River Santos", "Ash Patel", "You"],
    preset: { color1: [0.7, 0.5, 0.95], color2: [0.4, 0.22, 0.82], distortion: 0.35, speed: 0.7, noiseScale: 1.8 },
    memberPresets: [
      { color1: [0.7, 0.5, 0.95], color2: [0.4, 0.22, 0.82], distortion: 0.35, speed: 0.7, noiseScale: 1.8 },
      { color1: [0.55, 0.35, 0.88], color2: [0.28, 0.12, 0.72], distortion: 0.3, speed: 0.65, noiseScale: 1.6 },
      { color1: [0.82, 0.65, 0.98], color2: [0.52, 0.35, 0.88], distortion: 0.4, speed: 0.75, noiseScale: 2.0 },
      { color1: [0.65, 0.42, 0.92], color2: [0.35, 0.18, 0.78], distortion: 0.25, speed: 0.58, noiseScale: 1.4 },
      { color1: [0.6, 0.7, 0.95], color2: [0.3, 0.4, 0.8], distortion: 0.3, speed: 0.6, noiseScale: 1.5 },
    ],
  },
  {
    name: "Project",
    count: 2,
    members: ["Jade Liu", "You"],
    preset: { color1: [0.3, 0.85, 0.75], color2: [0.1, 0.52, 0.52], distortion: 0.15, speed: 0.4, noiseScale: 1.0 },
    memberPresets: [
      { color1: [0.3, 0.85, 0.75], color2: [0.1, 0.52, 0.52], distortion: 0.15, speed: 0.4, noiseScale: 1.0 },
      { color1: [0.6, 0.7, 0.95], color2: [0.3, 0.4, 0.8], distortion: 0.3, speed: 0.6, noiseScale: 1.5 },
    ],
  },
];

/* ═══════════════════════════ CSS ═══════════════════════════ */

const pageCSS = `
  /* Glass pill */
  .cp-glass-pill {
    position: relative;
    background: linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 100%);
    backdrop-filter: blur(32px) saturate(200%) brightness(1.05);
    -webkit-backdrop-filter: blur(32px) saturate(200%) brightness(1.05);
    border: 1px solid rgba(255,255,255,0.3);
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.1), 0 8px 32px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  .cp-glass-pill::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.2));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* Visibility glass table */
  .cp-visibility-glass {
    position: relative;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.06) 100%
    );
    backdrop-filter: blur(32px) saturate(200%) brightness(1.05);
    -webkit-backdrop-filter: blur(32px) saturate(200%) brightness(1.05);
    border-radius: 20px;
    border: 1px solid transparent;
    background-clip: padding-box;
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.3),
      inset 0 -2px 4px rgba(0, 0, 0, 0.1);
    overflow: visible;
  }
  /* Gradient border for refraction illusion */
  .cp-visibility-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.2)
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 0;
  }
  /* Shimmering highlight sweep */
  .cp-visibility-glass::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(
      105deg,
      transparent 40%,
      rgba(255, 255, 255, 0.18) 50%,
      transparent 60%
    );
    background-size: 200% 100%;
    animation: cp-vis-shimmer 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
    pointer-events: none;
    z-index: 0;
  }
  @keyframes cp-vis-shimmer {
    0%   { background-position: -100% 0; }
    100% { background-position: 200% 0; }
  }
  /* Sliding frosted pill */
  .cp-visibility-pill {
    position: absolute;
    left: 4px;
    right: 4px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow:
      0 4px 16px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
    pointer-events: none;
    z-index: 1;
    overflow: visible;
  }

  /* Carousel 3D */
  .cp-carousel-track {
    transform-style: preserve-3d;
    transition: transform 0.24s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  .cp-carousel-track.dragging {
    transition: none;
  }
  .cp-carousel-item {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    cursor: pointer;
  }

  /* Sway animations */
  @keyframes cp-sway-a { 0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)} }
  @keyframes cp-sway-b { 0%,100%{transform:rotate(1.2deg)}50%{transform:rotate(-1.2deg)} }
  @keyframes cp-sway-c { 0%,100%{transform:rotate(1deg)}50%{transform:rotate(-1.8deg)} }
  @keyframes cp-sway-d { 0%,100%{transform:rotate(-0.8deg)}50%{transform:rotate(1.6deg)} }
  @keyframes cp-sway-e { 0%,100%{transform:rotate(1.3deg)}50%{transform:rotate(-1deg)} }
  @keyframes cp-sway-f { 0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(0.8deg)} }
  .cp-sway-a{animation:cp-sway-a 8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-sway-b{animation:cp-sway-b 7s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-sway-c{animation:cp-sway-c 9.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-sway-d{animation:cp-sway-d 8.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-sway-e{animation:cp-sway-e 7.2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-sway-f{animation:cp-sway-f 9.2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}

  /* Glow drift animations */
  @keyframes cp-glow-a {
    0%,100%{transform:translate(-50%,-50%) rotate(0deg) scale(1,0.85)}
    25%{transform:translate(-45%,-55%) rotate(15deg) scale(0.9,1)}
    50%{transform:translate(-52%,-48%) rotate(-10deg) scale(1.05,0.8)}
    75%{transform:translate(-48%,-52%) rotate(8deg) scale(0.85,1.05)}
  }
  @keyframes cp-glow-b {
    0%,100%{transform:translate(-50%,-50%) rotate(5deg) scale(0.9,1)}
    33%{transform:translate(-55%,-47%) rotate(-12deg) scale(1,0.85)}
    66%{transform:translate(-46%,-53%) rotate(18deg) scale(0.85,1.05)}
  }
  @keyframes cp-glow-c {
    0%,100%{transform:translate(-50%,-50%) rotate(-8deg) scale(1,0.9)}
    30%{transform:translate(-47%,-54%) rotate(12deg) scale(0.9,1.05)}
    60%{transform:translate(-53%,-46%) rotate(-15deg) scale(1.05,0.85)}
  }
  @keyframes cp-glow-d {
    0%,100%{transform:translate(-50%,-50%) rotate(3deg) scale(1,0.88)}
    40%{transform:translate(-52%,-48%) rotate(-10deg) scale(0.92,1.02)}
    70%{transform:translate(-48%,-52%) rotate(12deg) scale(1.05,0.88)}
  }
  @keyframes cp-glow-e {
    0%,100%{transform:translate(-50%,-50%) rotate(-5deg) scale(0.95,1)}
    35%{transform:translate(-46%,-53%) rotate(14deg) scale(1,0.88)}
    65%{transform:translate(-54%,-47%) rotate(-8deg) scale(0.88,1.06)}
  }
  @keyframes cp-glow-f {
    0%,100%{transform:translate(-50%,-50%) rotate(8deg) scale(1,0.92)}
    45%{transform:translate(-50%,-50%) rotate(-12deg) scale(0.9,1.04)}
    80%{transform:translate(-48%,-52%) rotate(6deg) scale(1.02,0.9)}
  }
  .cp-glow-a{animation:cp-glow-a 6s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-glow-b{animation:cp-glow-b 7.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-glow-c{animation:cp-glow-c 8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-glow-d{animation:cp-glow-d 6.8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-glow-e{animation:cp-glow-e 7.8s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}
  .cp-glow-f{animation:cp-glow-f 8.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}

  @keyframes cp-glow-group {
    0%,100%{transform:translate(-50%,-50%) rotate(0deg) scale(1,0.9)}
    20%{transform:translate(-47%,-53%) rotate(10deg) scale(0.92,1.05)}
    45%{transform:translate(-53%,-48%) rotate(-8deg) scale(1.06,0.88)}
    70%{transform:translate(-48%,-52%) rotate(14deg) scale(0.9,1.02)}
    90%{transform:translate(-52%,-47%) rotate(-5deg) scale(1.03,0.93)}
  }
  .cp-glow-group{animation:cp-glow-group 9s cubic-bezier(0.25, 0.1, 0.25, 1) infinite}

  /* Hide scrollbar */
  .cp-scroll::-webkit-scrollbar { display: none; }
  .cp-scroll { scrollbar-width: none; }
`;

/* ═══════════════════ SQUIGGLY BORDER (two lines) ═══════════════ */

function IntimateSquigglyBorder() {
  const w = 302;
  const h = 92;
  const r = 20;
  const outerPath = `M ${r},1.5 L ${w - r},1.5 Q ${w - 1.5},1.5 ${w - 1.5},${r} L ${w - 1.5},${h - r} Q ${w - 1.5},${h - 1.5} ${w - r},${h - 1.5} L ${r},${h - 1.5} Q 1.5,${h - 1.5} 1.5,${h - r} L 1.5,${r} Q 1.5,1.5 ${r},1.5 Z`;

  return (
    <svg
      aria-hidden
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="squiggle-intimate-1" x="-15%" y="-40%" width="130%" height="180%">
          <feTurbulence type="turbulence" baseFrequency="0.004 0.014" numOctaves="3" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      {/* Single scribble line — golden yellow */}
      <path
        d={outerPath}
        fill="none"
        stroke="rgba(229,204,80,0.85)"
        strokeWidth="2.5"
        filter="url(#squiggle-intimate-1)"
      />
    </svg>
  );
}

/* ═══════════════════════ 3D CAROUSEL ════════════════════════ */

const CAROUSEL_RADIUS = 152;
const N_GROUPS = GROUPS.length;

interface CarouselProps {
  activeIdx: number;
  rotation: number;
  isDragging: boolean;
  onItemClick: (idx: number) => void;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
}

function Carousel({ activeIdx, rotation, isDragging, onItemClick, onPointerDown, onPointerMove, onPointerUp }: CarouselProps) {
  return (
    <div
      style={{
        width: "100%",
        height: 240,
        perspective: "560px",
        perspectiveOrigin: "50% 48%",
        position: "relative",
        overflow: "visible",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* 3D track */}
      <div
        className={`cp-carousel-track${isDragging ? " dragging" : ""}`}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: `rotateY(${-rotation}deg)`,
        }}
      >
        {GROUPS.map((group, i) => {
          const angle = i * (360 / N_GROUPS);
          const isActive = i === activeIdx;
          const orbSize = isActive ? 86 : 72;
          const c1 = group.preset.color1;
          const glowColor = `rgba(${Math.round(c1[0] * 255)},${Math.round(c1[1] * 255)},${Math.round(c1[2] * 255)}`;

          return (
            <div
              key={group.name}
              className="cp-carousel-item"
              style={{
                position: "absolute",
                transform: `rotateY(${angle}deg) translateZ(${CAROUSEL_RADIUS}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                top: -(orbSize / 2 + 17),
                left: -(orbSize / 2),
                width: orbSize,
              }}
              onClick={() => onItemClick(i)}
            >
              {/* Glow blob behind orb */}
              {isActive && (
                <div
                  className="cp-glow-group"
                  style={{
                    position: "absolute",
                    top: orbSize / 2,
                    left: "50%",
                    width: orbSize * 2.8,
                    height: orbSize * 2.8,
                    borderRadius: "50%",
                    background: `radial-gradient(circle at 50% 50%, ${glowColor},0.4) 0%, ${glowColor},0.1) 45%, transparent 72%)`,
                    filter: "blur(18px)",
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
              <MiniOrb preset={group.preset} size={orbSize} />
              <p
                style={{
                  fontFamily: "'General Sans Variable','General Sans',sans-serif",
                  fontWeight: isActive ? 500 : 400,
                  fontSize: isActive ? 16 : 13,
                  lineHeight: "24px",
                  color: isActive ? "#212121" : "rgba(33,33,33,0.65)",
                  whiteSpace: "nowrap",
                  margin: 0,
                  textAlign: "center",
                  pointerEvents: "none",
                  letterSpacing: "0.1px",
                }}
              >
                {group.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════ SWIPEABLE CIRCLE SELECTOR ═══════════════ */

const ITEM_WIDTH = 100;

function SwipeableCircleSelector({ activeIdx, onItemClick, groups }: { activeIdx: number; onItemClick: (idx: number) => void; groups: GroupData[] }) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const dragStartX = useRef(0);
  const isDraggingRef = useRef(false);
  const pointerStartX = useRef(0);
  const hasDraggedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const [containerWidth, setContainerWidth] = useState(375);
  const [bounceKey, setBounceKey] = useState(0);
  const [keyboardChange, setKeyboardChange] = useState(false);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Velocity tracking
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const velocityRef = useRef(0);
  const velocitySamples = useRef<{ v: number; t: number }[]>([]);

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    resizeObserverRef.current?.disconnect();
    if (node) {
      containerRef.current = node;
      setContainerWidth(node.offsetWidth);
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) setContainerWidth(entry.contentRect.width);
      });
      resizeObserverRef.current = ro;
      ro.observe(node);
    }
  }, []);

  useEffect(() => () => resizeObserverRef.current?.disconnect(), []);

  const getTargetX = useCallback((idx: number) => -(idx * ITEM_WIDTH), []);

  // Set initial position without animation on mount
  const initializedRef = useRef(false);
  React.useEffect(() => {
    if (!initializedRef.current) {
      x.set(getTargetX(activeIdx));
      initializedRef.current = true;
      return;
    }
    // Haptic bounce: overshoot then settle
    const target = getTargetX(activeIdx);
    if (reduceMotion || keyboardChange) {
      x.set(target);
      setKeyboardChange(false);
      return;
    }
    setBounceKey((k) => k + 1);
    animate(x, target, {
      type: "spring",
      stiffness: 320,
      damping: 22,
      mass: 0.7,
      velocity: velocityRef.current * 0.3,
    });
  }, [activeIdx, getTargetX, reduceMotion]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    pointerStartX.current = e.clientX;
    hasDraggedRef.current = false;
    suppressClickRef.current = false;
    dragStartX.current = e.clientX - x.get();
    lastPointerX.current = e.clientX;
    lastPointerTime.current = Date.now();
    velocitySamples.current = [];
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    if (Math.abs(e.clientX - pointerStartX.current) > 4) hasDraggedRef.current = true;
    const now = Date.now();
    const dt = now - lastPointerTime.current;
    if (dt > 0) {
      const v = (e.clientX - lastPointerX.current) / dt * 1000;
      velocitySamples.current.push({ v, t: now });
      velocitySamples.current = velocitySamples.current.filter((s) => now - s.t < 80);
    }
    lastPointerX.current = e.clientX;
    lastPointerTime.current = now;

    const newX = e.clientX - dragStartX.current;
    const minX = getTargetX(groups.length - 1);
    const maxX = getTargetX(0);
    if (newX > maxX) {
      x.set(maxX + (newX - maxX) * 0.3);
    } else if (newX < minX) {
      x.set(minX + (newX - minX) * 0.3);
    } else {
      x.set(newX);
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (hasDraggedRef.current) suppressClickRef.current = true;
    hasDraggedRef.current = false;

    const samples = velocitySamples.current;
    let avgVelocity = 0;
    if (samples.length > 0) {
      avgVelocity = samples.reduce((sum, s) => sum + s.v, 0) / samples.length;
    }
    velocityRef.current = avgVelocity;

    const currentX = x.get();
    const momentumFactor = 0.15;
    const projectedX = currentX + avgVelocity * momentumFactor;

    let newIdx = Math.round(-projectedX / ITEM_WIDTH);
    newIdx = Math.max(0, Math.min(groups.length - 1, newIdx));

    if (newIdx !== activeIdx) {
      onItemClick(newIdx);
    } else {
      if (reduceMotion) {
        x.set(getTargetX(activeIdx));
      } else {
        animate(x, getTargetX(activeIdx), {
          type: "spring",
          stiffness: 320,
          damping: 22,
          mass: 0.7,
        });
      }
    }
  };

  return (
    <div
      ref={measuredRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: 210,
        overflow: "visible",
        touchAction: "pan-y",
        cursor: "grab",
        userSelect: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      tabIndex={0}
      role="group"
      aria-label="Sample Circles selector. Use left and right arrow keys to choose a circle."
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          const direction = e.key === "ArrowLeft" ? -1 : 1;
          const nextIdx = Math.max(0, Math.min(groups.length - 1, activeIdx + direction));
          setKeyboardChange(nextIdx !== activeIdx);
          onItemClick(nextIdx);
        }
      }}
    >
      <motion.div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          position: "relative",
          x,
          paddingLeft: containerWidth / 2 - ITEM_WIDTH / 2,
          paddingRight: containerWidth / 2 - ITEM_WIDTH / 2,
          paddingTop: 40,
          paddingBottom: 10,
        }}
      >
        {groups.map((g, i) => {
          const isActive = i === activeIdx;
          const orbSize = isActive ? 86 : 77;
          const c1 = g.preset.color1;
          return (
            <motion.div
              key={g.name}
              onClick={() => {
                if (suppressClickRef.current) {
                  suppressClickRef.current = false;
                  return;
                }
                onItemClick(i);
              }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: isActive ? 14 : 12, position: "relative", width: ITEM_WIDTH, flexShrink: 0,
              }}
              animate={{
                scale: isActive ? 1 : 0.85,
                opacity: isActive ? 1 : 0.55,
              }}
              transition={reduceMotion || keyboardChange ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Haptic bounce on the orb itself */}
              <motion.div
                key={`orb-bounce-${isActive ? bounceKey : 'inactive'}-${i}`}
                style={{ position: "relative", zIndex: 1 }}
                {...(isActive ? {
                  initial: reduceMotion || keyboardChange ? false : { scale: 1.12 },
                  animate: { scale: 1 },
                  transition: reduceMotion || keyboardChange ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 15, mass: 0.5 },
                } : {})}
              >
                {/* Radial glow — centered on the orb */}
                {isActive && (
                  <motion.div
                    key={`glow-${bounceKey}`}
                    initial={reduceMotion || keyboardChange ? false : { scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={reduceMotion || keyboardChange ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 18, mass: 0.6 }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 240,
                      height: 240,
                      pointerEvents: "none",
                      zIndex: -1,
                    }}
                  >
                    <svg width="240" height="240" viewBox="0 0 240 240" fill="none" style={{ display: "block" }}>
                      <defs>
                        <radialGradient id={`cp-circle-glow-${i}`} cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
                          <stop offset="0%" stopColor={`rgb(${Math.round(c1[0]*255)},${Math.round(c1[1]*255)},${Math.round(c1[2]*255)})`} stopOpacity="0.55" />
                          <stop offset="45%" stopColor={`rgb(${Math.round(c1[0]*255)},${Math.round(c1[1]*255)},${Math.round(c1[2]*255)})`} stopOpacity="0.2" />
                          <stop offset="100%" stopColor={`rgb(${Math.round(c1[0]*255)},${Math.round(c1[1]*255)},${Math.round(c1[2]*255)})`} stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      <circle cx="120" cy="120" r="120" fill={`url(#cp-circle-glow-${i})`} />
                    </svg>
                  </motion.div>
                )}
                <MiniOrb
                  preset={g.preset}
                  size={orbSize}
                />
              </motion.div>
              <p style={{
                fontFamily: "'General Sans Variable','General Sans',sans-serif",
                fontWeight: isActive ? 500 : 400, fontSize: isActive ? 18 : 16,
                lineHeight: isActive ? "28px" : "25px", color: "#212121", margin: 0,
                whiteSpace: "nowrap", textAlign: "center", position: "relative", zIndex: 1,
              }}>
                {g.name}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ════════════════════ GROUP PILL (detail center) ════════════ */

function GroupPill({ group }: { group: GroupData }) {
  const c1 = group.preset.color1;
  const c2 = group.preset.color2;
  return (
    <div style={{ position: "absolute", left: "50%", top: "calc(50% - 32px)", transform: "translate(-50%, -50%)" }}>
      <div
        className="cp-glow-group"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 210,
          height: 210,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%,
            rgba(${Math.round(c1[0]*255)},${Math.round(c1[1]*255)},${Math.round(c1[2]*255)},0.42) 0%,
            rgba(${Math.round(c2[0]*255)},${Math.round(c2[1]*255)},${Math.round(c2[2]*255)},0.14) 38%,
            transparent 72%)`,
          filter: "blur(20px)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="cp-glass-pill"
        style={{ borderRadius: 296, padding: "10px 18px", position: "relative" }}
      >
        <p style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "'Switzer Variable','Switzer',sans-serif",
          fontWeight: 500,
          fontSize: 18,
          lineHeight: "28px",
          letterSpacing: "-0.5px",
          color: "#212121",
          whiteSpace: "nowrap",
          margin: 0,
        }}>
          {group.name}
        </p>
      </div>
    </div>
  );
}

/* ════════════════ LINE / STRING HELPERS ════════════════════ */

const CIRCLE_D = 94;
const CIRCLE_R = CIRCLE_D / 2;
const STR_GAP = 10;
const NAME_H = 24;

function lineBoxIntersect(
  dx: number, dy: number,
  boxL: number, boxR: number, boxT: number, boxB: number
) {
  const hits: { x: number; y: number; t: number }[] = [];
  if (dx !== 0) {
    for (const ex of [boxL, boxR]) {
      const t = ex / dx;
      if (t > 0 && t <= 1) { const y = t * dy; if (y >= boxT && y <= boxB) hits.push({ x: ex, y, t }); }
    }
  }
  if (dy !== 0) {
    for (const ey of [boxT, boxB]) {
      const t = ey / dy;
      if (t > 0 && t <= 1) { const x = t * dx; if (x >= boxL && x <= boxR) hits.push({ x, y: ey, t }); }
    }
  }
  hits.sort((a, b) => a.t - b.t);
  return hits[0] ?? { x: dx, y: dy };
}

const SWAY_CLASSES = ["cp-sway-a","cp-sway-b","cp-sway-c","cp-sway-d","cp-sway-e","cp-sway-f"];
const GLOW_CLASSES = ["cp-glow-a","cp-glow-b","cp-glow-c","cp-glow-d","cp-glow-e","cp-glow-f"];

function MemberString({
  name, anchorX, anchorY, dx, dy, nameWidth, swayClass, glowClass, preset,
}: {
  name: string; anchorX: number; anchorY: number; dx: number; dy: number;
  nameWidth: number; swayClass: string; glowClass: string; preset: MiniOrbPreset;
}) {
  const PADDING = 4;
  const boxW = Math.max(CIRCLE_D, nameWidth);
  const bHW = boxW / 2;
  const end = lineBoxIntersect(
    dx, dy,
    dx - bHW - PADDING, dx + bHW + PADDING,
    dy - CIRCLE_R - PADDING, dy + CIRCLE_R + STR_GAP + NAME_H + PADDING
  );
  const mx = end.x / 2, my = end.y / 2;
  const len = Math.sqrt(end.x * end.x + end.y * end.y) || 1;
  const perpX = -end.y / len, perpY = end.x / len;
  const sag = len * 0.08;
  const sagDir = perpY >= 0 ? 1 : -1;
  const curvePath = `M0,0 Q${(mx + perpX * sag * sagDir).toFixed(1)},${(my + perpY * sag * sagDir).toFixed(1)} ${end.x.toFixed(1)},${end.y.toFixed(1)}`;
  const c1 = preset.color1;

  return (
    <div className={swayClass} style={{ position: "absolute", left: anchorX, top: anchorY, transformOrigin: "0 0", pointerEvents: "none" }}>
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible", width: 1, height: 1 }}>
        <path d={curvePath} stroke="#212121" strokeOpacity="0.18" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
      <div style={{ position: "absolute", left: dx - bHW, top: dy - CIRCLE_R, width: boxW, display: "flex", flexDirection: "column", alignItems: "center", gap: STR_GAP, pointerEvents: "auto" }}>
        <div className={glowClass} style={{
          position: "absolute",
          top: CIRCLE_D / 2,
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: CIRCLE_D * 3.2,
          height: CIRCLE_D * 3.2,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%,
            rgba(${Math.round(c1[0]*255)},${Math.round(c1[1]*255)},${Math.round(c1[2]*255)},0.3) 0%,
            rgba(${Math.round(c1[0]*255)},${Math.round(c1[1]*255)},${Math.round(c1[2]*255)},0.08) 42%,
            transparent 70%)`,
          filter: "blur(18px)",
          pointerEvents: "none",
        }} />
        <MiniOrb preset={preset} size={CIRCLE_D} />
        <p style={{ fontFamily: "'General Sans','General Sans Variable',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: "24px", letterSpacing: "0.21px", color: "#212121", whiteSpace: "nowrap", margin: 0 }}>
          {name}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════ DETAIL VIEW ════════════════════════ */

function DetailView({ group, onBack }: { group: GroupData; onBack: () => void }) {
  const n = group.members.length;
  const radius = n <= 2 ? 172 : n <= 3 ? 176 : n <= 4 ? 166 : 154;

  const memberData = group.members.map((name, i) => {
    const angleDeg = (i * 360 / n) - 90;
    const angle = angleDeg * Math.PI / 180;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;
    const pillHalfW = 62, pillHalfH = 22;
    const mag = Math.sqrt(dx * dx + dy * dy) || 1;
    const anchorX = (dx / mag) * pillHalfW;
    const anchorY = (dy / mag) * pillHalfH;
    return {
      name,
      dx, dy, anchorX, anchorY,
      nameWidth: name.length * 8.2,
      swayClass: SWAY_CLASSES[i % 6],
      glowClass: GLOW_CLASSES[i % 6],
      preset: group.memberPresets[i],
    };
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Dotted canvas background */}
      <div style={{ position: "absolute", inset: 0, background: "#f4f2f3" }}>
        <img alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }} src={imgCanvas} />
      </div>

      {/* Back button — glass pill, right edge */}
      <div style={{ position: "absolute", right: 0, top: 44, zIndex: 10 }}>
        <button
          onClick={onBack}
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 100%)",
            backdropFilter: "blur(32px) saturate(200%)",
            WebkitBackdropFilter: "blur(32px) saturate(200%)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "296px 0 0 296px",
            padding: "10px 14px 10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Chevron left */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M17 7L10 14L17 21" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Strings origin at pill center */}
      <div style={{ position: "absolute", left: "50%", top: "calc(50% - 32px)", width: 0, height: 0 }}>
        {memberData.map((m) => (
          <MemberString key={m.name} {...m} />
        ))}
      </div>

      {/* Group pill */}
      <GroupPill group={group} />
    </div>
  );
}

/* ════════════════ VISIBILITY GLASS TABLE ════════════ */

function VisibilityGlassTable({
  selectedVisibility,
  setSelectedVisibility,
  visibilityOptions,
}: {
  selectedVisibility: string;
  setSelectedVisibility: (visibility: string) => void;
  visibilityOptions: { label: string; description: string }[];
}) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState<{ top: number; height: number }>({ top: 0, height: 0 });

  const selectedIndex = visibilityOptions.findIndex((o) => o.label === selectedVisibility);

  // Measure pill position from item refs
  React.useEffect(() => {
    const el = itemRefs.current[selectedIndex];
    const container = containerRef.current;
    if (!el || !container) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setPillStyle({
      top: eRect.top - cRect.top,
      height: eRect.height,
    });
  }, [selectedIndex]);

  return (
    <div
      ref={containerRef}
      className="cp-visibility-glass"
      role="radiogroup"
      aria-label="Sample sharing preview"
      style={{ padding: 4, position: "relative" }}
    >
      {/* Sliding selection pill with squiggly border */}
      <motion.div
        className="cp-visibility-pill"
        animate={{ top: pillStyle.top, height: pillStyle.height }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
          mass: 0.6,
        }}
      >
        {/* Squiggly jagged border */}
        <svg
          aria-hidden
          style={{ position: "absolute", inset: -2, width: "calc(100% + 4px)", height: "calc(100% + 4px)", pointerEvents: "none", overflow: "visible" }}
          viewBox="0 0 350 80"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="squiggle-visibility" x="-15%" y="-40%" width="130%" height="180%">
              <feTurbulence type="turbulence" baseFrequency="0.004 0.014" numOctaves={3} seed={5} result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale={20} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <rect
            x="1.5"
            y="1.5"
            width="347"
            height="77"
            rx="16"
            ry="16"
            fill="none"
            stroke="rgba(229,204,80,0.85)"
            strokeWidth="2.5"
            filter="url(#squiggle-visibility)"
          />
        </svg>
      </motion.div>

      {/* Options */}
      {visibilityOptions.map((opt, i) => {
        const isSelected = selectedVisibility === opt.label;
        return (
          <button
            type="button"
            role="radio"
            aria-checked={isSelected}
            key={opt.label}
            ref={(el) => { itemRefs.current[i] = el; }}
            onClick={() => setSelectedVisibility(opt.label)}
            style={{
              position: "relative",
              zIndex: 2,
              borderRadius: 16,
              padding: "10px 14px 10px 10px",
              cursor: "pointer",
              transition: "background 0.2s ease",
              border: "none",
              background: "transparent",
              width: "100%",
              minHeight: 44,
              textAlign: "left",
            }}
          >
            {/* Content */}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              {/* Animated radio */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
                <circle cx="8" cy="8" r="7" stroke={isSelected ? "#000000" : "#212121"} strokeWidth="1.5" />
                <motion.circle
                  cx="8"
                  cy="8"
                  fill="#000000"
                  initial={false}
                  animate={{ r: isSelected ? 4 : 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    mass: 0.6,
                  }}
                />
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <p style={{
                  fontFamily: "'General Sans Variable','General Sans',sans-serif",
                  fontWeight: isSelected ? 500 : 400,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "#212121",
                  margin: 0,
                  transition: "font-weight 0.25s ease",
                }}>
                  {opt.label}
                </p>
                <p style={{
                  fontFamily: "'General Sans Variable','General Sans',sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "22px",
                  letterSpacing: "0.21px",
                  color: isSelected ? "#212121" : "rgba(33,33,33,0.65)",
                  margin: 0,
                  transition: "color 0.25s ease",
                }}>
                  {opt.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════ ADD PERSON MODAL ═══════════════════════ */

function AddPersonModal({ onClose }: { onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const [name, setName] = useState("");
  const [previewed, setPreviewed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const dialog = document.querySelector("[data-sample-person-dialog]") as HTMLElement | null;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>("button, input, [tabindex]:not([tabindex='-1'])")).filter((el) => !el.hasAttribute("disabled"));
      if (!focusable.length) return;
      const current = document.activeElement;
      const index = focusable.indexOf(current as HTMLElement);
      const next = e.shiftKey ? (index <= 0 ? focusable.length - 1 : index - 1) : (index + 1) % focusable.length;
      if (index === -1 || next !== index) { e.preventDefault(); focusable[next].focus(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="add-person-backdrop"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(6px) saturate(130%)",
          WebkitBackdropFilter: "blur(6px) saturate(130%)",
          background: "rgba(0,0,0,0.12)",
          padding: "0 24px",
        }}
      >
        <motion.div
          data-sample-person-dialog
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-person-title"
          key="add-person-sheet"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: "100%",
            maxWidth: 288,
            borderRadius: 32,
            /* Liquid glass base */
            background: "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.52) 100%)",
            backdropFilter: "blur(32px) saturate(200%) brightness(1.05)",
            WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(1.05)",
            border: "1px solid rgba(255,255,255,0.45)",
            boxShadow: [
              "0 16px 48px rgba(0,0,0,0.22)",
              "inset 0 2px 4px rgba(255,255,255,0.55)",
              "inset 0 -2px 4px rgba(0,0,0,0.06)",
            ].join(", "),
            padding: "32px 24px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gradient border refraction overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 32,
              padding: 1,
              background: "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.25))",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              pointerEvents: "none",
            }}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#555",
              fontSize: 16,
              lineHeight: 1,
              padding: 0,
              transition: "color 0.24s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#111"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#555"; }}
          >
            ✕
          </button>

          {/* Title */}
          <p id="sample-person-title" style={{
            fontFamily: "'General Sans Variable','General Sans',sans-serif",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "24px",
            color: "#212121",
            margin: "0 0 8px 0",
            textAlign: "left",
          }}>
            Sample person name
          </p>

          {/* Sample display-name input: nothing is sent. */}
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setPreviewed(false); }}
            placeholder="eg. Casey Lee"
            aria-label="Sample person name"
            style={{
              width: "100%",
              boxSizing: "border-box",
              fontFamily: "'General Sans Variable','General Sans',sans-serif",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: "24px",
              color: "#212121",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(33,33,33,0.18)",
              borderRadius: 0,
              padding: "6px 0 10px",
              caretColor: "#212121",
            }}
          />

          <p className="lumin-muted" style={{ fontSize: 12, lineHeight: "18px", margin: "12px 0 0" }}>
            Nothing is sent. This only previews a sample invitation.
          </p>

          {previewed && (
            <p role="status" style={{ fontSize: 14, lineHeight: "20px", margin: "12px 0 0", color: "#212121" }}>
              Preview ready for {name.trim() || "this sample person"}.
            </p>
          )}

          {/* Preview button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
            <button
              type="button"
              className="sample-preview-button"
              onClick={() => setPreviewed(true)}
              style={{
                fontFamily: "'General Sans Variable','General Sans',sans-serif",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "24px",
                color: "#212121",
                background: "linear-gradient(122deg, #FECCDA 27%, rgba(229,204,80,0.65) 82%)",
                border: "none",
                borderRadius: 9999,
                padding: "8px 12px",
                minHeight: 44,
                minWidth: 44,
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              Preview invitation
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════ LEAVE CIRCLE MODAL ════════════════════ */

function LeaveCircleModal({ onClose, onLeave }: { onClose: () => void; onLeave: () => void }) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const dialog = document.querySelector("[data-leave-sample-dialog]") as HTMLElement | null;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>("button, [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const index = focusable.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (index <= 0 ? focusable.length - 1 : index - 1) : (index + 1) % focusable.length;
      e.preventDefault();
      focusable[next].focus();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="leave-circle-backdrop"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(6px) saturate(130%)",
          WebkitBackdropFilter: "blur(6px) saturate(130%)",
          background: "rgba(0,0,0,0.12)",
          padding: "0 24px",
        }}
      >
        <motion.div
          ref={dialogRef}
          data-leave-sample-dialog
          role="dialog"
          aria-modal="true"
          aria-labelledby="leave-sample-title"
          key="leave-circle-sheet"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            width: "100%",
            maxWidth: 288,
            borderRadius: 32,
            background: "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.52) 100%)",
            backdropFilter: "blur(32px) saturate(200%) brightness(1.05)",
            WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(1.05)",
            border: "1px solid rgba(255,255,255,0.45)",
            boxShadow: [
              "0 16px 48px rgba(0,0,0,0.22)",
              "inset 0 2px 4px rgba(255,255,255,0.55)",
              "inset 0 -2px 4px rgba(0,0,0,0.06)",
            ].join(", "),
            padding: "32px 24px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Gradient border refraction overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 32,
              padding: 1,
              background: "linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.25))",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              pointerEvents: "none",
            }}
          />

          {/* Question */}
          <p id="leave-sample-title" style={{
            fontFamily: "'General Sans Variable','General Sans',sans-serif",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "24px",
            color: "#212121",
            margin: "0 0 20px 0",
            textAlign: "center",
          }}>
            Leave this sample circle?
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            {/* Yes — filled gradient */}
            <button
              type="button"
              onClick={() => { onLeave(); onClose(); }}
              style={{
                width: "100%",
                padding: "12px 8px",
                borderRadius: 9999,
                border: "none",
                background: "linear-gradient(90deg, #BFB3FB 0%, #DFCFD6 50%, #FFECB1 100%)",
                cursor: "pointer",
                fontFamily: "'General Sans Variable','General Sans',sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "#212121",
                transition: "opacity 0.24s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              Leave sample circle
            </button>

            {/* No — outline only */}
            <button
              type="button"
              onClick={onClose}
              style={{
                width: "100%",
                padding: "12px 8px",
                borderRadius: 9999,
                border: "1.5px solid rgba(33,33,33,0.35)",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "'General Sans Variable','General Sans',sans-serif",
                fontWeight: 500,
                fontSize: 15,
                color: "#212121",
                transition: "border-color 0.24s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(33,33,33,0.7)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(33,33,33,0.35)"; }}
            >
              No
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════ LANDING VIEW ═══════════════════════ */

function LandingView({
  group,
  activeIdx,
  onItemClick,
  selectedVisibility, setSelectedVisibility,
  visibilityOpen, setVisibilityOpen,
  groups,
  onLeave,
  onOpen,
}: {
  group: GroupData;
  activeIdx: number;
  onItemClick: (idx: number) => void;
  selectedVisibility: string;
  setSelectedVisibility: (v: string) => void;
  visibilityOpen: boolean;
  setVisibilityOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  groups: GroupData[];
  onLeave: () => void;
  onOpen: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [addPersonOpen, setAddPersonOpen] = useState(false);
  const [leaveCircleOpen, setLeaveCircleOpen] = useState(false);
  const addReturnRef = useRef<HTMLElement | null>(null);
  const leaveTriggerRef = useRef<HTMLElement | null>(null);
  const openAddPerson = (target: HTMLElement) => {
    addReturnRef.current = target;
    setAddPersonOpen(true);
  };
  const closeAddPerson = () => {
    setAddPersonOpen(false);
    requestAnimationFrame(() => addReturnRef.current?.focus());
  };
  const closeLeaveCircle = () => {
    setLeaveCircleOpen(false);
    requestAnimationFrame(() => leaveTriggerRef.current?.focus());
  };
  const visibilityOptions = [
    { label: "Intimate", description: "Sharing preview: orb, sample notes, and signal examples." },
    { label: "Close", description: "Sharing preview: orb and sample note examples." },
    { label: "Loose", description: "Sharing preview: sample orb only." },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#f4f2f3", overflow: "hidden" }}>

      {/* Decorative polygon — bottom right, matching Figma */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -80,
          bottom: 40,
          width: 433,
          height: 489,
          pointerEvents: "none",
          zIndex: 0,
          transform: "rotate(-104.2deg) scaleY(-1)",
        }}
      >
        <svg width="418" height="341" viewBox="0 0 418 341" fill="none" style={{ display: "block" }}>
          <path
            d={svgPaths.p275fab00}
            fill="url(#cp-landing-poly)"
            opacity="0.65"
          />
          <defs>
            <radialGradient
              id="cp-landing-poly"
              cx="0" cy="0"
              gradientTransform="translate(209 165.379) rotate(90) scale(170.5 209)"
              gradientUnits="userSpaceOnUse"
              r="1"
            >
              <stop stopColor="#FECCDA" />
              <stop offset="1" stopColor="#E5CC50" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Scrollable content */}
      <div
        className="cp-scroll"
        style={{ position: "absolute", inset: 0, overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch" as any, zIndex: 1 }}
      >
        <div style={{ display: "flex", flexDirection: "column", paddingBottom: 140, width: "100%", boxSizing: "border-box" }}>

          {/* ── Header ── */}
          <div style={{ height: 16, flexShrink: 0 }} />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 24, paddingRight: 20 }}
          >
            <div>
            <h1 className="text-[24px]" style={{
              fontFamily: "'Switzer Variable','Switzer',sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.5px",
              color: "#212121",
              margin: 0,
            }}>
              Circles
            </h1>
            <p className="lumin-muted" style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", fontWeight: 400, fontSize: 12, lineHeight: "18px", margin: "2px 0 0" }}>
              Sample Circles · demo people and signals
            </p>
            </div>
            <button type="button" onClick={(e) => openAddPerson(e.currentTarget)} className="lumin-button" style={{ background: "linear-gradient(122deg,#FECCDA 27%,rgba(229,204,80,0.51) 82%)", border: 0, padding: "4px 16px", cursor: "pointer", whiteSpace: "nowrap" }}>
              <span style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "#212121" }}>
                Add New
              </span>
            </button>
          </motion.div>

          {/* ── Swipeable Circle Selector ── */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.24, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ marginTop: 24 }}
          >
            <SwipeableCircleSelector activeIdx={activeIdx} onItemClick={onItemClick} groups={groups} />
          </motion.div>

          <div style={{ padding: "0 24px", marginTop: -4 }}>
            <button
              type="button"
              onClick={onOpen}
              className="lumin-button"
              style={{ width: "100%", border: "1px solid var(--color-divider)", background: "rgba(255,255,255,.66)", color: "#212121", cursor: "pointer", fontSize: 14 }}
            >
              Open sample network
            </button>
          </div>

          {/* ── Visibility section ── */}
          <div className="px-[24px] pt-[28px] pb-[24px]"
            style={{ padding: "28px 24px 24px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: visibilityOpen ? 16 : 0 }}>
              {/* Eye icon */}
              <div style={{ width: 24, height: 24, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", inset: 0 }}>
                  <path clipRule="evenodd" d={svgPaths.p8966d00} fill="#09244B" fillRule="evenodd" />
                </svg>
              </div>
              <p style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", fontWeight: 500, fontSize: 20, lineHeight: "32px", color: "#212121", margin: 0 }}>
                Visibility
              </p>
              <span className="lumin-muted" style={{ fontSize: 12, lineHeight: "18px" }}>Sharing preview</span>
              {/* Toggle */}
              <button
                onClick={() => setVisibilityOpen((v) => !v)}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, flexShrink: 0 }}
                aria-label={visibilityOpen ? "Hide visibility options" : "Show visibility options"}
              >
                <svg width="32" height="18" viewBox="0 0 32 18" fill="none">
                  <motion.rect
                    width="32"
                    height="18"
                    rx="9"
                    animate={{ fill: visibilityOpen ? "#212121" : "#BBB9BC" }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <motion.circle
                    cy="9"
                    r="6"
                    fill="white"
                    initial={{ cx: visibilityOpen ? 23 : 9 }}
                    animate={{ cx: visibilityOpen ? 23 : 9 }}
                    transition={{ duration: 0 }}
                  />
                </svg>
              </button>
            </div>

            {visibilityOpen && (
                <div style={{ overflow: "hidden" }}>
                  <div role="radiogroup" aria-label="Sample sharing preview" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {visibilityOptions.map((opt, i) => {
                      const isSelected = selectedVisibility === opt.label;
                      return (
                        <button
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          key={opt.label}
                          onClick={() => setSelectedVisibility(opt.label)}
                          onKeyDown={(e) => {
                            if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                            e.preventDefault();
                            const direction = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
                            const next = (i + direction + visibilityOptions.length) % visibilityOptions.length;
                            setSelectedVisibility(visibilityOptions[next].label);
                            const radioGroup = e.currentTarget.parentElement;
                            requestAnimationFrame(() => {
                              focusVisibilityOption(radioGroup, next);
                            });
                          }}
                          style={{
                            position: "relative",
                            cursor: "pointer",
                            padding: "10px 12px",
                            borderRadius: 24,
                            border: "none",
                            background: "transparent",
                            width: "100%",
                            minHeight: 44,
                            textAlign: "left",
                          }}
                        >
                          {/* Sliding highlight — layoutId gives navbar-style bounce between rows */}
                          {isSelected && (
                            <motion.div
                              layoutId="visibility-selection-highlight"
                              transition={{ duration: 0 }}
                              style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: 24,
                                pointerEvents: "none",
                              }}
                            >
                              {/* Gradient fill — clipped inside border-radius */}
                              <div style={{ position: "absolute", inset: 0, borderRadius: 24, overflow: "hidden" }}>
                                <div
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: 24,
                                    backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 318 96" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%25" width="100%25" fill="url(%23grad)" opacity="1"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(17.972 2.7892 -2.4132 8.0616 125.67 38.919)"><stop stop-color="rgba(191,179,251,1)" offset="0"/><stop stop-color="rgba(223,207,214,1)" offset="0.5"/><stop stop-color="rgba(255,236,177,1)" offset="1"/></radialGradient></defs></svg>')`,
                                    backgroundSize: "cover",
                                  }}
                                />
                                <div style={{
                                  position: "absolute",
                                  inset: 0,
                                  background: "rgba(255,255,255,0.51)",
                                  mixBlendMode: "color-dodge",
                                  borderRadius: 24,
                                }} />
                              </div>

                              {/* Squiggly jagged border — same recipe as Insight Next Steps */}
                              <svg
                                aria-hidden
                                style={{
                                  position: "absolute",
                                  inset: -2,
                                  width: "calc(100% + 4px)",
                                  height: "calc(100% + 4px)",
                                  pointerEvents: "none",
                                  overflow: "visible",
                                }}
                                viewBox="0 0 322 84"
                                preserveAspectRatio="none"
                              >
                                <defs>
                                  <filter id="squiggle-vis-sel" x="-15%" y="-40%" width="130%" height="180%">
                                    <feTurbulence type="turbulence" baseFrequency="0.004 0.014" numOctaves={3} seed={5} result="noise" />
                                    <feDisplacementMap in="SourceGraphic" in2="noise" scale={20} xChannelSelector="R" yChannelSelector="G" />
                                  </filter>
                                </defs>
                                <rect
                                  x="1.5"
                                  y="1.5"
                                  width="319"
                                  height="81"
                                  rx="23"
                                  ry="23"
                                  fill="none"
                                  stroke="rgba(229,204,80,0.85)"
                                  strokeWidth="2.5"
                                  filter="url(#squiggle-vis-sel)"
                                />
                              </svg>
                            </motion.div>
                          )}

                          {/* Content */}
                          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                            {/* Animated radio — black filled dot springs in/out */}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
                              <circle
                                cx="8"
                                cy="8"
                                r="7"
                                stroke={isSelected ? "#000000" : "#212121"}
                                strokeWidth="1.5"
                              />
                              <motion.circle
                                cx="8"
                                cy="8"
                                fill="#000000"
                                initial={false}
                                animate={{ r: isSelected ? 4 : 0 }}
                                transition={{ duration: 0 }}
                              />
                            </svg>
                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              <p style={{
                                fontFamily: "'General Sans Variable','General Sans',sans-serif",
                                fontWeight: isSelected ? 500 : 400,
                                fontSize: 16,
                                lineHeight: "24px",
                                color: "#212121",
                                margin: 0,
                              }}>
                                {opt.label}
                              </p>
                              <p style={{
                                fontFamily: "'General Sans Variable','General Sans',sans-serif",
                                fontWeight: 400,
                                fontSize: 14,
                                lineHeight: "24px",
                                letterSpacing: "0.21px",
                                color: "#212121",
                                margin: 0,
                              }}>
                                {opt.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {!visibilityOpen && (
                <p
                  style={{
                    fontFamily: "'General Sans Variable','General Sans',sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: "22px",
                    color: "rgba(33,33,33,0.65)",
                    margin: 0,
                    marginTop: 8,
                  }}
                >
                  Sample sharing preview is hidden
                </p>
              )}
          </div>

          {/* ── People section ── */}
          <div
            style={{ padding: "28px 24px 0" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {/* Person icon from imported SVGs */}
              <div style={{ width: 24, height: 24, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", inset: 0 }}>
                  <path clipRule="evenodd" d={svgPaths.p29640100} fill="#09244B" fillRule="evenodd" />
                </svg>
              </div>
              <p style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", fontWeight: 500, fontSize: 20, lineHeight: "32px", color: "#212121", margin: 0 }}>
                People ({group.count})
              </p>
              <span className="lumin-muted" style={{ fontSize: 12, lineHeight: "18px" }}>Sample signals</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {group.members.map((member) => {
                const photo = MEMBER_PHOTOS[member];
                const briefing = (MEMBER_BRIEFINGS[member] ?? {})[selectedVisibility] ?? "";
                const isYou = member === "You";
                return (
                <div key={member} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  {/* Avatar */}
                  <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, overflow: "hidden", background: "#BBB9BC", position: "relative", marginTop: 2 }}>
                    {photo && !isYou ? (
                      <img
                        src={photo}
                        alt={member}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #FECCDA 0%, #E5CC50 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", fontWeight: 600, fontSize: 16, color: "#212121" }}>
                          {member.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Name + briefing */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "#212121", margin: 0 }}>
                      {member}
                    </p>
                    {briefing && (
                      <p style={{
                        fontFamily: "'General Sans Variable','General Sans',sans-serif",
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "18px",
                        letterSpacing: "0.1px",
                        color: "var(--color-muted)",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        {briefing}
                      </p>
                    )}
                  </div>
                </div>
                );
              })}
            </div>

            {/* Add New Person — styled as a member row */}
            <button
              type="button"
              onClick={(e) => openAddPerson(e.currentTarget)}
              style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 18, cursor: "pointer", border: 0, background: "transparent", padding: 0, textAlign: "left", width: "100%" }}
            >
              {/* 44×44 circle matching user avatar size */}
              <div style={{
                width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                border: "1.5px dashed rgba(33,33,33,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 2,
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="#212121" strokeOpacity="0.55" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </div>
              {/* Name-style text, left-aligned */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: 48, marginTop: 2 }}>
                <p style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "rgba(33,33,33,0.55)", margin: 0 }}>
                  Add new person
                </p>
              </div>
            </button>
          </div>

          {/* ── Leave Circle ── */}
          <div
            style={{ padding: "36px 20px 0", textAlign: "center" }}
          >
            <button
              ref={leaveTriggerRef as React.RefObject<HTMLButtonElement>}
              type="button"
              onClick={() => setLeaveCircleOpen(true)}
              style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "#212121", margin: "4px auto 0", cursor: "pointer", border: 0, background: "transparent", padding: "10px 16px", minHeight: 44 }}
            >
              Leave sample circle
            </button>
          </div>
        </div>
      </div>

      {/* Add Person Modal */}
      {addPersonOpen && <AddPersonModal onClose={closeAddPerson} />}

      {/* Leave Circle Modal */}
      {leaveCircleOpen && <LeaveCircleModal onClose={closeLeaveCircle} onLeave={() => { onLeave(); closeLeaveCircle(); }} />}
    </div>
  );
}

/* ══════════════════════ MAIN COMPONENT ══════════════════════ */

export default function CirclesPage() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<GroupData[]>(GROUPS);
  const [activeGroupIdx, setActiveGroupIdx] = useState(Math.floor(GROUPS.length / 2));

  // Per-circle visibility settings
  const [visibilityMap, setVisibilityMap] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    GROUPS.forEach((g) => { map[g.name] = "Intimate"; });
    return map;
  });
  const [visibilityOpenMap, setVisibilityOpenMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    GROUPS.forEach((g) => { map[g.name] = true; });
    return map;
  });

  function handleItemClick(idx: number) {
    setActiveGroupIdx(idx);
  }

  function handleLeave() {
    setGroups((prev) => {
      const next = prev.filter((_, i) => i !== activeGroupIdx);
      return next;
    });
    setActiveGroupIdx((prev) => Math.max(0, prev - 1));
  }

  const activeGroup = groups[activeGroupIdx];

  if (!activeGroup) {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{pageCSS}</style>
        <p style={{ fontFamily: "'General Sans Variable','General Sans',sans-serif", color: "#888", fontSize: 16 }}>No circles yet</p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <style>{pageCSS}</style>

      <LandingView
        group={activeGroup}
        activeIdx={activeGroupIdx}
        onItemClick={handleItemClick}
        groups={groups}
        onLeave={handleLeave}
        selectedVisibility={visibilityMap[activeGroup.name]}
        setSelectedVisibility={(v) => setVisibilityMap((m) => ({ ...m, [activeGroup.name]: v }))}
        visibilityOpen={visibilityOpenMap[activeGroup.name]}
        setVisibilityOpen={(v) => {
          const groupName = activeGroup.name;
          setVisibilityOpenMap((m) => ({
            ...m,
            [groupName]: typeof v === "function" ? v(m[groupName]) : v,
          }));
        }}
        onOpen={() => navigate("/circle", { state: { group: activeGroup } })}
      />
    </div>
  );
}
