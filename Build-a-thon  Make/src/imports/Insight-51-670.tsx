import svgPaths from "./svg-hsxds2s6nd";

function Time() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Time">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[17px] text-black text-center tracking-[-0.43px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        1:47
      </p>
    </div>
  );
}

function LeftArea() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px overflow-clip pb-[13px] pt-[18px] relative" data-name="Left Area">
      <Time />
    </div>
  );
}

function Hole() {
  return <div className="bg-black h-[37px] rounded-[100px] shrink-0 w-[126px]" data-name="Hole" />;
}

function DynamicIsland() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[6px] pt-[11px] relative shrink-0" data-name="Dynamic Island">
      <Hole />
    </div>
  );
}

function CellularbarsF() {
  return (
    <div className="absolute inset-[13.04%_9.65%_24.27%_7.41%] overflow-clip" data-name="cellularbars F17">
      <div className="absolute inset-[75.47%_0.05%_0.06%_83.23%]" data-name="Bar Empty">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 3.06814">
          <path d={svgPaths.p28984780} fill="var(--fill-0, black)" id="Bar Empty" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0.06%_83.25%]" data-name="Bar #4 Full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.26252 12.5306">
          <path d={svgPaths.p378f8200} fill="var(--fill-0, black)" id="Bar #4 Full" />
        </svg>
      </div>
      <div className="absolute inset-[75.47%_27.78%_0.06%_55.5%]" data-name="Bar Empty">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 3.06814">
          <path d={svgPaths.p28984780} fill="var(--fill-0, black)" id="Bar Empty" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute inset-[22.74%_27.76%_0.06%_55.52%]" data-name="Bar #3 Full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.2553 9.67947">
          <path d={svgPaths.p3a92fa80} fill="var(--fill-0, black)" id="Bar #3 Full" />
        </svg>
      </div>
      <div className="absolute inset-[75.47%_55.51%_0.06%_27.77%]" data-name="Bar Empty">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 3.06814">
          <path d={svgPaths.p28984780} fill="var(--fill-0, black)" id="Bar Empty" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute inset-[43.58%_55.52%_0.06%_27.76%]" data-name="Bar #2 Full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 7.06653">
          <path d={svgPaths.p265d0b00} fill="var(--fill-0, black)" id="Bar #2 Full" />
        </svg>
      </div>
      <div className="absolute inset-[75.47%_83.28%_0.06%_0]" data-name="Bar Empty">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 3.06814">
          <path d={svgPaths.p28984780} fill="var(--fill-0, black)" id="Bar Empty" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute inset-[61.6%_83.28%_0.06%_0]" data-name="Bar #1 Full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 4.80727">
          <path d={svgPaths.p10af4d00} fill="var(--fill-0, black)" id="Bar #1 Full" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] relative shrink-0 w-[23.478px]" data-name="Icon">
      <CellularbarsF />
    </div>
  );
}

function CellularIcon() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Cellular Icon">
      <Icon />
    </div>
  );
}

function WifiF() {
  return (
    <div className="absolute h-[12.004px] left-[1.74px] top-[3.48px] w-[16.621px]" data-name="wifi F17">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6208 12.0037">
        <g clipPath="url(#clip0_50_399)" id="wifi F17">
          <path d={svgPaths.p28836a40} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_50_399">
            <rect fill="white" height="12.0037" width="16.6208" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <WifiF />
    </div>
  );
}

function WiFiIcon() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Wi-Fi Icon">
      <Icon1 />
    </div>
  );
}

function Battery100F22Fina() {
  return (
    <div className="absolute h-[12.135px] left-[2.61px] top-[3.48px] w-[26.824px]" data-name="battery.100 F22 Fina">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.8242 12.1346">
        <g clipPath="url(#clip0_50_373)" id="battery.100 F22 Fina">
          <path d={svgPaths.p2c9bc800} fill="var(--fill-0, black)" id="Outside" opacity="0.4" />
          <path d={svgPaths.p253f4280} fill="var(--fill-0, black)" id="Inside" />
        </g>
        <defs>
          <clipPath id="clip0_50_373">
            <rect fill="white" height="12.1346" width="26.8242" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[31.304px]" data-name="Icon">
      <Battery100F22Fina />
    </div>
  );
}

function BatteryIcon() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Battery Icon">
      <Icon2 />
    </div>
  );
}

function Icons() {
  return (
    <div className="content-stretch flex gap-[3px] items-start relative shrink-0" data-name="Icons">
      <CellularIcon />
      <WiFiIcon />
      <BatteryIcon />
    </div>
  );
}

