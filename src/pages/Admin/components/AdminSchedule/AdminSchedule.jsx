import {
  Button,
  FloatButton,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { ButtonDelete, ButtonEdit } from "../../../../components";
import {
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as ScheduleService from "../../../../services/schedule.api";
import * as ClassService from "../../../../services/class.api";
import Toast from "../../../../utils/Toast";
import {
  deletedScheduleSlice,
  setScheduleList,
  updateScheduleList,
} from "../../../../redux/slice/schedule.slice";
import { caHocList, weekList } from "../../../../utils/stringsUtils";
import { setClassList } from "../../../../redux/slice/class.slice";

const { confirm } = Modal;

export default function AdminSchedule() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const scheduleList = useSelector((state) => state.schedule.scheduleList);
  const classList = useSelector((state) => state.classSlice.classList);
  const teacherList = useSelector((state) => state.teacher.teacherList);

  const dataTable =
    scheduleList?.length > 0 &&
    scheduleList?.map((schedule) => {
      return {
        ...schedule,
        key: schedule._id,
      };
    });

  // *****API
  useEffect(() => {
    if (!scheduleList) {
      handleGetAllSchedule();
    }
  }, []);
  const handleGetAllSchedule = async () => {
    setIsLoading(true);
    const res = await ScheduleService.getAllScheduleAPI();
    if (res.status === "OK") {
      dispatch(setScheduleList(res?.data));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!classList) {
      handleGetAllClass();
    }
  }, []);
  const handleGetAllClass = async () => {
    const res = await ClassService.getAllClassAPI();
    if (res.status === "OK") {
      dispatch(setClassList(res?.data));
    }
  };
  //-----Create
  const createSchedule = async () => {
    try {
      const res = await ScheduleService.createScheduleAPI(formValue);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        handleGetAllSchedule();
        form.resetFields();
        setFormValue(defaultValue);
      }
    } catch (error) {
      Toast("error", error);
    }
  };
  //-----Edit
  const editSchedule = async (id, data) => {
    const res = await ScheduleService.updateScheduleAPI(
      id,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      dispatch(updateScheduleList({ _id: id, ...data }));
      Toast("success", res.message);
      setTimeout(() => {
        onCancel();
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };

  //-----Del
  const deleteSchedule = async (id) => {
    const res = await ScheduleService.deleteScheduleAPI(id, user.access_token);
    if (res.status === "OK") {
      Toast("success", res.message);
      setTimeout(() => {
        dispatch(deletedScheduleSlice(id));
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };
  //=========== State
  const defaultValue = {
    nameClass: "",
    dayOfWeek: "",
    caHoc: "",
    time: "",
    teacher: "",
  };
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [idEdit, setIdEdit] = useState("");
  //================Form
  useEffect(() => {
    form.setFieldsValue({
      nameClass: formValue?.nameClass,
      dayOfWeek: formValue?.dayOfWeek,
      caHoc: formValue?.caHoc,
      time: formValue?.time,
      teacher: formValue?.teacher,
    });
  }, [formValue, form]);
  const onReset = () => {
    setFormValue(defaultValue);
    form.resetFields();
  };
  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  const openEdit = (value) => {
    setIsOpen(false);
    setIdEdit(value._id);
    setFormValue(value);
    setTimeout(() => {
      setIsOpenEdit(true);
    }, 100);
  };
  const onCancel = () => {
    setIdEdit("");
    form.resetFields();
    setFormValue(defaultValue);
    setIsOpenEdit(false);
  };
  const onOkEdit = () => {
    editSchedule(idEdit, formValue);
  };
  //
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteSchedule(id);
      },
    });
  };
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
      title: "Lịch học",
      dataIndex: "dayOfWeek",
      ...getColumnSearchProps("Lịch học", "dayOfWeek"),
      render: (row) => <p className="capitalize">{row} </p>,
    },
    {
      title: "Ca học",
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
      title: "Giờ học",
      dataIndex: "time",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      ...getColumnSearchProps("Giảng viên", "teacher"),
    },
    {
      title: " ",
      render: (row, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-full gap-x-4">
          <ButtonEdit onClick={() => openEdit(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
        </div>
      ),
    },
  ];

  return (
    <main className="relative admin-schedule container mx-auto p-0 my-0 flex min-h-[100vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-8 lg:mb-10 flex flex-col w-full">
          <h1 className="font-black text-xl text-[#242424]">
            Quản lý lịch giảng
          </h1>
        </div>
        <div className="flex gap-x-6 w-full">
          <div className="flex gap-8 bg-lightOverlay transition duration-700 min-w-[320px] max-h-[400px]">
            <Tooltip title="Thêm lịch giảng dạy" placement="right">
              <button
                className={`${
                  isOpen ? "hidden" : ""
                } transition duration-300 rounded-lg w-20 h-20 border-dashed border border-gray-300 hover:text-blue-500 hover:border-blue-500`}
                onClick={() => setIsOpen(true)}>
                <PlusOutlined style={{ fontSize: "60px" }} />
              </button>
            </Tooltip>
            <div
              className={`${
                isOpen ? " " : "hidden"
              } flex gap-8 mx-auto transition duration-700 min-w-[320px]`}>
              <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-start gap-4 max-h-[400px]">
                <h3 className="px-4 py-[10px] text-xl text-blue-500 font-semibold">
                  Thêm lịch giảng dạy
                </h3>
                <div className="flex flex-col w-full items-center justify-center gap-4">
                  <div className="w-full">
                    <Form
                      className="w-full"
                      name="admin-schedule"
                      labelCol={{
                        span: 7,
                      }}
                      form={form}>
                      <Form.Item
                        label="Lớp"
                        name="nameClass"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Select placeholder="Chọn lớp">
                          {classList?.map((classItem) => (
                            <Select.Option
                              value={classItem?.name}
                              key={classItem._id}>
                              {classItem?.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Lịch học"
                        name="dayOfWeek"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Select
                          placeholder="Chọn lịch học"
                          options={weekList}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Ca học"
                        name="caHoc"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Select placeholder="Chọn ca học" options={caHocList} />
                      </Form.Item>
                      <Form.Item
                        label="Giờ học"
                        name="time"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Select
                          placeholder="Chọn giờ học"
                          options={[
                            {
                              value: "8h-10h30",
                              label: "8h-10h30",
                            },
                            {
                              value: "13h-15h30",
                              label: "13h-15h30",
                            },
                            {
                              value: "15h45-18h15",
                              label: "15h45-18h15",
                            },
                            {
                              value: "18h30-21h",
                              label: "18h30-21h",
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Giảng viên"
                        name="teacher"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Select placeholder="Chọn giảng viên">
                          {teacherList?.map((classItem) => (
                            <Select.Option
                              value={classItem?.name}
                              key={classItem._id}>
                              {classItem?.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-8 w-full">
                  <button
                    type="button"
                    onClick={createSchedule}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-purple-500 to-blue-400 text-gray-900 hover:from-purple-600 hover:to-blue-500 dark:text-white
               hover:text-white hover:bg-blue-500 cursor-pointer active:scale-95">
                    Thêm
                  </button>

                  <button
                    type="button"
                    onClick={onReset}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-teal-300 to-lime-300 text-gray-900 hover:text-white hover:from-teal-400 hover:to-lime-400  cursor-pointer active:scale-95 dark:text-white">
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onReset();
                    }}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:from-red-300 hover:via-red-400 hover:to-yellow-500  hover:text-white cursor-pointer active:scale-95 dark:text-white">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full -mt-10">
            <h3 className="font-semibold mb-4 text-lg text-[#424242] text-center">
              Danh sách Lịch giảng
            </h3>{" "}
            <FloatButton
              icon={<SyncOutlined />}
              style={{
                top: 89,
              }}
              tooltip="Refresh"
              type="primary"
              onClick={handleGetAllSchedule}
            />
            <div className="min-h-[180px] pb-4 pt-1 md:min-h-[200px] md:py-0 w-full flex md:justify-center md:items-center">
              <Spin spinning={isLoading} className="z-30 w-full">
                <Table
                  dataSource={dataTable}
                  columns={columns}
                  pagination={false}
                  bordered
                  className="w-full lg:min-w-[1080px]"
                />
              </Spin>
            </div>
          </div>
        </div>
        <Modal
          forceRender
          open={isOpenEdit}
          title="Cập nhật lịch giảng"
          onCancel={() => onCancel()}
          onOk={() => onOkEdit()}>
          <Form
            form={form}
            onValuesChange={handleValuesChange}
            name="updateSchedule"
            className="border p-3 w-full rounded-lg pt-6 "
            labelCol={{ span: 6 }}>
            <Form.Item
              label="Lớp"
              name="nameClass"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Select placeholder="Chọn lớp">
                {classList?.map((classItem) => (
                  <Select.Option value={classItem?.name} key={classItem._id}>
                    {classItem?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Lịch học"
              name="dayOfWeek"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Select placeholder="Chọn lịch học" options={weekList} />
            </Form.Item>
            <Form.Item
              label="Ca học"
              name="caHoc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Select placeholder="Chọn ca học" options={caHocList} />
            </Form.Item>
            <Form.Item
              label="Giờ học"
              name="time"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Select
                placeholder="Chọn giờ học"
                options={[
                  {
                    value: "8h-10h30",
                    label: "8h-10h30",
                  },
                  {
                    value: "13h-15h30",
                    label: "13h-15h30",
                  },
                  {
                    value: "15h45-18h15",
                    label: "15h45-18h15",
                  },
                  {
                    value: "18h30-21h",
                    label: "18h30-21h",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Giảng viên"
              name="teacher"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Select placeholder="Chọn giảng viên">
                {teacherList?.map((classItem) => (
                  <Select.Option value={classItem?.name} key={classItem._id}>
                    {classItem?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </main>
  );
}
