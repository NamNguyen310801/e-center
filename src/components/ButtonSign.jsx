import React from "react";
import { Link } from "react-router-dom";

export default function ButtonSign() {
  const handleButtonClick = () => {
    const mainRegisterElement = document.getElementById("dang-ky-hoc");
    if (mainRegisterElement) {
      mainRegisterElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Link
      to={"#dang-ky-hoc"}
      onClick={handleButtonClick}
      className="bg-[#119bf7] px-4 py-3 rounded-lg text-white hover:bg-[#183e57]">
      <span>Đăng ký học thử miễn phí</span>
    </Link>
  );
}
