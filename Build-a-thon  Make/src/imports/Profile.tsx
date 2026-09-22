import svgPaths from "./svg-itlwsb9fy8";

function Blur1() {
  return <div className="absolute backdrop-blur-[20px] bg-[rgba(0,0,0,0.04)] blur-[10px] inset-[28px_26px_24px_26px] mix-blend-hard-light rounded-[1000px]" data-name="Blur" />;
}

function Blur() {
  return (
    <div className="absolute inset-[-26px] opacity-67" data-name="Blur">
      <div className="absolute bg-white inset-[-50px]" data-name="Mask">
        <div className="absolute bg-black inset-[76px] rounded-[1000px]" data-name="Shape" />
      </div>
      <Blur1 />
    </div>
  );
}

function Fill() {
  return (
    <div className="absolute inset-0 rounded-[296px]" data-name="Fill">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[296px]">
        <div className="absolute bg-[#333] inset-0 mix-blend-color-dodge rounded-[296px]" />
        <div className="absolute inset-0 rounded-[296px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 247, 247) 0%, rgb(247, 247, 247) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)" }} />
      </div>
    </div>
  );
}

function GlassEffect() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[296px]" data-name="Glass Effect" />;
}

function Tab() {
  return (
    <div className="relative self-stretch shrink-0 w-[102px]" data-name="Tab 1">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-px items-center justify-center pb-[7px] pt-[6px] px-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[32px]" data-name="Home Icon">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Group">
                <g id="Vector" />
                <path d={svgPaths.p286dd000} fill="var(--fill-0, #B6B6B6)" id="Vector_2" />
              </g>
            </svg>
          </div>
          <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#898989] text-[14px] text-center tracking-[0.21px] w-[min-content]">Home</p>
        </div>
      </div>
    </div>
  );
}

function WechatFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="wechat_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p3016acc0} fill="var(--fill-0, #B6B6B6)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Tab1() {
  return (
    <div className="relative self-stretch shrink-0 w-[102px]" data-name="Tab 3">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-px items-center justify-center pb-[7px] pt-[6px] px-[8px] relative size-full">
          <WechatFill />
          <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#898989] text-[14px] text-center tracking-[0.21px] w-[min-content]">Circles</p>
        </div>
      </div>
    </div>
  );
}

function LookUpFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="look_up_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pf60a300} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Tab2() {
  return (
    <div className="relative self-stretch shrink-0 w-[102px]" data-name="Tab 4">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-px items-center justify-center pb-[7px] pt-[6px] px-[8px] relative size-full">
          <LookUpFill />
          <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[14px] text-black text-center tracking-[0.21px] w-[min-content]">Profile</p>
        </div>
      </div>
    </div>
  );
}

function TabBarButtons() {
  return (
    <div className="content-stretch flex gap-[4px] items-start justify-center relative shrink-0" data-name="Tab Bar Buttons">
      <div className="absolute inset-[-4px]" data-name="BG">
        <Blur />
        <Fill />
        <GlassEffect />
      </div>
      <Tab />
      <Tab1 />
      <Tab2 />
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
        <g clipPath="url(#clip0_1_232)" id="wifi F17">
          <path d={svgPaths.p28836a40} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_232">
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
        <g clipPath="url(#clip0_1_299)" id="battery.100 F22 Fina">
          <path d={svgPaths.p2c9bc800} fill="var(--fill-0, black)" id="Outside" opacity="0.4" />
          <path d={svgPaths.p253f4280} fill="var(--fill-0, black)" id="Inside" />
        </g>
        <defs>
          <clipPath id="clip0_1_299">
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

function PencilFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="pencil_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pf712d00} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Name">
      <p className="font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] relative shrink-0 text-[24px] text-black tracking-[-0.5px] whitespace-nowrap">Nico Campbell</p>
      <PencilFill />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[24px] shrink-0" style={{ backgroundImage: "linear-gradient(125.752deg, rgb(254, 204, 218) 27.085%, rgba(229, 204, 80, 0.51) 82.022%)" }}>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[18px] text-black whitespace-nowrap">4 friends</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="bg-black content-stretch flex items-center justify-center px-[16px] py-[4px] relative rounded-[24px] shrink-0">
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-white whitespace-nowrap">Settings</p>
    </div>
  );
}

function UserDetails() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="User Details">
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-center relative shrink-0 w-[208px]">
      <Name />
      <UserDetails />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="relative shrink-0 size-[120px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 120">
          <circle cx="60" cy="60" fill="var(--fill-0, #D9D9D9)" id="Ellipse 1" r="60" />
        </svg>
      </div>
      <Frame14 />
    </div>
  );
}

function Sparkles3Fill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="sparkles_3_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p2b5b6a00} fill="var(--fill-0, #113971)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Sparkles3Fill />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#113971] text-[20px] whitespace-nowrap">Recovery Highlight</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
        <div className="absolute inset-0 rounded-[24px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 353 144\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(19.95 4.1838 -2.6788 12.092 139.5 58.378)\\'><stop stop-color=\\'rgba(191,179,251,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,236,177,0.4)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
        <div className="absolute bg-[rgba(255,255,255,0.51)] inset-0 mix-blend-color-dodge rounded-[24px]" />
      </div>
      <div aria-hidden="true" className="absolute border-3 border-[rgba(229,204,80,0.5)] border-solid inset-[-1.5px] pointer-events-none rounded-[25.5px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[32px] py-[24px] relative w-full">
        <Frame15 />
        <p className="font-['General_Sans_Variable:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#113971] text-[16px] w-[min-content]">“Your strongest recovery happened during your evening wind‑down.”</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#212121] content-stretch flex items-center justify-center px-[24px] py-[4px] relative rounded-[24px] shrink-0">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#f4f2f3] text-[20px] whitespace-nowrap">{`Day `}</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[4px] relative rounded-[24px] shrink-0">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#212121] text-[20px] whitespace-nowrap">Week</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[4px] relative rounded-[24px] shrink-0">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#212121] text-[20px] whitespace-nowrap">{`Month `}</p>
    </div>
  );
}

function HeartbeatFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="heartbeat_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p29ae2200} fill="var(--fill-0, #F05B51)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <HeartbeatFill />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Heart Rate</p>
    </div>
  );
}

function ArrowsRightFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrows_right_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p20abd800} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] relative w-full">
          <Frame3 />
          <ArrowsRightFill />
        </div>
      </div>
    </div>
  );
}

function Measurement() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col gap-[8px] items-center py-[24px] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] shrink-0 w-full" data-name="Measurement">
      <Frame6 />
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black w-[296px]">“Your activation rose during focus, not stress.”</p>
    </div>
  );
}

function ThermometerSimple() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ThermometerSimple">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ThermometerSimple">
          <path d={svgPaths.p82b7080} fill="var(--fill-0, #4FA0FD)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <ThermometerSimple />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Temperature</p>
    </div>
  );
}

function ArrowsRightFill1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrows_right_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p20abd800} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-between px-[24px] relative shrink-0 w-[353px]">
      <Frame4 />
      <ArrowsRightFill1 />
    </div>
  );
}

function Measurement1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col gap-[8px] items-center py-[24px] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] shrink-0 w-full" data-name="Measurement">
      <Frame7 />
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black w-[296px]">“Slightly warm during moments of pressure”</p>
    </div>
  );
}

function Heart() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Heart">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Heart">
          <path d={svgPaths.pb222800} fill="var(--fill-0, #FB6D95)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Heart />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] text-black whitespace-nowrap">HRV (Heart Rate Variability)</p>
    </div>
  );
}

function ArrowsRightFill2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrows_right_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p20abd800} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-between px-[24px] relative shrink-0 w-[353px]">
      <Frame5 />
      <ArrowsRightFill2 />
    </div>
  );
}

function Measurement2() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col gap-[8px] items-center py-[24px] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] shrink-0 w-full" data-name="Measurement">
      <Frame8 />
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black w-[296px]">“Slightly warm during moments of pressure”</p>
    </div>
  );
}

function WetFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="wet_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p2d2f2e00} fill="var(--fill-0, #113971)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <WetFill />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Sweat Levels</p>
    </div>
  );
}

function ArrowsRightFill3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrows_right_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p20abd800} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-between px-[24px] relative shrink-0 w-[353px]">
      <Frame10 />
      <ArrowsRightFill3 />
    </div>
  );
}

function Measurement3() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col gap-[8px] items-center py-[24px] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] shrink-0 w-full" data-name="Measurement">
      <Frame9 />
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-black w-[296px]">“Slightly warm during moments of pressure”</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Measurement />
      <Measurement1 />
      <Measurement2 />
      <Measurement3 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame16 />
      <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] shrink-0 w-[353px]">
        <Frame />
        <Frame1 />
        <Frame2 />
      </div>
      <Frame13 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[24px] items-start left-1/2 top-[100px] w-[353px]">
      <Frame18 />
      <Frame17 />
    </div>
  );
}

export default function Profile() {
  return (
    <div className="bg-[#f4f2f3] overflow-clip relative rounded-[54px] size-full" data-name="Profile">
      <div className="absolute content-stretch flex items-start justify-center left-[40px] top-[752px]" data-name="NavBar">
        <TabBarButtons />
      </div>
      <div className="absolute flex h-[488.862px] items-center justify-center left-[161.45px] top-[-257.93px] w-[433.097px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-75.8deg]">
          <div className="h-[341px] relative w-[418px]">
            <div className="absolute inset-[1.5%_1.57%_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 411.443 335.879">
                <path d={svgPaths.p275fab00} fill="url(#paint0_radial_13_694)" id="Polygon 1" opacity="0.65" />
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(209 165.379) rotate(90) scale(170.5 209)" gradientUnits="userSpaceOnUse" id="paint0_radial_13_694" r="1">
                    <stop stopColor="#FECCDA" />
                    <stop offset="1" stopColor="#E5CC50" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[526.818px] items-center justify-center left-[-305px] top-[952px] w-[539.391px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[141.63deg]">
          <div className="h-[341px] relative w-[418px]">
            <div className="absolute inset-[1.5%_1.57%_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 411.443 335.879">
                <path d={svgPaths.p275fab00} fill="url(#paint0_radial_13_700)" id="Polygon 2" opacity="0.65" />
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(209 165.379) rotate(90) scale(170.5 209)" gradientUnits="userSpaceOnUse" id="paint0_radial_13_700" r="1">
                    <stop stopColor="#BFB3FB" />
                    <stop offset="1" stopColor="#FECCDA" stopOpacity="0" />
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
      <p className="absolute font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] left-[calc(100%+190px)] text-[16px] text-white top-[-619px] w-[140px]">Body</p>
      <Frame19 />
    </div>
  );
}