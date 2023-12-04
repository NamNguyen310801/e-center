import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { caHocList } from "../../../utils/stringsUtils";

export default function TeacherSchedule() {
  const scheduleList = useSelector((state) => state.schedule.scheduleList);

  const dataTable =
    scheduleList?.length > 0 &&
    scheduleList?.map((schedule) => {
      return {
        ...schedule,
        key: schedule._id,
      };
    });

  //=========== Column table
  //func search
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
      title: "Tên lớp",
      dataIndex: "nameClass",
      ...getColumnSearchProps("Tên lớp", "nameClass"),
    },
    {
      title: "Lịch giảng",
      dataIndex: "dayOfWeek",
      ...getColumnSearchProps("Lịch giảng", "dayOfWeek"),
      render: (row) => <p className="capitalize">{row} </p>,
    },
    {
      title: "Ca giảng",
      dataIndex: "caHoc",
      filters: caHocList?.map((caHoc) => ({
        text: caHoc.label,
        value: caHoc.value,
      })),

      onFilter: (value, record) => {
        if (value === "Ca 1") {
          return record?.caHoc === "Ca 1";
        }
        if (value === "Ca 2") {
          return record?.caHoc === "Ca 2";
        }
        if (value === "Ca 3") {
          return record?.caHoc === "Ca 3";
        }
        return record?.caHoc === "Ca 4";
      },
    },
    {
      title: "Giờ giảng",
      dataIndex: "time",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      ...getColumnSearchProps("Giảng viên", "teacher"),
    },
  ];

  return (
    <main className="relative teacher-schedule container mx-auto p-0 my-0 flex min-h-[100vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-12 lg:mb-14 flex flex-col w-full">
          <h1 className="font-black text-[28px] text-[#242424]">Lịch giảng</h1>
        </div>
        <div className="relative -top-4 lg:mb-2 w-full lg:-mt-10">
          <div className="min-h-[180px] pb-4 pt-1 md:min-h-[200px] md:py-0 w-full flex md:justify-center md:items-center">
            <Table
              dataSource={dataTable}
              columns={columns}
              pagination={false}
              bordered
              className="w-full max-w-[1080px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
