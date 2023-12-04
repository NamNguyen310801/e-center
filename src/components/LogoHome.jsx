import React from "react";
import { Logo } from "../assets";
import { NavLink } from "react-router-dom";

export default function LogoHome() {
  return (
    <NavLink
      to={"/"}
      className="active:scale-95 flex items-center gap-1 justify-center sm:min-w-[90px] lg:min-w-[120px]">
      <img src={Logo} alt="Logo" className="w-4/5" />
    </NavLink>
  );
}
