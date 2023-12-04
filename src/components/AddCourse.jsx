import React from "react";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import ROUTER from "../routers";
export default function AddCourse() {
  return (
    <div className="items-course basis-full md:basis-1/2 lg:basis-1/4 max-w-[100%] md:max-w-[50%] lg:max-w-[25%] px-1 lg:px-3">
      <Link
        to={ROUTER.KHOAHOC}
        className="group w-full block border-dashed border-[3px] rounded-2xl pt-[56.25%] relative transition border-[#e8e8e8] duration-300 hover:border-[#4c995f]">
        <FaCirclePlus
          className="text-[#666] text-[28px] inline-block absolute left-1/2 top-10 group-hover:text-[#4c995f]"
          style={{
            transform: "translate(-50%)",
          }}
        />
        <button
          className="inline-block text-center px-4 py-[9px] font-semibold text-sm transition duration-300 rounded-full border border-[#4c995f] text-[#4c995f] absolute bottom-5 left-1/2"
          style={{
            transform: "translate(-50%)",
          }}>
          Thêm khóa học
        </button>
      </Link>
    </div>
  );
}
