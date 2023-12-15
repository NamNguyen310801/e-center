import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentAPI } from "../../../services/user.api";
import { setStudentList } from "../../../redux/slice/student.slice";
import { Avatar, Button, Input, Space, Table } from "antd";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

export default function UserClass() {
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.student.studentList);
  const user = useSelector((state) => state.auth.user);
  const [student, setStudent] = useState("");
  useEffect(() => {
    setStudent(studentList?.find((student) => student?.email === user?.email));
  }, [user?.email]);
  const dataTable =
    studentList?.length > 0 &&
    studentList
      ?.filter((std) => std?.klass === student?.klass)
      ?.map((student, index) => {
        return {
          key: index + 1,
          email: student?.email,
          klass: student?.klass,
          gender: student?.gender,
          avatar: student?.avatar,
          phone: student?.phone,
          date: student?.date,
          name: student?.name,
          address: student?.address,
        };
      });
  useEffect(() => {
    if (!studentList) {
      handleGetAllStudent();
    }
  }, [studentList]);
  const handleGetAllStudent = async () => {
    const res = await getAllStudentAPI();
    if (res.status === "OK") {
      dispatch(setStudentList(res.data));
    }
  };
  const searchInput = useRef(null);
  const handleSearch = (confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (title, dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={() => handleSearch(confirm)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            Tìm kiếm
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(confirm);
            }}
            size="small"
            style={{
              width: 90,
            }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes(value?.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const columns = [
    {
      title: "Tên học viên",
      dataIndex: "name",
      render: (row) => <p className="capitalize">{row} </p>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      render: (row, index) =>
        row ? <Avatar size={64} key={index} src={row} /> : null,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      filters: [
        {
          text: "Nam",
          value: "Nam",
        },
        {
          text: "Nữ",
          value: "Nữ",
        },
        {
          text: "Khác",
          value: "Khác",
        },
      ],
      onFilter: (value, record) => {
        if (value === "Nam") {
          return record?.gender === "Nam";
        }
        if (value === "Nữ") {
          return record?.gender === "Nữ";
        }
        return record?.gender === "Khác";
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Ngày sinh",
      dataIndex: "date",
      render: (row) => (row ? dayjs(row).format("DD/MM/YYYY") : ""),
    },
    {
      title: "Lớp",
      dataIndex: "klass",
    },
  ];
  return (
    <main className="relative user-class container mx-auto p-0 my-0 flex min-h-[100vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-12 lg:mb-14 flex flex-col w-full">
          <h1 className="font-black text-[28px] text-[#242424]">Lớp của tôi</h1>
        </div>
        <div className="relative -top-4 lg:mb-2 w-full -mt-10">
          <div className="min-h-[180px] pb-4 pt-1 md:min-h-[200px] md:py-0 w-full flex md:justify-center md:items-center">
            {student?.klass ? (
              <Table
                dataSource={dataTable}
                columns={columns}
                pagination
                bordered
                className="w-full"
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
