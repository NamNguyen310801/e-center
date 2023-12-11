import React from "react";
import {
  CourseChart,
  CoursePieChart,
  DashboardStatsGrid,
  StudentClassChart,
  StudentCourseChart,
  StudentProfilePieChart,
  StudentTuitionPieChart,
  TeacherProfilePieChart,
  TeacherSalaryPieChart,
} from "./components";

export default function AdminHome() {
  return (
    <div className="relative flex flex-col gap-4 h-auto w-full">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full h-[22rem]">
        <StudentProfilePieChart />
        <StudentTuitionPieChart />
        <TeacherProfilePieChart />
        <TeacherSalaryPieChart />
        <CoursePieChart />
      </div>
      <div className="flex flex-row gap-4 w-full h-[22rem]">
        <CourseChart />
        <StudentClassChart />
        <StudentCourseChart />
      </div>
    </div>
  );
}
