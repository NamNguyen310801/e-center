import React, { useState } from "react";
import { Button, Menu, Space } from "antd";
import {
  HiOutlineColorSwatch,
  HiViewList,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiUserGroup,
} from "react-icons/hi";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { getItem } from "../../../utils/function";
import Sider from "antd/es/layout/Sider";
import { NavLink, useNavigate } from "react-router-dom";
import "./adminPage.css";
import { Logo } from "../../../assets";
import { BiWallet } from "react-icons/bi";
import { BsCalendar3, BsWallet } from "react-icons/bs";
import { MdOutlineDifference, MdOutlinePlayLesson } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
const items = [
  getItem(
    "Thống kê",
    "admin-dashboard",
    <HomeOutlined className="md:text-xl font-semibold text-gray-800" />
  ),
  getItem(
    "Người dùng",
    "user",
    <UserOutlined className="md:text-xl font-semibold text-gray-800" />,
    [
      getItem(
        "Danh sách người dùng",
        "admin-user",
        <TeamOutlined className="md:text-lg font-semibold text-gray-800" />
      ),
      // getItem(
      //   "Thêm người dùng",
      //   "admin-addUser",
      //   <UserAddOutlined className="md:text-lg font-semibold text-gray-800" />
      // ),
      getItem(
        "Thống kê",
        "admin-statsUser",
        <HiOutlineUserGroup className="md:text-lg font-semibold text-gray-800" />
      ),
    ]
  ),
  getItem(
    "Quản lý giáo viên",
    "teacherAdmin",
    <FaUserTie className="md:text-xl font-semibold text-gray-800" />,
    [
      getItem(
        "Danh sách giáo viên",
        "admin-teacher",
        <TeamOutlined className="md:text-xl font-semibold text-gray-800" />
      ),
      // getItem(
      //   "Thêm giáo viên",
      //   "admin-addTeacher",
      //   <UserAddOutlined className="md:text-xl font-semibold text-gray-800" />
      // ),
      getItem(
        "Thống kê",
        "admin-statsTeacher",
        <HiViewList className="md:text-xl font-semibold text-gray-800" />
      ),
    ]
  ),
  getItem(
    "Quản lý học viên",
    "studentsAdmin",
    <FaUserGraduate className="md:text-xl font-semibold text-gray-800" />,
    [
      getItem(
        "Danh sách học viên",
        "admin-students",
        <TeamOutlined className="md:text-xl font-semibold text-gray-800" />
      ),
      getItem(
        "Thống kê",
        "admin-statsStudents",
        <HiViewList className="md:text-xl font-semibold text-gray-800" />
      ),
    ]
  ),
  getItem(
    "Quản lý lớp học",
    "classAdmin",
    <HiUserGroup className="md:text-xl font-semibold text-gray-800" />,
    [
      getItem(
        "Danh sách lớp học",
        "admin-class",
        <HiOutlineClipboardList className="md:text-xl font-semibold text-gray-800" />
      ),
      // getItem(
      //   "Quản lý",
      //   "admin-addClass",
      //   <HiOutlineDocumentAdd className="md:text-xl font-semibold text-gray-800" />
      // ),
      getItem(
        "Thống kê",
        "admin-statsClass",
        <HiViewList className="md:text-xl font-semibold text-gray-800" />
      ),
    ]
  ),
  getItem(
    "Quản lý khóa học",
    "admin-course",
    <HiOutlineColorSwatch className="md:text-xl font-semibold text-gray-800" />
  ),
  getItem(
    "Quản lý bài học",
    "admin-lesson",
    <MdOutlinePlayLesson className="md:text-xl font-semibold text-gray-800" />
  ),
  getItem(
    "Quản lý lịch giảng",
    "admin-schedule",
    <BsCalendar3 className="md:text-xl font-semibold text-gray-800" />
  ),
  getItem(
    "Tiền lương",
    "admin-salary",
    <BiWallet className="md:text-xl font-semibold text-gray-800" />
  ),
  getItem(
    "Học phí",
    "admin-tuition",
    <BsWallet className="md:text-xl font-semibold text-gray-800" />
  ),
  getItem(
    "Quản lý khác",
    "admin-different",
    <MdOutlineDifference className="md:text-xl font-semibold text-gray-800" />
  ),
];
export default function AdminPage() {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();
  const handleClick = ({ key }) => {
    navigate(key);
  };
  return (
    <Sider
      className="adminPage bg-lightOverlay "
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}>
      <Space className="flex items-center justify-between mx-4 pt-2 border-b border-gray-200 h-16">
        {!collapsed && (
          <NavLink
            to={"/"}
            className="active:scale-95 hover:no-underline flex items-center gap-2 justify-center sm:min-w-[120px]">
            <img src={Logo} alt="Logo" width={60} />
          </NavLink>
        )}
        <Button
          onClick={toggleCollapsed}
          style={{
            display: "block",
            border: "none",
            cursor: "pointer",
          }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </Space>
      <Menu
        className="text-[15px] font-semibold text-headingColor"
        onClick={handleClick}
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="light"
        items={items}
      />
    </Sider>
  );
}
