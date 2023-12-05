import React, { useState, Fragment } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Logo } from "../../../assets";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Popover, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { HiOutlineBell, HiOutlineLogout } from "react-icons/hi";
import classNames from "classnames";
import { AiFillSetting } from "react-icons/ai";
import { Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../redux/slice/auth.slice";
import { logoutAPI } from "../../../services/user.api";
import Toast from "../../../utils/Toast";
export default function TeacherHeader() {
  const [isMenu, setIsMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutAPI();
    dispatch(resetUser());
    Toast("success", "Đăng xuất thành công");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  return (
    <div
      className="h-[66px] items-center text-white bg-transparent md:bg-white flex text-sm left-0 px-2 lg:px-7 py-0 sticky right-0 top-0 z-20 justify-between"
      id="user-header">
      <div className="flex items-center group lg:gap-x-3">
        <div className="flex items-center ml-2" onClick={() => navigate(-1)}>
          <h4 className="text-gray-300 md:text-[#808990] cursor-pointer text-[12px] font-semibold uppercase flex items-center">
            <FaChevronLeft className="mr-1 group-hover:-translate-x-1 transition duration-300" />
            <span className="text-[12px]">Quay lại</span>
          </h4>
        </div>
        <Tooltip title={"Trang chủ"}>
          <Link to="/" className="md:flex items-center ml-4 hidden">
            <img
              src={Logo}
              alt="Wonderland"
              className="w-10 object-contain h-10 flex-shrink-0 rounded-lg"
            />
          </Link>
        </Tooltip>
      </div>

      <div className="flex items-center justify-end lg:min-w-[200px] lg:ml-8 px-2 gap-x-1 lg:gap-x-4">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-300 md:text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
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
          className="relative cursor-pointer lg:hidden"
          onClick={() => setIsMenu((pre) => !pre)}>
          <div
            id="avatar"
            className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={user?.avatar ? user?.avatar : ""}
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
              <Link
                className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                to={"profile"}>
                Trang cá nhân
              </Link>
              <Link
                className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                to={"students"}>
                Quản lý học viên
              </Link>
              <Link
                className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                to={"lecture-schedule"}>
                Lịch giảng
              </Link>
              <Link
                className="hover:text-blue-500 text-sm text-textColor font-semibold py-2 border-b border-gray-200"
                to={"salary"}>
                Tiền lương
              </Link>
              <Link
                className="hover:text-blue-500 text-sm flex items-center gap-2 text-textColor font-semibold py-2 border-b border-gray-200"
                to={"settings/personal"}>
                <AiFillSetting className="text-xl group-hover:text-headingColor" />
                <span>Cài đặt</span>
              </Link>
              <Link
                className="hover:text-blue-500 text-sm flex items-center gap-2 text-textColor font-semibold py-2 border-b border-gray-200"
                to={"/"}>
                <FaHome className="text-xl group-hover:text-headingColor" />
                <span>Trang chủ</span>
              </Link>
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
    </div>
  );
}
