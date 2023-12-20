import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { Select } from "antd";
import {
  calculateMonthYearlySalary,
  calculateMonthlySalarySummary,
  calculateQuarterlySalarySummary,
  calculateYearlySalarySummary,
  getCurrentYear,
} from "../../../../utils/function";
import { getAllTeacherAPI } from "../../../../services/user.api";
import { setTeacherList } from "../../../../redux/slice/teacher.slice";
export default function AdminTeacherStats() {
  const dispatch = useDispatch();
  const teacherList = useSelector((state) => state.teacher.teacherList);
  const [dataMonthYear, setDataMonthYear] = useState([]);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataQuarterly, setDataQuarterly] = useState([]);
  const [dataYearly, setDataYearly] = useState([]);
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState(getCurrentYear());
  const [monthYearData, setMonthYearData] = useState("");
  const [monthData, setMonthData] = useState("");
  const [quarterData, setQuarterData] = useState("");
  const [yearData, setYearData] = useState("");
  const handleGetAllTeacher = async () => {
    const res = await getAllTeacherAPI();
    if (res.status === "OK") {
      dispatch(setTeacherList(res?.data));
    }
  };
  useEffect(() => {
    if (teacherList) {
      setDataMonthYear(calculateMonthYearlySalary(teacherList));
      setDataMonthly(calculateMonthlySalarySummary(teacherList));
      setDataYearly(calculateYearlySalarySummary(teacherList));
      setDataQuarterly(calculateQuarterlySalarySummary(teacherList));
    } else {
      handleGetAllTeacher();
    }
  }, [teacherList]);
  const monthsList = dataMonthly?.map((item) => item?.month);
  const quartersList = dataQuarterly?.map((item) => item?.quarter);
  const yearList = dataYearly?.map((item) => item?.year);
  useEffect(() => {
    setMonthYearData(dataMonthYear?.filter((item) => item?.year === year));
  }, [year, dataMonthYear]);
  useEffect(() => {
    setMonthData(dataMonthly?.find((item) => item?.month === month));
  }, [month, dataMonthly]);

  useEffect(() => {
    setQuarterData(dataQuarterly?.find((item) => item?.quarter === quarter));
  }, [quarter, dataQuarterly]);
  useEffect(() => {
    setYearData(dataYearly?.find((item) => item?.year === year));
  }, [year, dataYearly]);

  const dataMonthlyChart = [
    {
      month: monthData?.month || "",
      total: monthData?.total || 0,
      unPaid: monthData?.unPaid || 0,
      paid: monthData?.paid || 0,
    },
  ];
  const dataQuarterlyChart = [
    {
      quarter: quarterData?.quarter || "",
      total: quarterData?.total || 0,
      unPaid: quarterData?.unPaid || 0,
      paid: quarterData?.paid || 0,
    },
  ];
  const dataYearlyChart = [
    {
      year: yearData?.year || "",
      total: yearData?.total || 0,
      unPaid: yearData?.unPaid || 0,
      paid: yearData?.paid || 0,
    },
  ];
  return (
    <div className="relative w-full mx-auto p-0 my-0 flex flex-col gap-x-4 min-h-[22rem] gap-y-2 mt-4">
      <div className="relative w-full mx-auto p-0 my-0 flex gap-x-4 min-h-[22rem] gap-y-2 mt-4">
        <div className="w-full h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê tiền lương theo các tháng
            </strong>
            <Select
              value={year}
              style={{ minWidth: 90 }}
              onChange={(value) => setYear(value)}>
              {yearList?.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="mt-3 w-full text-xs flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={monthYearData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="paid" stackId="a" fill="#00ffff" />
                <Bar dataKey="unPaid" stackId="a" fill="#808080" />
                <Bar dataKey="total" fill="#ff4d4d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="relative w-full mx-auto p-0 my-0 flex gap-x-4 min-h-[22rem] gap-y-2 mt-4 flex-wrap">
        <div className="basis-1/2 max-w-[calc(50%-8px)] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê tiền lương theo tháng
            </strong>
            <Select
              value={month}
              style={{ minWidth: 90 }}
              onChange={(value) => setMonth(value)}>
              {monthsList?.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="mt-3 w-full max-w-[300px] text-xs flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dataMonthlyChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="unPaid" fill="#808080" />
                <Bar dataKey="paid" fill="#00ffff" />
                <Bar dataKey="total" fill="#ff4d4d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="basis-1/2 max-w-[calc(50%-8px)] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê lương theo quý
            </strong>
            <Select
              value={quarter}
              style={{ minWidth: 90 }}
              onChange={(value) => setQuarter(value)}>
              {quartersList?.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="mt-3 w-full max-w-[300px] text-xs flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dataQuarterlyChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="unPaid" fill="#808080" />
                <Bar dataKey="paid" fill="#00ffff" />
                <Bar dataKey="total" fill="#ff4d4d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="basis-1/2 max-w-[calc(50%-8px)] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê lương theo năm
            </strong>
            <Select
              value={year}
              style={{ minWidth: 90 }}
              onChange={(value) => setYear(value)}>
              {yearList?.map((item, index) => (
                <Select.Option value={item} key={index}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="mt-3 w-full max-w-[300px] text-xs flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dataYearlyChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="unPaid" fill="#808080" />
                <Bar dataKey="paid" fill="#00ffff" />
                <Bar dataKey="total" fill="#ff4d4d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
