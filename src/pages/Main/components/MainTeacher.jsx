import React from "react";
import { TeacherCard } from "../../../components";
import classNames from "classnames";
import { useSelector } from "react-redux";
export default function MainTeacher() {
  const teacherList = useSelector((state) => state.teacher.teacherList);
  // Tạo một danh sách sao chép từ danh sách gốc để tránh ảnh hưởng đến danh sách gốc.
  const teacherListCopy = teacherList && [...teacherList];

  // Sử dụng hàm shuffle để xáo trộn danh sách giáo viên.
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  teacherList && shuffleArray(teacherListCopy);
  // Lấy 4 giáo viên đầu tiên từ danh sách đã xáo trộn.
  const randomTeachers = teacherList && teacherListCopy.slice(0, 4);
  return (
    <section
      className={`${classNames(
        "bg-teacher w-full py-8 bg-white relative flex items-center"
      )}`}>
      <div className="container mx-auto mb-0">
        <h2 className="relative flex flex-wrap justify-between items-center mb-3">
          <b className="block flex-1 h-[2px] bg-gray-400" />
          <span className="text-[#154a98] text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
            Đội ngũ giảng viên
          </span>
          <b className="block flex-1 h-[2px] bg-gray-400" />
        </h2>
        <div className="flex flex-wrap">
          {randomTeachers?.map((teacher, index) => (
            <TeacherCard teacher={teacher} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
