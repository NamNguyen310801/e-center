import React from "react";
import { VideoItem } from "../../../components";
import { useSelector } from "react-redux";

export default function MainStudent() {
  const videoList = useSelector((state) => state.video.videoList);
  const videoListStudent = videoList?.filter(
    (video) => video?.type === "student"
  );
  const videoListTeacher = videoList?.filter(
    (video) => video?.type === "teacher"
  );
  // Tạo một danh sách sao chép từ danh sách gốc để tránh ảnh hưởng đến danh sách gốc.
  const videoListStudentCopy = videoList && [...videoListStudent];
  const videoListTeacherCopy = videoList && [...videoListTeacher];
  // Sử dụng hàm shuffle để xáo trộn danh sách
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  videoList && shuffleArray(videoListStudentCopy);
  videoList && shuffleArray(videoListTeacherCopy);

  // Lấy 4 giáo viên đầu tiên từ danh sách đã xáo trộn.
  const randomStudent = videoList && videoListStudentCopy.slice(0, 3);
  const randomTeacher = videoList && videoListTeacherCopy.slice(0, 3);
  return (
    <section className="relative container mx-auto px-0  w-full bg-white text-gray-600 py-8">
      <div className="w-full mb-0">
        <h2 className="relative flex flex-wrap justify-between items-center mb-3">
          <b className="block flex-1 h-[2px] bg-gray-400" />
          <span className="text-[#154a98] text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
            Hoạt động học viên
          </span>
          <b className="block flex-1 h-[2px] bg-gray-400" />
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap">
          {randomStudent?.map((video) => (
            <VideoItem src={video?.url} key={video?._id} />
          ))}
        </div>
        <h2 className="relative flex flex-wrap justify-between items-center mb-3">
          <b className="block flex-1 h-[2px] bg-gray-400" />
          <span className="text-[#154a98] text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
            Video giảng dạy của Giảng viên
          </span>
          <b className="block flex-1 h-[2px] bg-gray-400" />
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap">
          {randomTeacher?.map((video) => (
            <VideoItem src={video?.url} key={video?._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
