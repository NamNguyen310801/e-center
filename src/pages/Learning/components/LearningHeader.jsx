import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { FaChevronLeft, FaFile } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../../assets";
import { Progress } from "antd";
import { useSelector } from "react-redux";
export default function LearningHeader() {
  const [progress, setProgress] = useState(0);
  const learning = useSelector((state) => state.learning.learning);
  const twoColors = {
    "0%": "#108ee9",
    "100%": "#87d068",
  };
  const navigate = useNavigate();
  return (
    <div className="flex items-center relative h-[50px] bg-[#29303b] text-white">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex w-[60px] h-full duration-[0.2s] hover:bg-black/10"
        title="Rời khỏi đây">
        <FaChevronLeft className="overflow-visible text-base m-auto" />
      </div>
      <Link
        to={"/"}
        className="rounded-lg hidden  overflow-hidden md:flex items-center justify-center ml-2 relative top-[1px]">
        <img
          src={Logo}
          alt=""
          className="w-10 rounded-lg bg-center bg-contain"
        />
      </Link>
      <div className="font-bold ml-0 md:ml-4 overflow-hidden text-sm line-clamp-1 break-words">
        {learning?.name}
      </div>
      <div className="flex items-center ml-auto">
        <div className="flex items-center mr-6 gap-x-[6px]">
          <Progress
            type="circle"
            percent={progress}
            size={34}
            strokeColor={twoColors}
          />
          <p className="text-sm md:flex items-center gap-x-[2px] hidden ">
            <strong>
              <span className="text-[12px]">0</span>/
              <span className="text-[12px]">
                {learning?.tracks
                  ?.map((track) => track?.trackSteps?.length)
                  ?.reduce((a, b) => a + b, 0)}
              </span>
            </strong>
            bài học
          </p>
        </div>
        <button
          className="text-sm mr-6 opacity-80 select-none bg-transparent flex gap-x-1 items-center hover:opacity-100 hover:cursor-pointer"
          data-tour>
          <FaFile className="overflow-visible text-base" />
          <span className="hidden md:inline">Ghi chú</span>
        </button>
        <button className="text-sm mr-6 opacity-80 select-none bg-transparent flex gap-x-1 items-center hover:opacity-100 hover:cursor-pointer">
          <FaQuestionCircle className="overflow-visible text-base" />
          <span className="hidden md:inline">Hướng dẫn</span>
        </button>
      </div>
    </div>
  );
}
