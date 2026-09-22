export default function DayWeekMonth({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[rgba(255,255,255,0.2)] content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] w-[353px]"} data-name="Day/Week/Month">
      <div className="bg-[#212121] content-stretch flex items-center justify-center px-[24px] py-[4px] relative rounded-[24px] shrink-0">
        <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#f4f2f3] text-[20px] whitespace-nowrap">{`Day `}</p>
      </div>
      <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[4px] relative rounded-[24px] shrink-0">
        <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#212121] text-[20px] whitespace-nowrap">Week</p>
      </div>
      <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[4px] relative rounded-[24px] shrink-0">
        <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[#212121] text-[20px] whitespace-nowrap">{`Month `}</p>
      </div>
    </div>
  );
}