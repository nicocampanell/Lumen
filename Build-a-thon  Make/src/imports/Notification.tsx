import image_8704fe1a037798fb8fee06dfec949d2fa840b40a from 'figma:asset/8704fe1a037798fb8fee06dfec949d2fa840b40a.png'
import svgPaths from "./svg-loqxmaxujo";
import { useNavigate } from 'react-router';

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
    null
  );
}

function Group() {
  return (
    <div className="relative size-[24px]" data-name="Group">
      <svg src={image_8704fe1a037798fb8fee06dfec949d2fa840b40a} className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d="M5.59 7.41L10.18 12L5.59 16.59L7 18L13 12L7 6L5.59 7.41ZM11.59 7.41L16.18 12L11.59 16.59L13 18L19 12L13 6L11.59 7.41Z" fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame41() {
  const navigate = useNavigate();
  
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div 
        className="content-stretch flex gap-[8px] items-center p-[8px] relative rounded-[24px] shrink-0 cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none rotate-180">
            <Group />
          </div>
        </div>
        <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] text-black whitespace-nowrap">Back</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex font-['General_Sans_Variable:Medium',sans-serif] font-medium items-center justify-between relative shrink-0 w-full whitespace-nowrap">
      <p className="leading-[32px] relative shrink-0 text-[#212121] text-[20px]">Cortisol spike</p>
      <p className="leading-[28px] relative shrink-0 text-[18px] text-[rgba(33,33,33,0.4)]">11:00 pm</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="bg-clip-text bg-gradient-to-r font-['General_Sans_Variable:Regular',sans-serif] font-normal from-[#212121] leading-[24px] relative shrink-0 text-[16px] text-[transparent] to-[rgba(135,135,135,0.53)] whitespace-nowrap">Your heart rate spiked and your sweat in...</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame26 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] relative w-full">
          <Frame2 />
          <div className="relative shrink-0 size-[12px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <circle cx="6" cy="6" fill="var(--fill-0, #F05B51)" id="Ellipse 10" r="6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame16 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex font-['General_Sans_Variable:Medium',sans-serif] font-medium items-center justify-between relative shrink-0 w-full whitespace-nowrap">
      <p className="leading-[32px] relative shrink-0 text-[#212121] text-[20px]">Anxious Event</p>
      <p className="leading-[28px] relative shrink-0 text-[18px] text-[rgba(33,33,33,0.4)]">11:00 pm</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#212121] text-[16px] w-[277px] whitespace-pre-wrap">{`Your body temp dropped for 22  minutes and HRV lowered 10% from your baseline. `}</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function PencilFill() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="pencil_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pf712d00} fill="var(--fill-0, #F4F2F3)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame44() {
  return (
    <div className="bg-[#212121] content-stretch flex gap-[8px] items-center relative rounded-[24px] shrink-0 px-[8px] py-[4px]">
      <PencilFill />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[#f4f2f3] text-[16px] whitespace-nowrap">Add a description</p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame44 />
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal h-[24px] leading-[24px] relative shrink-0 text-[#bbb9bc] text-[16px] w-[277px]">eg. Meeting went bad</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative">
      <Frame30 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[16px] items-center justify-center px-[24px] relative w-full">
          <Frame31 />
          <div className="relative shrink-0 size-[12px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <circle cx="6" cy="6" fill="var(--fill-0, #F05B51)" id="Ellipse 10" r="6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame33 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 353 1">
            <line id="Line 22" opacity="0.1" stroke="var(--stroke-0, black)" x2="353" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex font-['General_Sans_Variable:Medium',sans-serif] font-medium items-center justify-between relative shrink-0 w-full whitespace-nowrap">
      <p className="leading-[32px] relative shrink-0 text-[#212121] text-[20px]">Cortisol spike</p>
      <p className="leading-[28px] relative shrink-0 text-[18px] text-[rgba(33,33,33,0.4)]">11:00 pm</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="bg-clip-text bg-gradient-to-r font-['General_Sans_Variable:Regular',sans-serif] font-normal from-[#212121] leading-[24px] relative shrink-0 text-[16px] text-[transparent] to-[rgba(135,135,135,0.53)] whitespace-nowrap">Your heart rate spiked and your sweat in...</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame27 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] relative w-full">
          <Frame5 />
          <div className="relative shrink-0 size-[12px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <circle cx="6" cy="6" fill="var(--fill-0, #F05B51)" id="Ellipse 10" r="6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame17 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex font-['General_Sans_Variable:Medium',sans-serif] font-medium items-center justify-between relative shrink-0 w-full whitespace-nowrap">
      <p className="leading-[32px] relative shrink-0 text-[#212121] text-[20px]">Cortisol spike</p>
      <p className="leading-[28px] relative shrink-0 text-[18px] text-[rgba(33,33,33,0.4)]">11:00 pm</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="bg-clip-text bg-gradient-to-r font-['General_Sans_Variable:Regular',sans-serif] font-normal from-[#212121] leading-[24px] relative shrink-0 text-[16px] text-[transparent] to-[rgba(135,135,135,0.53)] whitespace-nowrap">Your heart rate spiked and your sweat in...</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame28 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <Frame9 />
      <Frame10 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] relative w-full">
          <Frame8 />
          <div className="relative shrink-0 size-[12px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <circle cx="6" cy="6" fill="var(--fill-0, #F05B51)" id="Ellipse 10" r="6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame18 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex font-['General_Sans_Variable:Medium',sans-serif] font-medium items-center justify-between relative shrink-0 w-full whitespace-nowrap">
      <p className="leading-[32px] relative shrink-0 text-[#212121] text-[20px]">Cortisol spike</p>
      <p className="leading-[28px] relative shrink-0 text-[18px] text-[rgba(33,33,33,0.4)]">11:00 pm</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="bg-clip-text bg-gradient-to-r font-['General_Sans_Variable:Regular',sans-serif] font-normal from-[#212121] leading-[24px] relative shrink-0 text-[16px] text-[transparent] to-[rgba(135,135,135,0.53)] whitespace-nowrap">Your heart rate spiked and your sweat in...</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame29 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] relative w-full">
          <Frame11 />
          <div className="relative shrink-0 size-[12px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <circle cx="6" cy="6" fill="var(--fill-0, #F05B51)" id="Ellipse 10" r="6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame19 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex font-['General_Sans_Variable:Medium',sans-serif] font-medium items-center justify-between relative shrink-0 w-full whitespace-nowrap">
      <p className="leading-[32px] relative shrink-0 text-[#212121] text-[20px]">Cortisol spike</p>
      <p className="leading-[28px] relative shrink-0 text-[18px] text-[rgba(33,33,33,0.4)]">11:00 pm</p>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="bg-clip-text bg-gradient-to-r font-['General_Sans_Variable:Regular',sans-serif] font-normal from-[#212121] leading-[24px] relative shrink-0 text-[16px] text-[transparent] to-[rgba(135,135,135,0.53)] whitespace-nowrap">Your heart rate spiked and your sweat in...</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame38 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <Frame15 />
      <Frame21 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] relative w-full">
          <Frame14 />
          <div className="relative shrink-0 size-[12px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Ellipse 10" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame20 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex font-['General_Sans_Variable:Medium',sans-serif] font-medium items-center justify-between relative shrink-0 w-full whitespace-nowrap">
      <p className="leading-[32px] relative shrink-0 text-[#212121] text-[20px]">Cortisol spike</p>
      <p className="leading-[28px] relative shrink-0 text-[18px] text-[rgba(33,33,33,0.4)]">11:00 pm</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="bg-clip-text bg-gradient-to-r font-['General_Sans_Variable:Regular',sans-serif] font-normal from-[#212121] leading-[24px] relative shrink-0 text-[16px] text-[transparent] to-[rgba(135,135,135,0.53)] whitespace-nowrap">Your heart rate spiked and your sweat in...</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame40 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
      <Frame24 />
      <Frame25 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] relative w-full">
          <Frame23 />
          <div className="relative shrink-0 size-[12px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Ellipse 10" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame22 />
    </div>
  );
}

function ContentExcludingBackAlert() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Content (excluding back/alert)">
      <p className="font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] min-w-full relative shrink-0 text-[#212121] text-[24px] text-center tracking-[-0.5px] w-[min-content] font-[Switzer]">Notifications</p>
      <div className="bg-[#f4f2f3] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[353px]" data-name="Cortisol Spike">
        <Frame32 />
        <div className="h-0 relative shrink-0 w-[289px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 289 1">
              <line id="Line 23" opacity="0.1" stroke="var(--stroke-0, black)" x2="289" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <Frame42 />
      <div className="bg-[#f4f2f3] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[353px]">
        <Frame34 />
        <div className="h-0 relative shrink-0 w-[289px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 289 1">
              <line id="Line 23" opacity="0.1" stroke="var(--stroke-0, black)" x2="289" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f2f3] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[353px]">
        <Frame35 />
        <div className="h-0 relative shrink-0 w-[289px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 289 1">
              <line id="Line 23" opacity="0.1" stroke="var(--stroke-0, black)" x2="289" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f2f3] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[353px]">
        <Frame36 />
        <div className="h-0 relative shrink-0 w-[289px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 289 1">
              <line id="Line 23" opacity="0.1" stroke="var(--stroke-0, black)" x2="289" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f2f3] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[353px]">
        <Frame37 />
        <div className="h-0 relative shrink-0 w-[289px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 289 1">
              <line id="Line 23" opacity="0.1" stroke="var(--stroke-0, black)" x2="289" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#f4f2f3] content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[353px]">
        <Frame39 />
        <div className="h-0 relative shrink-0 w-[289px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 289 1">
              <line id="Line 23" opacity="0.1" stroke="var(--stroke-0, black)" x2="289" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[20px] top-[52px] w-[353px]">
      <Frame41 />
      <ContentExcludingBackAlert />
    </div>
  );
}

export default function Notification() {
  return (
    <div className="bg-[#f4f2f3] overflow-clip relative rounded-[40px] size-full p-[0px] mx-[10px] my-[-43px]" data-name="Notification">
      <div className="absolute content-stretch flex flex-col items-start left-0 top-0" data-name="Status bar">
        <StatusBar />
      </div>
      <Frame43 />
    </div>
  );
}