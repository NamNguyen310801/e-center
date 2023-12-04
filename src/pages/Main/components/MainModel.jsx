import React from "react";
import ItemStudy from "./ItemStudy";
import { Class, Community, Conference, Elearning, Mes1 } from "../../../assets";
import ButtonSign from "../../../components/ButtonSign";

export default function MainModel() {
  return (
    <section className="relative container mx-auto px-4 z-[1] w-full bg-white text-gray-600 py-8">
      <div className="flex flex-col md:flex-row flex-wrap gap-y-4">
        <div className="relative basis-full md:basis-1/3 max-w-[100%] md:max-w-[33.33333%] bg-center bg-cover bg-no-repeat ml-auto mr-0 px-[15px] pb-[10px]">
          <h3 className="relative text-xl md:text-[25px] font-semibold text-black dark:text-white after:content-[''] after:absolute after:bg-[#db2428] after:h-[3px] after:left-0 after:w-[90px] after:-bottom-2">
            MÔ HÌNH HỌC
            <br />
            TIẾNG ANH
          </h3>
        </div>
        <ItemStudy
          src={Mes1}
          title={"Club"}
          desc={
            "Môi trường luyện tập tiếng Anh hàng tuần và tạo cơ hội phát triển mối quan hệ"
          }
        />
        <ItemStudy
          src={Conference}
          title={"Conference"}
          desc={
            "Hội thảo chuyên sâu hướng nghiệp và nâng cao những năng lực từ những chuyên gia trong và ngoài nước"
          }
        />
        <ItemStudy
          src={Class}
          title={"Class"}
          desc={
            "Rèn luyện khả năng ứng dụng tự học từ vựng. Linh hoạt xử lý các chủ đề giao tiếp một cách rõ ràng, chủ động, sáng tạo"
          }
        />
        <ItemStudy
          src={Elearning}
          title={"E-learning"}
          desc={
            "Hệ thống học online eStudy: Hệ thống tự theo dõi và đánh giá hoạt động học tập."
          }
        />
        <ItemStudy
          src={Community}
          title={"Community"}
          desc={
            "Học viên sẽ có cơ hội được tham gia tổ chức hoặc tham dự các chương trình như: các cuộc thi tiếng Anh, các hoạt động giải trí,…"
          }
        />
      </div>
      <div className="flex items-center justify-center">
        <ButtonSign />
      </div>
    </section>
  );
}
