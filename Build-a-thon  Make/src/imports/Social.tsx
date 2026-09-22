import svgPaths from "./svg-si17j0n5yb";
import imgCanvas from "figma:asset/f0d9440aaea1a5df257044e12a049543f70c5e9d.png";

function Canvas() {
  return (
    <div className="h-[843.99px] relative shrink-0 w-[389.989px]" data-name="canvas">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCanvas} />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#f4f2f3] h-[843.99px] relative shrink-0 w-[389.989px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Canvas />
      </div>
    </div>
  );
}

function InteractiveZoomableGrid() {
  return (
    <div className="absolute bg-[#f4f2f3] content-stretch flex h-[853px] items-center justify-center left-0 top-[-1px] w-[394px]" data-name="Interactive Zoomable Grid">
      <Container />
    </div>
  );
}

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

function Frame() {
  return (
    <div className="absolute h-[68px] left-[138px] rounded-[41px] top-[392px] w-[118px]">
      <Blur />
      <Fill />
      <GlassEffect />
      <p className="absolute font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] left-[24px] text-[#212121] text-[24px] top-[16px] tracking-[-0.5px] whitespace-nowrap">Family</p>
    </div>
  );
}

function Blur3() {
  return <div className="absolute backdrop-blur-[20px] bg-[rgba(0,0,0,0.04)] blur-[10px] inset-[28px_26px_24px_26px] mix-blend-hard-light rounded-[1000px]" data-name="Blur" />;
}

function Blur2() {
  return (
    <div className="absolute inset-[-26px] opacity-67" data-name="Blur">
      <div className="absolute bg-white inset-[-50px]" data-name="Mask">
        <div className="absolute bg-black inset-[76px] rounded-[1000px]" data-name="Shape" />
      </div>
      <Blur3 />
    </div>
  );
}

function Fill1() {
  return (
    <div className="absolute inset-0 rounded-[296px]" data-name="Fill">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[296px]">
        <div className="absolute bg-[#333] inset-0 mix-blend-color-dodge rounded-[296px]" />
        <div className="absolute inset-0 rounded-[296px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 247, 247) 0%, rgb(247, 247, 247) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)" }} />
      </div>
    </div>
  );
}

function GlassEffect1() {
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
          <path clipRule="evenodd" d={svgPaths.p3016acc0} fill="var(--fill-0, #212121)" fillRule="evenodd" id="Vector_2" />
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
          <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#212121] text-[14px] text-center tracking-[0.21px] w-[min-content]">Circles</p>
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
          <path clipRule="evenodd" d={svgPaths.pf60a300} fill="var(--fill-0, #B6B6B6)" fillRule="evenodd" id="Vector_2" />
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
          <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#898989] text-[14px] text-center tracking-[0.21px] w-[min-content]">Profile</p>
        </div>
      </div>
    </div>
  );
}

function TabBarButtons() {
  return (
    <div className="content-stretch flex gap-[4px] items-start justify-center relative shrink-0" data-name="Tab Bar Buttons">
      <div className="absolute inset-[-4px]" data-name="BG">
        <Blur2 />
        <Fill1 />
        <GlassEffect1 />
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

function Blur5() {
  return <div className="absolute backdrop-blur-[20px] bg-[rgba(0,0,0,0.04)] blur-[10px] inset-[28px_26px_24px_26px] mix-blend-hard-light rounded-[1000px]" data-name="Blur" />;
}

function Blur4() {
  return (
    <div className="absolute inset-[-26px] opacity-67" data-name="Blur">
      <div className="absolute bg-white inset-[-50px]" data-name="Mask">
        <div className="absolute bg-black inset-[76px] rounded-[1000px]" data-name="Shape" />
      </div>
      <Blur5 />
    </div>
  );
}

function Fill2() {
  return (
    <div className="absolute inset-0 rounded-bl-[296px] rounded-tl-[296px]" data-name="Fill">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-bl-[296px] rounded-tl-[296px]">
        <div className="absolute bg-[#333] inset-0 mix-blend-color-dodge rounded-bl-[296px] rounded-tl-[296px]" />
        <div className="absolute inset-0 rounded-bl-[296px] rounded-tl-[296px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 247, 247) 0%, rgb(247, 247, 247) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)" }} />
      </div>
    </div>
  );
}

