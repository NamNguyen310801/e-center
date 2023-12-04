import React from "react";
import ROUTER from "../../routers";
import { Route, Routes } from "react-router-dom";
import {
  TeacherFooter,
  TeacherHeader,
  TeacherSalary,
  TeacherSchedule,
  TeacherSetting,
  TeacherSlide,
  TeacherStudent,
} from "./components";
import { NotFound } from "../../components";
import TeacherProfile from "./components/TeacherProfile";
import "./teacher.css";
export default function Teacher() {
  return (
    <div className="user w-full relative flex flex-col">
      <TeacherHeader />
      <div className="flex w-full">
        <TeacherSlide />
        <div className="w-full lg:w-[calc(100%-180px)]">
          <Routes>
            <Route path={ROUTER.MYPROFILE} element={<TeacherProfile />} />
            <Route path={ROUTER.STUDENT} element={<TeacherStudent />} />
            <Route path={ROUTER.SALARY} element={<TeacherSalary />} />
            <Route path={ROUTER.TEASCHEDULE} element={<TeacherSchedule />} />
            <Route path={ROUTER.SETTINGS} element={<TeacherSetting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <TeacherFooter />
    </div>
  );
}
