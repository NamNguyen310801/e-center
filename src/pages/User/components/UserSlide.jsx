import React from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { FaBell, FaPencil, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsCalendar3, BsFillJournalBookmarkFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { Avatar } from "../../../assets";
import { BiWallet } from "react-icons/bi";
import Toast from "../../../utils/Toast";
import { logoutAPI } from "../../../services/user.api";
import { resetUser } from "../../../redux/slice/auth.slice";

export default function UserSlide() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
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
    <div className="w-[180px] lg:flex flex-col h-full min-h-[100vh] hidden pl-4 pr-2">
      <div className="flex w-full py-4 items-center ">
        <img
          src={user?.avatar ? user?.avatar : Avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h4 className="text-headingColor overflow-ellipsis capitalize overflow-hidden whitespace-nowrap font-semibold text-base">
            {user?.name?.length > 9
              ? user?.name?.substring(0, 9) + "..."
              : user?.name || "Your name"}
          </h4>
          <Link to={"profile"} className="flex items-center text-gray-500">
            <FaPencil className="font-semibold  text-lg" />
            <span className="ml-2 text-sm">Sửa hồ sơ</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-full mt-1 gap-4">
        <NavLink
          to={"profile"}
          className={({ isActive }) =>
            isActive
              ? `text-red-500 text-sm font-semibold flex items-center`
              : `flex items-center text-gray-600 text-sm font-semibold`
          }>
          <FaUser className="text-xl text-blue-400 mr-3" />
          <div>Trang cá nhân</div>
        </NavLink>
        {user?.role === 3 && (
          <NavLink
            to={"my-courses"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-sm font-semibold flex items-center`
                : `flex items-center text-gray-600 text-sm font-semibold`
            }>
            <BsFillJournalBookmarkFill className="text-xl text-green-700 mr-3" />
            <div>Khóa học của tôi</div>
          </NavLink>
        )}
        {user?.role === 3 && (
          <NavLink
            to={"my-class"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-sm font-semibold flex items-center`
                : `flex items-center text-gray-600 text-sm font-semibold`
            }>
            <HiUserGroup className="text-xl text-green-700 mr-3" />
            <div>Lớp của tôi</div>
          </NavLink>
        )}
        {user?.role === 3 && (
          <NavLink
            to={"schedule"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-sm font-semibold flex items-center`
                : `flex items-center text-gray-600 text-sm font-semibold`
            }>
            <BsCalendar3 className="text-xl text-green-700 mr-3" />
            <div>Lịch học</div>
          </NavLink>
        )}
        {user?.role === 3 && (
          <NavLink
            to={"tuition"}
            className={({ isActive }) =>
              isActive
                ? `text-red-500 text-sm font-semibold flex items-center`
                : `flex items-center text-gray-600 text-sm font-semibold`
            }>
            <BiWallet className="text-xl text-red-500 mr-3" />
            <div>Học phí</div>
          </NavLink>
        )}

        <NavLink
          to={"notify"}
          className={({ isActive }) =>
            isActive
              ? `text-red-500 text-sm font-semibold flex items-center`
              : `flex items-center text-gray-600 text-sm font-semibold`
          }>
          <FaBell className="text-xl text-red-500 mr-3" />
          <div>Thông báo</div>
        </NavLink>

        <NavLink
          to={"settings/personal"}
          className={({ isActive }) =>
            isActive
              ? `text-red-500 text-sm font-semibold flex items-center`
              : `flex items-center text-gray-600 text-sm font-semibold`
          }>
          <AiFillSetting className="text-xl text-gray-600 mr-3" />
          <div>Cài đặt</div>
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? `text-red-500 text-sm font-semibold flex items-center`
              : `flex items-center text-gray-600 text-sm font-semibold`
          }>
          <FaHome className="text-xl text-gray-600 mr-3" />
          <div>Home</div>
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? `text-red-500 text-sm font-semibold flex items-center`
              : `flex items-center text-gray-600 text-sm font-semibold`
          }>
          <div
            className="hover:text-blue-500 text-sm active:scale-95 flex items-center text-textColor font-semibold"
            onClick={handleLogout}>
            <FaSignOutAlt className="text-xl group-hover:text-headingColor mr-3" />
            <p className="group-hover:text-headingColor">Đăng xuất</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
