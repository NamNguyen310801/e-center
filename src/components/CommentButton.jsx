import React from "react";
import { FaComments } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function CommentButton() {
  const showPlaylist = useSelector((state) => state.show.showPlaylist);
  return (
    <div
      className={`fixed ${
        showPlaylist ? "right-[calc(23%+20px)] " : " right-5"
      } z-[1] bottom-[70px] `}
      data-tour="comments-tutorial">
      <button
        className="bg-white text-[#24682d] px-2 lg:px-3 py-2 font-semibold relative select-none text-base cursor-pointer rounded-full flex items-center border lg:border-[#24682d] gap-x-2"
        style={{
          boxShadow: "0 0 10px rgba(0,0,0,.2)",
        }}>
        <FaComments className="text-xl" />
        <span className="hidden lg:inline">Hỏi đáp</span>
      </button>
    </div>
  );
}
