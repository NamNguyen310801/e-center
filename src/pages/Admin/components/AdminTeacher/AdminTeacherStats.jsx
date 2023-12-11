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
  calculateMonthlySalarySummary,
  calculateQuarterlySalarySummary,
  calculateYearlySalarySummary,
} from "../../../../utils/function";
import { getAllTeacherAPI } from "../../../../services/user.api";
import { setTeacherList } from "../../../../redux/slice/teacher.slice";
export default function AdminTeacherStats() {
  const dispatch = useDispatch();
  const teacherList = useSelector((state) => state.teacher.teacherList);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataQuarterly, setDataQuarterly] = useState([]);
  const [dataYearly, setDataYearly] = useState([]);
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState("");
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
    <div className="relative w-full mx-auto p-0 my-0 flex gap-x-4 min-h-[22rem] gap-y-2 mt-4">
      <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
        <div className="flex justify-between items-center">
          <strong className="text-gray-700 font-medium">
            Thống kê tiền lương theo tháng
          </strong>
          <Select
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
              <Bar dataKey="unPaid" fill="#8884d8" />
              <Bar dataKey="paid" fill="#82ca9d" />
              <Bar dataKey="total" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
        <div className="flex justify-between items-center">
          <strong className="text-gray-700 font-medium">
            Thống kê lương theo quý
          </strong>
          <Select
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
              <Bar dataKey="unPaid" fill="#8884d8" />
              <Bar dataKey="paid" fill="#82ca9d" />
              <Bar dataKey="total" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
        <div className="flex justify-between items-center">
          <strong className="text-gray-700 font-medium">
            Thống kê lương theo năm
          </strong>
          <Select style={{ minWidth: 90 }} onChange={(value) => setYear(value)}>
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
              <Bar dataKey="unPaid" fill="#8884d8" />
              <Bar dataKey="paid" fill="#82ca9d" />
              <Bar dataKey="total" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
