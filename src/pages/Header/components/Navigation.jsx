import { Link, NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../../../assets/css/styles";
import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineBell, HiOutlineLogout } from "react-icons/hi";
import ROUTER from "../../../routers";
import { Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { AiFillSetting } from "react-icons/ai";
import { Tooltip } from "antd";
import { MyCoursesItem } from "../../../components";
import { BiBookReader } from "react-icons/bi";
import { Avatar } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../utils/Toast";
import { logoutAPI } from "../../../services/user.api";
import { resetUser } from "../../../redux/slice/auth.slice";
export default function Navigation() {
  const [isMenu, setIsMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentList = useSelector((state) => state.student.studentList);
  const student = studentList?.find((student) => student?._id === user?.id);
  //log out
  const handleLogout = async () => {
    await logoutAPI();
    dispatch(resetUser());
    Toast("success", "Đăng xuất thành công");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  return (
    <nav className="flex items-center justify-center gap-3 sm:ml-auto md:gap-6 lg:gap-8 ">
      <ul className="hidden sm:flex items-center justify-center gap-1 ">
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={"/"}>
          Trang chủ
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={ROUTER.PHUONGPHAP}>
          Phương pháp
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={ROUTER.DOINGU}>
          Đội ngũ đào tạo
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={ROUTER.KHOAHOC}>
          Khóa học
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={ROUTER.ABOUT}>
          Liên hệ
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
          to={ROUTER.HOCVIEN}>
          Học viên
        </NavLink>
      </ul>
      {Boolean(user?.email) ? (
        <div className="flex items-center justify-between min-w-[200px] ml-8 px-2 gap-x-4">
          {user?.role === 3 && (
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open && "bg-gray-100",
                      "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                    )}>
                    <Tooltip title={"Khóa học của tôi"}>
                      <BiBookReader className="text-[28px]" />
                    </Tooltip>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1">
                    <Popover.Panel className="absolute right-[-110px] lg:right-0 z-10 mt-2.5 lg:transform w-350  overflow-hidden rounded-lg">
                      <div className="bg-white shadow-md ring-1 ring-black ring-opacity-5 px-3 py-4 rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
                        <div className="flex items-center mb-2">
                          <strong className="text-gray-700 font-medium my-0 mx-2">
                            Khóa học của tôi
                          </strong>
                          <Link
                            className="ml-auto text-sm p-2 text-[#343a8a]"
                            to={"/user/my-courses"}>
                            Xem tất cả
                          </Link>
                        </div>
                        <div className="flex flex-col py-2 gap-y-2 w-full max-h-[250px] overflow-y-auto overscroll-contain">
                          {student?.course?.length === 0 ? (
                            <div className="text-base flex items-center justify-center py-3 h-16 text-gray-800">
                              Bạn chưa học khóa học nào!
                            </div>
                          ) : (
                            student?.course?.map((item, index) => (
                              <MyCoursesItem item={item} key={index} />
                            ))
                          )}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          )}
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={classNames(
                    open && "bg-gray-100",
                    "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                  )}>
                  <Tooltip title={"Thông báo"}>
                    <HiOutlineBell fontSize={24} />
                  </Tooltip>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1">
                  <Popover.Panel className="absolute -right-1 lg:right-0 z-10 mt-2.5 transform w-80">
                    <div className="bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                      <strong className="text-gray-700 font-medium">
                        Thông báo
                      </strong>
                      <div className="mt-2 py-1 text-sm">
                        Chưa có thông báo nào
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsMenu(true)}>
            <div
              id="avatar"
              className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={user?.avatar ? user?.avatar : Avatar}
                alt="avatar"
                className=" w-full h-full object-cover active:scale-95 hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                onMouseLeave={() => setIsMenu(false)}
                exit={{ opacity: 0, y: 30 }}
                className="px-4 py-3 w-36 bg-gray-200/80 xl:text-xl rounded-md absolute top-10 right-0 shadow-md backdrop-blur-md flex flex-col gap-2 z-[25]"
                id="userMenu">
                {user?.role === 1 && (
                  <>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/admin/admin-dashboard"}>
                      Trang quản lý
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/user/profile"}>
                      Trang cá nhân
                    </Link>{" "}
                    <Link
                      className="hover:text-blue-500 text-sm flex items-center gap-2 text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/user/settings/personal"}>
                      <AiFillSetting className="text-xl group-hover:text-headingColor" />
                      <span>Cài đặt</span>
                    </Link>
                  </>
                )}
                {user?.role === 2 && (
                  <>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/teacher/profile"}>
                      Trang cá nhân
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/teacher/students"}>
                      Quản lý học viên
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/teacher/lecture-schedule"}>
                      Lịch giảng
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/teacher/salary"}>
                      Tiền lương
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm flex items-center gap-2 text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/teacher/settings/personal"}>
                      <AiFillSetting className="text-xl group-hover:text-headingColor" />
                      <span>Cài đặt</span>
                    </Link>
                  </>
                )}
                {user?.role === 3 && (
                  <>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/user/profile"}>
                      Trang cá nhân
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"user/my-courses"}>
                      Khóa học của tôi
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/user/my-class"}>
                      Lớp học
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/user/schedule"}>
                      Lịch học
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/user/tuition"}>
                      Học phí
                    </Link>
                    <Link
                      className="hover:text-blue-500 text-sm flex items-center gap-2 text-textColor font-semibold py-2 border-b border-gray-200"
                      to={"/user/settings/personal"}>
                      <AiFillSetting className="text-xl group-hover:text-headingColor" />
                      <span>Cài đặt</span>
                    </Link>
                  </>
                )}
                <div
                  className="hover:text-blue-500 text-sm active:scale-95 flex items-center text-textColor font-semibold gap-2"
                  onClick={handleLogout}>
                  <HiOutlineLogout className="text-xl group-hover:text-headingColor" />
                  <p className="group-hover:text-headingColor">Đăng xuất</p>
                </div>
                <div className="active:scale-95 flex items-center justify-center  text-textColor  shadow-md hover:bg-gray-200 gap-3"></div>
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <>
          <NavLink to={"/login"}>
            <button className="px-4 py-2 xl:px-6 rounded-full shadow-md bg-white border border-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white active:scale-95 text-sm lg:text-base">
              Đăng nhập
            </button>
          </NavLink>
        </>
      )}
    </nav>
  );
}
