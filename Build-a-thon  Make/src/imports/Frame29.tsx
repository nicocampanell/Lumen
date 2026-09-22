export default function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative size-full text-white">
      <p className="font-['Switzer_Variable:Bold',sans-serif] font-bold leading-[48px] relative shrink-0 text-[32px] text-center tracking-[-1.5px] w-full">Heading 1</p>
      <p className="font-['Switzer_Variable:Semibold',sans-serif] font-semibold leading-[40px] relative shrink-0 text-[28px] tracking-[-1px] w-full">Heading 2</p>
      <p className="font-['Switzer_Variable:Medium',sans-serif] font-medium leading-[36px] relative shrink-0 text-[24px] tracking-[-0.5px] w-full">Heading 3</p>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[32px] relative shrink-0 text-[20px] w-full">Heading 4</p>
      <p className="font-['General_Sans_Variable:Medium',sans-serif] font-medium leading-[28px] relative shrink-0 text-[18px] w-full">Heading 5</p>
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] w-full">Body</p>
      <p className="font-['General_Sans_Variable:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[14px] tracking-[0.21px] w-full">Subtext</p>
    </div>
  );
}
