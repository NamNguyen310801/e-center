import React from "react";
import { TeacherCard } from "../../../components";
import { useSelector } from "react-redux";

export default function StaffList() {
  const teacherList = useSelector((state) => state.teacher.teacherList);
  return (
    <div className="flex flex-col w-full gap-y-4">
      <h2 className="relative flex flex-wrap justify-center items-center mb-3">
        <b className="block flex-1 h-[2px] bg-gray-400 max-w-[188px]" />
        <span className="text-[#154a98] text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
          Đội ngũ đào tạo
        </span>
        <b className="block flex-1 h-[2px] bg-gray-400 max-w-[188px]" />
      </h2>
      <div className="flex w-full flex-wrap items-center relative">
        {teacherList?.map((teacher, index) => (
          <TeacherCard teacher={teacher} key={index} />
        ))}
      </div>
      <div className="w-full "></div>
    </div>
  );
}
