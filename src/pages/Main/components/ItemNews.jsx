import React from "react";
import { Link } from "react-router-dom";

export default function ItemNews() {
  return (
    <Link to={""} className="flex basis-1/2 max-w-[50%] flex-col gap-y-4">
      <div className="group rounded-md overflow-hidden bg-center bg-contain relative w-full">
        <img
          src="http://edu2.giaodienwebmau.com/wp-content/uploads/2019/03/IMG-7949.jpg"
          alt=""
          className="w-full bg-contain bg-center h-full group-hover:scale-110 duration-300 transition-all"
        />
      </div>
      <div className="group flex flex-col gap-y-1 w-full">
        <h5 className="text-[#154a98] text-justify text-base font-semibold group-hover:text-red-500 duration-300 transition-all lg:text-sm ">
          Proud & Brave: hành trình 7 năm tự hào và bản lĩnh
        </h5>
        <div className="text-gray-500 font-normal group-hover:text-[#119bf7] duration-300 transition-all text-base lg:text-sm">
          17/03/2019
        </div>
        <div className="h-[2px] bg-black/20 w-full max-w-[30px]"></div>
        <p className="text-sm text-[#334862] group-hover:text-[#119bf7] text-justify duration-300 transition-all">
          Nhưng chúng ta luôn sống trong hai nỗi sợ lớn là: Sợ những gì mình
          không biết tức luôn lo âu việc mình không hoàn hảo và sợ việc bỏ lỡ
          tương lai. Điều...
        </p>
      </div>
    </Link>
  );
}
