import React from "react";
import { AddCourse, UserCourseItem } from "../../../components";
import { useSelector } from "react-redux";

export default function UserCourse() {
  const user = useSelector((state) => state.auth.user);
  const studentList = useSelector((state) => state.student.studentList);
  const student = studentList?.find((student) => student?._id === user?.id);
  return (
    <main className="relative container mx-auto p-0 my-0">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-12 lg:mb-14 flex flex-col w-full">
          <h1 className="font-black text-[28px] text-[#242424]">
            Khóa học của tôi
          </h1>
          <div className="w-full text-base/[1.6] break-words text-[#292929] ">
            <p className="my-[6px]">Bạn chưa hoàn thành khóa học nào.</p>
          </div>
        </div>
        <div className="relative -top-4 lg:mb-2 w-full">
          <div className="min-h-[180px] pb-4 pt-1 md:min-h-[200px] md:py-0 w-full flex">
            <div className="flex flex-wrap flex-auto -mx-1 md:-mx-2 lg:-mx-3">
              {student?.course?.map((item, index) => (
                <UserCourseItem key={index} item={item} />
              ))}
              <AddCourse />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
