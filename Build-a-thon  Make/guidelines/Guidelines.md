**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### FOR LIQUID GLASS
# Liquid Glass CSS Effects — Claude Code Guideline

Use this guideline whenever asked to create liquid glass, glassmorphism, or frosted glass UI effects in HTML/CSS.

---

## Core Concept

Liquid glass simulates translucent, refractive material — like frosted glass or water. It combines:
- **Backdrop blur** (frosted/blurred background)
- **Semi-transparency** (rgba or hsla backgrounds)
- **Subtle refraction** (layered highlights, shadows, gradients on borders)
- **Specular highlights** (bright edge glints)
- **Depth cues** (inner shadows, layered box-shadows)

---

## The Base Recipe

```css
.glass {
  /* Core glass effect */
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  /* Refraction border — layered gradient */
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;

  /* Depth via shadows */
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),          /* ambient depth */
    inset 0 1px 0 rgba(255, 255, 255, 0.4),   /* top specular highlight */
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);  /* bottom subtle bounce */
}
```

---

## Variants

### 1. Dark Glass (on light backgrounds)
```css
.glass-dark {
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
}
```

### 2. Liquid / Refractive Glass (most realistic)
```css
.glass-liquid {
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

  /* Gradient border for refraction illusion */
  position: relative;
}

.glass-liquid::before {
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
}

.glass-liquid {
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.3),
    inset 0 -2px 4px rgba(0, 0, 0, 0.1);
}
```

### 3. Tinted Glass (colored glass)
```css
.glass-tinted {
  /* Swap the rgba color for any hue */
  background: rgba(99, 179, 237, 0.15);   /* blue tint */
  backdrop-filter: blur(20px) saturate(180%) hue-rotate(10deg);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(99, 179, 237, 0.35);
  border-radius: 16px;
  box-shadow:
    0 8px 32px rgba(99, 179, 237, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}
```

### 4. Pill / Button Glass
```css
.glass-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  padding: 10px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.22);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transform: translateY(-1px);
}
```

---

## Animated / "Liquid" Motion

### Shimmering highlight sweep
```css
.glass-shimmer {
  position: relative;
  overflow: hidden;
}

.glass-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.18) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%   { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}
```

### Breathing / pulse glow
```css
@keyframes glass-breathe {
  0%, 100% {
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      0 0 40px rgba(255, 255, 255, 0.08);
  }
}

.glass-breathe {
  animation: glass-breathe 4s ease-in-out infinite;
}
```

---

## Background Setup

Glass effects require a **visually rich background** to look good. Use one of these:

```css
/* Option 1: Colorful gradient blobs */
.bg-blobs {
  background: #0f0c29;
  position: relative;
  overflow: hidden;
}
.bg-blobs::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  background: radial-gradient(circle, #7928ca 0%, transparent 70%);
  top: -100px; left: -100px;
  filter: blur(80px);
}
.bg-blobs::after {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  background: radial-gradient(circle, #ff0080 0%, transparent 70%);
  bottom: -100px; right: -100px;
  filter: blur(80px);
}

/* Option 2: Photo/image background */
.bg-image {
  background: url('your-image.jpg') center/cover no-repeat;
}

/* Option 3: Animated gradient mesh */
.bg-mesh {
  background: linear-gradient(45deg, #12c2e9, #c471ed, #f64f59);
  background-size: 400% 400%;
  animation: mesh-shift 8s ease infinite;
}
@keyframes mesh-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

## CSS Custom Properties (Design Tokens)

Set these on `:root` to keep glass styles consistent across a project:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.12);
  --glass-bg-hover: rgba(255, 255, 255, 0.2);
  --glass-blur: 20px;
  --glass-saturate: 180%;
  --glass-border: rgba(255, 255, 255, 0.25);
  --glass-highlight: rgba(255, 255, 255, 0.4);
  --glass-shadow: rgba(0, 0, 0, 0.25);
  --glass-radius: 16px;
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow:
    0 8px 32px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight);
}
```

---

## Key Rules & Tips

1. **Always have a visually complex background** — glass on a flat color looks flat.
2. **backdrop-filter support**: Works in all modern browsers. Add `-webkit-backdrop-filter` for Safari.
3. **Performance**: `backdrop-filter` triggers GPU compositing. Use `will-change: transform` on animated glass elements.
4. **Fallback for unsupported browsers**:
   ```css
   @supports not (backdrop-filter: blur(1px)) {
     .glass { background: rgba(20, 20, 30, 0.85); }
   }
   ```
5. **Blur amount**: 12–16px = subtle frosted; 24–40px = deep liquid glass.
6. **Don't stack glass on glass** — nested glass elements lose clarity fast.
7. **Text on glass**: Add `text-shadow: 0 1px 2px rgba(0,0,0,0.3)` to maintain legibility.
8. **Border gradient trick**: Use `::before` with `mask-composite: exclude` (see Liquid variant above) for a true gradient border that simulates light refraction along the edge.

---

## Quick-Copy Utility Class

Drop this into any project as a starting point:

```css
.glass {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);
}
```

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
