import React from "react";
import { VideoItem } from "../../../components";

export default function VideoSF({ video = "" }) {
  return (
    <section className="container mx-auto py-8">
      <h2 className="relative flex flex-wrap justify-between items-center mb-3">
        <b className="block flex-1 h-[2px] bg-gray-400 " />
        <span className="text-[#154a98] text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
          Video hoạt động của học viên
        </span>
        <b className="block flex-1 h-[2px] bg-gray-400" />
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
