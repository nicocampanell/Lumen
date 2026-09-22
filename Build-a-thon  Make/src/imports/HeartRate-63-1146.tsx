import svgPaths from "./svg-34mh9oasdl";

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

function Time() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Time">
      <p className="font-['Switzer:Semibold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[17px] text-black text-center tracking-[-0.43px] whitespace-nowrap">1:47</p>
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
        <g clipPath="url(#clip0_58_658)" id="wifi F17">
          <path d={svgPaths.p28836a40} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_58_658">
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
        <g clipPath="url(#clip0_58_691)" id="battery.100 F22 Fina">
          <path d={svgPaths.p2c9bc800} fill="var(--fill-0, black)" id="Outside" opacity="0.4" />
          <path d={svgPaths.p253f4280} fill="var(--fill-0, black)" id="Inside" />
        </g>
        <defs>
          <clipPath id="clip0_58_691">
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

function Frame5() {
  return (
    <div className="absolute content-stretch flex items-center left-[26px] top-[83px]">
      <p className="font-['Switzer_Variable:Semibold',sans-serif] leading-[40px] not-italic relative shrink-0 text-[28px] text-black tracking-[-1px] whitespace-nowrap">Your Heart Rate</p>
    </div>
  );
}

function HeartbeatFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[36px]" data-name="heartbeat_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3b60ab00} fill="var(--fill-0, #F05B51)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['Switzer_Variable:Bold',sans-serif] leading-[48px] not-italic relative shrink-0 text-[#212121] text-[32px] tracking-[-1.5px] whitespace-nowrap">82 bpm</p>
      <HeartbeatFill />
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-[rgba(255,255,255,0.82)] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start px-[24px] py-[16px] relative w-full">
        <p className="font-['Switzer_Variable:Medium',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#212121] text-[24px] tracking-[-0.5px] whitespace-nowrap">Current Heart Rate:</p>
        <Frame8 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#212121] content-stretch flex items-center justify-center px-[24px] py-[4px] relative rounded-[24px] shrink-0">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#f4f2f3] text-[20px] whitespace-nowrap">{`Day `}</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[4px] relative rounded-[24px] shrink-0">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#212121] text-[20px] whitespace-nowrap">Week</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[4px] relative rounded-[24px] shrink-0">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#212121] text-[20px] whitespace-nowrap">{`Month `}</p>
    </div>
  );
}

