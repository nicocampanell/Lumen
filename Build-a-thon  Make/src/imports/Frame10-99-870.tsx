import svgPaths from "./svg-0e21mjoq89";

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

function Frame3() {
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
      <Frame3 />
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

export default function Frame1() {
  return (
    <div className="bg-gradient-to-r content-stretch flex from-[30.638%] from-[rgba(240,91,81,0.34)] items-center pl-[16px] py-[8px] relative rounded-[70px] size-full to-[rgba(247,247,247,0)]">
      <Frame />
    </div>
  );
}