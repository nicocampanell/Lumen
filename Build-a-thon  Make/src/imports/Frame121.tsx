import svgPaths from "./svg-0k58lp7zak";

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

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Sparkles3Fill />
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#113971] text-[20px] whitespace-nowrap">Recovery Highlight</p>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start px-[32px] py-[24px] relative rounded-[24px] size-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
        <div className="absolute inset-0 rounded-[24px]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 353 144\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(19.95 4.1838 -2.6788 12.092 139.5 58.378)\\'><stop stop-color=\\'rgba(191,179,251,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,236,177,0.4)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
        <div className="absolute bg-[rgba(255,255,255,0.51)] inset-0 mix-blend-color-dodge rounded-[24px]" />
      </div>
      <div aria-hidden="true" className="absolute border-3 border-[rgba(229,204,80,0.5)] border-solid inset-[-1.5px] pointer-events-none rounded-[25.5px]" />
      <Frame />
      <p className="font-['General_Sans_Variable:Regular','Noto_Sans:Regular',sans-serif] font-normal leading-[24px] min-w-full relative shrink-0 text-[#113971] text-[16px] w-[min-content]">“Your strongest recovery happened during your evening wind‑down.”</p>
    </div>
  );
}