function ArrowRightLine() {
  return (
    <div className="overflow-clip relative size-[24px]" data-name="arrow_right_line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p1aa51700} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function ArrowRightLine1() {
  return (
    <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="arrow_right_line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p1aa51700} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </button>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <ArrowRightLine />
        </div>
      </div>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] leading-[28px] not-italic relative shrink-0 text-[18px] text-black whitespace-nowrap">Today</p>
      <ArrowRightLine1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[163px] relative shrink-0 w-[285.031px]">
      <div className="absolute inset-[0_0_-0.61%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 285.031 164">
          <g id="Group 2">
            <g id="Frame 137">
              <line id="Line 6" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="2.5" y2="2.5" />
              <line id="Line 7" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="18.5" y2="18.5" />
              <line id="Line 8" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="34.5" y2="34.5" />
              <line id="Line 9" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="50.5" y2="50.5" />
              <line id="Line 10" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="66.5" y2="66.5" />
              <path d={svgPaths.p19221e80} id="Vector" stroke="var(--stroke-0, #F05B51)" strokeWidth="2" />
              <line id="Line 11" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="82.5" y2="82.5" />
              <line id="Line 12" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="98.5" y2="98.5" />
              <line id="Line 13" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="114.5" y2="114.5" />
              <line id="Line 14" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="130.5" y2="130.5" />
              <line id="Line 15" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.2" x1="284.531" x2="0.5" y1="146.5" y2="146.5" />
              <line id="Line 5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2" x1="284.031" x2="1" y1="163" y2="163" />
            </g>
            <line id="Line 4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="2" x1="1" x2="1" y1="1" y2="162" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="bg-[rgba(255,255,255,0.2)] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative w-full">
            <Frame />
            <Frame1 />
            <Frame2 />
          </div>
        </div>
      </div>
      <div className="bg-white h-[278px] relative rounded-[24px] shrink-0 w-full" data-name="Daily">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col gap-[22px] items-center p-[24px] relative size-full">
            <p className="absolute font-['General_Sans_Variable:Regular',sans-serif] leading-[24px] left-[calc(50%-50.5px)] not-italic text-[14px] text-black top-[238px] tracking-[0.21px] whitespace-nowrap">Hour in the Day</p>
            <div className="absolute flex h-[125px] items-center justify-center left-[6px] top-[85px] w-[24px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
              <div className="-rotate-90 flex-none">
                <p className="font-['General_Sans_Variable:Regular',sans-serif] leading-[24px] not-italic relative text-[16px] text-black whitespace-nowrap">Heart Rate (bpm)</p>
              </div>
            </div>
            <Frame6 />
            <Group1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function SunLine() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="sun_line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p310ed000} fill="var(--fill-0, #09244B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <SunLine />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#113971] text-[20px] whitespace-nowrap">Insight of the Day</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
        <div className="absolute inset-0 rounded-[24px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 354 144\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(35.751 5.0108 -3.2174 21.609 56.66 45.243)\\'><stop stop-color=\\'rgba(234,204,108,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(237,148,94,0.5)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(240,91,81,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
        <div className="absolute bg-[rgba(255,255,255,0.51)] inset-0 mix-blend-color-dodge rounded-[24px]" />
      </div>
      <div aria-hidden="true" className="absolute border-3 border-[rgba(254,204,218,0.5)] border-solid inset-[-1.5px] pointer-events-none rounded-[25.5px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[32px] py-[24px] relative w-full">
        <Frame3 />
        <p className="font-['General_Sans_Variable:Regular',sans-serif] leading-[24px] min-w-full not-italic relative shrink-0 text-[#113971] text-[16px] w-[min-content]">“Your activation rose during focus, not stress.”</p>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[20px] top-[228px] w-[354px]">
      <Frame7 />
      <Frame9 />
      <Frame4 />
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

export default function HeartRate() {
  return (
    <div className="bg-[#f4f2f3] overflow-clip relative rounded-[54px] size-full" data-name="Heart Rate">
      <div className="absolute flex h-[487.576px] items-center justify-center left-[165.05px] top-[479.62px] w-[431.288px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[76.13deg]">
          <div className="h-[341px] relative w-[418px]">
            <div className="absolute inset-[1.5%_1.57%_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 411.443 335.879">
                <path d={svgPaths.p275fab00} fill="url(#paint0_radial_58_663)" fillOpacity="0.5" id="Polygon 2" opacity="0.65" />
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(209 165.379) rotate(90) scale(170.5 209)" gradientUnits="userSpaceOnUse" id="paint0_radial_58_663" r="1">
                    <stop stopColor="#BFB3FB" />
                    <stop offset="1" stopColor="#FECCDA" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[382.003px] items-center justify-center left-[-183px] top-[142px] w-[388.718px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[141.19deg]">
          <div className="h-[252.083px] relative w-[296.098px]">
            <div className="absolute inset-[1.5%_2.05%_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 290.022 248.297">
                <path d={svgPaths.p18b9300} fill="url(#paint0_radial_58_716)" fillOpacity="0.61" id="Polygon 1" opacity="0.65" />
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(148.049 122.256) rotate(90) scale(126.041 148.049)" gradientUnits="userSpaceOnUse" id="paint0_radial_58_716" r="1">
                    <stop stopColor="#FECCDA" />
                    <stop offset="1" stopColor="#E5CC50" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[165px] left-[-25px] top-0 w-[597px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 597 165">
          <path d={svgPaths.p1a2d1e00} fill="url(#paint0_linear_58_652)" id="Polygon 3" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_58_652" x1="263.013" x2="263.013" y1="13.4998" y2="187.497">
              <stop stopColor="#F05B51" stopOpacity="0.49" />
              <stop offset="1" stopColor="#E5CC50" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <LeftLine />
      <div className="absolute content-stretch flex flex-col items-start left-0 top-[6px]" data-name="Status bar">
        <StatusBar />
      </div>
      <Frame5 />
      <Frame10 />
      <div className="absolute content-stretch flex gap-[8px] items-center left-[20px] p-[8px] rounded-[24px] top-[162px]">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Group />
          </div>
        </div>
        <p className="font-['General_Sans_Variable:Medium',sans-serif] leading-[32px] not-italic relative shrink-0 text-[20px] text-black whitespace-nowrap">Back</p>
      </div>
    </div>
  );
}