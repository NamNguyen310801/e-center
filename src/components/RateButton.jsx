import { useSelector } from "react-redux";
import { MdOutlineRateReview } from "react-icons/md";
export default function RateButton({ onClick }) {
  const showPlaylist = useSelector((state) => state.show.showPlaylist);

  return (
    <div
      className={`fixed ${
        showPlaylist ? "left-[20px] " : " left-5"
      } z-[1] bottom-[70px] cursor-pointer`}
      data-tour="comments-tutorial"
      onClick={onClick}>
      <button
        className="bg-white text-[#68245f] px-2 lg:px-3 py-2 font-semibold relative select-none text-base cursor-pointer rounded-full flex items-center border lg:border-[#68245f] gap-x-2"
        style={{
          boxShadow: "0 0 10px rgba(0,0,0,.2)",
        }}>
        <MdOutlineRateReview className="text-xl" />
        <span className="hidden lg:inline">Đánh giá</span>
      </button>
    </div>
  );
}
