import {
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  Table,
  Tooltip,
  Modal,
  FloatButton,
  Spin,
  Space,
  Button,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { ButtonDelete, ButtonEdit } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import * as ClassService from "../../../../services/class.api";
import * as UserService from "../../../../services/user.api";
import {
  deletedClassSlice,
  setClassList,
  updateClassList,
} from "../../../../redux/slice/class.slice";
import Toast from "../../../../utils/Toast";
import { updateStudentList } from "../../../../redux/slice/student.slice";
import { Avatar } from "../../../../assets";
const { confirm } = Modal;

export default function AdminClass() {
  const dispatch = useDispatch();
  const courseList = useSelector((state) => state.course.courseList);
  const classList = useSelector((state) => state.classSlice.classList);
  const user = useSelector((state) => state.auth.user);
  const studentList = useSelector((state) => state.student.studentList);
  const scheduleList = useSelector((state) => state.schedule.scheduleList);

  const [isLoading, setIsLoading] = useState(false);
  const dataTable =
    classList?.length > 0 &&
    classList?.map((klass) => {
      return {
        ...klass,
        key: klass._id,
        countStudent: studentList?.filter(
          (student) => student?.klass === klass?.name
        ).length,
        schedule: scheduleList
          ?.filter((schedule) => schedule?.nameClass === klass?.name)
          ?.map((item) => item.dayOfWeek)
          .flat(),
        caHoc: scheduleList
          ?.filter((schedule) => schedule?.nameClass === klass?.name)
          ?.map((item) => item.caHoc)
          .flat(),
      };
    });

  // *****API
  useEffect(() => {
    if (!classList) {
      handleGetAllClass();
    }
  }, []);
  const handleGetAllClass = async () => {
    setIsLoading(true);
    const res = await ClassService.getAllClassAPI();
    if (res.status === "OK") {
      dispatch(setClassList(res?.data));
    }
    setIsLoading(false);
  };

  //-----Create
  const createClass = async () => {
    try {
      const res = await ClassService.createClassAPI(formValue);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        handleGetAllClass();
        form.resetFields();
        setFormValue(defaultValue);
      }
    } catch (error) {
      Toast("error", error);
    }
  };
  //-----Edit
  const editClass = async (id, data) => {
    const res = await ClassService.updateClassAPI(id, data, user.access_token);
    if (res.status === "OK") {
      dispatch(updateClassList({ _id: id, ...data }));
      Toast("success", res.message);
      setTimeout(() => {
        onCancel();
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };
  //-----Del
  const deleteClass = async (id) => {
    const res = await ClassService.deleteClassAPI(id, user.access_token);
    if (res.status === "OK") {
      Toast("success", res.message);
      setTimeout(() => {
        dispatch(deletedClassSlice(id));
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };
  //-----AddStudentToClass

  const addStudentToClass = async (data) => {
    const dataStudent = data?.idStudent?.map((i) => {
      return studentList?.find((student) => student?._id === i);
    });
    dataStudent?.map(async (student) => {
      const editData = {
        gender: student?.gender,
        tuition: student?.tuition,
        course: student?.course,
        klass: data?.nameClass,
      };
      const res = await UserService.updateStudentAPI(
        student?._id,
        editData,
        user.access_token
      );
      if (res.status === "OK") {
        Toast("success", "Thêm học viên thành công");
        setTimeout(() => {
          dispatch(
            updateStudentList({
              _id: student?._id,
              ...student,
              klass: data?.nameClass,
            })
          );
          onReset2();
        }, 1500);
      } else {
        Toast("error", res.message);
      }
    });
  };
  //=========== State
  const defaultValue = {
    name: "",
    course: "",
  };
  const defaultValue2 = {
    idStudent: [],
    nameClass: "",
  };
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [formValue2, setFormValue2] = useState(defaultValue2);
  const [idEdit, setIdEdit] = useState("");
  //================Form
  useEffect(() => {
    form.setFieldsValue({
      name: formValue?.name,
      course: formValue?.course,
    });
  }, [formValue, form]);
  useEffect(() => {
    form1.setFieldsValue({
      idStudent: formValue2?.idStudent,
      nameClass: formValue2?.nameClass,
    });
  }, [formValue2, form]);
  const onReset = () => {
    setFormValue(defaultValue);
    form.resetFields();
  };
  const onReset2 = () => {
    setFormValue2(defaultValue2);
    form1.resetFields();
  };
  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  const handleValuesChange2 = (changedValues, allValues) => {
    setFormValue2((prevData) => ({ ...prevData, ...changedValues }));
  };
  const openEdit = (value) => {
    setIsOpen1(false);
    setIsOpen2(false);
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
    editClass(idEdit, formValue);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteClass(id);
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
      title: "ID",
      dataIndex: "_id",
      render: (row) => (
        <p className="max-w-[200px]">{row.slice(0, 2) + row.slice(-4)} </p>
      ),
    },
    {
      title: "Tên lớp",
      dataIndex: "name",
      render: (row) => <p className="capitalize">{row} </p>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Khóa học",
      dataIndex: "course",
      render: (row) => <p className="capitalize">{row}</p>,
      ...getColumnSearchProps("course"),
    },
    {
      title: "Số lượng học viên",
      dataIndex: "countStudent",
      sorter: (a, b) => a?.countStudent - b?.countStudent,
    },
    {
      title: "Lịch học",
      dataIndex: "schedule",
      render: (row, index) => (
        <div
          key={index}
          className="flex justify-center items-center gap-x-2 w-full">
          {row?.map((day, index) => (
            <p key={index}>{day},</p>
          ))}
        </div>
      ),
    },
    {
      title: "Ca học",
      dataIndex: "caHoc",
      render: (row, index) => (
        <div
          key={index}
          className="flex justify-center items-center gap-x-2 w-full">
          {row?.map((day, index) => (
            <p key={index}>{day},</p>
          ))}
        </div>
      ),
    },
    {
      title: " ",
      render: (row, index) => (
        <div
          key={index}
          className="flex items-center justify-between max-w-[150px]">
          <ButtonEdit onClick={() => openEdit(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
        </div>
      ),
    },
  ];
  const filterOption = (input, option) => {
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };

  return (
    <main className="relative admin-class container mx-auto p-0 my-0 flex flex-col min-h-[100vh] gap-y-2">
      <h2 className="text-xl my-6 text-headingColor text-center font-sans font-extrabold tracking-wider">
        Danh sách Lớp học
      </h2>
      <div className="flex gap-x-6 w-full">
        <div className="flex flex-col gap-y-6 w-full relative">
          {/* Thêm lớp học*/}
          <div className=" flex gap-8 bg-lightOverlay transition duration-700 min-w-[320px]">
            <Tooltip title="Thêm Lớp học" placement="bottom">
              <button
                className={` transition duration-700 rounded-lg w-20 h-20 border-dashed border border-gray-300 hover:text-blue-500 hover:border-blue-500`}
                onClick={() => {
                  setIsOpen1(!isOpen1);
                  setIsOpen2(false);
                  onReset2();
                }}>
                <PlusOutlined style={{ fontSize: "60px" }} />
              </button>
            </Tooltip>
            <div
              className={`${
                isOpen1 ? " " : "hidden"
              } absolute top-0 right-0 bg-white flex gap-8 mx-auto transition duration-700 min-w-[320px]`}>
              <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
                <h3 className="px-4 py-[10px] text-xl text-blue-500 font-semibold">
                  Thêm Lớp học
                </h3>
                <div className="flex flex-col w-full items-center justify-center gap-4">
                  <div className="w-full">
                    <Form
                      className="w-full"
                      onValuesChange={handleValuesChange}
                      name="admin-class"
                      labelCol={{
                        span: 10,
                      }}
                      form={form}>
                      <Form.Item
                        label="Tên lớp học"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Input placeholder="Nhập tên lớp" />
                      </Form.Item>
                      <Form.Item
                        label="Khóa học"
                        name="course"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Select placeholder="Chọn khóa học">
                          {courseList?.map((course) => (
                            <Select.Option
                              value={course?.name}
                              key={course._id}>
                              {course?.name}
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
                    onClick={createClass}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-purple-500 to-blue-400 text-gray-900 hover:from-purple-600 hover:to-blue-500 dark:text-white hover:text-white hover:bg-blue-500 cursor-pointer active:scale-95">
                    Thêm
                  </button>

                  <button
                    type="button"
                    onClick={onReset}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-teal-300 to-lime-300 text-gray-900 hover:text-white hover:from-teal-400 hover:to-lime-400  cursor-pointer active:scale-95 dark:text-white">
                    Làm mới
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen1(false);
                      onReset();
                    }}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:from-red-300 hover:via-red-400 hover:to-yellow-500  hover:text-white cursor-pointer active:scale-95 dark:text-white">
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Thêm học viên vào lớp */}
          <div className="flex gap-8 bg-lightOverlay transition duration-700">
            <Tooltip title="Thêm học viên vào lớp" placement="bottom">
              <button
                className={`transition duration-300 rounded-lg w-20 h-20 border-dashed border border-gray-300 hover:text-blue-500 hover:border-blue-500`}
                onClick={() => {
                  setIsOpen2(!isOpen2);
                  setIsOpen1(false);
                  onReset();
                }}>
                <PlusOutlined style={{ fontSize: "60px" }} />
              </button>
            </Tooltip>
            <div
              className={`${
                isOpen2 ? " " : "hidden"
              } absolute top-0 right-0 flex gap-8 mx-auto transition duration-700 w-[320px]`}>
              <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
                <h3 className="px-4 py-[10px] text-xl text-blue-500 font-semibold">
                  Thêm học viên vào lớp
                </h3>
                <div className="flex flex-col w-full items-center justify-center gap-4">
                  <div className="w-full">
                    <Form
                      className="w-full"
                      name="admin-studentToClass"
                      labelCol={{
                        span: 10,
                      }}
                      form={form1}
                      onValuesChange={handleValuesChange2}>
                      <Form.Item
                        label="Tên học viên"
                        name="idStudent"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Select
                          filterOption={filterOption}
                          placeholder="Chọn học viên"
                          mode="multiple"
                          style={{
                            width: "100%",
                          }}>
                          {studentList?.map((student) => (
                            <Select.Option
                              key={student._id}
                              value={student?.id}
                              label={student?.name}>
                              <div
                                style={{
                                  display: "flex",
                                  rowGap: 6,
                                  alignItems: "center",
                                }}>
                                <img
                                  style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 9999,
                                    objectFit: "contain",
                                    objectPosition: "center",
                                    overflow: "hidden",
                                  }}
                                  src={
                                    student?.avatar ? student?.avatar : Avatar
                                  }
                                />
                                <p>{student?.name}</p>
                              </div>
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Tên lớp học"
                        name="nameClass"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Select placeholder="Chọn lớp học">
                          {classList?.map((classItem) => (
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
                    onClick={() => addStudentToClass(formValue2)}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-purple-500 to-blue-400 text-gray-900 hover:from-purple-600 hover:to-blue-500 dark:text-white hover:text-white hover:bg-blue-500 cursor-pointer active:scale-95">
                    Thêm
                  </button>
                  <button
                    type="button"
                    onClick={onReset2}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-teal-300 to-lime-300 text-gray-900 hover:text-white hover:from-teal-400 hover:to-lime-400  cursor-pointer active:scale-95 dark:text-white">
                    Làm mới
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen2(false);
                      onReset2();
                    }}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:from-red-300 hover:via-red-400 hover:to-yellow-500  hover:text-white cursor-pointer active:scale-95 dark:text-white">
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <FloatButton
            icon={<SyncOutlined />}
            style={{
              top: 89,
            }}
            tooltip="Refresh"
            type="primary"
            onClick={handleGetAllClass}
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
        <Modal
          forceRender
          open={isOpenEdit}
          title="Cập nhật lớp học"
          onCancel={() => onCancel()}
          onOk={() => onOkEdit()}>
          <Form
            form={form}
            onValuesChange={handleValuesChange}
            name="updateClass"
            className="border p-3 w-full rounded-lg pt-6 "
            labelCol={{ span: 6 }}>
            <Form.Item
              label="Tên lớp học"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Input placeholder="Nhập tên lớp" />
            </Form.Item>
            <Form.Item
              label="Khóa học"
              name="course"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Select placeholder="Chọn khóa học">
                {courseList?.map((course) => (
                  <Select.Option value={course?.name} key={course._id}>
                    {course?.name}
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
