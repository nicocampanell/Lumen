import { useState } from 'react';

const css = `
  .period-selector {
    display: inline-flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }

  .period-selector__pill {
    position: absolute;
    top: 8px;
    left: 16px;
    height: 40px;
    background: #212121;
    border-radius: 24px;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
    z-index: 0;
  }

  .period-selector__button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 24px;
    border-radius: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: transform 0.2s ease;
    flex-shrink: 0;
  }

  .period-selector__button:active {
    transform: scale(0.94);
  }

  .period-selector__label {
    font-family: 'General Sans Variable', 'General Sans', sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    white-space: nowrap;
    margin: 0;
    transition: color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .period-selector__label--active {
    color: #f4f2f3;
  }

  .period-selector__label--inactive {
    color: #212121;
  }
`;

interface PeriodSelectorProps {
  activePeriod?: 'day' | 'week' | 'month';
  onPeriodChange?: (period: 'day' | 'week' | 'month') => void;
}

export default function PeriodSelector({ activePeriod, onPeriodChange }: PeriodSelectorProps) {
  const [internalPeriod, setInternalPeriod] = useState<'day' | 'week' | 'month'>('day');
  const currentPeriod = activePeriod || internalPeriod;

  const periods = [
    { id: 'day' as const, label: 'Day', width: 72 },
    { id: 'week' as const, label: 'Week', width: 84 },
    { id: 'month' as const, label: 'Month', width: 95 },
  ];

  const handleClick = (period: 'day' | 'week' | 'month') => {
    if (onPeriodChange) {
      onPeriodChange(period);
    } else {
      setInternalPeriod(period);
    }
  };

  // Calculate pill position and width
  const activeIndex = periods.findIndex((p) => p.id === currentPeriod);
  let pillOffset = 0;
  for (let i = 0; i < activeIndex; i++) {
    pillOffset += periods[i].width + 16; // width + gap
  }
  const pillWidth = periods[activeIndex]?.width || periods[0].width;

  return (
    <>
      <style>{css}</style>
      <div className="period-selector">
        <div
          className="period-selector__pill"
          style={{
            transform: `translateX(${pillOffset}px)`,
            width: `${pillWidth}px`,
          }}
        />
        {periods.map((period) => {
          const isActive = period.id === currentPeriod;
          return (
            <button
              key={period.id}
              className="period-selector__button"
              onClick={() => handleClick(period.id)}
              style={{ width: `${period.width}px` }}
            >
              <p
                className={`period-selector__label ${
                  isActive ? 'period-selector__label--active' : 'period-selector__label--inactive'
                }`}
              >
                {period.label}
              </p>
            </button>
          );
        })}
      </div>
    </>
  );
}
