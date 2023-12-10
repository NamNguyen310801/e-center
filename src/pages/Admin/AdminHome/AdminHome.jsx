import React from "react";
import {
  CourseChart,
  CoursePieChart,
  DashboardStatsGrid,
  StudentProfilePieChart,
  TeacherProfilePieChart,
} from "./components";

export default function AdminHome() {
  return (
    <div className="relative flex flex-col gap-4 h-auto w-full">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full h-[22rem]">
        <StudentProfilePieChart />
      </div>
      <div className="flex flex-row gap-4 w-full h-[22rem]">
        <TeacherProfilePieChart />
      </div>
      <div className="flex flex-row gap-4 w-full h-[22rem]">
        <CoursePieChart />
        <CourseChart />
      </div>
    </div>
  );
}
