import { FaCirclePlay } from "react-icons/fa6";
export default function CourseLessonItem({ hidden = false, lesson }) {
  const min = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  const second = Math.floor(Math.random() * (60 - 0 + 1)) + 0;
  return (
    <div className={`${hidden ? "hidden" : "block"} transition duration-300`}>
      <div className="p-0">
        <div className="border-b border-black/5 text-[#333] text-sm/[48px] overflow-hidden relative py-0 pr-8 pl-8 flex justify-between items-center">
          <span className="float-left transition-all duration-300 ease-in-out flex items-center">
            <FaCirclePlay className="text-[#f0512366] w-4" />
            <div className="pl-[6px]">
              {lesson?.position + ". " + lesson?.name}
            </div>
          </span>
          <span className="flex-shrink-0 ml-[58px] min-w-[69px] text-right">
            {min > 9 ? min : `0${min}`}:{second > 9 ? second : `0${second}`}
          </span>
        </div>
      </div>
    </div>
  );
}
