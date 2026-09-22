import svgPaths from "./svg-mygrjw94ui";

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

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <SunLine />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#113971] text-[20px] whitespace-nowrap">Insight of the Day</p>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start px-[32px] py-[24px] relative rounded-[24px] size-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
        <div className="absolute inset-0 rounded-[24px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 354 144\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(35.751 5.0108 -3.2174 21.609 56.66 45.243)\\'><stop stop-color=\\'rgba(234,204,108,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(237,148,94,0.5)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(240,91,81,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
        <div className="absolute bg-[rgba(255,255,255,0.51)] inset-0 mix-blend-color-dodge rounded-[24px]" />
      </div>
      <div aria-hidden="true" className="absolute border-3 border-[rgba(254,204,218,0.5)] border-solid inset-[-1.5px] pointer-events-none rounded-[25.5px]" />
      <Frame />
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#113971] text-[16px] w-[min-content]">“Your activation rose during focus, not stress.”</p>
    </div>
  );
}