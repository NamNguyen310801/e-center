import React from "react";

export default function ItemCourse() {
  return (
    <div className="group relative m-0 w-full max-w-[100%] basis-full md:max-w-[50%] md:basis-1/2 px-2 md:px-3 lg:px-4 lg:max-w-[25%] lg:basis-1/4">
      <div className="group-hover:bg-[#119bf7] bg-white px-[10px] lg:px-4 w-full pt-[15px] pb-5 flex items-center flex-col gap-y-4 rounded-xl">
        <div className="w-[150px] relative max-w-full flex justify-center items-center">
          <div className="mx-auto w-full ">
            <img
              src="http://edu2.giaodienwebmau.com/wp-content/uploads/2019/03/icon1.png"
              alt=""
              className="w-full rounded-full border-[2px] border-white"
            />
          </div>
        </div>
        <div className="mx-auto w-full mb-3">
          <h3 className="group-hover:text-white text-red-500 text-xl xl:text-2xl font-semibold text-center">
            Khóa Starter
          </h3>
          <div className="text-center">
            <span className="text-sm lg:text-base xl:text-lg group-hover:text-white">
              Khóa học dành cho người mới bắt đầu giúp cải thiện ngữ âm, hình
              thành chủ đề giao tiếp căn bản nhất
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
