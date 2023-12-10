import { Form, Input } from "antd";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { BackgroundValidation } from "../../components";
import { Logo } from "../../assets";
import { registerAPI } from "../../services/user.api";
import Toast from "../../utils/Toast";
import { getRegexPassword } from "../../utils/stringsUtils";
export default function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const defaultValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValue, setFormValue] = useState(defaultValue);
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  //-----Create
  const createUser = async () => {
    try {
      const res = await registerAPI(formValue);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", "Đăng ký thành công");
        // dispatch(addToUserList(res.data));
        form.resetFields();
        setFormValue(defaultValue);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      Toast("error", error);
    }
  };
  // const googleAuth = () => {
  //   window.open(
  //     `${process.env.REACT_APP_API_URL}/auth/google/callback`,
  //     "_self"
  //   );
  // };
  // const [user, setUser] = useState(null);
  // const getUser = async () => {
  //   try {
  //     const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     setUser(data.user._json);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <main className="w-full flex">
      <BackgroundValidation />
      <div className="flex-1 flex items-center justify-center h-auto lg:h-screen">
        <div className="w-full max-w-md lg:space-y-8 px-4 bg-white text-gray-600 sm:px-0 flex flex-col gap-y-2">
          <div className="flex flex-col">
            <img
              src={Logo}
              className="lg:hidden w-14 lg:w-[100px] h-auto"
              alt="Logo"
            />
            <div className="mt-2 lg:mt-5 flex flex-col gap-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Đăng ký
              </h3>
              <p className="flex items-center gap-x-1">
                Bạn đã có tài khoản?
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
          <div className="flex gap-x-3">
            <button className="flex items-center gap-x-1 justify-center py-2 border rounded-lg hover:border-gray-300 duration-150 active:bg-gray-100 basis-1/2 max-w-[50%] w-full">
              <FcGoogle
                className="text-2xl"
                // onClick={googleAuth}
              />
              <span className="text-gray-600 font-semibold text-sm">
                Tiếp tục với Google
              </span>
            </button>
            <button className="flex items-center gap-x-1 justify-center py-2 border rounded-lg hover:border-gray-300 duration-150 active:bg-gray-100 basis-1/2 max-w-[50%] w-full">
              <FaFacebook className="text-blue-500 text-2xl" />
              <span className="text-gray-600 font-semibold text-sm">
                Tiếp tục với Facebook
              </span>
            </button>
          </div>
          <div className="relative mt-2">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Hoặc tiếp tục với:
            </p>
          </div>
          <Form
            onFinish={createUser}
            onValuesChange={handleValuesChange}
            name="register"
            form={form}
            className="w-full mt-4">
            <Form.Item
              name="name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                  whitespace: true,
                },
              ]}
              style={{
                fontSize: 18,
              }}>
              <Input
                placeholder="Nhập họ và tên"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </Form.Item>
            <Form.Item
              name="email"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập đúng định dạng E-mail!",
                },
              ]}>
              <Input
                placeholder="Nhập email"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
                {
                  pattern: getRegexPassword(),
                  message:
                    "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                },
              ]}
              hasFeedback>
              <Input.Password
                placeholder="Nhập mật khẩu"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu không trùng khớp!")
                    );
                  },
                }),
              ]}>
              <Input.Password
                placeholder="Xác nhận mật khẩu"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </Form.Item>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Đăng ký
            </button>
          </Form>
        </div>
      </div>
    </main>
  );
}
