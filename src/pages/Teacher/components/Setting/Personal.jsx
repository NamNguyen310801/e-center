import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "../../../../assets";
import { updateUserAPI } from "../../../../services/user.api";
import { updateUserList } from "../../../../redux/slice/user.slice";
import { updateUser } from "../../../../redux/slice/auth.slice";
import Toast from "../../../../utils/Toast";
import { getRegexPhoneNumber } from "../../../../utils/stringsUtils";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { isDateBeforeToday } from "../../../../utils/function";

export default function Personal() {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const regexPhoneNumber = getRegexPhoneNumber();
  const user = useSelector((state) => state.auth.user);
  const [showCamera, setShowCamera] = useState(false);
  const [showName, setShowName] = useState(true);
  const [showAddress, setShowAddress] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [showGender, setShowGender] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  // const [showBio, setShowBio] = useState(true);
  const [error, setError] = useState({
    errDate: false,
    errPhone: false,
  });
  const fileInputRef = useRef(null);
  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    setData(user);
  }, [user]);
  //-----Edit
  const editUser = async (id, data) => {
    const res = await updateUserAPI(id, data, user.access_token);
    if (res.status === "OK") {
      dispatch(updateUser({ ...data }));
      dispatch(updateUserList({ _id: id, ...data }));
      Toast("success", res.message);
    } else {
      Toast("error", res.message);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setData((prev) => ({
          ...prev,
          avatar: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <section className="w-full flex flex-wrap -mx-1">
      <section className="w-full px-1 md:px-2 lg:px-3">
        <div className="mt-6 md:mt-[54px] px-4 md:pb-6 md:pt-0">
          <div className="mb-[30px] flex flex-col">
            <h2 className="py-[10px] mb-5 text-[22px] text-[#333] border-b border-black/10 font-semibold">
              Thông tin cá nhân
            </h2>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Họ tên</h3>
                <div>
                  <div className="mt-4 max-w-[500px] ">
                    <input
                      type="text"
                      name="name"
                      className="w-full bg-white capitalize border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2"
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      maxLength={50}
                      value={data?.name || ""}
                      disabled={showName}
                      placeholder="Thêm tên của bạn"
                    />
                    <div className="text-[#757575] text-sm/5">
                      <p>
                        Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các
                        bình luận của bạn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showName ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowName(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowName(true);
                        editUser(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => {
                        setShowName(true);
                        setData((prev) => ({ ...prev, name: user?.name }));
                      }}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Địa chỉ</h3>
                <div>
                  <div className="mt-4 max-w-[500px] ">
                    <input
                      type="text"
                      name="address"
                      className="w-full bg-white border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2 "
                      maxLength={150}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      placeholder="Thêm địa chỉ"
                      disabled={showAddress}
                      value={data?.address || ""}
                    />
                    <div className="text-[#757575] text-sm/5">
                      <p>Địa chỉ của bạn.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showAddress ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowAddress(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowAddress(true);
                        editUser(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => {
                        setShowAddress(true);
                        setData((prev) => ({
                          ...prev,
                          address: user?.address,
                        }));
                      }}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1">
                <h3 className="text-base m-0 font-semibold">Avatar</h3>
                <div className="flex text-base">
                  <div className="text-sm max-w-[500px]">
                    Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.
                  </div>
                  <div className="ml-[90px] relative">
                    <div
                      className="rounded-full cursor-pointer h-20 w-20 overflow-hidden ml-5"
                      onClick={() => setShowCamera(true)}>
                      <div className="bg-transparent rounded-full">
                        <img
                          src={data?.avatar ? data?.avatar : Avatar}
                          alt={data?.name}
                          className="w-full h-full rounded-full object-contain"
                        />
                      </div>
                    </div>
                    {showCamera && (
                      <label htmlFor="avatar" className="group">
                        <div
                          className="absolute items-center right-0 top-0 w-20 flex bg-black/50 rounded-full bottom-0  h-20 justify-center left-5 transition-all duration-300 cursor-pointer z-[6]"
                          onClick={handleCameraClick}>
                          <FaCamera className="w-3/4 opacity-50 group-hover:opacity-100 text-white text-[36px]" />
                        </div>
                        <div className="absolute bottom-7 opacity-0 w-0">
                          <input
                            type="file"
                            accept="image/jpg, image/jpeg, image/png"
                            id="avatar"
                            ref={fileInputRef}
                            value={data?.avatar || ""}
                            onChange={(e) => handleFileChange(e)}
                          />
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showCamera ? (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowCamera(false);
                        editUser(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => {
                        setShowCamera(false);
                        setData((prev) => ({
                          ...prev,
                          avatar: user?.avatar,
                        }));
                      }}>
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowCamera(true)}>
                    Chỉnh sửa
                  </button>
                )}
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Email</h3>
                <div>
                  <div className="mt-4 max-w-[500px] ">
                    <input
                      type="text"
                      name="email"
                      className="w-full bg-white border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2"
                      maxLength={50}
                      disabled
                      value={data?.email || ""}
                    />
                    <div className="text-[#757575] text-sm/5">
                      <p>Email đã liên kết với Wonderland.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group" />
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Ngày sinh</h3>
                <div>
                  <div className="mt-4 max-w-[500px] ">
                    <DatePicker
                      format={"DD/MM/YYYY"}
                      placeholder="Nhập ngày sinh"
                      type="text"
                      name="date"
                      className="w-full bg-white border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2"
                      onChange={(value) => {
                        setData((prev) => ({
                          ...prev,
                          date: value ? value.format() : "",
                        }));
                        if (!isDateBeforeToday(value)) {
                          setError((pre) => ({ ...pre, errDate: true }));
                        } else {
                          setError((pre) => ({ ...pre, errDate: false }));
                        }
                      }}
                      disabled={showDate}
                      value={data?.date ? dayjs(data?.date) : null}
                    />
                    {error?.errDate && (
                      <p style={{ color: "red" }}>
                        Ngày sinh phải cách hiện tại ít nhất 5 năm
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showDate ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowDate(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowDate(true);
                        editUser(data?.id, data);
                      }}
                      disabled={error?.errDate || error?.errPhone}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => {
                        setShowDate(true);
                        setData((prev) => ({
                          ...prev,
                          date: user?.date,
                        }));
                        setError((pre) => ({ ...pre, errDate: false }));
                      }}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Số điện thoại</h3>
                <div>
                  <div className="mt-4 max-w-[500px] ">
                    <input
                      type="text"
                      name="phone"
                      className="w-full bg-white border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2"
                      maxLength={10}
                      placeholder="Thêm số điện thoại"
                      disabled={showPhone}
                      value={data?.phone || ""}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }));
                        if (!regexPhoneNumber.test(e.target.value)) {
                          setError((pre) => ({ ...pre, errPhone: true }));
                        } else {
                          setError((pre) => ({ ...pre, errPhone: false }));
                        }
                      }}
                    />
                    {error?.errPhone && (
                      <p style={{ color: "red" }}>Số điện thoại không hợp lệ</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showPhone ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowPhone(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowPhone(true);
                        editUser(data?.id, data);
                      }}
                      disabled={error?.errDate || error?.errPhone}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => {
                        setShowPhone(true);
                        setData((prev) => ({
                          ...prev,
                          phone: user?.phone,
                        }));
                        setError((pre) => ({ ...pre, errPhone: false }));
                      }}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Giới tính</h3>
                <div>
                  <div className="mt-4 max-w-[500px] flex ">
                    <div className="w-full bg-white border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2 flex items-center gap-x-1">
                      <input
                        type="radio"
                        name="gender"
                        disabled={showGender}
                        value="Nam"
                        checked={data?.gender === "Nam"}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      />
                      <label>Nam</label>
                    </div>
                    <div className="w-full bg-white border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2 flex items-center gap-x-1">
                      <input
                        type="radio"
                        name="gender"
                        disabled={showGender}
                        value="Nữ"
                        checked={data?.gender === "Nữ"}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      />
                      <label>Nữ</label>
                    </div>
                    <div className="w-full bg-white border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2 flex items-center gap-x-1">
                      <input
                        type="radio"
                        name="gender"
                        disabled={showGender}
                        value="Khác"
                        checked={data?.gender === "Khác"}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            gender: e.target.value,
                          }))
                        }
                      />
                      <label>Khác</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showGender ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowGender(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowGender(true);
                        editUser(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => {
                        setShowGender(true);
                        setData((prev) => ({
                          ...prev,
                          gender: user?.gender,
                        }));
                      }}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Giới thiệu</h3>
                <div>
                  <div className="mt-4 max-w-[500px] ">
                    <input
                      type="text"
                      name="intro"
                      className="w-full bg-white border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2 "
                      maxLength={150}
                      placeholder="Thêm giới thiệu"
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          intro: e.target.value,
                        }))
                      }
                      disabled={showIntro}
                      value={data?.intro || ""}
                    />
                    <div className="text-[#757575] text-sm/5">
                      <p>Giới thiệu thông tin về bạn.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showIntro ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowIntro(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowIntro(true);
                        editUser(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => {
                        setShowIntro(true);
                        setData((prev) => ({
                          ...prev,
                          intro: user?.intro,
                        }));
                      }}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* <div className="block pt-6 md:flex items-start md:pt-4 pb-5">
              <div className="flex-1 mr-[10px]">
                <h3 className="text-base m-0 font-semibold">Bio</h3>
                <div>
                  <div className="mt-4 max-w-[500px] ">
                    <input
                      type="text"
                      name="bio"
                      className="w-full bg-white border-none border-b border-black/5 text-black/80 text-sm mb-[10px] outline-none pb-2 "
                      maxLength={150}
                      placeholder="Thêm giới thiệu"
                      disabled={showBio}
                      //   defaultValue=" "
                    />
                    <div className="text-[#757575] text-sm/5">
                      <p>
                        Bio hiển thị trên trang cá nhân và trong các bài viết
                        (blog) của bạn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex md:mt-0 group">
                {showBio ? (
                  <button
                    className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer group-hover:border-black/50 group-hover:text-black/70"
                    onClick={() => setShowBio(false)}>
                    Chỉnh sửa
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button
                      className="rounded-full px-4 border text-green-600 bg-transparent h-9 cursor-pointer border-green-600"
                      onClick={() => {
                        setShowBio(true);
                        editUser(data?.id, data);
                      }}>
                      Lưu
                    </button>
                    <button
                      className="rounded-full px-4 border text-black/50 bg-transparent h-9 cursor-pointer hover:border-black/50 hover:text-black/70"
                      onClick={() => setShowBio(true)}>
                      Hủy
                    </button>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </section>
  );
}
