import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import TabCalender from "../../components/TabCalender";
import StudentFeel from "../StudentFeel/StudentFeel";
import { Route, Routes } from "react-router-dom";
import Course from "../Course/Course";
import TrainingStaff from "../TrainingStaff/TrainingStaff";
import CourseDetail from "../CourseDetail/CourseDetail";
import ROUTER from "../../routers";
import { Information, NotFound } from "../../components";
import About from "../About/About";
import Schedule from "../Schedule/Schedule";

export default function Home() {
  return (
    <div className="w-full relative">
      <Header />
      <Routes>
        <Route path={ROUTER.HOME} element={<Main />} />
        <Route path={ROUTER.HOCVIEN} element={<StudentFeel />} />
        <Route path={ROUTER.KHOAHOC} element={<Course />} />
        <Route path={ROUTER.DOINGU} element={<TrainingStaff />} />
        <Route path={ROUTER.CTKHOAHOC} element={<CourseDetail />} />
        <Route path={ROUTER.ABOUT} element={<About />} />
        <Route path={ROUTER.SCHEDULEHOME} element={<Schedule />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <TabCalender />
      <Information />
    </div>
  );
}
