import { useSelector } from "react-redux";
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
  calculateMonthlyTuitionSummary,
  calculateQuarterlyTuitionSummary,
  calculateTuitionByClass,
  calculateYearlyTuitionSummary,
} from "../../../../utils/function";
import { useEffect, useState } from "react";
import { Select } from "antd";

export default function AdminStudentStats() {
  const studentList = useSelector((state) => state.student.studentList);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataQuarterly, setDataQuarterly] = useState([]);
  const [dataYearly, setDataYearly] = useState([]);
  const [dataKlass, setDataKlass] = useState([]);
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [year, setYear] = useState("");
  const [klass, setKlass] = useState("");
  const [monthData, setMonthData] = useState("");
  const [quarterData, setQuarterData] = useState("");
  const [yearData, setYearData] = useState("");
  const [klassData, setKlassData] = useState("");

  useEffect(() => {
    setDataMonthly(calculateMonthlyTuitionSummary(studentList));
    setDataYearly(calculateYearlyTuitionSummary(studentList));
    setDataQuarterly(calculateQuarterlyTuitionSummary(studentList));
    setDataKlass(calculateTuitionByClass(studentList));
  }, [studentList]);

  const monthsList = dataMonthly?.map((item) => item?.month);
  const quartersList = dataQuarterly?.map((item) => item?.quarter);
  const yearList = dataYearly?.map((item) => item?.year);
  const klassList = dataKlass?.map((item) => item?.klass);

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
    <div className="relative w-full mx-auto p-0 my-0 flex gap-x-4 min-h-[22rem] gap-y-2 mt-4">
      <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
        <div className="flex justify-between items-center">
          <strong className="text-gray-700 font-medium">
            Thống kê học phí theo tháng
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
            Thống kê học phí theo quý
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
            Thống kê học phí theo năm
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
      <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
        <div className="flex justify-between items-center">
          <strong className="text-gray-700 font-medium">
            Thống kê học phí theo lớp
          </strong>
          <Select
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
  );
}
