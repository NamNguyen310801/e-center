import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import dayjs from "dayjs";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

export default function Schedule() {
  const scheduleList = useSelector((state) => state.schedule.scheduleList);
  const classList = useSelector((state) => state.classSlice.classList);
  const groupedByName = {};
  scheduleList
    ?.map((schedule, index) => {
      let item = classList?.find(
        (klass) => klass?.name === schedule?.nameClass
      );
      return {
        key: index + 1,
        nameClass: schedule?.nameClass,
        dayOfWeek: schedule?.dayOfWeek,
        dayStart: item?.dayStart || "",
        dayEnd: item?.dayEnd || "",
        teacher: schedule.teacher,
      };
    })
    .forEach((item) => {
      const nameClass = item.nameClass;
      if (!groupedByName[nameClass]) {
        groupedByName[nameClass] = {
          nameClass: nameClass,
          dayOfWeek: [item.dayOfWeek],
          dayStart: item?.dayStart || "",
          dayEnd: item?.dayEnd || "",
          teacher: [item.teacher],
        };
      } else {
        // Nếu đã tồn tại, thêm giá trị dayOfWeek vào mảng
        groupedByName[nameClass].dayOfWeek.push(item.dayOfWeek);
      }
    });
  const dataTable = scheduleList?.length > 0 && Object.values(groupedByName);
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
          placeholder={`Tìm kiếm Lớp`}
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
      ...getColumnSearchProps("nameClass"),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "dayStart",
      render: (row) => (row ? dayjs(row).format("DD/MM/YYYY") : ""),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "dayEnd",
      render: (row) => (row ? dayjs(row).format("DD/MM/YYYY") : ""),
    },
    {
      title: "Lịch học",
      dataIndex: "dayOfWeek",
      render: (row, index) => (
        <div
          key={index}
          className="flex justify-center items-center gap-x-2 w-full capitalize">
          {row?.map((day, index) => (
            <p key={index}>{day},</p>
          ))}
        </div>
      ),
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      render: (row, index) => (
        <div
          key={index}
          className="flex justify-center items-center gap-x-2 w-full capitalize">
          {row?.map((teacher, index) => (
            <p key={index}> {row?.length > 1 ? teacher + " ," : teacher}</p>
          ))}
        </div>
      ),
    },
  ];
  return (
    <main className="relative user-schedule container mx-auto p-0 my-0 flex min-h-[90vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-12 lg:mb-14 flex flex-col w-full">
          <h1 className="font-black text-[28px] text-[#242424] text-center">
            Lịch học
          </h1>
        </div>
        <div className="relative -top-4 lg:mb-2 w-full">
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
