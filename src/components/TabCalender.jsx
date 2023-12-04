import React from "react";
import { calender, contact, signUp } from "../assets";
import { Link } from "react-router-dom";
export default function TabCalender() {
  const handleButtonClick = () => {
    const mainRegisterElement = document.getElementById("dang-ky-hoc");
    if (mainRegisterElement) {
      mainRegisterElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="fixed top-[150px] right-[-140px] w-auto z-[20] transition-all ease-in-out duration-200 delay-0 hover:right-0 hover:transition-all hover:duration-200 hover:ease-in-out hover:delay-0 hidden md:block">
      <div className="bg-white p-3 shadow-tabShadow rounded-l-[10px] flex flex-col text-[#111]">
        <Link
          to="/schedule"
          className=" flex items-center gap-x-2 px-2 py-1 hover:text-blue-500">
          <img src={calender} alt="" />
          Lịch học
        </Link>
        <Link
          to="/about"
          className="flex  items-center gap-x-2 px-2 py-1 hover:text-blue-500">
          <img src={contact} alt="" />
          Liên hệ
        </Link>
        <Link
          to="#dang-ky-hoc"
          onClick={handleButtonClick}
          className="flex  items-center gap-x-2 px-2 py-1 hover:text-blue-500">
          <img src={signUp} alt="" />
          Đăng ký học thử
        </Link>
      </div>
    </div>
  );
}
