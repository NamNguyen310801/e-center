import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import AdminTrackItem from "./AdminTrackItem";
export default function AdminCourseDetail({ onClose }) {
  const dispatch = useDispatch();
  const courseId = useSelector((state) => state.course.courseId);
  const courseList = useSelector((state) => state.course.courseList);
  const showCourse = useSelector((state) => state.show.showCourse);
  const [course, setCourse] = useState(null);
  useEffect(() => {
    getCourse(courseId);
  }, [courseId, courseList]);

  const getCourse = async (id) => {
    const courseItem = await courseList?.find((item) => item._id === id);
    setCourse(courseItem);
  };
  const handleOnClose = (e) => {
    if (e.target.id === "courseDetail") onClose();
  };
  const courseLength = course?.tracks
    ?.map((track) => track?.trackSteps?.length)
    ?.reduce((a, b) => a + b, 0);

  return (
    <div
      id="courseDetail"
      onClick={handleOnClose}
      className={`${
        showCourse ? "" : "hidden "
      }fixed z-[51] flex items-center justify-center w-full top-0 left-0 h-full bg-gray-400 bg-opacity-20 backdrop-blur-sm min-h-[750px]`}>
      <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
        <div className="relative flex w-full flex-col  overflow-hidden rounded-md bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-4 lg:top-4">
            <AiOutlineClose className="text-xl" />
          </button>

          <section className="w-full px-4 lg:max-w-[100%] basis-full flex flex-col gap-y-3">
            <h1 className="font-bold mt-4 min-h-[33px] text-[32px] w-full text-left capitalize">
              {course?.name}
            </h1>
            <div className="text-black/80 text-sm w-full">
              {course?.description}
            </div>
            <h2 className="w-full font-semibold text-xl float-left">
              Nội dung khóa học
            </h2>
            <div className="flex text-sm mt-1">
              <ul className="flex m-0 pl-0">
                <li className="inline-block mr-1">
                  <strong>{course?.tracks?.length} </strong> chương
                  <span className="mr-1">|</span>
                </li>
                <li className="inline-block mr-1">
                  <strong>{courseLength || 0} </strong>bài học
                  <span className="mr-1">|</span>
                </li>
                <li className="inline-block mr-1">
                  Thời lượng<strong className="ml-1">1 giờ 29 phút </strong>
                </li>
              </ul>
            </div>
            <div className="mt-3 mb-8 mx-0 max-h-[350px] overflow-y-scroll">
              {course?.tracks?.map((item, index) => (
                <AdminTrackItem item={item} key={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
