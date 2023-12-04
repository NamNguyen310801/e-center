import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import ItemEvent from "./ItemEvent";
import ItemNews from "./ItemNews";
export default function MainEvent() {
  return (
    <section className="container mx-auto bg-white py-8 z-[1px] relative flex items-center">
      <div></div>
      <div className="w-full relative z-[1px]">
        <div className="px-0 w-full flex-wrap flex flex-col lg:flex-row">
          <div className="basis-full lg:basis-1/2 w-full lg:max-w-[50%] px-8 pb-0">
            <div className="relative w-full bg-center flex flex-col bg-cover bg-no-repeat flex-auto px-0 gap-y-3">
              <h2 className="flex flex-wrap w-full items-center border-b-2 border-[#ececec] justify-between text-[#1b5393]">
                <span className="mr-4 pb-2 border-b-2  border-[rgba(0,0,0,0.1)] mb-[-2px] uppercase text-xl md:text-[24px]">
                  Sự kiện
                </span>
                <Link
                  to="/category/su-kien/"
                  className="flex items-center gap-x-2">
                  + Xem tất cả
                  <AiOutlineRight />
                </Link>
              </h2>
              <Link to={""} className="flex basis-full w-full gap-x-2 ">
                <div className="group rounded-md overflow-hidden bg-center bg-contain relative w-1/2  lg:min-h-[170px]">
                  <img
                    src="http://edu2.giaodienwebmau.com/wp-content/uploads/2019/03/IMG-7949.jpg"
                    alt=""
                    className="w-full bg-contain bg-center h-full group-hover:scale-110 duration-300 transition-all"
                  />
                </div>
                <div className="group flex flex-col gap-y-1 w-1/2 px-5">
                  <h5 className="text-[#154a98] text-justify text-base font-semibold group-hover:text-red-500 duration-300 transition-all lg:text-sm ">
                    Proud & Brave: hành trình 7 năm tự hào và bản lĩnh
                  </h5>
                  <div className="text-gray-500 font-normal group-hover:text-[#119bf7] duration-300 transition-all text-base lg:text-sm">
                    17/03/2019
                  </div>
                  <div className="h-[2px] bg-black/20 w-full max-w-[30px]"></div>
                  <p className="text-sm text-[#334862] group-hover:text-[#119bf7] text-justify duration-300 transition-all">
                    Nhưng chúng ta luôn sống trong hai nỗi sợ lớn là: Sợ những
                    gì mình không biết tức luôn lo âu việc mình không hoàn hảo
                    và sợ việc bỏ lỡ tương lai. Điều...
                  </p>
                </div>
              </Link>
              <div className="w-full flex items-center gap-x-4">
                <ItemEvent />
                <ItemEvent />
                <ItemEvent />
              </div>
            </div>
          </div>
          <div className="basis-full lg:basis-1/2 w-full lg:max-w-[50%] px-8 pb-0">
            <div className="relative w-full bg-center flex flex-col bg-cover bg-no-repeat flex-auto px-0 gap-y-3">
              <h2 className="flex flex-wrap w-full items-center border-b-2 border-[#ececec] justify-between text-[#1b5393]">
                <span className="mr-4 pb-2 border-b-2  border-[rgba(0,0,0,0.1)] mb-[-2px] uppercase text-xl md:text-[24px]">
                  Tin tức
                </span>
                <Link
                  to="/category/tin-tuc/"
                  className="flex items-center gap-x-2">
                  + Xem tất cả
                  <AiOutlineRight />
                </Link>
              </h2>
              <div className="w-full flex items-center gap-x-4">
                <ItemNews />
                <ItemNews />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
