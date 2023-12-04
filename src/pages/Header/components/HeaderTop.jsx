import React from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

export default function HeaderTop() {
  return (
    <div className="border-b border-[#f2f2f2] w-full text-gray-600 pt-2">
      <div className="flex container mx-auto h-full px-2 md:px-4 flex-wrap justify-between">
        <div className="flex max-h-full items-center gap-x-3 ">
          <a
            className="flex justify-center items-center gap-x-1"
            href="mailto:info.anhvan.com@gmail.com">
            <AiOutlineMail className="text-xl" />
            <span>info.anhvan.com@gmail.com</span>
          </a>
          <a
            className="flex justify-center items-center gap-x-1"
            href="tel:0135468794">
            <AiOutlinePhone className="text-xl" />
            <span>0135468794</span>
          </a>
        </div>
      </div>
    </div>
  );
}
