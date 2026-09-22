import svgPaths from "./svg-mkqxjnl6fq";

function Time() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Time">
      <p className="font-['SF_Pro:Semibold',sans-serif] font-[590] leading-[22px] relative shrink-0 text-[#212121] text-[17px] text-center tracking-[-0.43px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
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
  return <div className="bg-[#212121] h-[37px] rounded-[100px] shrink-0 w-[126px]" data-name="Hole" />;
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
          <path d={svgPaths.p28984780} fill="var(--fill-0, #212121)" id="Bar Empty" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute inset-[0_0_0.06%_83.25%]" data-name="Bar #4 Full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.26252 12.5306">
          <path d={svgPaths.p378f8200} fill="var(--fill-0, #212121)" id="Bar #4 Full" />
        </svg>
      </div>
      <div className="absolute inset-[75.47%_27.78%_0.06%_55.5%]" data-name="Bar Empty">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 3.06814">
          <path d={svgPaths.p28984780} fill="var(--fill-0, #212121)" id="Bar Empty" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute inset-[22.74%_27.76%_0.06%_55.52%]" data-name="Bar #3 Full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.2553 9.67947">
          <path d={svgPaths.p3a92fa80} fill="var(--fill-0, #212121)" id="Bar #3 Full" />
        </svg>
      </div>
      <div className="absolute inset-[75.47%_55.51%_0.06%_27.77%]" data-name="Bar Empty">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 3.06814">
          <path d={svgPaths.p28984780} fill="var(--fill-0, #212121)" id="Bar Empty" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute inset-[43.58%_55.52%_0.06%_27.76%]" data-name="Bar #2 Full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 7.06653">
          <path d={svgPaths.p265d0b00} fill="var(--fill-0, #212121)" id="Bar #2 Full" />
        </svg>
      </div>
      <div className="absolute inset-[75.47%_83.28%_0.06%_0]" data-name="Bar Empty">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 3.06814">
          <path d={svgPaths.p28984780} fill="var(--fill-0, #212121)" id="Bar Empty" opacity="0.2" />
        </svg>
      </div>
      <div className="absolute inset-[61.6%_83.28%_0.06%_0]" data-name="Bar #1 Full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.25535 4.80727">
          <path d={svgPaths.p10af4d00} fill="var(--fill-0, #212121)" id="Bar #1 Full" />
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
        <g clipPath="url(#clip0_35_181)" id="wifi F17">
          <path d={svgPaths.p28836a40} fill="var(--fill-0, #212121)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_35_181">
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
        <g clipPath="url(#clip0_35_177)" id="battery.100 F22 Fina">
          <path d={svgPaths.p2c9bc800} fill="var(--fill-0, #212121)" id="Outside" opacity="0.4" />
          <path d={svgPaths.p253f4280} fill="var(--fill-0, #212121)" id="Inside" />
        </g>
        <defs>
          <clipPath id="clip0_35_177">
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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #BBB9BC)" id="Ellipse 6" r="20" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#212121] text-[16px] whitespace-nowrap">Sarah Johnson</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #BBB9BC)" id="Ellipse 6" r="20" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#212121] text-[16px] whitespace-nowrap">Greg Johnson</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[40px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #BBB9BC)" id="Ellipse 6" r="20" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#212121] text-[16px] whitespace-nowrap">Fred Johnson</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[40px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <circle cx="20" cy="20" fill="var(--fill-0, #BBB9BC)" id="Ellipse 6" r="20" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#212121] text-[16px] text-center whitespace-nowrap">You</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame3 />
      <Frame4 />
      <Frame2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[173px]">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#212121] text-[20px] w-full">People (4)</p>
      <Frame5 />
    </div>
  );
}

function Group() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p155c8a00} fill="var(--fill-0, #212121)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function UserAddLine() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 size-[32px]" data-name="user_add_line">
      <Group />
    </div>
  );
}

