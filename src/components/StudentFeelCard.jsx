import React from "react";

export default function StudentFeelCard({ image = "" }) {
  return (
    <div className="group relative basis-full lg:basis-1/3 max-w-[100%] lg:max-w-[33.333333%] px-4 pb-7 cursor-pointer rounded overflow-hidden">
      <div className="absolute top-0 right-0 bottom-0 left-0 group-hover:bg-gray-800/50"></div>
      <div className="min-h-[230px] h-full w-full">
        <img
          src="http://edu2.giaodienwebmau.com/wp-content/uploads/2019/03/ratte.png"
          alt=""
        />
      </div>
    </div>
  );
}
