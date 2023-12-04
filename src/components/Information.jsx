import React from "react";
import { FaHome, FaPhoneAlt, FaSun } from "react-icons/fa";

export default function Information() {
  return (
    <div className="fixed bottom-0 w-full z-[999] bg-[#3498db] text-center">
      <div className="flex flex-wrap w-full container mx-auto justify-center items-center">
        <div className="p-2 basis-1/3 w-full max-w-[33.33333%] cursor-pointer">
          <p className="text-white mb-0 font-normal flex justify-center items-center gap-x-1">
            <FaHome className="text-xl" />
            <a href="http://Wonderland.vn" target="_blank" rel="noreferrer">
              Wonderland.vn
            </a>
          </p>
        </div>
        <div className="p-2 basis-1/3 w-full max-w-[33.33333%] border-l border-r border-white cursor-pointer">
          <a href="tel:0938171247">
            <p className="text-white mb-0 font-normal flex justify-center items-center gap-x-1 ">
              <FaPhoneAlt className="text-xl" /> Hotline: 0964023595
            </p>
          </a>
        </div>
        <div className="p-2 basis-1/3 w-full max-w-[33.33333%] cursor-pointer">
          <p className="text-white mb-0 font-normal flex justify-center items-center gap-x-1 ">
            <FaSun className="text-xl" /> Chat Zalo: 0964023595
          </p>
        </div>
      </div>
    </div>
  );
}
