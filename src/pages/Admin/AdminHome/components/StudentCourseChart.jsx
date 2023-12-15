import { CChart } from "@coreui/react-chartjs";
import { useSelector } from "react-redux";
import { countStudentsByCourse } from "../../../../utils/function";
export default function StudentCourseChart() {
  const studentList = useSelector((state) => state.student.studentList);
  const courseList = useSelector((state) => state.course.courseList);

  const data = countStudentsByCourse(studentList, courseList);
  const labelsData = data?.map((item) => (item?.name ? item?.name : "Không"));
  const datasetsData = data?.map((item) => item?.value);
  return (
    <div className="w-[32rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 ">
      <strong className="text-gray-700 font-medium">
        Danh sách học viên theo khóa học
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3 w-[26rem]">
        <div className="flex w-full gap-4">
          <div className="flex items-center justify-center w-full">
            <div className="w-full ">
              <CChart
                type="bar"
                data={{
                  labels: [...labelsData],
                  datasets: [
                    {
                      label: "Số lượng học viên",
                      backgroundColor: "#778899",
                      data: [...datasetsData],
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
