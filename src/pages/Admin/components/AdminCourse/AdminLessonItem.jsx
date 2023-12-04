import { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { ButtonDelete } from "../../../../components";
import { ExclamationCircleFilled } from "@ant-design/icons";
import * as CourseService from "../../../../services/course.api";
import Toast from "../../../../utils/Toast";
import { Modal } from "antd";
import { deletedLessonInCourse } from "../../../../redux/slice/course.slice";
const { confirm } = Modal;

export default function AdminLessonItem({
  hidden = false,
  lessonId = "",
  trackId = "",
}) {
  const dispatch = useDispatch();
  const lessonList = useSelector((state) => state.lesson.lessonList);
  const courseId = useSelector((state) => state.course.courseId);
  const user = useSelector((state) => state.auth.user);

  const [data, setData] = useState(null);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    setData(lessonList?.find((lesson) => lesson?._id === lessonId));
  }, [lessonId, lessonList]);

  //-----Del
  const deleteLessonInCourse = async () => {
    const res = await CourseService.deleteLessonInCourseAPI(
      courseId,
      trackId,
      lessonId,
      user.access_token
    );
    if (res.status === "OK") {
      Toast("success", res.message);
      setTimeout(() => {
        dispatch(deletedLessonInCourse({ _id: courseId, trackId, lessonId }));
      }, 1000);
    } else {
      Toast("error", res.message);
    }
  };
  // Del
  const showDeleteConfirm = (data) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteLessonInCourse(data);
      },
    });
  };
  return (
    <div
      className={`${
        hidden ? "hidden" : "block"
      } transition duration-300 relative cursor-pointer`}
      onMouseEnter={() => setShowBar(true)}
      onMouseLeave={() => setShowBar(false)}>
      <div className="p-0">
        <div className="border-b border-black/5 text-[#333] text-sm/[48px] overflow-hidden relative py-0 pr-8 pl-8 flex justify-between items-center">
          <span className="float-left transition-all duration-300 ease-in-out flex items-center">
            <FaCirclePlay className="text-[#f0512366] w-4" />
            <div className="pl-[6px]">
              {data?.position}. {data?.name}
            </div>
          </span>
          <span className="flex-shrink-0 ml-[58px] min-w-[69px] text-right">
            01:03
          </span>
        </div>
      </div>
      {showBar && (
        <div className="flex w-1/2 h-full absolute top-0 bg-white right-0 bottom-0 items-center justify-end transition-all duration-500 gap-x-3">
          <ButtonDelete onClick={() => showDeleteConfirm()} />
        </div>
      )}
    </div>
  );
}
