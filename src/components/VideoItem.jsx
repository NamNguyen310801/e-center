import React from "react";

export default function VideoItem({ src }) {
  return (
    <div className="basis-full md:basis-1/3 max-w-[100%] md:max-w-[33.333333%] px-4 pb-7">
      <div className="relative bg-center bg-cover overflow-hidden h-auto pt-[56.25%] mb-0 w-full">
        <iframe
          style={{
            objectPosition: "50% 50%",
          }}
          className="w-full h-full top-0 left-0 right-0 bottom-0 object-fill max-w-[100%] absolute "
          src={src}
          frameBorder="0"
          title="This is an example website"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>
    </div>
  );
}
