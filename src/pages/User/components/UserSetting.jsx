import React from "react";
import SettingSide from "./Setting/SettingSide";
import SettingWrapper from "./Setting/SettingWrapper";

export default function UserSetting() {
  return (
    <main className="relative container mx-auto p-0 my-0 flex min-h-[100vh]">
      <SettingSide />
      <SettingWrapper />
    </main>
  );
}
