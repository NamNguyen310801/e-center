import React from "react";
import { Logo } from "../../../assets";
import { Link } from "react-router-dom";

export default function TeacherFooter() {
  return (
    <footer className="w-full relative bg-[#181821] overflow-hidden py-4 md:py-8 pb-10 text-white">
      <section className="container mx-auto px-2 md:px-0 flex flex-col md:flex-row">
        <div className="flex flex-col md:flex-row w-full md:justify-center md:items-start md:w-1/2 gap-x-2">
          <Link to="/" className="w-20">
            <img
              className="rounded-lg w-full object-contain mr-2"
              src={Logo}
              alt="Logo"
            />
          </Link>
          <h2 className="text-white font-bold text-sm break-words">
            Wonderland Learning system - Hệ thống học tiếng Anh toàn diện cho
            mọi người.
          </h2>
        </div>
        <p className="flex flex-col gap-y-1">
          <span>
            Điện thoại: <a href="tel:0246.329.1102">0246.329.1102</a>
          </span>
          <span>
            Email:
            <a href="mailto:contact@fullstack.edu.vn">
              contact@fullstack.edu.vn
            </a>
          </span>
          Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu
          Giấy, TP. Hà Nội
        </p>
      </section>
    </footer>
  );
}
