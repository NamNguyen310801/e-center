import React from "react";
import { HeadSF, MainSF } from "./components";
import "./studentFeel.css";
import VideoSF from "./components/VideoSF";

export default function StudentFeel() {
  return (
    <main className="w-full bg-white relative">
      <HeadSF />
      <MainSF />
      <VideoSF />
    </main>
  );
}
