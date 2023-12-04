import React from "react";
import { Route, Routes } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import AdminHome from "../AdminHome/AdminHome";
import {
  AdminClass,
  AdminCourse,
  AdminDifferent,
  AdminLesson,
  AdminSalary,
  AdminSchedule,
  AdminStudent,
  AdminTeacher,
  AdminTuition,
  AdminUser,
} from "../components";
import ROUTER from "../../../routers";
import { NotFound } from "../../../components";
export default function AdminContent() {
  return (
    <Content className="w-full">
      <Routes>
        <Route path={ROUTER.ADHOME} element={<AdminHome />} />

        <Route path={ROUTER.ADUSER} element={<AdminUser />} />

        <Route path={ROUTER.ADTEACHER} element={<AdminTeacher />} />

        <Route path={ROUTER.ADSTUDENT} element={<AdminStudent />} />

        <Route path={ROUTER.ADCLASS} element={<AdminClass />} />

        <Route path={ROUTER.ADCOURSE} element={<AdminCourse />} />

        <Route path={ROUTER.ADSCHEDULE} element={<AdminSchedule />} />

        <Route path={ROUTER.ADSALARY} element={<AdminSalary />} />

        <Route path={ROUTER.ADTUITION} element={<AdminTuition />} />

        <Route path={ROUTER.ADLESSON} element={<AdminLesson />} />

        <Route path={ROUTER.ADDIFF} element={<AdminDifferent />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Content>
  );
}
