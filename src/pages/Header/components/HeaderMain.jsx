import React from "react";
import { LogoHome } from "../../../components";
import Navigation from "./Navigation";

export default function HeaderMain() {
  return (
    <div className="w-full mx-auto flex justify-between items-center h-[90px] px-2 md:px-4 xl:px-10 fixed top-0 bg-white z-[30]">
      <LogoHome />
      <Navigation />
    </div>
  );
}
