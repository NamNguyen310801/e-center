import { Progress } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function AdminStudentCoursesItem({ item = "" }) {
  const courseList = useSelector((state) => state.course.courseList);
  const [data, setData] = useState("");
  useEffect(() => {
    setData(courseList?.find((course) => course?._id === item?.courseId));
  }, [item, courseList]);
  return (
    <div className="flex px-2 rounded-lg w-1/4 max-w-[25%] basis-1/4">
      <div className="flex flex-col justify-center gap-y-1 flex-1">
        <div className="relative bg-center rounded-md bg-cover overflow-hidden h-auto pt-[56.25%] mb-0 w-full">
          <img
            className="w-full h-full top-0 left-0 right-0 bottom-0 object-fill max-w-[100%] absolute"
            src={data?.thumbnail}
            alt={data?.name}
          />
        </div>
        <h3 className="text-sm font-semibold text-gray-500 text-center">
          <span>{data?.name}</span>
        </h3>
      </div>
    </div>
  );
}
