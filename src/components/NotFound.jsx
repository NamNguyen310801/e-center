import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Fail } from "../assets";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <img src={Fail} alt="not-found" />
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
          Không tìm thấy trang
        </p>
        <p className="md:text-lg lg:text-xl text-gray-600 mt-8">
          Xin lỗi, trang hiện tại không hợp lệ. Vui lòng kiểm tra lại địa chỉ
          hoặc thử lại sau.
        </p>
        <Link
          to="/"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
          title="Return Home">
          <FaArrowLeft />
          <span>Quay lại trang chủ</span>
        </Link>
      </div>
    </div>
  );
}
