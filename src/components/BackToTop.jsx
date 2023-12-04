import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

export default function BackToTop() {
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      onClick={scrollUp}
      className={`${
        backToTopButton ? "fixed " : "hidden "
      } z-[2] rounded-full object-cover w-10 h-10 bottom-[70px] md:bottom-12 right-5 bg-transparent border-2 flex justify-center items-center border-[#686868] text-[#686868] hover:bg-[#119bf7] hover:text-white hover:border-[#119bf7] cursor-pointer`}>
      <FaChevronUp />
    </div>
  );
}
