# Lumin design system

## 1. Design intent

Lumin should feel warm, quiet, embodied, and curious—not clinical, alarmist, or performance-obsessed.

The Figma deck’s strongest visual ideas are:

- Large editorial typography.
- Warm cream, ochre, brown, and acid-lime fields.
- Generous whitespace and thin dividers.
- Organic light textures.
- A living particle orb as the signature object.

The app prototype adds:

- Soft gray mobile surfaces.
- Blurred ambient color.
- White or translucent rounded cards.
- Coral attention accents.
- Fluid but restrained motion.

## 2. Principles

1. **Describe; do not diagnose.** Show the measured change and let the user supply meaning.
2. **One meaningful interruption.** Lumin should not become another dashboard to monitor.
3. **Body first, numbers second.** Lead with a calm state and plain language; make detailed evidence available on demand.
4. **Uncertainty is a state.** “Learning your baseline” and “not enough information” are valid outcomes.
5. **Motion communicates state, not urgency.** Avoid pulsing red warnings or frantic particles.
6. **Every visual signal has a text equivalent.** Color and motion never carry meaning alone.

## 3. Foundations

### Color tokens

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` | `#53453A` | Brand text, warm dividers, editorial surfaces |
| `--color-charcoal` | `#212121` | Primary app text and controls |
| `--color-cream` | `#FCF5E6` | Editorial background |
| `--color-app-bg` | `#F4F2F3` | Primary app canvas |
| `--color-surface` | `#FFFFFF` | Cards and sheets |
| `--color-lime` | `#F4FDAF` | Brand highlight, never long body text |
| `--color-coral` | `#F05B51` | New event indicator and destructive confirmation |
| `--color-blue` | `#3765C5` | Interactive or stable orb accent |
| `--color-muted` | `#77716C` | Secondary copy |
| `--color-divider` | `rgba(83, 69, 58, 0.24)` | Dividers |
| `--color-glass` | `rgba(255, 255, 255, 0.66)` | Floating cards over ambient color |

Use semantic names in components. Orb colors are data visualization tokens and should remain separate from interface status colors.

### Typography

- Display/editorial: **Switzer Variable**.
- Interface/body: **General Sans Variable**.
- System fallback: `Inter, system-ui, sans-serif`.

| Style | Size / line height | Weight | Use |
| --- | --- | --- | --- |
| Display XL | 64 / 68 | 400 | Marketing or deck title only |
| Display L | 40 / 44 | 400 | Major app moment or summary |
| Heading 1 | 28 / 34 | 500 | Screen title |
| Heading 2 | 22 / 28 | 500 | Section title |
| Body L | 18 / 28 | 400 | Primary insight copy |
| Body | 16 / 24 | 400 | Standard copy |
| Label | 14 / 20 | 500 | Controls and metadata |
| Caption | 12 / 16 | 400 | Supporting data and timestamps |

Do not use type smaller than 12 px. Production builds should self-host licensed font files rather than depend on a third-party font CSS URL.

### Spacing and geometry

- Base unit: 4 px.
- Core spacing: 8, 12, 16, 24, 32, 48.
- Screen gutter: 20–24 px.
- Card padding: 16 or 24 px.
- Card radius: 20–24 px.
- Pill radius: 999 px.
- Minimum touch target: 44 × 44 px.
- Hairline divider: 1 px.

Use blur and glass only for floating, temporary, or layered elements. Standard content cards should remain opaque for legibility.

## 4. Signal visualization

The orb is the signature component, but it represents physiological signal state—not emotion.

| State | Visual treatment | Required text |
| --- | --- | --- |
| `insufficient_data` | Low-density neutral particles, minimal motion | “Learning your usual range” |
| `stable` | Open form, slow coherent motion, cool-to-warm neutral palette | “Signals are near your usual range” |
| `shifted` | Denser form, increased but smooth motion, higher contrast | “Several signals shifted from your usual range” |
| `recovering` | Expanding form, motion settling, softer contrast | “Signals are moving back toward your usual range” |

Never map colors to named emotions. Never use the orb alone as evidence; event detail must list contributing measurements.

Reduced motion:

- Stop continuous rotation and particle bursts.
- Use a static rendered orb or a slow opacity transition.
- Preserve the same text state.

## 5. Core components

### Signal summary

- Orb or static fallback.
- One state sentence.
- Baseline readiness or last-updated metadata.
- Optional “See what changed” action.

### Signal event card

- Neutral title: “Several signals shifted.”
- Time range.
- Two or more evidence rows.
- Prompt status.
- Primary action: “Add context.”

Avoid titles such as “Cortisol spike,” “High intensity event,” or “Anxiety detected.”

### Context prompt sheet

- Prompt: “What was happening around this time?”
- Multi-select chips.
- “Nothing noticeable” option.
- Optional note, visually secondary.
- Save and “Not now” actions.

### Context chip

States: default, selected, focus, disabled. Selection needs a checkmark or border change in addition to color.

### Evidence row

- Metric name in plain language.
- Direction relative to usual range.
- Time window.
- Optional numeric detail behind progressive disclosure.

### Weekly association card

- Templated statement.
- Supporting count and time range.
- Link to source events.
- “Useful?” feedback control.
- Persistent non-causal qualifier.

### Navigation

MVP tabs:

- Home
- Events
- Profile

Do not expose Circles in the MVP navigation.

## 6. Interaction and motion

- Standard transition: 180–240 ms.
- Large page transition: up to 400 ms.
- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`.
- Use spring motion only for direct manipulation.
- Keep the orb’s ambient animation slow and interruptible.
- Never use repeated shake, flashing, or aggressive pulses for health-related states.
- Respect `prefers-reduced-motion` across Three.js and CSS/Framer Motion.

## 7. Content design

Voice:

- Observant, calm, specific, and non-judgmental.
- Short enough to read during a busy moment.
- Honest about uncertainty.

Use:

- “Your heart rate was above its usual afternoon range.”
- “Several signals shifted around 2:10 PM.”
- “What was happening around this time?”
- “This pattern appeared in 3 of 4 events tagged ‘meeting.’”

Avoid:

- “You are stressed.”
- “Cortisol spike.”
- “Your body knows you are anxious.”
- “This meeting caused your response.”
- “You should seek treatment.”

## 8. Accessibility checklist

- Body text and essential controls meet WCAG AA contrast.
- All interactive elements have visible focus styles.
- Touch targets are at least 44 × 44 px.
- Headings follow a logical order.
- Charts and the orb include a text summary.
- Selection and status never rely on color alone.
- Three.js content has an accessible label or equivalent adjacent copy.
- Animations can be reduced without losing information.
- Notifications use neutral language and hide sensitive details on the lock screen by default.

## 9. Current implementation gaps

- The code mixes a generic theme file with many one-off inline values; promote only the stable tokens above as components are touched.
- Emotion-named fixture states should become signal states.
- Some current copy implies a diagnosis or unavailable biomarker.
- The Circles UI is out of MVP scope.
- The fixed 390 × 844 frame is useful for the demo but needs safe-area and responsive behavior before a real mobile release.
- The external font imports and remote profile images are unsuitable for an offline or privacy-sensitive production build.

Do not pause the experiment for a full design-system refactor. Apply these tokens and rules to the onboarding → event → context → summary path first.

