import svgPaths from "./svg-6jijvttuif";

const css = `
  /* Liquid / Refractive Glass — per Guidelines.md */
  .insight-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
    padding: 16px;
    border-radius: 20px;
    overflow: hidden;

    /* Guideline: Liquid glass background */
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.06) 100%
    );
    background-clip: padding-box;
    backdrop-filter: blur(32px) saturate(200%) brightness(1.05);
    -webkit-backdrop-filter: blur(32px) saturate(200%) brightness(1.05);

    /* Guideline: transparent border for refraction */
    border: 1px solid transparent;

    /* Guideline: Depth via layered shadows */
    box-shadow:
      0 16px 48px rgba(0, 0, 0, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.3),
      inset 0 -2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Guideline: Gradient border for refraction illusion (::before with mask-composite: exclude) */
  .insight-card::before {
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

  /* Guideline: Shimmering highlight sweep animation */
  .insight-card::after {
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
    animation: shimmer 3s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  @keyframes shimmer {
    0%   { background-position: -100% 0; }
    100% { background-position: 200% 0; }
  }
`;

function Icon({ emotionColors }: { emotionColors?: { color1: number[]; color2: number[] } | null }) {
  const c1 = emotionColors
    ? `rgb(${Math.round(emotionColors.color1[0] * 255)}, ${Math.round(emotionColors.color1[1] * 255)}, ${Math.round(emotionColors.color1[2] * 255)})`
    : '#FECCDA';
  const c2 = emotionColors
    ? `rgb(${Math.round(emotionColors.color2[0] * 255)}, ${Math.round(emotionColors.color2[1] * 255)}, ${Math.round(emotionColors.color2[2] * 255)})`
    : '#FECCDA';

  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="insight-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p8c8fcc0} fill="url(#insight-icon-gradient)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Heading({ emotionColors, title }: { emotionColors?: { color1: number[]; color2: number[] } | null; title: string }) {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading">
      <Icon emotionColors={emotionColors} />
      <p className="absolute font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] left-[32px] text-[16px] text-black top-0 whitespace-nowrap">{title}</p>
    </div>
  );
}

function InsighText({ emotionColors, title, body }: { emotionColors?: { color1: number[]; color2: number[] } | null; title: string; body: string }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[271px]" data-name="Insigh text" style={{ zIndex: 1 }}>
      <Heading emotionColors={emotionColors} title={title} />
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#212121] text-[14px] tracking-[0.21px] w-full">{body}</p>
    </div>
  );
}

function DiveDeeper({ emotionColors, onMeetYou, actionLabel }: { emotionColors?: { color1: number[]; color2: number[] } | null; onMeetYou?: () => void; actionLabel: string }) {
  const c1 = emotionColors
    ? `rgb(${Math.round(emotionColors.color1[0] * 255)}, ${Math.round(emotionColors.color1[1] * 255)}, ${Math.round(emotionColors.color1[2] * 255)})`
    : 'rgba(33,33,33,0.5)';
  const c2 = emotionColors
    ? `rgb(${Math.round(emotionColors.color2[0] * 255)}, ${Math.round(emotionColors.color2[1] * 255)}, ${Math.round(emotionColors.color2[2] * 255)})`
    : 'rgba(33,33,33,0.5)';
  const bgGradient = emotionColors
    ? `linear-gradient(135deg, rgba(${Math.round(emotionColors.color1[0] * 255)}, ${Math.round(emotionColors.color1[1] * 255)}, ${Math.round(emotionColors.color1[2] * 255)}, 0.15), rgba(${Math.round(emotionColors.color2[0] * 255)}, ${Math.round(emotionColors.color2[1] * 255)}, ${Math.round(emotionColors.color2[2] * 255)}, 0.15))`
    : 'rgba(0,0,0,0.05)';

  return (
    <button
      className="flex items-center justify-center relative shrink-0 cursor-pointer"
      data-name="Dive deeper"
      onClick={onMeetYou}
      style={{
        zIndex: 1,
        padding: '4px 12px',
        minHeight: 44,
        gap: 10,
        borderRadius: 9999,
        border: 'none',
        background: bgGradient,
        transition: 'background 0.24s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      <p
        className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[14px] tracking-[0.21px] whitespace-nowrap"
        style={{ color: c1, transition: 'color 0.24s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
      >
        {actionLabel}
      </p>
      <div className="relative shrink-0 size-[12px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <defs>
            <linearGradient id="dive-deeper-chevron-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={c1} />
              <stop offset="100%" stopColor={c2} />
            </linearGradient>
          </defs>
          <path clipRule="evenodd" d={svgPaths.p38af500} fill="url(#dive-deeper-chevron-gradient)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </button>
  );
}

export default function Insight({ emotionColors, onMeetYou, title = 'Insight', body = 'No measured change needs context right now.', actionLabel = 'View events' }: { emotionColors?: { color1: number[]; color2: number[] } | null; onMeetYou?: () => void; title?: string; body?: string; actionLabel?: string }) {
  return (
    <>
      <style>{css}</style>
      <div className="insight-card" data-name="Insight">
        <InsighText emotionColors={emotionColors} title={title} body={body} />
        <DiveDeeper emotionColors={emotionColors} onMeetYou={onMeetYou} actionLabel={actionLabel} />
      </div>
    </>
  );
}
