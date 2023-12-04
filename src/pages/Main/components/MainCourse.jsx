import React from "react";
import ItemCourse from "./ItemCourse";
import ButtonSign from "../../../components/ButtonSign";

export default function MainCourse() {
  return (
    <section className="relative container mx-auto px-4 z-[1] w-full bg-white text-gray-600 pb-8">
      <div className="w-full basis-full pb-8">
        <div className="w-full flex items-center justify-center">
          <h2 className="uppercase flex relative items-center justify-between w-full flex-wrap text-black font-semibold text-lg">
            <b className="block flex-1 h-[2px] opacity-10 bg-gray-800" />
            <span className="uppercase text-[25px] mx-4 text-headingColor">
              WONDERLAND LEARNING SYSTEM
            </span>
            <b className="block flex-1 h-[2px] opacity-10 bg-gray-800" />
          </h2>
        </div>
        <p className="w-full flex items-center justify-center">
          <span className="text-sm lg:text-base ">
            Hệ thống học tiếng Anh giao tiếp toàn diện cho người bắt đầu
          </span>
        </p>
      </div>
      <div className="w-full flex py-8 flex-col md:flex-row flex-wrap">
        <ItemCourse />
        <ItemCourse />
        <ItemCourse />
        <ItemCourse />
      </div>
      <div className="w-full flex justify-center items-center">
        <ButtonSign />
      </div>
    </section>
  );
}
