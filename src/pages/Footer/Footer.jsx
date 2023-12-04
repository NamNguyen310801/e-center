import React from "react";
import { Logo } from "../../assets";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineGooglePlus, AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Button, Form, Input, Tooltip } from "antd";
export default function Footer() {
  return (
    <footer id="footer" className="w-full relative">
      <section className="relative py-8 bg-[#0a1529] w-full flex flex-wrap flex-auto items-center text-white">
        <div className="absolute top-0 left-0 right-0 bottom-0 p-0 m-0 h-full w-full bg-no-repeat bg-center opacity-100"></div>
        <div className="relative z-[1] container mx-auto flex flex-wrap">
          <div className="basis-2/5 lg:basis-1/5 max-w-[40%] lg:max-w-[20%] w-full ">
            <div className="w-full bg-center bg-cover bg-no-repeat flex-auto relative mb-0 px-0 mt-[2px]">
              <h3 className="border-b-2 border-[#111e37] relative flex justify-between items-center flex-wrap px-2">
                <span className="mr-4 pb-2 mb-[-2px] border-b-2 border-black/10 uppercase font-semibold text-lg lg:text-xl text-[#56c3ff] px-2 ">
                  Fanpage Facebook
                </span>
              </h3>
            </div>
          </div>
          <div className="basis-3/5 lg:basis-2/5 max-w-[60%] lg:max-w-[40%] w-full">
            <div className="w-full flex- flex-col items-center px-4 gap-y-4">
              <div className="relative dark:text-[#f1f1f1] w-20 overflow-hidden rounded-md">
                <img
                  src={Logo}
                  className="w-20 scale-105 bg-center bg-contain"
                  alt="Logo"
                />
              </div>
              <p className="mb-5">
                <span className="text-[#c0c0c0]">
                  Wonderland Learning system&nbsp;- Hệ thống học tiếng Anh toàn
                  diện cho mọi người.
                </span>
              </p>
              <div className="w-full bg-center bg-cover bg-no-repeat flex-auto relative mb-0 px-0">
                <h3 className="border-b-2 border-[#111e37] relative flex justify-between items-center flex-wrap">
                  <span className="uppercase font-semibold text-lg lg:text-xl text-[#56c3ff] pb-2 mb-[-2px] border-b-2 border-black/10">
                    Social Network
                  </span>
                </h3>
              </div>
              <div className="flex items-center gap-x-4 mt-2">
                <a
                  href="#"
                  target="_blank"
                  data-label="Facebook"
                  rel="noopener noreferrer nofollow"
                  className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center bg-[#3a589d]">
                  <Tooltip title="Follow on Facebook">
                    <FaFacebookF className="text-xl" />
                  </Tooltip>
                </a>
                <a
                  href="mailto:#"
                  data-label="E-mail"
                  rel="nofollow"
                  className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center bg-[#ffffff]">
                  <Tooltip title="Send us an email">
                    <AiOutlineMail className="text-xl text-orange-500" />
                  </Tooltip>
                </a>
                <a
                  href="tel:#"
                  target="_blank"
                  data-label="Phone"
                  rel="noopener noreferrer nofollow"
                  className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center bg-[#51cb5a]">
                  <Tooltip title="Call us">
                    <BsFillTelephoneFill className="text-lg" />
                  </Tooltip>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  data-label="Google+"
                  className="w-8 h-8 rounded-full overflow-hidden flex justify-center items-center bg-[#dd4e31]">
                  <Tooltip title="Follow us">
                    <AiOutlineGooglePlus className="text-2xl" />
                  </Tooltip>
                </a>
              </div>
              <p className="my-3">
                <span className="text-[#c0c0c0] text-sm lg:text-base">
                  Thời gian mở cửa: Từ 8:00 sáng đến 5:00 chiều
                </span>
                <br />
                <span className="text-[#c0c0c0] text-sm lg:text-base">
                  Mở cửa các ngày trong tuần từ thứ Hai đến Chủ Nhật.
                  <br />
                  Lưu ý: Mở cửa cả ngày lễ.
                </span>
              </p>
            </div>
          </div>
          <div className="basis-full lg:basis-2/5 lg:max-w-[40%] w-full px-2 md:px-0">
            <div className="w-full bg-center bg-cover bg-no-repeat flex-auto relative mb-0 px-0">
              <h3 className="border-b-2 border-[#111e37] relative flex justify-between items-center flex-wrap">
                <span className="uppercase font-semibold text-lg lg:text-xl text-[#56c3ff] pb-2 mb-[-2px] border-b-2 border-black/10">
                  Đăng ký nhận tin
                </span>
              </h3>
            </div>
            <p id="dang-ky">
              <span className="text-[#c0c0c0] text-sm lg:text-base">
                Để nhận thông tin về các sự kiện đặc biệt và tài liệu học tiếng
                Anh giao tiếp miễn phí. Bạn hãy để lại cho chúng tôi thông tin
                liên lạc.
              </span>
            </p>
            <div className="w-full justify-center items-center flex mt-4 ">
              <Form name="footer-register" className="w-full max-w-[450px] ">
                <Form.Item name="name">
                  <Input
                    placeholder="Nhập họ và tên của bạn..."
                    className="px-3 py-[6px] placeholder:text-slate-600"
                  />
                </Form.Item>
                <Form.Item name="phone">
                  <Input
                    placeholder="Nhập số điện thoại của bạn..."
                    className="px-3 py-[6px] placeholder:text-slate-600"
                  />
                </Form.Item>
                <Form.Item name="address">
                  <Input
                    placeholder="Nhập địa chỉ của bạn..."
                    className="px-3 py-[6px] placeholder:text-slate-600"
                  />
                </Form.Item>
                <Form.Item name="note">
                  <Input
                    placeholder="Ghi chú thêm..."
                    className="px-3 py-[6px] placeholder:text-slate-600"
                  />
                </Form.Item>
                <Form.Item className="flex items-center justify-center">
                  <Button
                    // loading={loading}
                    type="primary"
                    htmlType="submit"
                    className="bg-[#119bf7] hover:bg-[#4f87cc]  hover:scale-95 uppercase font-semibold">
                    Đăng ký học miễn phí
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <section className="relative pt-8  bg-[#0a1529] w-full flex flex-wrap flex-auto items-center text-white border-t border-[#111e37] pb-16 md:pb-12">
        <div className="absolute top-0 left-0 right-0 bottom-0 p-0 m-0 h-full w-full bg-no-repeat bg-center opacity-100"></div>
        <div className="container mx-auto flex relative z-[1] flex-wrap">
          <div className="basis-1/2 lg:basis-1/4 max-w-[50%] lg:max-w-[25%] w-full px-4">
            <p className="mt-0">
              <span className="text-[#c0c0c0] text-sm lg:text-base">
                Điện thoại: 0921.22.23.25
              </span>
              <br />
              <span className="text-[#c0c0c0] text-sm lg:text-base">
                Email: info.anhvan.com@gmail.com
              </span>
            </p>
          </div>
          <div className="basis-1/2 lg:basis-1/4 max-w-[50%] lg:max-w-[25%] w-full px-4">
            <p className="mt-0">
              <span className="text-[#c0c0c0] text-sm lg:text-base">
                Hỗ trợ kỹ thuật: Ms Hoa
                <br />
                Điện thoại: 0963.854.837
              </span>
              <br />
              <span className="text-[#c0c0c0] text-sm lg:text-base">
                Email: hoamis@gmail.com
              </span>
            </p>
          </div>
          <div className="basis-1/2 lg:basis-1/4 max-w-[50%] lg:max-w-[25%] w-full px-4">
            <p className="mt-0">
              <span className="text-[#c0c0c0] text-sm lg:text-base">
                Chuyên môn tiếng Anh: Mr. Lisa
                <br />
                Điện thoại: 01234.567.890
              </span>
              <br />
              <span className="text-[#c0c0c0] text-sm lg:text-base">
                Email: lisacenter.com@gmail.com
              </span>
            </p>
          </div>
          <div className="basis-1/2 lg:basis-1/4 max-w-[50%] lg:max-w-[25%] w-full px-4">
            <p className="mt-0">
              <span className="text-sm text-[#c0c0c0] lg:text-base">
                Mọi thắc mắc và ý kiến đóng góp, xin vui lòng gửi về địa chỉ hòm
                thư: englishcenter@gmail.com
              </span>
            </p>
          </div>
        </div>
        <div className="container mx-auto px-2 md:px-0 flex justify-center items-center mt-4 text-[#c0c0c0] relative z-[1]">
          <div className="text-center">
            Copyright 2023 ©
            <a
              href="https://demoanhvan.com"
              target="blank"
              className="cursor-pointer mr-1">
              trungtamtienganh.com
            </a>
            | Trung tâm tiếng Anh
          </div>
        </div>
      </section>
    </footer>
  );
}
