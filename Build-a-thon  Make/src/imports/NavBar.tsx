import { useState } from 'react';

  // Inline SVG icons — no external URLs needed
  const HomeIconActive = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z" fill="currentColor"/>
    </svg>
  );
  const HomeIconInactive = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
  const CirclesIconActive = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="7" r="4" fill="currentColor"/>
      <circle cx="17" cy="11" r="3" fill="currentColor" opacity="0.7"/>
      <path d="M2 21C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21H2Z" fill="currentColor"/>
      <path d="M16 14C18.7614 14 21 16.2386 21 19V21H16V19C16 17.2977 15.3128 15.7543 14.2 14.6201C14.7576 14.2186 15.3906 14 16 14Z" fill="currentColor" opacity="0.7"/>
    </svg>
  );
  const CirclesIconInactive = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 21C2 17.134 5.13401 14 9 14C12.866 14 16 17.134 16 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 14C18.7614 14 21 16.2386 21 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  const ProfileIconActive = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" fill="currentColor"/>
      <path d="M4 21C4 17.134 7.58172 14 12 14C16.4183 14 20 17.134 20 21H4Z" fill="currentColor"/>
    </svg>
  );
  const ProfileIconInactive = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 21C4 17.134 7.58172 14 12 14C16.4183 14 20 17.134 20 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const css = `                                                                                 
    @import url('https://api.fontshare.com/v2/css?f[]=general-sans@400,600&display=swap');      
                                                              
    .navbar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .navbar__tab-bar {
      display: inline-flex;
      align-items: stretch;
      justify-content: center;
      gap: 4px;
      padding: 4px;
      border-radius: 296px;
      position: relative;
      background: linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.14)
  100%);
      backdrop-filter: blur(32px) saturate(200%) brightness(1.06);
      -webkit-backdrop-filter: blur(32px) saturate(200%) brightness(1.06);
      box-shadow:
        0 12px 40px rgba(0,0,0,0.18),
        0 2px 8px rgba(0,0,0,0.10),
        inset 0 2px 4px rgba(255,255,255,0.45),
        inset 0 -1px 3px rgba(0,0,0,0.08);
    }

    .navbar__tab-bar::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 296px;
      padding: 1px;
      background: linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.1) 50%,
  rgba(255,255,255,0.35));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 0;
    }

    .navbar__tab-bar::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 296px;
      background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%,
  transparent 65%);
      background-size: 200% 100%;
      animation: navbar-shimmer 5s ease-in-out infinite;
      pointer-events: none;
      z-index: 0;
    }

    @keyframes navbar-shimmer {
      0%   { background-position: -100% 0; }
      100% { background-position: 200% 0; }
    }

    .navbar__selection-pill {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 102px;
      bottom: 4px;
      border-radius: 292px;
      background: linear-gradient(125.75deg, rgba(254,204,218,0.2) 27.09%, rgba(229,204,80,0.2) 82.02%);
      backdrop-filter: blur(12px) saturate(160%);
      -webkit-backdrop-filter: blur(12px) saturate(160%);
      box-shadow:
        0 4px 16px rgba(0,0,0,0.08),
        0 1px 4px rgba(0,0,0,0.05),
        inset 0 1px 0 rgba(255,255,255,0.5),
        inset 0 -1px 0 rgba(0,0,0,0.04);
      transition: transform 0.24s cubic-bezier(0.25, 0.1, 0.25, 1),
                  background 0.24s cubic-bezier(0.25, 0.1, 0.25, 1);
      z-index: 1;
      pointer-events: none;
    }

    .navbar__tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      width: 102px;
      padding: 6px 8px 7px;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 292px;
      position: relative;
      z-index: 2;
      transition: transform 0.24s cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    .navbar__tab:active { transform: scale(0.94); }

    .navbar__icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }

    .navbar__label {
      font-family: 'General Sans', system-ui, sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.21px;
      color: var(--color-muted);
      text-align: center;
      white-space: nowrap;
      transition: color 0.24s cubic-bezier(0.25, 0.1, 0.25, 1), font-weight 0.24s cubic-bezier(0.25, 0.1, 0.25, 1);
      text-shadow: 0 1px 2px rgba(255,255,255,0.5);
    }

    .navbar__label--active {
      font-weight: 600;
      text-shadow: none;
    }
  `;

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      ActiveIcon: HomeIconActive,
      InactiveIcon: HomeIconInactive,
    },
    {
      id: 'circles',
      label: 'Circles',
      ActiveIcon: CirclesIconActive,
      InactiveIcon: CirclesIconInactive,
    },
    {
      id: 'profile',
      label: 'Profile',
      ActiveIcon: ProfileIconActive,
      InactiveIcon: ProfileIconInactive,
    },
  ];

  const TAB_STRIDE = 106;

  interface NavBarProps {
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
    emotionGradient?: string;
    emotionColor1?: string;
    emotionColor2?: string;
  }

  export default function NavBar({ activeTab, onTabChange, emotionGradient, emotionColor1, emotionColor2 }: NavBarProps): JSX.Element {
    const externalIndex = activeTab ? tabs.findIndex(t => t.id === activeTab) : -1;
    const [internalIndex, setInternalIndex] = useState(0);
    const activeIndex = externalIndex >= 0 ? externalIndex : internalIndex;

    const handleClick = (tab: typeof tabs[number], i: number) => {
      if (onTabChange) {
        onTabChange(tab.id);
      } else {
        setInternalIndex(i);
      }
    };

    // Build a 20% opacity version of the emotion gradient for the pill
    const pillGradient = emotionGradient
      ? emotionGradient
          .replace(/rgb\(/g, 'rgba(')
          .replace(/\)/g, ', 0.2)')
          .replace(/, 0\.2\),/g, ', 0.2),')
      : undefined;

    // Compute a cleaner 20% opacity gradient from the color props
    const pillBg = (emotionColor1 && emotionColor2)
      ? `linear-gradient(125.75deg, ${emotionColor1.replace('rgb(', 'rgba(').replace(')', ', 0.2)')} 27.09%, ${emotionColor2.replace('rgb(', 'rgba(').replace(')', ', 0.2)')} 82.02%)`
      : undefined;

    // Parse emotion color and darken it for active text + icon
    const darken = (rgbStr: string, factor: number): string => {
      const match = rgbStr.match(/(\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return rgbStr;
      const r = Math.round(Number(match[1]) * factor);
      const g = Math.round(Number(match[2]) * factor);
      const b = Math.round(Number(match[3]) * factor);
      return `rgb(${r}, ${g}, ${b})`;
    };

    const activeColor = emotionColor1 ? darken(emotionColor1, 0.65) : undefined;
    const filterId = 'navbar-icon-tint';

    return (
      <>
        <style>{css}</style>
        {/* SVG filter to tint icons to the active emotion color */}
        {activeColor && (
          <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
            <defs>
              <filter id={filterId} colorInterpolationFilters="sRGB">
                <feFlood floodColor={activeColor} result="flood" />
                <feComposite in="flood" in2="SourceAlpha" operator="in" />
              </filter>
            </defs>
          </svg>
        )}
        <nav className="navbar">
          <div className="navbar__tab-bar">
            <div
              className="navbar__selection-pill"
              style={{
                transform: `translateX(${activeIndex * TAB_STRIDE}px)`,
                ...(pillBg ? { background: pillBg } : {}),
              }}
            />
            {tabs.map((tab, i) => {
              const isActive = i === activeIndex;
              const iconColor = isActive && activeColor ? activeColor : 'var(--color-muted)';
              const Icon = isActive ? tab.ActiveIcon : tab.InactiveIcon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`navbar__tab ${isActive ? 'navbar__tab--active' : ''}`}
                  onClick={() => handleClick(tab, i)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className="navbar__icon-wrap"
                    style={{ color: iconColor, transition: 'color 0.24s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                  >
                    <Icon />
                  </span>
                  <span
                    className={`navbar__label ${isActive ? 'navbar__label--active' : ''}`}
                    style={{ color: iconColor, transition: 'color 0.24s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </>
    );
  }
