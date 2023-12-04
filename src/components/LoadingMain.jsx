import React from "react";
import { BallTriangle } from "react-loader-spinner";

export default function LoadingMain() {
  return (
    <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-[9999] flex flex-col justify-center items-center bg-slate-200">
      <BallTriangle
        height={100}
        width={100}
        radius={3}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
}
