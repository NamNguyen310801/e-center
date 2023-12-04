import React from "react";
import { CrownIcon } from "../assets";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { convertPrice } from "../utils/function";
import { useSelector } from "react-redux";

export default function CourseItem({ isPro = false, item = {} }) {
  const user = useSelector((state) => state.auth.user);
  const studentList = useSelector((state) => state.student.studentList);
  const student = studentList?.find((student) => student?._id === user?.id);
  const isCourse = student?.course?.find((i) => i?.courseId === item?._id);
  return (
    <div className="basis-full md:basis-1/2 lg:basis-1/4 max-w-[100%] md:max-w-[50%] lg:max-w-[25%] px-2 lg:px-3">
      {item?.isComingSoon ? (
        <div className="relative mb-8 flex-shrink-0 flex flex-col gap-y-3">
          <div
            to={`/learning/${item?._id}`}
            className="pt-[56.25%] block object-cover rounded-[16px] relative w-full group overflow-hidden">
            <img
              src={item?.thumbnail}
              alt=""
              className="h-full rounded-[16px] w-full absolute object-cover top-0 left-0 "
            />
            <div className="h-full rounded-[16px] w-full absolute object-cover top-0 left-0 z-[1] bg-black/50 flex flex-col justify-center items-center text-white/90">
              <span className="text-lg font-semibold outline-none text-center whitespace-nowrap px-4 py-2 rounded-full border z-[1] text-black border-white bg-white/90">
                Sắp ra mắt...
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mb-8 flex-shrink-0 flex flex-col gap-y-3">
          {!isCourse ? (
            <Link
              to={`${item?._id}`}
              className="pt-[56.25%] block object-cover rounded-[16px] relative w-full group overflow-hidden after:bg-black/50 after:opacity-0 after:invisible after:inset-0 after:transition-all after:duration-300 after:absolute after:rounded-[16px] hover:after:opacity-100 hover:after:visible">
              <button className="inline-block outline-none text-center whitespace-nowrap px-4 py-[9px] rounded-full top-[60%] border text-sm opacity-0 z-[1] absolute translate-x-[-50%] translate-y-[-50%] text-black left-1/2 border-white bg-white group-hover:opacity-100 group-hover:visible group-hover:top-1/2 transition-all duration-300 appearance-none invisible font-semibold">
                Xem khóa học
              </button>
              <img
                src={item?.thumbnail}
                alt=""
                className="h-full rounded-[16px] w-full absolute object-cover top-0 left-0  "
              />
            </Link>
          ) : (
            <Link
              to={`/learning/${item?._id}`}
              className="pt-[56.25%] block object-cover rounded-[16px] relative w-full group overflow-hidden after:bg-black/50 after:opacity-0 after:invisible after:inset-0 after:transition-all after:duration-300 after:absolute after:rounded-[16px] hover:after:opacity-100 hover:after:visible">
              <button className="inline-block outline-none text-center whitespace-nowrap px-4 py-[9px] rounded-full top-[60%] border text-sm opacity-0 z-[1] absolute translate-x-[-50%] translate-y-[-50%] text-black left-1/2 border-white bg-white group-hover:opacity-100 group-hover:visible group-hover:top-1/2 transition-all duration-300 appearance-none invisible font-semibold">
                Tiếp tục học
              </button>
              <img
                src={item?.thumbnail}
                alt=""
                className="h-full rounded-[16px] w-full absolute object-cover top-0 left-0  "
              />
            </Link>
          )}

          <h3 className="font-semibold">
            <a
              href=""
              target="_self"
              className="break-words line-clamp-1 text-base/[1.4] text-[#292929] overflow-hidden ">
              {item?.name}
            </a>
          </h3>
          {isPro && (
            <>
              <div className="bg-black/30 rounded-lg absolute top-3 p-[5px] w-[26px] pointer-events-none left-3">
                <img src={CrownIcon} alt="" />
              </div>
              <div className="flex items-center gap-x-2">
                {Boolean(item?.discount) && (
                  <span className="text-sm line-through text-gray-600">
                    {convertPrice(item?.price)}
                  </span>
                )}
                <span className="text-base font-semibold text-red-600">
                  {convertPrice(
                    Math.round(
                      (item?.price -
                        item?.price * (item?.discount || 0) * 0.01) /
                        1000
                    ) * 1000
                  )}
                </span>
              </div>
            </>
          )}
          {!isPro && (
            <div className="flex items-center text-[#666] gap-x-2">
              <FaUsers />
              <span>118.443</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
