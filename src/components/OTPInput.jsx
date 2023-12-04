import { useEffect, useRef, useState } from "react";
import {
  forgetPasswordAPI,
  resetPasswordAPI,
  verifyOTPAPI,
} from "../services/user.api";
import Toast from "../utils/Toast";
import { Link, useNavigate } from "react-router-dom";
import { getRegexPassword } from "../utils/stringsUtils";
export default function OTPInput({ email }) {
  const [timer, setTimer] = useState(60);
  const [password, setPassword] = useState("");
  const [OTPinput, setOTPinput] = useState(["", "", "", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const navigate = useNavigate();
  const data = {
    email: email,
    otp: OTPinput.join("").toString(),
    newPassword: password,
  };
  useEffect(() => {
    let intervalId;
    if (disable) {
      intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      if (timer <= 0) {
        setDisable(false);
        clearInterval(intervalId);
      }
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [disable, timer]);
  const verifyOTP = async () => {
    if (OTPinput.join("").toString() !== "") {
      const res = await verifyOTPAPI(data);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else {
        Toast("success", res.message);
        setIsNewPassword(true);
      }
    } else {
      Toast("warn", "Vui lòng điền đầy đủ thông tin");
    }
  };
  const resetPassword = async () => {
    if (password === "") {
      Toast("warn", "Vui lòng điền đầy đủ thông tin");
    } else if (getRegexPassword().test(password)) {
      const res = await resetPasswordAPI(data);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else {
        Toast("success", res.message);
        setDisable(false);
        setIsNewPassword(false);
        setTimeout(() => {
          navigate("/login");
          setOTPinput(["", "", "", "", "", ""]);
        }, 500);
      }
    } else {
      Toast(
        "error",
        "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !."
      );
    }
  };
  const resendOTP = async () => {
    const res = await forgetPasswordAPI({ email });
    // Hiển thị thông báo lỗi từ máy chủ
    if (res && res.status === "ERROR") {
      Toast("error", res.message);
    } else {
      Toast("success", res.message);
      setDisable(true);
      setIsNewPassword(false);
      setOTPinput(["", "", "", "", "", ""]);
      setTimer(60);
    }
  };
  // Sử dụng useRef để lưu trữ một mảng chứa các ref của các ô input
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const handleInputChange = (index, value) => {
    setOTPinput((prevInput) => {
      const newInput = [...prevInput];
      newInput[index] = value;
      return newInput;
    });

    // Chuyển tới ô input kế tiếp nếu không phải là ô cuối cùng
    if (index < inputRefs.length - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }
    if (index > 0 && value === "") {
      inputRefs[index - 1].current.focus();
    }
  };
  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="bg-white px-6 pb-6 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col gap-y-4">
          <div className="flex flex-col items-center justify-center text-center gap-y-2">
            <div className="font-semibold text-3xl">
              <p>Xác minh Email</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Chúng tôi đã gửi một mã OTP đến {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-row items-center justify-between mx-auto w-full">
                  {inputRefs.map((ref, index) => (
                    <div key={index} className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        ref={ref}
                        disabled={isNewPassword}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        value={OTPinput[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="font-medium">Nhập mật khẩu mới</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    disabled={!isNewPassword}
                    value={password}
                    className="w-full mt-2 p-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-start text-sm">
                  <Link
                    to="/"
                    className="text-center text-indigo-600 hover:text-indigo-500">
                    Trang chủ
                  </Link>
                </div>
                <div className="flex flex-col gap-y-4">
                  {!isNewPassword ? (
                    <div
                      onClick={() => verifyOTP()}
                      className="flex  cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-600 border-none text-white text-base font-semibold shadow-sm">
                      Xác minh
                    </div>
                  ) : (
                    <div
                      onClick={() => resetPassword()}
                      className="flex  cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-green-600 border-none text-white text-base font-semibold shadow-sm">
                      Tạo mật khẩu mới
                    </div>
                  )}

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Bạn chưa nhận được mã</p>
                    <span
                      className="flex flex-row items-center"
                      style={{
                        color: disable ? "gray" : "blue",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}>
                      {disable ? `Gửi lại mã trong ${timer}s` : "Gửi lại mã"}
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
