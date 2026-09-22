import svgPaths from "./svg-hh2du68m3b";

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
        <g clipPath="url(#clip0_66_459)" id="wifi F17">
          <path d={svgPaths.p28836a40} fill="var(--fill-0, #212121)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_66_459">
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
        <g clipPath="url(#clip0_66_462)" id="battery.100 F22 Fina">
          <path d={svgPaths.p2c9bc800} fill="var(--fill-0, #212121)" id="Outside" opacity="0.4" />
          <path d={svgPaths.p253f4280} fill="var(--fill-0, #212121)" id="Inside" />
        </g>
        <defs>
          <clipPath id="clip0_66_462">
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

function User1Line() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="user_1_line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p29640100} fill="var(--fill-0, #09244B)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <User1Line />
      <p className="flex-[1_0_0] font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] min-h-px min-w-px relative text-[#212121] text-[20px]">People (4)</p>
    </div>
  );
}

function Frame() {
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

function Frame2() {
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

function Frame3() {
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

function Frame1() {
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

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0 w-full">
      <Frame />
      <Frame2 />
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[173px]">
      <Frame14 />
      <Frame4 />
    </div>
  );
}

function People() {
  return (
    <div className="absolute content-stretch flex items-start justify-between left-[46px] top-[715px] w-[325px]" data-name="People">
      <Frame5 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#212121] text-[18px] text-center whitespace-nowrap">Family</p>
    </div>
  );
}

function SelectedCircle1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] items-center left-[154px] top-[154px] w-[86px]" data-name="Selected Circle">
      <div className="h-[86px] relative shrink-0 w-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 86 86">
          <circle cx="43" cy="43" fill="var(--fill-0, #BBB9BC)" id="Ellipse 9" r="43" />
        </svg>
      </div>
      <Frame11 />
    </div>
  );
}

function SelectedCircle() {
  return (
    <div className="absolute contents left-[90px] top-[76px]" data-name="Selected circle">
      <div className="absolute h-[234px] left-[90px] top-[76px] w-[213px]" data-name="highlighting selected">
        <div className="absolute inset-[15.21%_11.54%_12.88%_4.47%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 178.897 168.263">
            <path d={svgPaths.p2543ac00} fill="url(#paint0_radial_66_478)" id="highlighting selected" />
            <defs>
              <radialGradient cx="0" cy="0" gradientTransform="matrix(6.29319 81.9 -74.55 7.58776 96.9864 81.4004)" gradientUnits="userSpaceOnUse" id="paint0_radial_66_478" r="1">
                <stop stopColor="#FECCDA" />
                <stop offset="1" stopColor="#E5CC50" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <SelectedCircle1 />
    </div>
  );
}

function RoomatesSecondary() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12.6px] items-center left-[59px] top-[148px] w-[77.4px]" data-name="Roomates (secondary">
      <div className="h-[77.4px] relative shrink-0 w-full">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77.4 77.4">
          <circle cx="38.7" cy="38.7" fill="var(--fill-0, #BBB9BC)" id="Ellipse 9" r="38.7" />
        </svg>
      </div>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[25.2px] relative shrink-0 text-[#212121] text-[16.2px] text-center whitespace-nowrap">Roommates</p>
    </div>
  );
}

function ProjectSecondary() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12.6px] items-center left-[258px] top-[148px] w-[77.4px]" data-name="Project (secondary)">
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

function Eye2Line() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="eye_2_line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p8966d00} fill="var(--fill-0, #09244B)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
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

function Frame15() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Eye2Line />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#212121] text-[20px] whitespace-nowrap">Visibility</p>
      <Toggle />
    </div>
  );
}

function Group() {
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
      <Group />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col font-['General_Sans_Variable:Regular',sans-serif] font-normal gap-[4px] items-start leading-[24px] relative shrink-0 text-[#212121] w-[278px]">
      <p className="relative shrink-0 text-[16px] whitespace-pre">{`Intimate   `}</p>
      <p className="min-w-full relative shrink-0 text-[14px] tracking-[0.21px] w-[min-content]">Share your orb, status, and your trends throughout your day.</p>
    </div>
  );
}

function Intamte() {
  return (
    <div className="content-stretch flex gap-[8px] h-[80px] items-center relative shrink-0 w-[302px]" data-name="Intamte">
      <RadioboxLine />
      <Frame6 />
    </div>
  );
}

