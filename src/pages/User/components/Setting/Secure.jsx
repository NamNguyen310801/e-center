import React from "react";
import { FaFacebook, FaPhone } from "react-icons/fa6";

export default function Secure() {
  return (
    <section className="w-full flex flex-wrap -mx-1">
      <section className="w-full px-1 md:px-2 lg:px-3">
        <div className="mt-6 md:mt-[54px] px-4 md:pb-6 md:pt-0">
          <div className="mb-5 flex flex-col">
            <h2 className="py-[10px] mb-5 text-[22px] text-[#333] border-b border-black/10 font-semibold">
              Liên kết tài khoản đăng nhập
            </h2>
            <div className="flex flex-col gap-6">
              <div>
                <div className="text-base font-semibold">Liên kết Google</div>
                <div className="flex items-center gap-2 justify-between mt-2 ">
                  <div className="bg-transparent rounded-full flex items-center gap-2 w-14 h-14">
                    <img
                      src="https://lh3.googleusercontent.com/a/ACg8ocIuB6JZnZZhGoOJmt5Hn1c7t62zCDrUv1Y3uT_YvcAsLQ=s96-c"
                      alt="namlovet0608@gmail.com"
                      className="object-contain w-full h-full rounded-full"
                    />
                    <span className="text-sm">namlovet0608@gmail.com</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-base font-semibold">Liên kết Facebook</div>
                <div className="flex flex-col items-start md:flex-row md:items-center gap-2 justify-between">
                  <span className="text-[13px]">
                    Chưa liên kết tài khoản Facebook
                  </span>
                  <button className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer border-black/20 group-hover:border-black/50 group-hover:text-black/70 flex items-center gap-x-1">
                    <FaFacebook className="text-blue-600" />
                    <span className="text-sm">Liên kết Facebook</span>
                  </button>
                </div>
              </div>
              <div>
                <div className="text-base font-semibold">
                  Liên kết số điện thoại
                </div>
                <div className="flex flex-col items-start md:flex-row md:items-center gap-2 justify-between">
                  <span className="text-[13px]">
                    Chưa liên kết số điện thoại nào
                  </span>
                  <button className="rounded-full px-4 border text-black/50 border-black/20 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70 flex items-center gap-x-1">
                    <FaPhone />
                    <span className="text-sm"> Liên kết số điện thoại</span>
                  </button>
                </div>
              </div>
              <div id="send-verifycode-button" />
            </div>
          </div>
          <div className="mb-7">
            <h2 className="border-b border-black/10 text-[22px] mb-5 py-[10px] font-semibold">
              Mạng xã hội
            </h2>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Facebook</h3>
                <div>
                  <div className="mt-4 max-w-[500px]">
                    <input
                      type="text"
                      name="facebook_url"
                      className="bg-white border-none outline-none mb-[10px] pb-2 w-full text-sm text-black/80 border-b border-black/5"
                      maxLength={150}
                      placeholder="Eg. https://www.facebook.com/hoclaptrinhf8"
                      disabled
                      defaultValue=""
                    />
                    <div className="text-sm text-[#757575]" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                <button className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70">
                  Chỉnh sửa
                </button>
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Youtube</h3>
                <div>
                  <div className="mt-4 max-w-[500px]">
                    <input
                      type="text"
                      name="youtube_url"
                      className="bg-white border-none outline-none mb-[10px] pb-2 w-full text-sm text-black/80 border-b border-black/5"
                      maxLength={150}
                      placeholder="Eg. https://www.youtube.com/c/F8VNOfficial"
                      disabled
                      defaultValue=""
                    />
                    <div className="text-sm text-[#757575]" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                <button className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70">
                  Chỉnh sửa
                </button>
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Linkedin</h3>
                <div>
                  <div className="mt-4 max-w-[500px]">
                    <input
                      type="text"
                      name="linkedin_url"
                      className="bg-white border-none outline-none mb-[10px] pb-2 w-full text-sm text-black/80 border-b border-black/5"
                      maxLength={150}
                      placeholder="Eg. https://www.linkedin.com/in/hoclaptrinhf8/"
                      disabled
                      defaultValue=""
                    />
                    <div className="text-sm text-[#757575]" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                <button className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70">
                  Chỉnh sửa
                </button>
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Instagram</h3>
                <div>
                  <div className="mt-4 max-w-[500px]">
                    <input
                      type="text"
                      name="instagram_url"
                      className="bg-white border-none outline-none mb-[10px] pb-2 w-full text-sm text-black/80 border-b border-black/5"
                      maxLength={150}
                      placeholder="Eg. https://www.instagram.com/hoclaptrinhf8/"
                      disabled
                      defaultValue=""
                    />
                    <div className="text-sm text-[#757575]" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                <button className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70">
                  Chỉnh sửa
                </button>
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Twitter</h3>
                <div>
                  <div className="mt-4 max-w-[500px]">
                    <input
                      type="text"
                      name="twitter_url"
                      className="bg-white border-none outline-none mb-[10px] pb-2 w-full text-sm text-black/80 border-b border-black/5"
                      maxLength={150}
                      placeholder="Eg. https://twitter.com/hoclaptrinhf8"
                      disabled
                      defaultValue=""
                    />
                    <div className="text-sm text-[#757575]" />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                <button className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70">
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
