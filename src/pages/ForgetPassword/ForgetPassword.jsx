import { useState } from "react";
import { Logo } from "../../assets";
import { BackgroundValidation } from "../../components";
import { Link } from "react-router-dom";
import OTPInput from "../../components/OTPInput";
import { forgetPasswordAPI } from "../../services/user.api";
import Toast from "../../utils/Toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const forgotPassword = async () => {
    const res = await forgetPasswordAPI({ email });
    // Hiển thị thông báo lỗi từ máy chủ
    if (res && res.status === "ERROR") {
      Toast("error", res.message);
    } else {
      Toast("success", res.message);
      setIsVerify(true);
    }
  };
  return (
    <main className="w-full flex z-0">
      <BackgroundValidation />
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="text-center">
            <img src={Logo} width={100} className="mx-auto" alt="" />
            <div className="mt-2 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Quên mật khẩu!
              </h3>
            </div>
          </div>
          {!isVerify && (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label className="font-medium">Nhập email của bạn</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  value={email}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="flex items-center justify-start text-sm">
                <Link
                  to="/"
                  className="text-center text-indigo-600 hover:text-indigo-500">
                  Trang chủ
                </Link>
              </div>
              <button
                onClick={forgotPassword}
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Tiếp tục
              </button>
            </form>
          )}
          {isVerify && <OTPInput email={email} />}
        </div>
      </div>
    </main>
  );
}
