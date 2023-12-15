import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import LessonItem from "./LessonItem";

export default function LessonPanel({ item = {} }) {
  const [show, setShow] = useState(false);
  const min = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
  const second = Math.floor(Math.random() * (60 - 0 + 1)) + 0;
  return (
    <>
      <div
        className="bg-[#f7f8fa] border-b border-[#dedfe0] flex flex-col flex-wrap justify-between px-5 py-2 sticky top-0 select-none z-[2] cursor-pointer"
        onClick={() => setShow((pre) => !pre)}>
        <h3 className="text-black font-semibold text-base m-0">
          {item?.position + ". " + item?.title}
        </h3>
        <span className="text-[#29303b] font-normal text-[12px] mt-1">
          0/{item?.trackSteps?.length} | {min > 9 ? min : `0${min}`}:
          {second > 9 ? second : `0${second}`}
        </span>
        <span className="absolute right-[23px] top-3 text-base text-[#333]">
          {show ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      <div className={`${show ? "block" : "hidden"}`}>
        {item?.trackSteps?.map((lesson, index) => (
          <LessonItem lesson={lesson} key={index} />
        ))}
      </div>
    </>
  );
}
