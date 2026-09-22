// Hardcoded emotion states mapped to times of day.
// Each preset drives the orb's visual appearance.
export const emotionPresets = [
  {
    time: '6:00 AM',
    label: 'Calm',
    description: 'Waking state — slow, grounded rhythm',
    color1: [0.2, 0.4, 0.8],   // soft blue
    color2: [0.1, 0.2, 0.5],   // deep blue
    distortion: 0.15,
    speed: 0.3,
    noiseScale: 1.2,
  },
  {
    time: '8:00 AM',
    label: 'Focused',
    description: 'Morning clarity — sharp, steady pulse',
    color1: [0.1, 0.7, 0.6],   // teal
    color2: [0.05, 0.3, 0.4],  // dark teal
    distortion: 0.25,
    speed: 0.5,
    noiseScale: 1.5,
  },
  {
    time: '10:00 AM',
    label: 'Energized',
    description: 'Peak activation — vibrant, expansive',
    color1: [0.9, 0.6, 0.1],   // warm amber
    color2: [0.8, 0.3, 0.1],   // burnt orange
    distortion: 0.4,
    speed: 0.8,
    noiseScale: 2.0,
  },
  {
    time: '12:00 PM',
    label: 'Stressed',
    description: 'Midday tension — erratic, compressed',
    color1: [0.9, 0.2, 0.2],   // red
    color2: [0.6, 0.1, 0.3],   // dark magenta
    distortion: 0.6,
    speed: 1.2,
    noiseScale: 2.5,
  },
  {
    time: '3:00 PM',
    label: 'Fatigued',
    description: 'Afternoon dip — sluggish, muted',
    color1: [0.5, 0.4, 0.6],   // muted purple
    color2: [0.3, 0.2, 0.4],   // dark purple
    distortion: 0.2,
    speed: 0.25,
    noiseScale: 1.0,
  },
  {
    time: '6:00 PM',
    label: 'Relaxed',
    description: 'Evening wind-down — warm, flowing',
    color1: [0.8, 0.5, 0.3],   // warm peach
    color2: [0.4, 0.2, 0.3],   // dusty rose
    distortion: 0.2,
    speed: 0.4,
    noiseScale: 1.3,
  },
  {
    time: '9:00 PM',
    label: 'Reflective',
    description: 'Night introspection — deep, still',
    color1: [0.15, 0.15, 0.4], // indigo
    color2: [0.05, 0.05, 0.2], // near-black blue
    distortion: 0.1,
    speed: 0.2,
    noiseScale: 0.8,
  },
]