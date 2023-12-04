import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CrownIcon } from "../assets";
import { Progress } from "antd";
import { useSelector } from "react-redux";

export default function UserCourseItem({ item = "" }) {
  const courseList = useSelector((state) => state.course.courseList);
  const [data, setData] = useState("");
  useEffect(() => {
    setData(courseList?.find((course) => course?._id === item?.courseId));
  }, [item, courseList]);
  return (
    <div className="items-course basis-full md:basis-1/2 lg:basis-1/4 max-w-[100%] md:max-w-[50%] lg:max-w-[25%] px-1 lg:px-3">
      <div className="relative mb-8 flex-shrink-0 flex flex-col gap-y-3">
        <Link
          to={`/learning/${item?.courseId}`}
          className="pt-[56.25%] block object-cover rounded-[16px] relative w-full group overflow-hidden after:bg-black/50 after:opacity-0 after:invisible after:inset-0 after:transition-all after:duration-300 after:absolute after:rounded-[16px] hover:after:opacity-100 hover:after:visible">
          <button className="inline-block outline-none text-center whitespace-nowrap px-4 py-[9px] rounded-full top-[60%] border text-sm opacity-0 z-[1] absolute translate-x-[-50%] translate-y-[-50%] text-black left-1/2 border-white bg-white group-hover:opacity-100 group-hover:visible group-hover:top-1/2 transition-all duration-300 appearance-none invisible font-semibold">
            {item?.isStarted ? "Tiếp tục học" : " Bắt đầu học"}
          </button>
          <img
            src={data?.thumbnail}
            alt={data?.name}
            className="h-full rounded-[16px] w-full absolute object-cover top-0 left-0  "
          />
        </Link>
        <h3 className="font-semibold">
          <Link
            to={`/learning/${item?.courseId}`}
            className="break-words line-clamp-1 text-base/[1.4] text-[#292929] overflow-hidden ">
            {data?.name}
          </Link>
        </h3>
        {data?.isPro && (
          <div className="bg-black/30 rounded-lg absolute top-3 p-[5px] w-[26px] pointer-events-none left-3">
            <img src={CrownIcon} alt="" />
          </div>
        )}
        <div className="w-full">
          <p className="text-[#666] text-[13px] mb-4">
            {item?.isStarted
              ? "Học cách đây một tháng trước"
              : "  Bạn chưa hoàn thành khóa này"}
          </p>
          {Boolean(item?.percent) && (
            <Progress className="w-full" percent={item?.percent} />
          )}
        </div>
      </div>
    </div>
  );
}
