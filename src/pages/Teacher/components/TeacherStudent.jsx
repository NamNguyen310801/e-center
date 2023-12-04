import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Button,
  FloatButton,
  Spin,
  Modal,
  Table,
  Avatar,
  Space,
  Input,
  Select,
} from "antd";
import dayjs from "dayjs";
import * as UserService from "../../../services/user.api";
import { setStudentList } from "../../../redux/slice/student.slice";
import { ExcelExport } from "./ExcelExport";
export default function TeacherStudent() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [klass, setKlass] = useState("");
  const user = useSelector((state) => state.auth.user);
  const studentList = useSelector((state) => state.student.studentList);
  const scheduleList = useSelector((state) => state.schedule.scheduleList);
  const teacherClassList = [
    ...new Set(
      scheduleList
        ?.filter((schedule) => schedule?.teacher === user?.name)
        ?.map((item) => item?.nameClass)
    ),
  ];
  const dataTable =
    studentList?.length > 0 &&
    studentList
      ?.filter((student) => {
        return teacherClassList?.some((klass) => klass === student?.klass);
      })
      ?.filter((student) => student?.klass?.includes(klass))
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

  // *****API
  useEffect(() => {
    if (!studentList) {
      handleGetAllStudent();
    }
  }, [studentList]);
  const handleGetAllStudent = async () => {
    setIsLoading(true);
    const res = await UserService.getAllStudentAPI();
    if (res.status === "OK") {
      dispatch(setStudentList(res.data));
    }
    setIsLoading(false);
  };

  //-----Edit

  //=========== State
  const defaultValue = {
    email: "",
    name: "",
    phone: "",
    address: "",
    date: "",
    avatar: "",
    gender: "",
    tuition: "",
    klass: "",
    course: [],
  };
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [idEdit, setIdEdit] = useState("");
  //================Form

  // Cap nhat gia tri form

  const onCancel = () => {
    setIdEdit("");
    setFormValue(defaultValue);
    setIsOpenEdit(false);
  };
  const onOkEdit = () => {};
  //=========== Column table
  //func search
  const searchInput = useRef(null);
  const handleSearch = (confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
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
          placeholder={`Tìm kiếm ${dataIndex}`}
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
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "date",
      render: (row) => (row ? dayjs(row).format("DD/MM/YYYY") : ""),
    },
    {
      title: "Lớp",
      dataIndex: "klass",
      ...getColumnSearchProps("klass"),
    },
  ];

  const fileName = "exportedData";
  const title = `Danh sách Học viên ${klass ? "lớp " + klass : ""}`;

  return (
    <main className="relative teacher-student container mx-auto p-0 my-0 flex flex-col min-h-[100vh] gap-y-2">
      <h2 className="text-[28px] text-headingColor text-center font-sans font-extrabold tracking-wider">
        Danh sách Học viên
      </h2>
      <FloatButton
        icon={<SyncOutlined />}
        style={{
          top: 89,
        }}
        tooltip="Refresh"
        type="primary"
        onClick={handleGetAllStudent}
      />
      <Spin spinning={isLoading} className="z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <div className="text-sm font-medium text-gray-900">Chọn lớp</div>
            <Select
              onChange={(value) => setKlass(value)}
              placeholder="Chọn lớp"
              style={{
                width: 120,
              }}>
              {teacherClassList?.map((klass, index) => (
                <Select.Option value={klass} key={index}>
                  {klass}
                </Select.Option>
              ))}
              <Select.Option value={""}>Tất cả</Select.Option>
            </Select>
          </div>
          <ExcelExport
            data={dataTable}
            fileName={fileName}
            title={title}
            sheetName={klass}
          />
        </div>
        <Table
          className="mt-2"
          dataSource={dataTable}
          columns={columns}
          pagination
          bordered
        />
      </Spin>
      <Modal
        forceRender
        open={isOpenEdit}
        title="Cập nhật Học viên"
        onCancel={() => onCancel()}
        onOk={() => onOkEdit()}></Modal>
    </main>
  );
}