function GlassEffect2() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-bl-[296px] rounded-tl-[296px]" data-name="Glass Effect" />;
}

function MenuFill() {
  return (
    <div className="absolute left-[347px] overflow-clip size-[32px] top-[106px]" data-name="menu_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.pcc93200} fill="var(--fill-0, #212121)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute contents left-[323px] top-[96px]" data-name="Menu">
      <div className="absolute inset-[96px_0_705px_323px]" data-name="BG">
        <Blur4 />
        <Fill2 />
        <GlassEffect2 />
      </div>
      <MenuFill />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[54px] top-[183px] w-[88px]">
      <div className="relative shrink-0 size-[51px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 51">
          <circle cx="25.5" cy="25.5" fill="var(--fill-0, #D9D9D9)" id="Ellipse 4" r="25.5" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Greg Johnson</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[260px] top-[183px] w-[100px]">
      <div className="relative shrink-0 size-[51px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 51">
          <circle cx="25.5" cy="25.5" fill="var(--fill-0, #D9D9D9)" id="Ellipse 4" r="25.5" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Fred Johnson</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-center left-[75px] top-[576px] w-[122px]">
      <div className="relative shrink-0 size-[51px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 51 51">
          <circle cx="25.5" cy="25.5" fill="var(--fill-0, #D9D9D9)" id="Ellipse 4" r="25.5" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Sara Johnson</p>
    </div>
  );
}

export default function Social() {
  return (
    <div className="bg-[#f4f2f3] overflow-clip relative rounded-[54px] size-full" data-name="Social">
      <InteractiveZoomableGrid />
      <div className="absolute h-[274px] left-[53px] top-[292px] w-[287px]">
        <div className="absolute inset-[12.69%_13.52%_10.81%_4.52%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 235.203 209.631">
            <path d={svgPaths.p2f623ec0} fill="url(#paint0_radial_13_304)" id="Vector 1" />
            <defs>
              <radialGradient cx="0" cy="0" gradientTransform="matrix(8.47956 95.9 -100.45 8.88482 130.517 102.24)" gradientUnits="userSpaceOnUse" id="paint0_radial_13_304" r="1">
                <stop stopColor="#FECCDA" stopOpacity="0.58" />
                <stop offset="1" stopColor="#E5CC50" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <Frame />
      <div className="absolute content-stretch flex items-start justify-center left-[40px] top-[758px]" data-name="NavBar">
        <TabBarButtons />
      </div>
      <div className="absolute content-stretch flex flex-col items-start left-0 top-0" data-name="Status bar">
        <StatusBar />
      </div>
      <div className="absolute flex h-[70.881px] items-center justify-center left-[106.14px] top-[306.42px] w-[37.518px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-116.15deg]">
          <div className="h-[3.995px] relative w-[77px]">
            <div className="absolute inset-[-25.03%_-1.3%_-25.04%_-1.3%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.0003 5.9952">
                <path d={svgPaths.pb3cbc00} id="Line 1" stroke="var(--stroke-0, #212121)" strokeLinecap="round" strokeOpacity="0.2" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[70.881px] items-center justify-center left-[257px] top-[306px] w-[37.518px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[-63.85deg]">
          <div className="h-[3.995px] relative w-[77px]">
            <div className="absolute inset-[-25.03%_-1.3%_-25.04%_-1.3%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.0003 5.9952">
                <path d={svgPaths.pb3cbc00} id="Line 3" stroke="var(--stroke-0, #212121)" strokeLinecap="round" strokeOpacity="0.2" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[74.904px] items-center justify-center left-[139.86px] top-[487.05px] w-[22.724px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-74.66deg]">
          <div className="h-[2.444px] relative w-[77px]">
            <div className="absolute inset-[-40.91%_-1.3%_-40.92%_-1.3%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.0002 4.44462">
                <path d={svgPaths.p14f6f300} id="Line 2" stroke="var(--stroke-0, #212121)" strokeLinecap="round" strokeOpacity="0.2" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Menu />
      <Frame2 />
      <Frame3 />
      <Frame1 />
    </div>
  );
}