function People() {
  return (
    <div className="absolute content-stretch flex items-start justify-between left-[34px] top-[377px] w-[325px]" data-name="People">
      <Frame6 />
      <UserAddLine />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#212121] text-[18px] text-center whitespace-nowrap">Family</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] items-center left-[154px] top-[154px] w-[86px]">
      <div className="h-[86px] relative shrink-0 w-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86 86">
          <circle cx="43" cy="43" fill="var(--fill-0, #BBB9BC)" id="Ellipse 9" r="43" />
        </svg>
      </div>
      <Frame17 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12.6px] items-center left-[59px] top-[148px] w-[77.4px]">
      <div className="h-[77.4px] relative shrink-0 w-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.4 77.4">
          <circle cx="38.7" cy="38.7" fill="var(--fill-0, #BBB9BC)" id="Ellipse 9" r="38.7" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#212121] text-[16.2px] text-center whitespace-nowrap">Roommates</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.34px] items-center left-[-29px] top-[136px] w-[69.66px]">
      <div className="h-[69.66px] relative shrink-0 w-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69.66 69.66">
          <circle cx="34.83" cy="34.83" fill="var(--fill-0, #BBB9BC)" id="Ellipse 9" r="34.83" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[22.68px] relative shrink-0 text-[#212121] text-[14.58px] text-center whitespace-nowrap">Corworkers</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.34px] items-center left-[353px] top-[136px] w-[69.66px]">
      <div className="h-[69.66px] relative shrink-0 w-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69.66 69.66">
          <circle cx="34.83" cy="34.83" fill="var(--fill-0, #BBB9BC)" id="Ellipse 9" r="34.83" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[22.68px] relative shrink-0 text-[#212121] text-[14.58px] text-center whitespace-nowrap">Friends</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12.6px] items-center left-[258px] top-[148px] w-[77.4px]">
      <div className="h-[77.4px] relative shrink-0 w-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.4 77.4">
          <circle cx="38.7" cy="38.7" fill="var(--fill-0, #BBB9BC)" id="Ellipse 9" r="38.7" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#212121] text-[16.2px] text-center whitespace-nowrap">Project</p>
    </div>
  );
}

function Selected() {
  return (
    <div className="absolute h-[96px] left-[-8px] pointer-events-none rounded-[24px] top-[36px] w-[318px]" data-name="Selected">
      <div aria-hidden="true" className="absolute inset-0 rounded-[24px]">
        <div className="absolute inset-0 rounded-[24px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 318 96\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(17.972 2.7892 -2.4132 8.0616 125.67 38.919)\\'><stop stop-color=\\'rgba(191,179,251,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(223,207,214,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(255,236,177,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
        <div className="absolute bg-[rgba(255,255,255,0.51)] inset-0 mix-blend-color-dodge rounded-[24px]" />
      </div>
      <div aria-hidden="true" className="absolute border-3 border-[rgba(229,204,80,0.25)] border-solid inset-[-1.5px] rounded-[25.5px]" />
    </div>
  );
}

function Toggle() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="Toggle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pfd53400} fill="var(--fill-0, #212121)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p6bddc80} fill="var(--fill-0, #212121)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function RadioboxLine() {
  return (
    <div className="content-stretch flex items-center overflow-clip py-[4px] relative shrink-0" data-name="radiobox_line">
      <Group1 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col font-['General_Sans_Variable:Regular',sans-serif] font-normal gap-[8px] items-start leading-[24px] relative shrink-0 text-[#212121] w-[278px]">
      <p className="relative shrink-0 text-[16px] whitespace-pre">{`Intimate   `}</p>
      <p className="min-w-full relative shrink-0 text-[14px] tracking-[0.21px] w-[min-content]">Share your orb, status, and your trends throughout your day.</p>
    </div>
  );
}

function Intamte() {
  return (
    <div className="content-stretch flex gap-[8px] h-[80px] items-start relative shrink-0 w-[302px]" data-name="Intamte">
      <RadioboxLine />
      <Frame12 />
    </div>
  );
}

function Group2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p1fca1200} fill="var(--fill-0, #212121)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function RadioboxLine1() {
  return (
    <div className="content-stretch flex items-center overflow-clip py-[4px] relative shrink-0" data-name="radiobox_line">
      <Group2 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col font-['General_Sans_Variable:Regular',sans-serif] font-normal gap-[8px] items-start leading-[24px] relative shrink-0 text-[#212121] w-[278px]">
      <p className="relative shrink-0 text-[16px] w-full whitespace-pre-wrap">{`Close   `}</p>
      <p className="relative shrink-0 text-[14px] tracking-[0.21px] w-full">Share your orb and a description of your feelings.</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <RadioboxLine1 />
      <Frame13 />
    </div>
  );
}

function Group3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p1fca1200} fill="var(--fill-0, #212121)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function RadioboxLine2() {
  return (
    <div className="content-stretch flex items-center overflow-clip py-[4px] relative shrink-0" data-name="radiobox_line">
      <Group3 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col font-['General_Sans_Variable:Regular',sans-serif] font-normal gap-[8px] items-start leading-[24px] relative shrink-0 text-[#212121] w-[278px]">
      <p className="relative shrink-0 text-[16px] w-full">Loose</p>
      <p className="relative shrink-0 text-[14px] tracking-[0.21px] w-full">Only show your orb to the group.</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <RadioboxLine2 />
      <Frame16 />
    </div>
  );
}

