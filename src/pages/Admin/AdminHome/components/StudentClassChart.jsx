import { CChart } from "@coreui/react-chartjs";
import { useSelector } from "react-redux";
import { countStudentsByClass } from "../../../../utils/function";
export default function StudentClassChart() {
  const studentList = useSelector((state) => state.student.studentList);
  const data = countStudentsByClass(studentList);
  const labelsData = data?.map((item) => (item?.name ? item?.name : "Không"));
  const datasetsData = data?.map((item) => item?.value);
  return (
    <div className="w-[22rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 ">
      <strong className="text-gray-700 font-medium">
        Danh sách học viên theo lớp
      </strong>
      <div className="border-x border-gray-200 rounded-sm mt-3 w-[20rem]">
        <div className="flex w-full gap-4">
          <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-[320px]">
              <CChart
                type="bar"
                data={{
                  labels: [...labelsData],
                  datasets: [
                    {
                      label: "Số lượng học viên",
                      backgroundColor: "#B0C4DE",
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
