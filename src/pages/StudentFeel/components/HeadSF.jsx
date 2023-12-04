import React from "react";

export default function HeadSF() {
  return (
    <section className="w-full bg-studentFeel py-4 relative px-4 md:px-0">
      <div className="container mx-auto py-4">
        <div className="absolute bg-blue-900/80 top-0 left-0 right-0 bottom-0 p-0 m-0 bg-no-repeat bg-center opacity-100"></div>
        <h2 className="relative flex flex-wrap justify-between items-center basis-full z-[1] pb-2">
          <b className="block flex-1 h-[2px] bg-gray-400" />
          <span className="text-white text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
            Học viên của chúng tôi
          </span>
          <b className="block flex-1 h-[2px] bg-gray-400" />
        </h2>
        <p className="relative w-full flex items-center justify-center z-[1] pb-2">
          <span className="text-[#f0f0f0] text-sm">
            Mời các bạn cùng theo dõi một số hoạt động, cảm nhận của học viên đã
            và đang theo học tại trung tâm chúng tôi:
          </span>
        </p>
      </div>
    </section>
  );
}
