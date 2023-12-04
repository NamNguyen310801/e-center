import React from "react";

export default function ItemStudy({ src, title, desc }) {
  return (
    <div className="relative basis-full md:basis-1/3 max-w-[100%] md:max-w-[33.33333%] bg-center bg-cover bg-no-repeat ml-auto mr-0 px-[15px] pb-[10px]">
      <div className="group mr-auto ml-0 relative w-full bg-center bg-cover bg-no-repeat flex-auto">
        <div className="bg-white mb-5 min-h-[180px] table cursor-pointer transition-all duration-150 ease-in-out delay-0 overflow-hidden rounded border-[3px] border-[#1b5393] group-hover:bg-[#119bf7] ">
          <div className="table-cell align-middle">
            <div className="mx-5 pl-5 border-l-2 border-[#db2428] group-hover:border-white">
              <div className="flex items-center bg-no-repeat uppercase text-[#db2428] text-[22px] font-semibold mb-1 h-9 justify-start w-full gap-x-6  group-hover:text-white">
                <img src={src} alt="" />
                <span>{title}</span>
              </div>
              <div className="text-[#111] text-sm xl:text-base group-hover:text-white">
                {desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
