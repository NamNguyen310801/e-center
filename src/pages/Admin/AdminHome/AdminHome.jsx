import React from "react";
import RecentOrders from "./components/dasboard/RecentOrders";
import PopularProducts from "./components/dasboard/PopularProducts";
import {
  DashboardStatsGrid,
  StudentProfilePieChart,
  TeacherProfilePieChart,
} from "./components/dasboard";

export default function AdminHome() {
  return (
    <div className="relative flex flex-col gap-4 h-auto w-full">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full h-[22rem]">
        <StudentProfilePieChart />
        <TeacherProfilePieChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        {/* <RecentOrders />
        <PopularProducts /> */}
      </div>
      {/* <OrderAdminDetail onClose={handleOnClose} /> */}
    </div>
  );
}
