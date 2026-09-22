import svgPaths from "./svg-496xafu6hp";

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

function Frame1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <p className="font-['Switzer_Variable:Bold',sans-serif] font-bold leading-[48px] relative shrink-0 text-[#212121] text-[32px] tracking-[-1.5px] whitespace-nowrap">82 bpm</p>
      <HeartbeatFill />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[rgba(255,255,255,0.82)] content-stretch flex flex-col items-start px-[24px] py-[16px] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] size-full">
      <p className="font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] relative shrink-0 text-[#212121] text-[24px] tracking-[-0.5px] whitespace-nowrap">Current Heart Rate:</p>
      <Frame1 />
    </div>
  );
}