import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillYoutube, AiOutlineGooglePlus } from "react-icons/ai";
import { Avatar } from "../assets";
export default function TeacherCard({ teacher }) {
  return (
    <div className="group basis-1/2 lg:basis-1/4 max-w-[50%] lg:max-w-[25%] relative m-0 w-full px-[15px] cursor-grab transition duration-300">
      <div className="mr-auto ml-0 bg-center bg-cover bg-no-repeat flex-auto">
        <div className="bg-white pt-5 rounded-[10px] border-[2px] border-[#f0f0f0] group-hover:border-2 group-hover:border-[#119bf7] transition duration-300">
          <div className="relative mx-auto my-0 overflow-hidden w-4/5 md:w-3/5 group-hover:-translate-y-2 transition duration-300">
            <div className="relative rounded-full z-0 bg-center h-auto bg-cover pt-[100%] overflow-hidden">
              <img
                src={teacher?.avatar || Avatar}
                alt={teacher?.name}
                className="w-full h-full absolute top-0 left-0 bottom-0 right-0 object-center object-cover max-w-[100%] max-h-[100%] transition duration-500"
              />
            </div>
          </div>
          <div className="bg-transparent px-[15px] pt-[15px] pb-5 group-hover:-translate-y-2 transition duration-300">
            <div className="mx-auto text-center">
              <h4 className="uppercase text-center">
                <span className="font-semibold text-lg">
                  {teacher?.name || "Teacher Name"}
                </span>
                <br />
                <span className="text-gray-500">Teacher</span>
              </h4>
              <div className="flex justify-center items-center gap-x-3 mt-2">
                <a
                  rel="noreferrer"
                  href={teacher?.facebook || ""}
                  target="_blank"
                  className="w-8 h-8 text-xl rounded-full flex justify-center items-center text-white bg-blue-500">
                  <BsFacebook />
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={teacher?.instagram || ""}
                  className="w-8 h-8 text-xl rounded-full flex justify-center items-center text-white bg-purple-500">
                  <BsInstagram />
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={teacher?.google || ""}
                  className="w-8 h-8 text-xl rounded-full flex justify-center items-center text-white bg-orange-500">
                  <AiOutlineGooglePlus />
                </a>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={teacher?.youtube || ""}
                  className="w-8 h-8 text-xl rounded-full flex justify-center items-center text-white bg-red-500">
                  <AiFillYoutube />
                </a>
              </div>
              <div className="flex justify-center items-center mt-2">
                <p className=" text-base text-stone-600">
                  {teacher?.intro ||
                    "Tốt nghiệp trường đại học: Đại học Bách Khoa"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
