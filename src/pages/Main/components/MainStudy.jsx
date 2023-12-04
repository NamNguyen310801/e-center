import React from "react";
import { Link } from "react-router-dom";

export default function MainStudy() {
  return (
    <section className="relative py-8 flex items-center bg-intro w-full ">
      <div className="absolute bg-blue-900/80 top-0 left-0 right-0 bottom-0 p-0 m-0 bg-no-repeat bg-center opacity-100"></div>
      <div className="relative z-[1] container mx-auto px-4">
        <div className="flex flex-wrap w-full flex-col md:flex-row ">
          <div className="basis-full md:basis-1/2 md:max-w-[50%] w-full m-0 pt-0 pr-[10px] pb-5">
            <div className="ml-auto mr-0 dark:text-[#f1f1f1] relative w-full bg-center bg-cover bg-no-repeat flex-auto text-white">
              <div className="px-0 w-full mb-0">
                <h2 className="text-white flex flex-wrap items-center justify-between w-full relative font-semibold mt-0 mb-3">
                  <b className="block flex-1 h-[2px] bg-gray-300"></b>
                  <span className="uppercase text-xl xl:text-[26px] text-center mx-4">
                    Mô hình học khác biệt
                  </span>
                  <b className="block flex-1 h-[2px] bg-gray-300"></b>
                </h2>
              </div>
              <div className="flex flex-col gap-y-3">
                <p className="text-justify">
                  Mô hình học hoàn toàn khác biệt được mua bản quyền từ chương
                  trình English for Children of Japanish.
                </p>
                <p className="text-justify">
                  Chúng tôi mong muốn đặt nền móng và phát triển mô hình học lý
                  tưởng này ra tại Việt Nam, với sự trợ giúp của các giáo viên
                  bản ngữ rất nhiệt tình, năng động và yêu trẻ.
                </p>
                <p className="text-justify">
                  Mô hình học lần đầu tiên được áp dụng và giúp các em thiếu nhi
                  tự tin học tiếng anh một cách tự nhiên, và chắc chắn sẽ phát
                  triển rất tốt trong khả năng học tiếng anh của mình.
                </p>
              </div>
              <div className="flex justify-start items-center mt-3">
                <Link
                  to={"/"}
                  className="bg-[#119bf7] px-4 py-3 rounded-lg text-white hover:bg-[#183e57] hover:border-[#119bf7] hover:border">
                  <span>+ Xem chi tiết</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-1/2 md:max-w-[50%] w-full m-0 pt-0 pl-[10px] pb-5 h-full ">
            <div className="relative mx-auto w-full h-full bg-center bg-no-repeat bg-cover flex-auto">
              <div className="relative w-full overflow-hidden bg-center bg-cover">
                <p className="mt-0 w-full h-[340px] rounded overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/XYU4zkUP7Cg?feature=oembed"
                    frameBorder="0"
                    title="This is an example website"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
