import NotificationNewdotFill from "./NotificationNewdotFill";
import { useNavigate } from "react-router";

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="shrink-0 size-[24px]">
        <NotificationNewdotFill />
      </div>
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
  const navigate = useNavigate();

  return (
    <div 
      className="bg-gradient-to-r content-stretch flex from-[38.298%] from-[rgba(240,91,81,0.34)] items-center pl-[16px] pr-[16px] py-[8px] relative rounded-[70px] size-full to-[rgba(247,247,247,0)] cursor-pointer"
      onClick={() => navigate('/notifications')}
    >
      <Frame />
    </div>
  );
}