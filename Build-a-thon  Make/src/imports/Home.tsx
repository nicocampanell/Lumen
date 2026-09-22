import svgPaths from "./svg-n6zz1dofz1";
import imgCanvas from "figma:asset/500466acdf89801e590305a491357efe1806c851.png";

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
                <path d={svgPaths.p286dd000} fill="var(--fill-0, black)" id="Vector_2" />
              </g>
            </svg>
          </div>
          <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[14px] text-black text-center tracking-[0.21px] w-[min-content]">Home</p>
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

function Frame19() {
  return (
    <div className="absolute content-stretch flex h-[60px] items-center left-0 pl-[24px] top-0 w-[393px]">
      <p className="font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] relative shrink-0 text-[#212121] text-[24px] tracking-[-0.5px] whitespace-nowrap">Morning, Nico</p>
    </div>
  );
}

function Frame3() {
  return <div className="bg-[#212121] h-[16px] rounded-[3px] shrink-0 w-px" />;
}

function Frame4() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[8px] rounded-[3px] shrink-0 w-px" />;
}

function Frame5() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[10px] rounded-[3px] shrink-0 w-px" />;
}

function Frame6() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[12px] rounded-[3px] shrink-0 w-px" />;
}

function Frame8() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[10px] rounded-[3px] shrink-0 w-px" />;
}

function Frame7() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[8px] rounded-[3px] shrink-0 w-px" />;
}

function Frame9() {
  return <div className="bg-[#212121] h-[16px] rounded-[3px] shrink-0 w-px" />;
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame3 />
      <Frame4 />
      <Frame5 />
      <Frame6 />
      <Frame8 />
      <Frame7 />
      <Frame9 />
    </div>
  );
}

function Frame12() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[8px] rounded-[3px] shrink-0 w-px" />;
}

function Frame13() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[10px] rounded-[3px] shrink-0 w-px" />;
}

function Frame15() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[12px] rounded-[3px] shrink-0 w-px" />;
}

function Frame17() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[10px] rounded-[3px] shrink-0 w-px" />;
}

function Frame18() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[8px] rounded-[3px] shrink-0 w-px" />;
}

function Frame20() {
  return <div className="bg-[#212121] h-[16px] rounded-[3px] shrink-0 w-px" />;
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame12 />
      <Frame13 />
      <Frame15 />
      <Frame17 />
      <Frame18 />
      <Frame20 />
    </div>
  );
}

function Frame22() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[8px] rounded-[3px] shrink-0 w-px" />;
}

function Frame23() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[10px] rounded-[3px] shrink-0 w-px" />;
}

function Frame24() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[12px] rounded-[3px] shrink-0 w-px" />;
}

function Frame25() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[10px] rounded-[3px] shrink-0 w-px" />;
}

function Frame26() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[8px] rounded-[3px] shrink-0 w-px" />;
}

function Frame27() {
  return <div className="bg-[#212121] h-[16px] rounded-[3px] shrink-0 w-px" />;
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame22 />
      <Frame23 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
    </div>
  );
}

function Frame29() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[8px] rounded-[3px] shrink-0 w-px" />;
}

function Frame30() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[10px] rounded-[3px] shrink-0 w-px" />;
}

function Frame31() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[12px] rounded-[3px] shrink-0 w-px" />;
}

function Frame32() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[10px] rounded-[3px] shrink-0 w-px" />;
}

function Frame33() {
  return <div className="bg-[rgba(33,33,33,0.5)] h-[8px] rounded-[3px] shrink-0 w-px" />;
}

