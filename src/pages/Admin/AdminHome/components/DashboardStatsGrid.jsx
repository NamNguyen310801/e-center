import React from "react";
import { GiBlackBook } from "react-icons/gi";
import CountUp from "react-countup";
import { Statistic } from "antd";
import { useSelector } from "react-redux";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import { PiUsersFour } from "react-icons/pi";
export default function DashboardStatsGrid() {
  const teacherList = useSelector((state) => state.teacher.teacherList);
  const studentList = useSelector((state) => state.student.studentList);
  const classList = useSelector((state) => state.classSlice.classList);
  const courseList = useSelector((state) => state.course.courseList);

  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <GiBlackBook className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <div className="flex items-center">
            <Statistic
              className="text-xl text-gray-700 font-semibold"
              title="Tổng khóa học"
              value={courseList?.length}
              formatter={formatter}
            />
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <PiUsersFour className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <div className="flex items-center">
            <Statistic
              className="text-xl text-gray-700 font-semibold"
              title="Tổng lớp học"
              value={classList?.length}
              formatter={formatter}
            />
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <FaUserGraduate className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <div className="flex items-center">
            <Statistic
              className="text-xl text-gray-700 font-semibold"
              title="Tổng học viên"
              value={studentList?.length}
              formatter={formatter}
            />
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <FaChalkboardTeacher className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <div className="flex items-center">
            <Statistic
              className="text-xl text-gray-700 font-semibold"
              title="Tổng giáo viên"
              value={teacherList?.length}
              formatter={formatter}
            />
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
