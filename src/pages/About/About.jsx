import React from "react";
import { FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
import { MdCancel, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-[calc(100%-96px)] px-10 pb-10">
      <section className="w-full p-0 my-0 mx-auto max-w-[1920px]">
        <div className="container mx-auto pt-2 px-11">
          <div className="mb-20">
            <div className="flex items-center gap-x-1 pt-3 mb-4 w-full">
              <Link to="/" className="text-gray-500 hover:text-gray-800">
                Trang chủ
              </Link>
              <span className="text-gray-500"> » </span>
              <span className="text-gray-800">Liên hệ</span>
            </div>
            <div className="text-[#292929] text-base/[1.6] max-w-[840px]">
              <p>
                Chúng tôi luôn sẵn sàng tiếp nhận mọi ý kiến đóng góp và giải
                đáp những yêu cầu của bạn. <br />
                Hãy liên hệ ngay với chúng tôi
              </p>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="-mt-[50px]">
              <section className="-mx-1 flex flex-wrap md:-mx-2 lg:-mx-3">
                <section className="px-1 md:px-2 lg:px-3 w-full lg:w-1/2">
                  <div>
                    <div className="max-w-[600px] pb-12 text-base">
                      <div className="flex items-center flex-1 h-8 mx-[2px]">
                        <div className="min-w-[24px] text-center text-base flex items-center gap-x-2">
                          <FaHome className="text-gray-500 text-lg" />
                          <p className="text-[#444] flex items-center">
                            Số 56, Đường 131, Thôn Tiên Tảo, Xã Việt Long, Huyện
                            Sóc Sơn, TP. Hà Nội
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center flex-1 h-8 mx-[2px]">
                        <div className="min-w-[24px] text-center text-base flex items-center gap-x-2">
                          <FaPhone className="text-gray-500 text-lg" />
                          <a
                            className="text-[#444] min-h-[36px] flex items-center"
                            href="tel:02463291102">
                            0964023595
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center flex-1 h-8 mx-[2px]">
                        <div className="min-w-[24px] text-center text-base flex items-center gap-x-2">
                          <FaEnvelope className="text-gray-500 text-lg" />
                          <a
                            className="text-[#444] min-h-[36px] flex items-center"
                            href="mailto:wonderland.englishcenter96@gmail.com">
                            wonderland.englishcenter96@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                    <form className="max-w-[600px]">
                      <div className="mb-4 relative">
                        <label className="text-[#333] block text-base font-bold pb-[6px]">
                          Họ và tên
                        </label>
                        <div className="text-base relative">
                          <input
                            placeholder="Nhập tên đầy đủ..."
                            name="name"
                            className="h-9 py-1 px-3 border-2 border-[#e8e8e8] rounded-md w-full focus:outline-none focus:border-[#1dbfaf] focus:shadow-none"
                          />
                          <button type="button" className="hidden">
                            <MdCancel className="text-base" />
                          </button>
                        </div>
                      </div>
                      <div className="mb-4 relative">
                        <label className="text-[#333] block text-[14px] font-bold pb-[6px]">
                          Email
                        </label>
                        <div className="text-base relative">
                          <input
                            placeholder="Nhập email..."
                            name="email"
                            className="h-9 py-1 px-3 border-2 border-[#e8e8e8] rounded-md w-full focus:outline-none focus:border-[#1dbfaf] focus:shadow-none"
                          />
                          <button type="button" className="hidden">
                            <MdEmail />
                          </button>
                        </div>
                      </div>
                      <div className="mb-4 relative">
                        <label className="text-[#333] block text-[14px] font-bold pb-[6px]">
                          Điện thoại
                        </label>
                        <div className="text-base relative">
                          <input
                            placeholder="Nhập số điện thoại..."
                            name="phone"
                            className="h-9 py-1 px-3 border-2 border-[#e8e8e8] rounded-md w-full focus:outline-none focus:border-[#1dbfaf] focus:shadow-none"
                          />
                          <button type="button" className="hidden">
                            <MdCancel className="text-base" />
                          </button>
                        </div>
                      </div>
                      <div className="mb-6 relative">
                        <label className="text-[#333] block text-[14px] font-bold pb-[6px]">
                          Nội dung
                        </label>
                        <textarea
                          className="block text-base min-h-[96px] p-3 resize-none text-[#333] w-full bg-white border-2 border-[#e8e8e8] rounded-md focus:outline-none focus:border-[#1dbfaf] focus:shadow-none"
                          placeholder="Nhập nội dung liên hệ..."
                          name="description"
                        />
                      </div>
                      <button className="inline-block text-base font-semibold text-center px-4 py-3 outline-none rounded-full border border-[#1dbfaf] min-w-[100px] text-white cursor-pointer hover:opacity-90 bg-[#1dbfaf]">
                        Gửi đi
                      </button>
                    </form>
                  </div>
                </section>
                <section className="w-full px-1 md:px-2 lg:px-3 lg:w-1/2 mt-5 lg:mt-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d232.41629787478956!2d105.9128237!3d21.2452966!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313504e54a0f6515%3A0xed5cc3e83708fca7!2sHo%C3%A0ng%20Aquatic!5e0!3m2!1svi!2s!4v1699458531121!5m2!1svi!2s"
                    className="w-full h-[495px] border border-[#ccc]"
                    title="Trung tâm Wonderland"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
                </section>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
