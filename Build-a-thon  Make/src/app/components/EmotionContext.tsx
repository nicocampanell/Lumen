import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { signalVisual } from '../../lib/signal-visuals.ts';

export interface EmotionColors {
  color1: number[];
  color2: number[];
}

/** Converts a [0-1, 0-1, 0-1] array to an "r, g, b" string */
function toRgb(c: number[]): string {
  return `${Math.round(c[0] * 255)}, ${Math.round(c[1] * 255)}, ${Math.round(c[2] * 255)}`;
}

export interface EmotionCSS {
  /** e.g. "rgb(51, 102, 204)" */
  color1: string;
  /** e.g. "rgb(26, 51, 128)" */
  color2: string;
  /** Solid gradient string using color1 → color2 */
  gradient: string;
  /** Subtle (15% opacity) gradient, like the "meet you" button */
  gradientSubtle: string;
}

interface EmotionContextType {
  emotion: EmotionColors | null;
  setEmotion: (e: EmotionColors) => void;
  /** Persisted TimeBar index so it survives page navigation */
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  /** Ready-to-use CSS color values derived from the current emotion */
  css: EmotionCSS;
}

const fallbackCSS: EmotionCSS = {
  color1: 'rgb(33,33,33)',
  color2: 'rgb(33,33,33)',
  gradient: 'linear-gradient(135deg, rgb(33,33,33), rgb(33,33,33))',
  gradientSubtle: 'rgba(0,0,0,0.05)',
};

const EmotionContext = createContext<EmotionContextType>({
  emotion: null,
  setEmotion: () => {},
  activeIndex: 0,
  setActiveIndex: () => {},
  css: fallbackCSS,
});

export function EmotionProvider({ children }: { children: ReactNode }) {
  const initial = signalVisual('insufficient_data');
  const [emotion, setEmotion] = useState<EmotionColors | null>({ color1: initial.color1, color2: initial.color2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const css = useMemo<EmotionCSS>(() => {
    if (!emotion) return fallbackCSS;
    const r1 = toRgb(emotion.color1);
    const r2 = toRgb(emotion.color2);
    return {
      color1: `rgb(${r1})`,
      color2: `rgb(${r2})`,
      gradient: `linear-gradient(135deg, rgb(${r1}), rgb(${r2}))`,
      gradientSubtle: `linear-gradient(135deg, rgba(${r1}, 0.15), rgba(${r2}, 0.15))`,
    };
  }, [emotion]);

  return (
    <EmotionContext.Provider value={{ emotion, setEmotion, activeIndex, setActiveIndex, css }}>
      {children}
    </EmotionContext.Provider>
  );
}

export function useEmotionColors() {
  return useContext(EmotionContext);
}
