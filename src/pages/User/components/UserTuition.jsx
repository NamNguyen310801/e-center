import { Table } from "antd";
import { useEffect, useState } from "react";
import { convertPrice } from "../../../utils/function";
import { useDispatch, useSelector } from "react-redux";

export default function UserTuition() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const studentList = useSelector((state) => state.student.studentList);
  const [student, setStudent] = useState(null);
  useEffect(() => {
    getStudent(user?.id);
  }, [user, studentList]);
  const getStudent = async (id) => {
    const studentItem = await studentList?.find((item) => item._id === id);
    setStudent(studentItem);
  };
  const dataStatusTrue =
    student?.tuitionList?.length > 0 &&
    student?.tuitionList
      ?.filter((tuition) => tuition?.status)
      ?.map((tuition) => {
        return { ...tuition, key: tuition._id };
      });
  const dataStatusFalse =
    student?.tuitionList?.length > 0 &&
    student?.tuitionList
      ?.filter((tuition) => !tuition?.status)
      ?.map((tuition) => {
        return { ...tuition, key: tuition._id };
      });
  // Sử dụng phương thức reduce để tính tổng amountFee
  const totalAmountFeeTrue =
    student?.tuitionList
      ?.filter((tuition) => tuition?.status)
      ?.reduce((total, item) => total + item.amountFee, 0) || 0;

  const totalAmountFeeFalse =
    student?.tuitionList
      ?.filter((tuition) => !tuition?.status)
      ?.reduce((total, item) => total + item.amountFee, 0) || 0;
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
      title: "Số buổi",
      dataIndex: "amountDay",
    },
    {
      title: "Số tiền",
      dataIndex: "amountFee",
      render: (row) => <p>{row ? convertPrice(row) : 0}</p>,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (row) => <p>{row ? "Đã thanh toán" : "Chưa thanh toán"}</p>,
    },
  ];
  return (
    <main className="relative user-tuition container mx-auto p-0 my-0 flex min-h-[100vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-8 lg:mb-10 flex flex-col w-full">
          <h1 className="font-black text-[28px] text-[#242424]">Học phí</h1>
        </div>
        <div className="relative -top-4 lg:mb-2 w-full">
          <div className="min-h-[180px] pb-4 pt-1 md:min-h-[200px] md:py-0 w-full flex flex-col md:flex-row md:justify-between gap-2 md:items-start">
            <div className="w-full max-w-[100%] md:w-1/2 md:max-w-[50%]">
              <h3 className="text-base m-0 font-semibold text-center">
                Đã đóng: {convertPrice(totalAmountFeeTrue)}
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
                Còn phải đóng:{convertPrice(totalAmountFeeFalse)}
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