function Group1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p17002580} fill="var(--fill-0, #212121)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function RadioboxLine1() {
  return (
    <div className="content-stretch flex items-center overflow-clip py-[4px] relative shrink-0" data-name="radiobox_line">
      <Group1 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col font-['General_Sans_Variable:Regular',sans-serif] font-normal gap-[4px] items-start leading-[24px] relative shrink-0 text-[#212121] w-[278px]">
      <p className="relative shrink-0 text-[16px] w-full whitespace-pre-wrap">{`Close   `}</p>
      <p className="relative shrink-0 text-[14px] tracking-[0.21px] w-full">Share your orb and a description of your feelings.</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <RadioboxLine1 />
      <Frame7 />
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

function RadioboxLine2() {
  return (
    <div className="content-stretch flex items-center overflow-clip py-[4px] relative shrink-0" data-name="radiobox_line">
      <Group2 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col font-['General_Sans_Variable:Regular',sans-serif] font-normal gap-[4px] items-start leading-[24px] relative shrink-0 text-[#212121] w-[278px]">
      <p className="relative shrink-0 text-[16px] w-full">Loose</p>
      <p className="relative shrink-0 text-[14px] tracking-[0.21px] w-full">Only show your orb to the group.</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <RadioboxLine2 />
      <Frame10 />
    </div>
  );
}

function ListOf() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[302px]" data-name="List of">
      <Intamte />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function VisibilityStatus() {
  return (
    <div className="absolute content-start flex flex-wrap gap-[12px] items-start left-[46px] top-[400px] w-[302px]" data-name="Visibility status">
      <Selected />
      <Frame15 />
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

function Frame12() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[138px] px-[16px] py-[10px] rounded-[32px] top-[306px]" style={{ backgroundImage: "linear-gradient(261.304deg, rgb(254, 204, 218) 22.849%, rgba(229, 204, 80, 0) 111.66%)" }}>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[#212121] text-[18px] whitespace-nowrap">View circle</p>
    </div>
  );
}

function AddCircleLine() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="add_circle_line">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Vector" />
          <path d={svgPaths.p39452300} fill="var(--fill-0, #09244B)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] items-center left-[143px] top-[992px] w-[108px]">
      <AddCircleLine />
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[14px] text-black tracking-[0.21px] w-[min-content]">Add New person</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[70px] left-[109.99px] rounded-[292px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.14),0px_1px_4px_0px_rgba(0,0,0,0.08)] top-[3.99px] w-[102px]" data-name="Container" style={{ backgroundImage: "linear-gradient(165.975deg, rgba(255, 255, 255, 0.72) 8.4861%, rgba(240, 240, 240, 0.55) 91.514%)" }}>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.9),inset_0px_-1px_0px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[9.38%_12.5%_12.5%_12.5%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9928 24.9925">
        <g id="Group">
          <path d={svgPaths.p1ad7d930} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Img() {
  return (
    <div className="relative shrink-0 size-[31.99px]" data-name="img">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group3 />
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="relative shrink-0 size-[31.99px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Img />
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[24.004px] relative shrink-0 w-[39.438px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['General_Sans:Regular',sans-serif] leading-[24px] left-[20px] not-italic text-[#898989] text-[14px] text-center top-[-0.24px] tracking-[0.0596px] whitespace-nowrap">Home</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[0.993px] h-[69.971px] items-center justify-center left-[3.99px] pb-[1.004px] rounded-[292px] top-[3.99px] w-[101.994px]" data-name="button">
      <Span />
      <Span1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[12.5%_8.33%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28.8 25.92">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p30c70000} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Img1() {
  return (
    <div className="relative shrink-0 size-[34.56px]" data-name="img">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group4 />
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div className="relative shrink-0 size-[31.99px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Img1 />
      </div>
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[24.004px] relative shrink-0 w-[49.281px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['General_Sans:Semi_Bold',sans-serif] leading-[24px] left-[25px] not-italic text-[#212121] text-[14px] text-center top-[-0.24px] tracking-[0.0596px] whitespace-nowrap">Circles</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[0.993px] h-[69.971px] items-center justify-center left-[109.98px] pb-[1.004px] rounded-[292px] top-[3.99px] w-[101.994px]" data-name="button">
      <Span2 />
      <Span3 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.6587 26.6587">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p1b65f380} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Img2() {
  return (
    <div className="relative shrink-0 size-[31.99px]" data-name="img">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Group5 />
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="relative shrink-0 size-[31.99px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Img2 />
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[24.004px] relative shrink-0 w-[41.542px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['General_Sans:Regular',sans-serif] leading-[24px] left-[21.5px] not-italic text-[#898989] text-[14px] text-center top-[-0.24px] tracking-[0.0596px] whitespace-nowrap">Profile</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[0.993px] h-[69.971px] items-center justify-center left-[215.97px] pb-[1.004px] rounded-[292px] top-[3.99px] w-[101.994px]" data-name="button">
      <Span4 />
      <Span5 />
    </div>
  );
}

function Div() {
  return (
    <div className="absolute h-[77.958px] left-[-5.98px] rounded-[296px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.18),0px_2px_8px_0px_rgba(0,0,0,0.1)] top-0 w-[321.955px]" data-name="div" style={{ backgroundImage: "linear-gradient(166.388deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.14) 100%)" }}>
      <Container1 />
      <Button />
      <Button1 />
      <Button2 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.45),inset_0px_-1px_3px_0px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[309.996px]" data-name="nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Div />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col h-[77.958px] items-center left-[42px] top-[1128px] w-[309.996px]" data-name="Container">
      <Nav />
    </div>
  );
}

export default function SettingForDocial() {
  return (
    <div className="bg-[#f4f2f3] overflow-clip relative rounded-[54px] size-full" data-name="Setting for docial">
      <div className="absolute flex h-[488.862px] items-center justify-center left-[176px] top-[773px] w-[433.097px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="-scale-y-100 flex-none rotate-[-104.2deg]">
          <div className="h-[341px] relative w-[418px]">
            <div className="absolute inset-[1.5%_1.57%_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 411.443 335.879">
                <path d={svgPaths.p275fab00} fill="url(#paint0_radial_66_480)" id="Polygon 3" opacity="0.65" />
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(209 165.379) rotate(90) scale(170.5 209)" gradientUnits="userSpaceOnUse" id="paint0_radial_66_480" r="1">
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
      <SelectedCircle />
      <RoomatesSecondary />
      <ProjectSecondary />
      <p className="absolute font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] left-[153px] text-[#212121] text-[16px] top-[1081px] whitespace-nowrap">Leave Circle</p>
      <VisibilityStatus />
      <AddNewCircle />
      <p className="absolute font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] left-[37px] text-[#212121] text-[24px] top-[66px] tracking-[-0.5px] whitespace-nowrap">Circles</p>
      <Frame12 />
      <Frame13 />
      <Container />
    </div>
  );
}