function ListOf() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[302px]" data-name="List of">
      <Intamte />
      <Frame14 />
      <Frame15 />
    </div>
  );
}

function VisibilityStatus() {
  return (
    <div className="absolute content-start flex flex-wrap gap-[12px] items-start left-[34px] top-[684px] w-[302px]" data-name="Visibility status">
      <Selected />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#212121] text-[20px] whitespace-nowrap">Visibility</p>
      <Toggle />
      <ListOf />
    </div>
  );
}

function AddNewCircle() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[298px] px-[8px] py-[4px] rounded-[24px] top-[71px]" data-name="Add new circle" style={{ backgroundImage: "linear-gradient(122.069deg, rgb(254, 204, 218) 27.085%, rgba(229, 204, 80, 0.51) 82.022%)" }}>
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#212121] text-[16px] whitespace-nowrap">Add New</p>
    </div>
  );
}

function Frame() {
  return <div className="absolute h-[39px] left-[127px] rounded-[41px] top-[296px] w-[108px]" />;
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[138px] px-[16px] py-[10px] rounded-[32px] top-[306px]" style={{ backgroundImage: "linear-gradient(261.304deg, rgb(254, 204, 218) 22.849%, rgba(229, 204, 80, 0) 111.66%)" }}>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#212121] text-[18px] whitespace-nowrap">View circle</p>
    </div>
  );
}

export default function SettingForDocial() {
  return (
    <div className="bg-[#f4f2f3] overflow-clip relative rounded-[54px] size-full" data-name="Setting for docial">
      <div className="absolute h-[234px] left-[90px] top-[76px] w-[213px]">
        <div className="absolute inset-[15.21%_11.54%_12.88%_4.47%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 178.897 168.263">
            <path d={svgPaths.p2543ac00} fill="url(#paint0_radial_35_173)" id="Vector 1" />
            <defs>
              <radialGradient cx="0" cy="0" gradientTransform="matrix(6.29319 81.9 -74.55 7.58776 96.9864 81.4004)" gradientUnits="userSpaceOnUse" id="paint0_radial_35_173" r="1">
                <stop stopColor="#FECCDA" />
                <stop offset="1" stopColor="#E5CC50" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[488.862px] items-center justify-center left-[176px] top-[773px] w-[433.097px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[-104.2deg]">
          <div className="h-[341px] relative w-[418px]">
            <div className="absolute inset-[1.5%_1.57%_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 411.443 335.879">
                <path d={svgPaths.p275fab00} fill="url(#paint0_radial_35_175)" id="Polygon 3" opacity="0.65" />
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(209 165.379) rotate(90) scale(170.5 209)" gradientUnits="userSpaceOnUse" id="paint0_radial_35_175" r="1">
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
      <People />
      <Frame7 />
      <Frame9 />
      <Frame10 />
      <Frame11 />
      <Frame8 />
      <p className="absolute font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] left-[147px] text-[#212121] text-[16px] top-[1063px] whitespace-nowrap">Leave Circle</p>
      <VisibilityStatus />
      <AddNewCircle />
      <p className="absolute font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] left-[37px] text-[#212121] text-[24px] top-[66px] tracking-[-0.5px] whitespace-nowrap">Circles</p>
      <Frame />
      <Frame18 />
    </div>
  );
}