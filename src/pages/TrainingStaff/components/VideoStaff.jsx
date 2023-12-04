import React from "react";
import { VideoItem } from "../../../components";

export default function VideoStaff() {
  return (
    <section className="container mx-auto py-4">
      <h2 className="relative flex flex-wrap justify-center items-center mb-3">
        <b className="block flex-1 h-[2px] bg-gray-400 max-w-[188px]" />
        <span className="text-[#154a98] text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
          Video giảng dạy của giáo viên
        </span>
        <b className="block flex-1 h-[2px] bg-gray-400 max-w-[188px]" />
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap">
        <VideoItem
          src={"https://www.youtube.com/embed/M9iJ2HG6br4?feature=oembed"}
        />
        <VideoItem
          src={"https://www.youtube.com/embed/M9iJ2HG6br4?feature=oembed"}
        />
        <VideoItem
          src={"https://www.youtube.com/embed/M9iJ2HG6br4?feature=oembed"}
        />
      </div>
    </section>
  );
}
