import { useEffect, useState } from "react";
import { FaHeart, FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
export default function LearningContent() {
  const showPlaylist = useSelector((state) => state.show.showPlaylist);
  const playing = useSelector((state) => state.learning.playing);
  const [data, setData] = useState("");
  useEffect(() => {
    setData(playing);
  }, [playing]);
  const date = new Date(data?.updatedAt);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return (
    <div
      className={`${
        showPlaylist ? "w-[77%]" : "w-full"
      } fixed top-0 overscroll-contain overflow-x-hidden mt-[50px] left-0 bottom-[50px]`}
      style={{
        overflowY: "overlay",
      }}>
      <div
        className={`${
          showPlaylist ? "px-[8.5%] select-none" : " px-[16%]"
        } relative w-full bg-black`}>
        <div data-tour="learning-center">
          <div className="pt-[56.25%] relative">
            <div className="w-full h-full inset-0 overflow-hidden absolute">
              <div className="w-full h-full">
                <iframe
                  src={data?.url}
                  frameBorder="0"
                  allowFullScreen="1"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  title={data?.name}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          showPlaylist ? "px-[8.5%]" : "px-[16px] lg:px-[16%]"
        } min-h-[250px]`}>
        <div className="flex lg:items-center justify-between relative flex-col lg:flex-row">
          <header className="flex flex-col">
            <h1 className="text-[28px] mt-6 mb-2 mx-0 font-semibold">
              {data?.name}
            </h1>
            <p className="text-[13px] mb-6">
              Cập nhật tháng {month} năm {year}
            </p>
          </header>
          <button
            className="bg-[#ebebeb] rounded-md cursor-pointer relative px-4 py-3 text-sm -top-3 transition duration-300 select-none flex items-center gap-x-1"
            data-tour="notes-tutorial">
            <FaPlus />
            <span>
              Thêm ghi chú tại <span className="font-semibold">00:00</span>
            </span>
          </button>
        </div>
        <div className="text-base text-[#292929] break-words flex flex-col gap-y-2">
          <p>
            Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính" xem
            Wonderland sắp có gì mới nhé!
          </p>
          <ul className="mt-3 pl-6">
            <li className="list-disc">
              Fanpage:
              <a
                href="https://www.facebook.com/EZFKid"
                target="_blank"
                rel="noreferrer"
                className="underline text-[#f05123] ml-1">
                https://www.facebook.com/EZFKid
              </a>
            </li>
            <li className="list-disc">
              Group:
              <a
                href="https://www.facebook.com/EZFKid"
                target="_blank"
                rel="noreferrer"
                className="underline text-[#f05123] ml-1">
                https://www.facebook.com/EZFKid
              </a>
            </li>
            <li className="list-disc">
              Youtube:
              <a
                href="https://www.youtube.com/channel/UC0pA5wbbiBeCgBRSksrQe2g"
                target="_blank"
                rel="noreferrer"
                className="underline text-[#f05123] ml-1">
                https://www.youtube.com/channel/UC0pA5wbbiBeCgBRSksrQe2g
              </a>
            </li>
            <li className="list-disc">
              Thu Thủy:
              <a
                href="https://www.facebook.com/la.thuthuy.96"
                target="_blank"
                rel="noreferrer"
                className="underline text-[#f05123] ml-1">
                https://www.facebook.com/la.thuthuy.96
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-[#666] text-sm py-3 px-0 text-center flex items-center justify-center">
        Made with
        <FaHeart className="text-[#d43c68] ml-1" />
        <span className="py-0 px-[6px]">·</span> Powered by Wonderland
      </p>
    </div>
  );
}
