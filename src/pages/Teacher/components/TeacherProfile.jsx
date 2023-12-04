import React, { useEffect, useState } from "react";
import { Avatar, BgProfile } from "../../../assets";
import { FaCamera, FaUpload } from "react-icons/fa6";
import { ProfileIntro } from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { FaSave } from "react-icons/fa";
import { updateUserList } from "../../../redux/slice/user.slice";
import { updateUser } from "../../../redux/slice/auth.slice";
import Toast from "../../../utils/Toast";
import { updateUserAPI } from "../../../services/user.api";
export default function TeacherProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState("");
  const [showInput, setShowInput] = useState(false);
  const urlBg = `url(${data?.coverImage ? data?.coverImage : BgProfile})`;
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setData((prev) => ({
          ...prev,
          coverImage: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    setData(user);
  }, [user]);
  const editUser = async (id, data) => {
    const res = await updateUserAPI(id, data, user.access_token);
    if (res.status === "OK") {
      dispatch(updateUser({ ...data }));
      dispatch(updateUserList({ _id: id, ...data }));
      Toast("success", "Cập nhật ảnh bìa thành công");
    } else {
      Toast("error", res.message);
    }
  };
  return (
    <main className="relative container mx-auto p-0 my-0 flex min-h-[100vh]">
      <section className="relative pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full max-w-full">
        <div
          className="w-full relative pt-[35%] lg:pt-[30%] rounded-b-2xl -mt-16 bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: urlBg,
          }}>
          <div className="z-[1] absolute -bottom-[122px] left-1/2 md:left-10 -translate-x-1/2 flex md:-bottom-[70px] items-center md:items-end md:translate-x-0 flex-col md:flex-row">
            <div className="flex items-center justify-center h-32 w-32 md:w-[172px] md:h-[172px] rounded-full bg-white">
              <div className="bg-transparent rounded-full text-[12px] w-[90%] h-[90%]">
                <img
                  src={user?.avatar ? user?.avatar : Avatar}
                  alt="avatar"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>
            <div className="text-[28px] font-bold mb-4 ml-4 text-center">
              <span>{user?.name || "Your Name"}</span>
            </div>
          </div>
          <div
            className="absolute flex items-center px-2 py-[5px] md:p-[10px] right-[8px] md:right-[30px] max-h-10 text-sm font-medium cursor-pointer rounded-md bg-white bottom-[8px] md:bottom-[15px] gap-x-2"
            onClick={() => setShowInput((pre) => !pre)}>
            <FaCamera className="text-[#4f4d4d] text-xl" />
            <span className="hidden md:inline">Chỉnh sửa ảnh bìa</span>
          </div>
          <div
            className={`${
              showInput ? " " : "hidden "
            } bg-white rounded-md absolute right-0 md:w-[190px] z-[2] `}
            style={{
              boxShadow: "0 0 10px rgba(0,0,0,.2)",
            }}>
            <div className="flex-col flex md:flex-row w-full justify-between">
              <label
                htmlFor="btnOptionCoverImage"
                className="flex items-center rounded-md cursor-pointer bg-white text-sm font-medium h-10 p-[10px] relative hover:bg-slate-200">
                <div className="flex items-center gap-x-2">
                  <FaUpload className="text-[#4f4d4d] text-lg" />
                  <span className="hidden md:inline">Tải ảnh lên</span>
                </div>
              </label>
              <label
                className="flex items-center rounded-md cursor-pointer bg-white text-sm font-medium h-10 p-[10px]  relative border-l-2 hover:bg-slate-200"
                onClick={() => {
                  editUser(data?.id, data);
                }}>
                <div className="flex items-center gap-x-2">
                  <FaSave className="text-[#4f4d4d] text-lg" />
                  <span className="hidden md:inline">Lưu</span>
                </div>
              </label>
            </div>
            <input
              type="file"
              id="btnOptionCoverImage"
              className="hidden"
              onChange={(e) => handleFileChange(e)}
            />
          </div>
        </div>
        <div className="mt-[90px] px-6">
          <section className="flex flex-wrap -mx-1 md:-mx-2 lg:-mx-3">
            <ProfileIntro />
          </section>
        </div>
      </section>
    </main>
  );
}
