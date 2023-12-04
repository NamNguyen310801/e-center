import React, { useEffect, useState } from "react";
import { FaFacebook, FaPhone } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updateTeacherAPI } from "../../../../services/user.api";
import {
  updateTeacher,
  updateTeacherList,
} from "../../../../redux/slice/teacher.slice";
import { Avatar } from "../../../../assets";
import Toast from "../../../../utils/Toast";
import { FcGoogle } from "react-icons/fc";

export default function Secure() {
  const dispatch = useDispatch();
  const teacher = useSelector((state) => state.teacher.teacher);
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState("");
  const [showFacebook, setShowFacebook] = useState(true);
  const [showGoogle, setShowGoogle] = useState(true);
  const [showInstagram, setShowInstagram] = useState(true);
  const [showYoutube, setShowYoutube] = useState(true);
  useEffect(() => {
    setData(teacher);
  }, [teacher]);
  //-----Edit
  const editTeacher = async (id, data) => {
    const res = await updateTeacherAPI(id, data, user.access_token);
    if (res.status === "OK") {
      dispatch(updateTeacher({ ...data }));
      dispatch(updateTeacherList({ _id: id, ...data }));
      Toast("success", res.message);
    } else {
      Toast("error", res.message);
    }
  };
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
                  <div className="bg-transparent rounded-full flex-col flex items-start gap-2">
                    <img
                      src={data?.avatar ? data?.avatar : Avatar}
                      alt="namlovet0608@gmail.com"
                      className="object-contain w-14 h-14 rounded-full"
                    />
                    {data?.google ? (
                      <span className="text-[13px]">{data?.google}</span>
                    ) : (
                      <span className="text-[13px]">
                        Chưa liên kết tài khoản Google
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-start md:flex-row md:items-center gap-2 justify-between">
                    <button className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer border-black/20 group-hover:border-black/50 group-hover:text-black/70 flex items-center gap-x-1">
                      <FcGoogle />
                      <span className="text-sm">Liên kết Google</span>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-base font-semibold">Liên kết Facebook</div>
                <div className="flex flex-col items-start md:flex-row md:items-center gap-2 justify-between">
                  {data?.facebook ? (
                    <span className="text-[13px]">{data?.facebook}</span>
                  ) : (
                    <span className="text-[13px]">
                      Chưa liên kết tài khoản Facebook
                    </span>
                  )}

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
                  {data?.phone ? (
                    <span className="text-[13px]">{data?.phone}</span>
                  ) : (
                    <span className="text-[13px]">
                      Chưa liên kết số điện thoại nào
                    </span>
                  )}

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
                <div className="mt-4 max-w-[500px]">
                  <input
                    type="text"
                    name="facebook_url"
                    className="bg-white border-none outline-none mb-[10px] pb-2 w-full text-sm text-black/80 border-b border-black/5"
                    maxLength={150}
                    placeholder={
                      data?.facebook
                        ? `Eg. ${data?.facebook}`
                        : "Thêm facebook của bạn"
                    }
                    disabled={showFacebook}
                    value={data?.facebook}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        facebook: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showFacebook ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowFacebook(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowFacebook(true);
                        editTeacher(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => setShowFacebook(true)}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Youtube</h3>

                <div className="mt-4 max-w-[500px]">
                  <input
                    type="text"
                    name="youtube_url"
                    className="bg-white border-none outline-none mb-[10px] pb-2 w-full text-sm text-black/80 border-b border-black/5"
                    maxLength={150}
                    placeholder={
                      data?.youtube
                        ? `Eg. ${data?.youtube}`
                        : "Thêm youtube của bạn"
                    }
                    disabled={showYoutube}
                    value={data?.youtube}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        youtube: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showYoutube ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowYoutube(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowYoutube(true);
                        editTeacher(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => setShowFacebook(true)}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Google</h3>
                <div className="mt-4 max-w-[500px]">
                  <input
                    type="text"
                    name="google_url"
                    className="bg-white border-none outline-none mb-[10px] pb-2 w-full text-sm text-black/80 border-b border-black/5"
                    maxLength={150}
                    placeholder={
                      data?.google
                        ? `Eg. ${data?.google}`
                        : "Thêm google của bạn"
                    }
                    disabled={showGoogle}
                    value={data?.google}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        google: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showGoogle ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowGoogle(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowGoogle(true);
                        editTeacher(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => setShowGoogle(true)}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Instagram</h3>
                <div className="mt-4 max-w-[500px]">
                  <input
                    type="text"
                    name="instagram_url"
                    className="bg-white border-none outline-none mb-[10px] pb-2 w-full text-sm text-black/80 border-b border-black/5"
                    maxLength={150}
                    placeholder={
                      data?.instagram
                        ? `Eg. ${data?.instagram}`
                        : "Thêm instagram của bạn"
                    }
                    disabled={showInstagram}
                    value={data?.instagram}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        instagram: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showInstagram ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowInstagram(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowInstagram(true);
                        editTeacher(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => setShowInstagram(true)}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
