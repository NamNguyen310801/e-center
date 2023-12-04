import React from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { LessonPanel } from "../../../components";
import { setShowPlaylist } from "../../../redux/slice/show.slice";

export default function LearningTrack() {
  const showPlaylist = useSelector((state) => state.show.showPlaylist);
  const learning = useSelector((state) => state.learning.learning);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        showPlaylist ? "" : "hidden"
      } fixed mt-0 lg:mt-[50px] border-l border-[#e7e7e7] right-[unset] left-0 lg:left-[unset] lg:right-0 top-0 w-full lg:w-[23%] z-50 lg:z-[2] bottom-0 lg:bottom-[50px]`}>
      <div
        id="learn-playlist"
        className="bg-[#fff] flex flex-col h-full w-full animate-hidden px-4">
        <header className="flex items-center justify-between  py-3 select-none">
          <h1 className="text-base m-0 font-semibold">Nội dung khóa học</h1>
          <button
            className="bg-transparent mr-2 text-lg lg:hidden"
            onClick={() => dispatch(setShowPlaylist(false))}>
            <FaXmark />
          </button>
        </header>
        <div
          className="flex-1 overscroll-contain"
          style={{
            overflowY: "overlay",
          }}>
          {learning?.tracks?.map((item, index) => (
            <LessonPanel item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
