import React from "react";
import { Route, Routes } from "react-router-dom";
import ROUTER from "../../../../routers";
import Personal from "./Personal";
import Secure from "./Secure";
import { NotFound } from "../../../../components";
import Notifications from "./Notifications";

export default function SettingWrapper() {
  return (
    <div className="w-full md:w-[80%]">
      <Routes>
        <Route path={ROUTER.PERSONAL} element={<Personal />} />
        <Route path={ROUTER.SECURITY} element={<Secure />} />
        <Route path={ROUTER.NOTIFICATIONS} element={<Notifications />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
