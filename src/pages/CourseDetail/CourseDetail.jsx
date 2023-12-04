import React, { useEffect, useState } from "react";
import { FaBatteryFull, FaClock, FaFilm, FaPlayCircle } from "react-icons/fa";
import { FaGaugeHigh } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { CoursePanel } from "../../components";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getDetailCourseAPI } from "../../services/course.api";
import {
  registerCourseAPI,
  updateCourseStudentAPI,
} from "../../services/user.api";
import { convertPrice } from "../../utils/function";
import Toast from "../../utils/Toast";
import {
  addStudentCourseList,
  updateStudentCourseList,
} from "../../redux/slice/student.slice";
function CourseDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const studentList = useSelector((state) => state.student.studentList);
  const student = studentList?.find((student) => student?._id === user?.id);

  const { id } = useParams();
  const [data, setData] = useState("");
  const isCourse = student?.course?.find(
    (item) => item?.courseId === data?._id
  );
  useEffect(() => {
    handleGetDetailCourse(id);
  }, [id]);
  const handleGetDetailCourse = async (id) => {
    const res = await getDetailCourseAPI(id);
    if (res?.status === "OK") {
      setData(res?.data);
    }
  };
  const courseLength = data?.tracks
    ?.map((track) => track?.trackSteps?.length)
    ?.reduce((a, b) => a + b, 0);
  const handleRegisterCourse = async (data) => {
    if (!user?.id) {
      Toast("warn", "Vui lòng đăng nhập !!!");
      setTimeout(() => {
        navigate("/login", { state: location?.pathname });
      }, 2000);
    } else {
      const res = await registerCourseAPI(user?.id, data, user?.access_token);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        dispatch(addStudentCourseList({ id: user?.id, data }));
      }
    }
  };
  const handleUpdateCourseStudent = async () => {
    const res = await updateCourseStudentAPI(
      user?.id,
      data?._id,
      { isStarted: true },
      user?.access_token
    );
    if (res && res.status === "ERROR") {
      Toast("error", res.message);
    } else if (res.data) {
      Toast("success", res.message);
      dispatch(
        updateStudentCourseList({
          id: user?.id,
          courseId: data?._id,
          data: { ...isCourse, isStarted: true },
        })
      );
    }
  };
  return (
    <main className="relative w-full">
      <section className="container mx-auto px-2 flex flex-col lg:flex-row">
        <section className="lg:basis-2/3 w-full px-4 lg:max-w-[66.666667%] basis-full flex flex-col gap-y-3">
          <h1 className="font-bold mt-4 min-h-[33px] text-[32px] w-full text-left ">
            {data?.name}
          </h1>
          <div className="text-black/80 text-sm w-full">
            {data?.description}
          </div>
          <h2 className="w-full font-semibold text-xl float-left">
            Nội dung khóa học
          </h2>
          <div className="flex text-sm mt-1">
            <ul className="flex m-0 pl-0">
              <li className="inline-block mr-1">
                <strong>{data?.tracks?.length} </strong> chương
                <span className="ml-1">|</span>
              </li>
              <li className="inline-block mr-1">
                <strong>{courseLength || 0} </strong>bài học
                <span className="ml-1">|</span>
              </li>
              <li className="inline-block mr-1">
                Thời lượng<strong className="ml-1">3 giờ 29 phút </strong>
              </li>
            </ul>
            <div className="text-green-600 font-semibold ml-auto">
              Mở rộng tất cả
            </div>
          </div>
          <div className="mt-3 mb-8 mx-0 ">
            {data?.tracks?.map((item, index) => (
              <CoursePanel item={item} key={index} />
            ))}
          </div>
        </section>
        <section className="lg:basis-1/3 w-full px-4 lg:max-w-[33.333333%] basis-full hidden lg:block">
          <div className="flex flex-col w-full gap-y-3 pb-5 ml-6 mb-14 bg-white items-center sticky top-[90px[">
            <div className="w-[calc(100%-2px)] select-none relative overflow-hidden mt-[2px] mx-0 mb-5 rounded-[16px] after:absolute after:left-0 after:top-0 after:right-0 after:bottom-0 after:block after:transition-all after:duration-300 after:bg-preView">
              <div
                className="pt-[56.25%] w-full bg-no-repeat"
                style={{
                  backgroundImage: `url(${data?.thumbnail})`,
                  backgroundPosition: "50% 50%",
                  backgroundSize: "100% auto",
                }}></div>
              <FaPlayCircle
                className="overflow-visible box-content text-white text-[60px] left-1/2 absolute transition-all ease-linear top-1/2  duration-300 z-[1]"
                style={{
                  transform: "translate(-50%,-50%)",
                }}
              />
              <p className="bottom-0 text-white text-base font-semibold left-0 absolute right-0 text-center w-full z-[1] my-4">
                Xem giới thiệu khóa học
              </p>
            </div>
            <h5 className="text-[#f05123] text-[32px] font-semibold mx-auto opacity-80">
              {Boolean(data?.price)
                ? convertPrice(
                    Math.round(
                      (data?.price -
                        data?.price * (data?.discount || 0) * 0.01) /
                        1000
                    ) * 1000
                  )
                : " Miễn phí"}
            </h5>
            {!isCourse ? (
              <button
                className="bg-[#f05123] text-white min-w-[180px] px-4 py-2 text-base rounded-full font-semibold inline-block"
                onClick={() => handleRegisterCourse([data?._id])}>
                ĐĂNG KÝ HỌC
              </button>
            ) : isCourse?.isStarted ? (
              <Link
                to={`/learning/${data?._id}`}
                className="bg-[#f05123] text-white min-w-[180px] px-4 py-2 text-base rounded-full font-semibold flex justify-center items-center">
                TIẾP TỤC HỌC
              </Link>
            ) : (
              <Link
                to={`/learning/${data?._id}`}
                onClick={() =>
                  handleUpdateCourseStudent({ ...isCourse, isStarted: true })
                }
                className="bg-[#f05123] text-white min-w-[180px] px-4 py-2 text-base rounded-full font-semibold flex justify-center items-center">
                BẮT ĐẦU HỌC
              </Link>
            )}
            <ul className="inline-block m-0 pt-6 pr-0 pl-1 pb-2 text-left">
              <li className="text-[#494949] text-sm pl-9 relative mb-3">
                <FaGaugeHigh className="absolute left-0 top-1 overflow-visible" />
                <span>Trình độ cơ bản</span>
              </li>
              <li className="text-[#494949] text-sm pl-9 relative mb-3">
                <FaFilm className="absolute left-0 top-1 overflow-visible" />
                <span>
                  Tổng số <strong>{courseLength || 0}</strong> bài học
                </span>
              </li>
              <li className="text-[#494949] text-sm pl-9 relative mb-3">
                <FaClock className="absolute left-0 top-1 overflow-visible" />
                <span>
                  Thời lượng <strong>3 giờ 29 phút</strong>
                </span>
              </li>
              <li className="text-[#494949] text-sm pl-9 relative mb-3">
                <FaBatteryFull className="absolute left-0 top-1 overflow-visible" />
                <span>Học mọi lúc, mọi nơi</span>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </main>
  );
}

export default CourseDetail;
