import React from "react";
import { CourseItem } from "../../../components";
import { useSelector } from "react-redux";

export default function FeeCourse() {
  const courseList = useSelector((state) => state.course.courseList);
  return (
    <section className="container mx-auto px-4 z-[1] bg-white text-gray-600">
      <div className="flex items-baseline">
        <h2 className="my-1 lg:my-4 mr-auto font-black text-[24px] text-[#242424]">
          <span rel="noreferrer" target="_self">
            Khóa học Pro
            <span className="bg-[#1473e6] rounded-md text-white text-[12px] font-medium px-[6px] py-[3px] relative uppercase -top-[6px] -right-2">
              Mới
            </span>
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap flex-auto -mx-2 lg:-mx-3">
        {courseList
          ?.filter((item) => item?.isPro)
          ?.map((item, index) => (
            <CourseItem isPro item={item} key={index} />
          ))}
      </div>
    </section>
  );
}
