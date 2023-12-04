import { FaCirclePlay, FaCompactDisc, FaLock } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setPlaying } from "../redux/slice/learning.slice";
export default function LessonItem({ lesson }) {
  const dispatch = useDispatch();

  const lessonList = useSelector((state) => state.learning.lessonList);
  return (
    <div
      className={`${
        lesson?.isPublished
          ? "bg-[#b6eb9333]"
          : "bg-[#e7e7e7] opacity-60 pointer-events-none "
      } flex relative transition-all duration-300 ease-in-out py-[10px] pl-[2px] flex-row items-center `}>
      <div
        className="relative ml-7 flex-1 cursor-pointer"
        onClick={() => dispatch(setPlaying(lesson))}>
        <h3 className="text-black text-sm/[1.4] font-medium m-0 -top-[2px]">
          {lessonList?.indexOf(lesson) + 1 + ". " + lesson?.name}
        </h3>
        <p className="text-[12px] mb-0 flex items-center gap-x-1 mt-1">
          {lesson?.isPublished ? (
            <FaCompactDisc className="text-[#f05123cc]" />
          ) : (
            <FaCirclePlay className="text-[#888]" />
          )}
          <span>10:34</span>
        </p>
      </div>
      {!lesson?.isPublished && (
        <div className="flex justify-center items-center w-9 mr-3">
          <FaLock className="text-[#888]" />
        </div>
      )}
    </div>
  );
}
