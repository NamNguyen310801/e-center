import { useSelector } from "react-redux";
import { StudentFeelCard } from "../../../components";

export default function MainSF() {
  const imageList = useSelector((state) => state.image.imageList);
  const activeListStudent = imageList?.filter((image) => image?.type === 1);
  const feelListStudent = imageList?.filter((image) => image?.type === 2);
  // Tạo một danh sách sao chép từ danh sách gốc để tránh ảnh hưởng đến danh sách gốc.
  const activeListStudentCopy = imageList && [...activeListStudent];
  const feelListStudentCopy = imageList && [...feelListStudent];
  // Sử dụng hàm shuffle để xáo trộn danh sách
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  imageList && shuffleArray(activeListStudentCopy);
  imageList && shuffleArray(feelListStudentCopy);
  const randomActiveStudent = imageList && activeListStudentCopy.slice(0, 3);
  const randomFeelStudent = imageList && feelListStudentCopy.slice(0, 3);
  return (
    <section className="container mx-auto py-8">
      <h2 className="relative flex flex-wrap justify-between items-center mb-3">
        <b className="block flex-1 h-[2px] bg-gray-400" />
        <span className="text-[#154a98] text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
          Hoạt động của học viên
        </span>
        <b className="block flex-1 h-[2px] bg-gray-400" />
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap">
        {randomActiveStudent?.map((item) => (
          <StudentFeelCard item={item} />
        ))}
      </div>
      <h2 className="relative flex flex-wrap justify-between items-center mb-3">
        <b className="block flex-1 h-[2px] bg-gray-400" />
        <span className="text-[#154a98] text-center mx-4 uppercase font-semibold text-[24px] xl:text-[28px]">
          Cảm nhận của học viên
        </span>
        <b className="block flex-1 h-[2px] bg-gray-400" />
      </h2>
      <div className="flex flex-col md:flex-row flex-wrap">
        {randomFeelStudent?.map((item) => (
          <StudentFeelCard item={item} />
        ))}
      </div>
    </section>
  );
}
