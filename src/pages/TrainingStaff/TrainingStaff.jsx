import React from "react";
import { Link } from "react-router-dom";
import { CommentStaff, StaffList, VideoStaff } from "./components";

export default function TrainingStaff() {
  return (
    <main className="w-full bg-white relative">
      <div className="w-full relative bg-center bg-cover flex text-center justify-center items-center">
        <img
          src="http://edu2.giaodienwebmau.com/wp-content/uploads/2019/03/bg_cover.jpg"
          alt=""
          className="w-full transition-opacity duration-1000 opacity-100 max-w-full bg-cover "
        />
      </div>
      <section className="container mx-auto pt-0 pb-3 flex flex-wrap">
        <div className="w-full flex flex-col gap-y-3">
          <div className="flex items-center gap-x-1 pt-3 mb-4 w-full">
            <Link to="/" className="text-gray-500 hover:text-gray-800">
              Trang chủ
            </Link>
            <span className="text-gray-500"> » </span>
            <span className="text-gray-800">Đội ngũ đào tạo</span>
          </div>
          <StaffList />
          <VideoStaff />
          <CommentStaff />
        </div>
      </section>
    </main>
  );
}
