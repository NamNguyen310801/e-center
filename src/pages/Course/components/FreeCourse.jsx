import React from "react";
import { CourseItem } from "../../../components";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import ROUTER from "../../../routers";
import { useSelector } from "react-redux";

export default function FreeCourse() {
  const courseList = useSelector((state) => state.course.courseList);
  return (
    <section className="container mx-auto px-4 z-[1] bg-white text-gray-600">
      <div className="flex items-baseline">
        <h2 className="my-1 lg:my-4 mr-auto font-black text-[24px] text-[#242424]">
          <Link
            className="flex items-center"
            rel="noreferrer"
            target="_self"
            to={ROUTER.LOTRINH}>
            <span rel="noreferrer" target="_self">
              Khóa học miễn phí
            </span>
          </Link>
        </h2>
        <Link
          className="flex items-center text-green-600 font-semibold gap-x-2"
          rel="noreferrer"
          target="_self"
          to={ROUTER.LOTRINH}>
          Xem lộ trình
          <FaChevronRight />
        </Link>
      </div>
      <div className="flex flex-wrap flex-auto -mx-2 lg:-mx-3">
        {courseList
          ?.filter((item) => !item?.isPro)
          ?.map((item, index) => (
            <CourseItem item={item} key={index} />
          ))}
      </div>
    </section>
  );
}
