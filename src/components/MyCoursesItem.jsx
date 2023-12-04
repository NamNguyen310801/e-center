import { Progress } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function MyCoursesItem({ item = "" }) {
  const courseList = useSelector((state) => state.course.courseList);
  const [data, setData] = useState("");
  useEffect(() => {
    setData(courseList?.find((course) => course?._id === item?.courseId));
  }, [item, courseList]);
  return (
    <div className="flex mx-2 py-2 rounded-lg">
      <Link to={`/learning/${item?.courseId}`}>
        <img
          className="bg-white rounded-lg block min-h-[67px] text-center w-[120px]"
          style={{
            lineHeight: "67px",
          }}
          src={data?.thumbnail}
          alt=""
        />
      </Link>
      <div className="flex flex-col gap-y-1 ml-2 flex-1">
        <h3 className="text-sm font-semibold">
          <Link to={`/learning/${item?.courseId}`}>{data?.name}</Link>
        </h3>
        {!item?.isStarted ? (
          <>
            <p className="text-[12px] text-gray-500">Bạn chưa học khóa này</p>
            <Link
              className="text-sm font-semibold text-blue-500 cursor-pointer"
              to={`/learning/${item?.courseId}`}>
              Bắt đầu học
            </Link>
          </>
        ) : (
          <div className="w-full">
            <p className="text-[#666] text-[13px] mb-4">
              {!item?.isSuccess
                ? "Học cách đây một tháng trước"
                : "Bạn đã hoàn thành khóa này"}
            </p>
            {Boolean(item?.percent) && (
              <Progress className="w-full" percent={item?.percent} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
