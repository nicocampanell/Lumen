import svgPaths from "./svg-glenvt3wb2";

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
    <div className="absolute inset-0 rounded-bl-[296px] rounded-tl-[296px]" data-name="Fill">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-bl-[296px] rounded-tl-[296px]">
        <div className="absolute bg-[#333] inset-0 mix-blend-color-dodge rounded-bl-[296px] rounded-tl-[296px]" />
        <div className="absolute inset-0 rounded-bl-[296px] rounded-tl-[296px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(247, 247, 247) 0%, rgb(247, 247, 247) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)" }} />
      </div>
    </div>
  );
}

function GlassEffect() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-bl-[296px] rounded-tl-[296px]" data-name="Glass Effect" />;
}

function LeftFill() {
  return (
    <div className="overflow-clip relative size-[36px]" data-name="left_fill">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="Group">
          <g id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p59f1600} fill="var(--fill-0, #09244B)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MenuFill() {
  return (
    <div className="absolute left-[24px] overflow-clip size-[32px] top-[10px]" data-name="menu_fill">
      <div className="absolute flex items-center justify-center left-[-2px] size-[36px] top-[-2px]">
        <div className="flex-none rotate-180">
          <LeftFill />
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  return (
    <div className="relative size-full" data-name="Menu">
      <Blur />
      <Fill />
      <GlassEffect />
      <MenuFill />
    </div>
  );
}