import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBars,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setShowPlaylist } from "../../../redux/slice/show.slice";
import { setPlaying } from "../../../redux/slice/learning.slice";

export default function ActionBar() {
  const showPlaylist = useSelector((state) => state.show.showPlaylist);
  const playing = useSelector((state) => state.learning.playing);
  const lessonList = useSelector((state) => state.learning.lessonList);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (lessonList?.length > 0) {
      setIndex(lessonList?.indexOf(playing));
    }
  }, [playing, lessonList]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (lessonList?.length > 0) {
      dispatch(setPlaying(lessonList[index]));
    }
  }, [index, lessonList]);

  return (
    <div
      className="fixed bottom-0 right-0 left-0 flex justify-center items-center bg-[#f0f0f0] h-[50px] z-[2] "
      style={{
        boxShadow: "0 -2px 3px rgba(0,0,0,.1)",
      }}>
      <button
        onClick={() => {
          index > 0 ? setIndex((prev) => prev - 1) : setIndex(0);
        }}
        className={`${
          index > 0 ? "" : "pointer-events-none opacity-50  "
        } text-[#404040] font-semibold text-sm px-3 py-2 transition duration-300 select-none rounded-md cursor-pointer flex items-center gap-x-2`}>
        <FaChevronLeft />
        <span>BÀI TRƯỚC</span>
      </button>
      <button
        onClick={() => {
          lessonList[index + 1]?.isPublished
            ? index < lessonList?.length - 1
              ? setIndex((prev) => prev + 1)
              : setIndex(lessonList?.length)
            : setIndex(index);
        }}
        className={`${
          index < lessonList?.length - 1 && lessonList[index + 1]?.isPublished
            ? ""
            : "pointer-events-none opacity-50 "
        } text-[#f05123] font-semibold text-sm px-3 py-2 transition duration-300 select-none rounded-md cursor-pointer flex items-center gap-x-2 border-2 border-[#f05123] ml-3`}>
        <span>BÀI TIẾP THEO</span>
        <FaChevronRight />
      </button>
      <div className="flex items-center justify-start lg:justify-end absolute left-0 right-[unset] lg:right-0 top-0 lg:left-[unset] w-[26%] lg:w-[30%] cursor-pointer bottom-0">
        <h3 className="hidden lg:flex break-words line-clamp-1 overflow-hidden text-sm font-semibold">
          {index + 1 + ". " + playing?.name}
        </h3>
        <button className="flex items-center justify-center w-10 mx-2 h-10 cursor-pointer bg-[#fff] rounded-full text-base flex-shrink-0">
          {showPlaylist ? (
            <FaArrowRight onClick={() => dispatch(setShowPlaylist(false))} />
          ) : (
            <FaBars onClick={() => dispatch(setShowPlaylist(true))} />
          )}
        </button>
      </div>
    </div>
  );
}
