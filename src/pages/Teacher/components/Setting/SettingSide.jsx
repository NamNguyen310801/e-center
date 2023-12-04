import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { FaBell, FaUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function SettingSide() {
  return (
    <div className="hidden md:flex flex-col w-[20%]">
      <h1 className="text-[#333] text-[28px] font-semibold">Cài đặt</h1>
      <div className="flex flex-col gap-y-2 ">
        <NavLink
          to="personal"
          className={({ isActive }) =>
            isActive
              ? `text-blue-500 text-base font-semibold flex py-2 gap-x-2 items-center`
              : `flex items-center text-gray-600 text-base py-2 font-semibold gap-x-2`
          }>
          <FaUser className="text-[#247a48]" />
          <span>Cài đặt tài khoản</span>
        </NavLink>
        <NavLink
          to="security"
          className={({ isActive }) =>
            isActive
              ? `text-blue-500 text-base font-semibold py-2 flex gap-x-2 items-center`
              : `flex items-center text-gray-600 text-base py-2 font-semibold gap-x-2`
          }>
          <FaShieldAlt className="text-orange-600" />
          <span>Bảo mật và đăng nhập</span>
        </NavLink>
        <NavLink
          to="notifications"
          className={({ isActive }) =>
            isActive
              ? `text-blue-500 text-base font-semibold py-2 flex gap-x-2 items-center`
              : `flex items-center text-gray-600 text-base py-2 font-semibold gap-x-2`
          }>
          <FaBell className="text-red-500" />
          <span>Cài đặt thông báo</span>
        </NavLink>
      </div>
    </div>
  );
}
