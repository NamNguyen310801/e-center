import React from "react";
import CourseLessonItem from "./CourseLessonItem";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function CoursePanel({ item = {} }) {
  const [show, setShow] = useState(false);
  return (
    <div className="border-none rounded-none mb-2 shadow-none">
      <div className="bg-[#f5f5f5] border border-[#ebebeb] rounded-md p-0 sticky top-[147px] z-[1] select-none">
        <h5 className="text-base my-0">
          <div
            className="text-[#333] text-base overflow-hidden py-4 pr-[30px] pl-8 relative cursor-pointer "
            onClick={() => setShow((pre) => !pre)}>
            {!show ? (
              <FaPlus
                className="absolute -translate-y-1/2 left-1 text-[#f05123]
             top-[50%] font-normal transition duration-300"
              />
            ) : (
              <FaMinus
                className="absolute -translate-y-1/2 left-1 text-[#f05123]
            top-[50%] font-normal transition duration-300"
              />
            )}
            <span className="float-left">
              <strong>{item?.position + ". " + item?.title}</strong>
            </span>
            <span className="float-right text-right min-w-[72px] text-sm">
              {item?.trackSteps?.length} bài học
            </span>
          </div>
        </h5>
      </div>
      {item?.trackSteps?.map((lesson, index) => (
        <CourseLessonItem hidden={!show} lesson={lesson} key={index} />
      ))}
    </div>
  );
}