function Frame34() {
  return <div className="bg-[#212121] h-[16px] rounded-[3px] shrink-0 w-px" />;
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame29 />
      <Frame30 />
      <Frame31 />
      <Frame32 />
      <Frame33 />
      <Frame34 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame10 />
      <Frame11 />
      <Frame21 />
      <Frame28 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex font-['General_Sans_Variable:Regular',sans-serif] font-normal items-center justify-between leading-[24px] relative shrink-0 text-[14px] text-[rgba(51,51,51,0.5)] tracking-[0.21px] w-full whitespace-nowrap">
      <p className="relative shrink-0">0</p>
      <p className="relative shrink-0">6</p>
      <p className="relative shrink-0">noon</p>
      <p className="relative shrink-0">6</p>
      <p className="relative shrink-0">0</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[88px] top-[122px] w-[217px]">
      <Frame14 />
      <Frame35 />
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
    <div className="absolute inset-0 rounded-[32px]" data-name="Fill">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[32px]">
        <div className="absolute bg-[#333] inset-0 mix-blend-color-dodge rounded-[32px]" />
        <div className="absolute inset-0 rounded-[32px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 247, 247) 0%, rgb(247, 247, 247) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)" }} />
      </div>
    </div>
  );
}

function GlassEffect1() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[32px]" data-name="Glass Effect" />;
}

function InsightIcon() {
  return (
    <div className="absolute left-0 overflow-clip size-[24px] top-0" data-name="Insight Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p8c8fcc0} fill="var(--fill-0, #FECCDA)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading">
      <InsightIcon />
      <p className="absolute font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[28px] left-[32px] text-[18px] text-black top-0 whitespace-nowrap">Insight</p>
    </div>
  );
}

function DiveDeeper() {
  return (
    <div className="content-stretch flex gap-[10px] items-center px-[8px] py-[4px] relative rounded-[16px] shrink-0" data-name="Dive deeper" style={{ backgroundImage: "linear-gradient(93.7912deg, rgba(255, 255, 255, 0) 39.539%, rgb(255, 244, 191) 51.02%, rgb(254, 204, 218) 120.59%)" }}>
      <p className="font-['General_Sans_Variable:Semibold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#212121] text-[14px] tracking-[0.21px] whitespace-nowrap">meet you</p>
      <div className="relative shrink-0 size-[12px]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path clipRule="evenodd" d={svgPaths.pddc0d00} fill="var(--fill-0, #212121)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function InsighText() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-0 p-[16px] top-0 w-[295px]" data-name="Insigh text">
      <Heading />
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#212121] text-[14px] tracking-[0.21px] w-[min-content]">This is actually a good time for something hard. Difficult conversations, focused creative work etc.</p>
      <DiveDeeper />
    </div>
  );
}

function Insight() {
  return (
    <div className="absolute h-[176px] left-[51px] rounded-[10px] top-[466px] w-[295px]" data-name="Insight">
      <Blur2 />
      <Fill1 />
      <GlassEffect1 />
      <InsighText />
    </div>
  );
}

function Canvas() {
  return (
    <div className="absolute left-px size-[389.994px] top-[130px]" data-name="Canvas">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgCanvas} />
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute h-[660px] left-0 top-[71px] w-[393px]">
      <Frame19 />
      <Frame16 />
      <Insight />
      <Canvas />
    </div>
  );
}

function NotificationNewdotFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="notification_newdot_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p6024100} fill="var(--fill-0, #F05B51)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <NotificationNewdotFill />
      <p className="font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] relative shrink-0 text-[#f05b51] text-[24px] tracking-[-0.5px] whitespace-nowrap">5</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame37 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <Frame2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-gradient-to-r content-stretch flex from-[30.638%] from-[rgba(240,91,81,0.34)] h-[54px] items-center left-[312px] pl-[16px] py-[8px] rounded-[70px] to-[rgba(247,247,247,0)] top-[71px] w-[104px]">
      <Frame />
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

export default function Home() {
  return (
    <div className="bg-[#f4f2f3] overflow-clip relative rounded-[54px] size-full" data-name="Home">
      <div className="absolute content-stretch flex items-start justify-center left-[40px] top-[747px]" data-name="NavBar">
        <TabBarButtons />
      </div>
      <LeftLine />
      <Frame36 />
      <Frame1 />
      <div className="absolute content-stretch flex flex-col items-start left-0 top-[6px]" data-name="Status bar">
        <StatusBar />
      </div>
    </div>
  );
}