import React from "react";

export default function CommentStaff() {
  return (
    <div className="flex flex-col w-full gap-y-4">
      <h3 className="text-black font-semibold text-lg lg:text-xl">
        Tham gia bình luận:
      </h3>
      <div
        data-href="http://edu2.giaodienwebmau.com/doi-ngu-dao-tao/"
        data-width="100%"
        data-numposts="3"
        className="w-full">
        <span className="relative text-justify w-full inline-block">
          <iframe
            src="https://www.facebook.com/v2.9/plugins/comments.php?app_id=104537736801666&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df537de930eb2b%26domain%3Dedu2.giaodienwebmau.com%26is_canvas%3Dfalse%26origin%3Dhttp%253A%252F%252Fedu2.giaodienwebmau.com%252Ff20f840eb9f756%26relation%3Dparent.parent&container_width=843&height=100&href=http%3A%2F%2Fedu2.giaodienwebmau.com%2Fdoi-ngu-dao-tao%2F&locale=vi_VN&numposts=20&sdk=joey&version=v2.9&width="
            frameBorder="0"
            title="This is an example website"
            className="w-full h-56 visible border-none overflow-auto object-fill"></iframe>
        </span>
      </div>
    </div>
  );
}
