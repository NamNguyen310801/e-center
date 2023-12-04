import React from "react";
import { FaPlus } from "react-icons/fa6";

export default function ButtonEdit(props) {
  const { onClick } = props;
  return (
    <div
      className="cursor-pointer text-xl w-8 h-8 rounded-full flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white active:scale-95"
      onClick={onClick}>
      <FaPlus />
    </div>
  );
}
