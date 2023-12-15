import { Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserSchedule() {
  const scheduleList = useSelector((state) => state.schedule.scheduleList);
  const studentList = useSelector((state) => state.student.studentList);
  const user = useSelector((state) => state.auth.user);
  const [student, setStudent] = useState("");
  useEffect(() => {
    setStudent(studentList?.find((student) => student?.email === user?.email));
  }, [user?.email]);
  const dataTable =
    scheduleList?.length > 0 &&
    scheduleList
      ?.filter((schedule) => schedule?.nameClass === student?.klass || "")
      ?.map((schedule) => {
        return {
          ...schedule,
          key: schedule._id,
        };
      });

  //=========== Column table

  const columns = [
    {
      title: "Tên lớp",
      dataIndex: "nameClass",
    },
    {
      title: "Lịch học",
      dataIndex: "dayOfWeek",
      render: (row) => <p className="capitalize">{row} </p>,
    },
    {
      title: "Ca học",
      dataIndex: "caHoc",
    },
    {
      title: "Giờ học",
      dataIndex: "time",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
    },
  ];
  return (
    <main className="relative user-schedule container mx-auto p-0 my-0 flex min-h-[100vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-12 lg:mb-14 flex flex-col w-full">
          <h1 className="font-black text-[28px] text-[#242424]">Lịch học</h1>
        </div>
        <div className="relative -top-4 lg:mb-2 w-full -mt-10">
          <div className="min-h-[180px] pb-4 pt-1 md:min-h-[200px] md:py-0 w-full flex md:justify-center md:items-center">
            {student?.klass ? (
              <Table
                dataSource={dataTable}
                columns={columns}
                pagination={false}
                bordered
                className="w-full max-w-[1080px]"
              />
            ) : (
              <span className="font-black text-[28px] text-[#242424]">
                Bạn chưa tham gia lớp học nào
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
