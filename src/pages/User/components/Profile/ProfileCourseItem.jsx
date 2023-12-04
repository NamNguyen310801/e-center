import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileCourseItem({ item = {} }) {
  const courseList = useSelector((state) => state.course.courseList);
  const [data, setData] = useState("");
  useEffect(() => {
    setData(courseList?.find((course) => course?._id === item?.courseId));
  }, [item, courseList]);
  return (
    <div className="flex flex-col md:flex-row items-start mt-5 mb-0 pb-0 border-t-0">
      <Link
        className="shrink-0 mb-3 md:mb-0 h-auto md:h-32 md:w-[228px] mr-0 md:mr-6"
        to={`/learning/${item?.courseId}`}>
        <img
          src={data?.thumbnail}
          className="w-full h-full object-cover rounded-[16px]"
          alt={data?.name}
        />
      </Link>
      <div className="flex flex-col gap-y-2">
        <h3 className="font-base font-semibold my-0">
          <Link to={`/learning/${item?.courseId}`} className="text-[#333]">
            {data?.name}
          </Link>
        </h3>
        <p className="break-words line-clamp-5 overflow-hidden mt-1 text-sm">
          {data?.description}
        </p>
      </div>
    </div>
  );
}
