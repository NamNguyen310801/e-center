import React from "react";
import ProfileCourseItem from "./ProfileCourseItem";
import { useSelector } from "react-redux";

export default function ProfileCourse() {
  const user = useSelector((state) => state.auth.user);
  const studentList = useSelector((state) => state.student.studentList);
  const student = studentList?.find((student) => student?._id === user?.id);
  return (
    <section className="w-full px-1 md:px-2 lg:px-3 lg:basis-[58.33333%] lg:max-w-[58.33333%] max-h-[400px] overflow-y-scroll">
      <div
        className="flex flex-col bg-white rounded-lg mb-5 md:px-[14px] py-[18px] break-words"
        style={{
          boxShadow: "0 0 5px 0 rgba(0,0,0,.1), 0 0 1px 0 rgba(0,0,0,.1)",
        }}>
        <h4 className="text-base font-semibold ">Các khóa học đã tham gia</h4>
        <div className="w-full flex flex-col gap-y-2">
          {student?.course?.map((item, index) => (
            <ProfileCourseItem item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
