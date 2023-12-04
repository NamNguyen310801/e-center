import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../../utils/function";

export default function TeacherSalary() {
  const user = useSelector((state) => state.auth.user);
  const teacherList = useSelector((state) => state.teacher.teacherList);
  const [teacher, setStudent] = useState(null);
  useEffect(() => {
    getStudent(user?.id);
  }, [user, teacherList]);
  const getStudent = async (id) => {
    const teacherItem = await teacherList?.find((item) => item._id === id);
    setStudent(teacherItem);
  };
  const dataStatusTrue =
    teacher?.salaryList?.length > 0 &&
    teacher?.salaryList
      ?.filter((salary) => salary?.status)
      ?.map((salary) => {
        return { ...salary, key: salary._id };
      });
  const dataStatusFalse =
    teacher?.salaryList?.length > 0 &&
    teacher?.salaryList
      ?.filter((salary) => !salary?.status)
      ?.map((salary) => {
        return { ...salary, key: salary._id };
      });
  // Sử dụng phương thức reduce để tính tổng amountSalary
  const totalAmountFeeTrue =
    teacher?.salaryList
      ?.filter((salary) => salary?.status)
      ?.reduce((total, item) => total + item.amountSalary, 0) || 0;

  const totalAmountFeeFalse =
    teacher?.salaryList
      ?.filter((salary) => !salary?.status)
      ?.reduce((total, item) => total + item.amountSalary, 0) || 0;
  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      render: (row, index) => (
        <div className="cursor-pointer w-full" key={index}>
          <p>{row.slice(0, 2) + "..." + row.slice(-2)}</p>
        </div>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      render: (row) => <p className="max-w-[150px] break-words">{row}</p>,
    },
    {
      title: "Loại lương",
      dataIndex: "type",
    },
    {
      title: "Số tiền",
      dataIndex: "amountSalary",
      render: (row) => <p>{row ? convertPrice(row) : 0}</p>,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (row) => <p>{row ? "Đã nhận" : "Chưa nhận"}</p>,
    },
  ];
  return (
    <main className="relative teacher-salary container mx-auto p-0 my-0 flex min-h-[100vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-8 lg:mb-10 flex flex-col w-full">
          <h1 className="font-black text-[28px] text-[#242424]">Tiền lương</h1>
        </div>
        <div className="relative -top-4 lg:mb-2 w-full">
          <div className="min-h-[180px] pb-4 pt-1 md:min-h-[200px] md:py-0 w-full flex flex-col md:flex-row md:justify-start gap-2 md:items-center">
            <div className="w-full max-w-[100%] md:w-1/2 md:max-w-[50%]">
              <h3 className="text-base m-0 font-semibold text-center">
                Đã nhận: {convertPrice(totalAmountFeeTrue)}
              </h3>
              <Table
                dataSource={dataStatusTrue}
                columns={columns}
                pagination={false}
                bordered
                className="w-full"
              />
            </div>
            <div className="w-full max-w-[100%] md:w-1/2 md:max-w-[50%]">
              <h3 className="text-base m-0 font-semibold text-center">
                Chưa nhận: {convertPrice(totalAmountFeeFalse)}
              </h3>
              <Table
                dataSource={dataStatusFalse}
                columns={columns}
                pagination={false}
                bordered
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
