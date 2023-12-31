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

import {
  calculateMonthYearlyTuition,
  calculateMonthlyTuitionSummary,
  calculateQuarterlyTuitionSummary,
  calculateTuitionByClass,
  calculateYearlyTuitionSummary,
  getCurrentYear,
} from "../../../../utils/function";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { setStudentList } from "../../../../redux/slice/student.slice";
import { getAllStudentAPI } from "../../../../services/user.api";

export default function AdminStudentStats() {
  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.student.studentList);
  const [dataMonthYear, setDataMonthYear] = useState([]);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataQuarterly, setDataQuarterly] = useState([]);
  const [dataYearly, setDataYearly] = useState([]);
  const [dataKlass, setDataKlass] = useState([]);
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState(getCurrentYear());
  const [klass, setKlass] = useState("");
  const [monthYearData, setMonthYearData] = useState("");
  const [monthData, setMonthData] = useState("");
  const [quarterData, setQuarterData] = useState("");
  const [yearData, setYearData] = useState("");
  const [klassData, setKlassData] = useState("");
  const handleGetAllStudent = async () => {
    const res = await getAllStudentAPI();
    if (res.status === "OK") {
      dispatch(setStudentList(res.data));
    }
  };
  useEffect(() => {
    if (studentList) {
      setDataMonthYear(calculateMonthYearlyTuition(studentList));
      setDataMonthly(calculateMonthlyTuitionSummary(studentList));
      setDataYearly(calculateYearlyTuitionSummary(studentList));
      setDataQuarterly(calculateQuarterlyTuitionSummary(studentList));
      setDataKlass(calculateTuitionByClass(studentList));
    } else {
      handleGetAllStudent();
    }
  }, [studentList]);
  const monthsList = dataMonthly?.map((item) => item?.month);
  const quartersList = dataQuarterly?.map((item) => item?.quarter);
  const yearList = dataYearly?.map((item) => item?.year);
  const klassList = dataKlass?.map((item) => item?.klass);

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
  useEffect(() => {
    setKlassData(dataKlass?.find((item) => item?.klass === klass));
  }, [klass, dataKlass]);

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
  const dataClassChart = [
    {
      klass: klassData?.klass || "",
      total: klassData?.total || 0,
      unPaid: klassData?.unPaid || 0,
      paid: klassData?.paid || 0,
    },
  ];
  return (
    <div className="relative w-full mx-auto p-0 my-0 flex flex-col gap-x-4 min-h-[22rem] gap-y-2 mt-4">
      <div className="relative w-full mx-auto p-0 my-0 flex gap-x-4 min-h-[22rem] gap-y-2 mt-4">
        <div className="w-full h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê học phí theo các tháng
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
                <Bar dataKey="paid" stackId="a" fill="#82ca9d" />
                <Bar dataKey="unPaid" stackId="a" fill="#8884d8" />
                <Bar dataKey="total" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="relative w-full mx-auto p-0 my-0 flex gap-x-4 min-h-[22rem] gap-y-2 mt-4 flex-wrap">
        <div className="basis-1/2 max-w-[calc(50%-8px)] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê học phí theo tháng
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
                <Bar dataKey="paid" fill="#82ca9d" />
                <Bar dataKey="unPaid" fill="#8884d8" />
                <Bar dataKey="total" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="basis-1/2 max-w-[calc(50%-8px)] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê học phí theo quý
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
                <Bar dataKey="unPaid" fill="#8884d8" />
                <Bar dataKey="paid" fill="#82ca9d" />
                <Bar dataKey="total" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="basis-1/2 max-w-[calc(50%-8px)] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê học phí theo năm
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
                <Bar dataKey="unPaid" fill="#8884d8" />
                <Bar dataKey="paid" fill="#82ca9d" />
                <Bar dataKey="total" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="basis-1/2 max-w-[calc(50%-8px)] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Thống kê học phí theo lớp
            </strong>
            <Select
              value={klass}
              style={{ minWidth: 90 }}
              onChange={(value) => setKlass(value)}>
              {klassList?.map((item, index) => (
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
                data={dataClassChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="klass" />
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
    </div>
  );
}
