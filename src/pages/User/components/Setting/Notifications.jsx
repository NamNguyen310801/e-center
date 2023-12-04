import React from "react";
import { Switch } from "antd";
export default function Notifications() {
  return (
    <section className="w-full flex flex-wrap -mx-1">
      <section className="w-full px-1 md:px-2 lg:px-3">
        <div className="mt-6 md:mt-[54px] px-4 md:pb-6 md:pt-0">
          <div className="mb-[30px] flex flex-col">
            <h2 className="py-[10px] mb-5 text-[22px] text-[#333] border-b border-black/10 font-semibold">
              Email
            </h2>
            <p className="m-0 text-[15px]">Gửi email cho tôi khi có:</p>
            <ul className="p-0 mt-3">
              <li className="px-5 py-3 justify-between flex cursor-pointer rounded-lg">
                <span className="text-sm">Bài học mới</span>
                <div>
                  <input type="checkbox" className="hidden" />
                  <Switch />
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-7">
            <h2 className="border-b border-black/10 text-[22px] mb-5 py-[10px] font-semibold">
              Thông báo
            </h2>
            <p className="m-0 text-[15px]">Gửi thông báo cho tôi khi có:</p>
            <ul className="p-0 mt-3">
              <li className="px-5 py-3 justify-between flex cursor-pointer rounded-lg">
                <span className="text-sm">Bài học mới</span>
                <div>
                  <input type="checkbox" className="hidden" />
                  <Switch />
                </div>
              </li>
              <li className="px-5 py-3 justify-between flex cursor-pointer rounded-lg">
                <span className="text-sm">Nhắc đến trong bình luận</span>
                <div>
                  <input type="checkbox" className="hidden" />
                  <Switch />
                </div>
              </li>
              <li className="px-5 py-3 justify-between flex cursor-pointer rounded-lg">
                <span className="text-sm">Trả lời bình luận</span>
                <div>
                  <input type="checkbox" className="hidden" />
                  <Switch />
                </div>
              </li>
              <li className="px-5 py-3 justify-between flex cursor-pointer rounded-lg">
                <span className="text-sm">Cảm xúc trong bình luận</span>
                <div>
                  <input type="checkbox" className="hidden" />
                  <Switch />
                </div>
              </li>
              <li className="px-5 py-3 justify-between flex cursor-pointer rounded-lg">
                <span className="text-sm">Bình luận trong bài blog</span>
                <div>
                  <input type="checkbox" className="hidden" />
                  <Switch />
                </div>
              </li>
              <li className="px-5 py-3 justify-between flex cursor-pointer rounded-lg">
                <span className="text-sm">Cảm xúc trong bài blog</span>
                <div>
                  <input type="checkbox" className="hidden" />
                  <Switch />
                </div>
              </li>
              <li className="px-5 py-3 justify-between flex cursor-pointer rounded-lg">
                <span className="text-sm">
                  Câu trả lời được chọn trong màn thảo luận
                </span>
                <div>
                  <input type="checkbox" className="hidden" />
                  <Switch />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}
