import React from "react";
import { Link } from "react-router-dom";

export default function ItemEvent() {
  return (
    <Link
      to={""}
      className="flex flex-col basis-1/3 max-w-[33.33333%] gap-y-2 pb-5 ">
      <div className="group rounded-md overflow-hidden bg-center bg-cover relative w-full">
        <img
          src="http://edu2.giaodienwebmau.com/wp-content/uploads/2019/03/5-SN-Lang-2018.jpg"
          alt=""
          className="w-full bg-contain bg-center group-hover:scale-110 duration-300 transition-all"
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <h5 className="text-[#154a98] text-justify text-base font-semibold lg:text-sm">
          Proud & Brave: hành trình 7 năm tự hào và bản lĩnh
        </h5>
        <div className="h-[2px] bg-black/20 w-full max-w-[30px]"></div>
      </div>
    </Link>
  );
}
