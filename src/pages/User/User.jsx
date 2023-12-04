import React from "react";
import ROUTER from "../../routers";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../../components";
import {
  UserCourse,
  UserProfile,
  UserHeader,
  UserSlide,
  UserSetting,
  UserFooter,
  UserSchedule,
  UserTuition,
} from "./components";
import "./user.css";
export default function User() {
  return (
    <div className="user w-full relative flex flex-col">
      <UserHeader />
      <div className="flex w-full">
        <UserSlide />
        <div className="w-full lg:w-[calc(100%-180px)]">
          <Routes>
            <Route path={ROUTER.MYCOURSES} element={<UserCourse />} />
            <Route path={ROUTER.MYPROFILE} element={<UserProfile />} />
            <Route path={ROUTER.SETTINGS} element={<UserSetting />} />
            <Route path={ROUTER.SCHEDULE} element={<UserSchedule />} />
            <Route path={ROUTER.TUITION} element={<UserTuition />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <UserFooter />
    </div>
  );
}
