import svgPaths from "./svg-8dock3ubea";

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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['Switzer_Variable:Semibold',sans-serif] font-semibold leading-[40px] relative shrink-0 text-[#212121] text-[28px] tracking-[-1px] whitespace-nowrap">82 bpm</p>
      <HeartbeatFill />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[rgba(255,255,255,0.82)] content-stretch flex flex-col items-start relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] size-full px-[16px] py-[8px]">
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#212121] text-[20px] whitespace-nowrap">Current Heart Rate:</p>
      <Frame1 />
    </div>
  );
}