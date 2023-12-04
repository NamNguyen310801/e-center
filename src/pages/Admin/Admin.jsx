import React, { useEffect } from "react";
import AdminPage from "./AdminPage/AdminPage";
import AdminContent from "./AdminContent/AdminContent";
import AdminHeader from "./AdminHeader/AdminHeader";
import { Layout } from "antd";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import { setTeacherList } from "../../redux/slice/teacher.slice";
import { getAllStudentAPI, getAllTeacherAPI } from "../../services/user.api";
import { setStudentList } from "../../redux/slice/student.slice";
import { getAllCourseAPI } from "../../services/course.api";
import { setCourseList } from "../../redux/slice/course.slice";
import { getAllClassAPI } from "../../services/class.api";
import { setClassList } from "../../redux/slice/class.slice";
import { setSalaryList } from "../../redux/slice/salary.slice";
import { getAllSalaryAPI } from "../../services/salary.api";
export default function Admin() {
  const dispatch = useDispatch();
  const teacherList = useSelector((state) => state.teacher.teacherList);
  const studentList = useSelector((state) => state.student.studentList);
  const classList = useSelector((state) => state.classSlice.classList);
  const salaryList = useSelector((state) => state.salary.salaryList);
  const courseList = useSelector((state) => state.course.courseList);
  // *****API
  useEffect(() => {
    if (!studentList) {
      handleGetAllStudent();
    }
  }, []);
  useEffect(() => {
    if (!teacherList) {
      handleGetAllTeacher();
    }
  }, []);
  useEffect(() => {
    if (!courseList) {
      handleGetCourseList();
    }
  }, []);
  useEffect(() => {
    if (!classList) {
      handleGetClassList();
    }
  }, []);
  useEffect(() => {
    if (!salaryList) {
      handleGetAllSalary();
    }
  }, []);
  const handleGetAllSalary = async () => {
    const res = await getAllSalaryAPI();
    if (res.status === "OK") {
      dispatch(setSalaryList(res?.data));
    }
  };
  const handleGetAllTeacher = async () => {
    const res = await getAllTeacherAPI();
    if (res.status === "OK") {
      dispatch(setTeacherList(res?.data));
    }
  };
  const handleGetAllStudent = async () => {
    const res = await getAllStudentAPI();
    if (res.status === "OK") {
      dispatch(setStudentList(res.data));
    }
  };
  const handleGetCourseList = async () => {
    const res = await getAllCourseAPI();
    if (res.status === "OK") {
      dispatch(setCourseList(res?.data));
    }
  };
  const handleGetClassList = async () => {
    const res = await getAllClassAPI();
    dispatch(setClassList(res?.data));
  };
  return (
    <>
      <Layout className="relative min-h-screen">
        <AdminPage />
        <Layout className="bg-lightOverlay hidden md:flex">
          <AdminHeader />
          <AdminContent />
        </Layout>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/90 flex items-center justify-center md:hidden">
          <div className="w-2/5 h-auto bg-slate-200 rounded-md flex items-center justify-center">
            <span className="text-gray-800 font-semibold text-base text-center">
              Vui lòng truy cập trên thiết bị có kích thước màn hình lớn hơn để
              có thể thực hiện thao tác.
            </span>
          </div>
        </div>
      </Layout>
    </>
  );
}