function RightArea() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px overflow-clip pb-[13px] pt-[18px] relative" data-name="Right Area">
      <Icons />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[10px] relative shrink-0 w-[393px]" data-name="Status Bar">
      <LeftArea />
      <DynamicIsland />
      <RightArea />
    </div>
  );
}

function LeftLine() {
  return (
    <div className="absolute left-[201px] overflow-clip size-[32px] top-[83px]" data-name="left_line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <g id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="relative size-[24px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p20abd800} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[14px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <circle cx="7" cy="7" fill="var(--fill-0, #5CC950)" id="Ellipse 12" r="7" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black whitespace-nowrap">Since 10:17AM</p>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] items-center left-[134px] top-[78px] w-[124px]" data-name="Header">
      <p className="font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] relative shrink-0 text-[24px] text-black text-center tracking-[-0.5px] w-full">Insights</p>
      <Frame />
    </div>
  );
}

function NextSteps() {
  return (
    <div className="h-[180px] relative rounded-[24px] shrink-0 w-full" data-name="Next steps">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
        <div className="absolute inset-0 rounded-[24px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 353 180\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(19.95 5.2297 -2.6788 15.115 139.5 72.973)\\'><stop stop-color=\\'rgba(191,179,251,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,236,177,0.4)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
        <div className="absolute bg-[rgba(255,255,255,0.51)] inset-0 mix-blend-color-dodge rounded-[24px]" />
      </div>
      <div aria-hidden="true" className="absolute border-3 border-[rgba(229,204,80,0.5)] border-solid inset-[-1.5px] pointer-events-none rounded-[25.5px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[16px] py-[12px] relative size-full text-black">
        <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] whitespace-nowrap">Next Steps:</p>
        <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[16px] w-[min-content]">{`You're more alert than you realize right now. This is a good time to do something that requires focus - a hard email, a decision you've been sitting on. Your body already did the work of getting you there.`}</p>
      </div>
    </div>
  );
}

function BodysMood() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-[321px]" data-name="Body's Mood">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] w-full">Body’s Mood</p>
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">{`Your skin has been cooling down since 9:13am and you're sweating more than usual, signs your nervous system quietly switched on before you woke up. This has happened 3 mornings this week.`}</p>
    </div>
  );
}

function WhatYourBodyIsSaying() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-black w-[321px]" data-name="What your body is saying">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] w-full">What your body is saying:</p>
      <div className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">
        <p className="mb-0">{`Your body woke up before you did. It's not a bad sign, it means something has your system's attention. Your mind just hasn't caught up yet.`}</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-center left-[20px] top-[176px] w-[353px]" data-name="Content">
      <NextSteps />
      <BodysMood />
      <WhatYourBodyIsSaying />
    </div>
  );
}

export default function Insight() {
  return (
    <div className="bg-[#f4f2f3] overflow-clip relative rounded-[54px] size-full" data-name="Insight">
      <div className="absolute flex h-[528.363px] items-center justify-center left-[76px] top-[-241px] w-[539.449px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-39.16deg]">
          <div className="h-[341px] relative w-[418px]">
            <div className="absolute inset-[1.5%_1.57%_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 411.443 335.879">
                <path d={svgPaths.p275fab00} fill="url(#paint0_radial_50_402)" id="Polygon 2" opacity="0.65" />
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(209 165.379) rotate(90) scale(170.5 209)" gradientUnits="userSpaceOnUse" id="paint0_radial_50_402" r="1">
                    <stop stopColor="#FECCDA" />
                    <stop offset="1" stopColor="#E5CC50" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[431.979px] items-center justify-center left-[-250.49px] top-[545.44px] w-[488.068px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-rotate-166 flex-none">
          <div className="h-[341px] relative w-[418px]">
            <div className="absolute inset-[1.5%_1.57%_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 411.443 335.879">
                <path d={svgPaths.p275fab00} fill="url(#paint0_radial_50_397)" id="Polygon 1" opacity="0.65" />
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(209 165.379) rotate(90) scale(170.5 209)" gradientUnits="userSpaceOnUse" id="paint0_radial_50_397" r="1">
                    <stop stopColor="#FECCDA" />
                    <stop offset="1" stopColor="#E5CC50" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-0 top-0" data-name="Status bar">
        <StatusBar />
      </div>
      <LeftLine />
      <div className="absolute content-stretch flex gap-[8px] items-center left-[15px] p-[8px] rounded-[24px] top-[75px]">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Group />
          </div>
        </div>
        <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Back</p>
      </div>
      <Header />
      <Content />
    </div>
  );
}