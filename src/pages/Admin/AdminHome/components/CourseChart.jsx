import { CChart } from "@coreui/react-chartjs";
import { useSelector } from "react-redux";
export default function CourseChart() {
  const courseList = useSelector((state) => state.course.courseList);
  const comingSoonCourse = courseList?.filter(
    (course) => course?.isComingSoon
  ).length;
  const sellingCourse = courseList?.filter(
    (course) => course?.isSelling
  ).length;
  const completedCourse = courseList?.filter(
    (course) => course?.isCompletable
  ).length;
  return (
    <div className="w-[22rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 ">
      <strong className="text-gray-700 font-medium">
        Danh sách khóa học theo tình trạng
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3 w-[20rem]">
        <div className="flex w-full gap-4">
          <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-[320px]">
              <CChart
                type="bar"
                data={{
                  labels: ["Sắp ra mắt", "Đang mở", "Đã hoàn thành"],
                  datasets: [
                    {
                      label: "Số lượng khóa học",
                      backgroundColor: "#4565c9",
                      data: [comingSoonCourse, sellingCourse, completedCourse],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
