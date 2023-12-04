import React from "react";
import FeeCourse from "./components/FeeCourse";
import FreeCourse from "./components/FreeCourse";

export default function Course() {
  return (
    <main className="w-full bg-white relative flex flex-col gap-y-2">
      <FeeCourse />
      <div className="container mx-auto px-4 z-[1] bg-white text-gray-600">
        <p className="text-[#82919b] text-sm mb-0">
          <strong>357.968+</strong> người khác đã học
        </p>
      </div>
      <FreeCourse />
    </main>
  );
}
