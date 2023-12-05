import {
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  FloatButton,
  Spin,
  Modal,
  Table,
  Avatar,
  Space,
  Input,
  Form,
  Upload,
  Select,
  DatePicker,
  InputNumber,
  Radio,
} from "antd";
import { useEffect, useRef, useState } from "react";
import {
  ButtonAdd,
  ButtonDelete,
  ButtonEdit,
  ExportToExcel,
} from "../../../../components";
import * as UserService from "../../../../services/user.api";
import { useDispatch, useSelector } from "react-redux";

import Toast from "../../../../utils/Toast";
import {
  addStudentTuitionList,
  setStudentId,
  setStudentList,
  updateStudentList,
} from "../../../../redux/slice/student.slice";
import dayjs from "dayjs";
import { getBase64, isDateBeforeToday } from "../../../../utils/function";
import { getRegexPhoneNumber } from "../../../../utils/stringsUtils";
import {
  deletedUserSlice,
  setUserList,
  updateUserList,
} from "../../../../redux/slice/user.slice";
import { setShowStudent } from "../../../../redux/slice/show.slice";
import AdminStudentDetail from "./AdminStudentDetail";
import { sendTuitionAPI } from "../../../../services/email.api";

const { confirm } = Modal;

export default function AdminStudent() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const courseList = useSelector((state) => state.course.courseList);
  const studentList = useSelector((state) => state.student.studentList);
  const tuitionList = useSelector((state) => state.tuition.tuitionList);
  const classList = useSelector((state) => state.classSlice.classList);
  const [emailSend, setEmailSend] = useState("");

  const dataTable =
    studentList?.length > 0 &&
    studentList?.map((student) => {
      return { ...student, key: student._id };
    });
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };
  // *****API
  useEffect(() => {
    if (!studentList) {
      handleGetAllStudent();
    }
  }, []);
  const handleGetAllStudent = async () => {
    setIsLoading(true);
    const res = await UserService.getAllStudentAPI();
    if (res.status === "OK") {
      dispatch(setStudentList(res.data));
    }
    setIsLoading(false);
  };
  const handleGetAllUser = async () => {
    setIsLoading(true);
    const res = await UserService.getAllUserAPI();
    if (res.status === "OK") {
      dispatch(setUserList(res.data));
    }
    setIsLoading(false);
  };
  //-----Edit
  const editStudent = async (id, data) => {
    const dataStudent = {
      tuition: data?.tuition,
      course: data?.course,
      klass: data?.klass,
    };
    const dataUser = {
      email: data?.email,
      name: data?.name,
      role: 3,
      phone: data?.phone,
      address: data?.address,
      date: data?.date?.format(),
      avatar: data?.avatar,
      coverImage: data?.coverImage || "",
      gender: data?.gender,
    };
    const res = await UserService.updateUserAPI(
      id,
      dataUser,
      user?.access_token
    );
    const resSt = await UserService.updateStudentAPI(
      id,
      dataStudent,
      user?.access_token
    );
    if (res.status === "OK" && resSt.status === "OK") {
      dispatch(
        updateUserList({ _id: id, ...dataUser, date: data?.date?.format() })
      );
      dispatch(
        updateStudentList({
          _id: id,
          ...data,
          date: data?.date?.format(),
        })
      );
      Toast("success", resSt.message);
      setTimeout(() => {
        onCancel();
        setFileList([]);
      }, 2000);
    } else {
      Toast("error", resSt.message);
    }
  };
  const addTuitionStudent = async (id, data) => {
    const res = await UserService.addTuitionStudentAPI(
      id,
      {
        amountDay: data?.amountDay,
        amountFee: data?.amountFee,
        description: data?.description,
        status: false,
      },
      user.access_token
    );
    if (res.status === "OK") {
      Toast("success", res.message);
      dispatch(addStudentTuitionList({ id, data: res?.data?.tuitionList }));
      await sendTuitionAPI({ email: emailSend });
      onCancelAdd();
    } else {
      Toast("error", res.message);
    }
  };
  //-----Del
  const deleteStudent = async (id) => {
    const res = await UserService.deleteUserAPI(id, user.access_token);
    if (res.status === "OK") {
      dispatch(deletedUserSlice(id));
      Toast("success", res.message);
    } else {
      Toast("error", res.message);
    }
  };
  const deleteManyUsers = async (ids) => {
    const res = await UserService.deleteManyUserAPI(ids, user.access_token);
    if (res.status === "OK") {
      handleGetAllUser();
      handleGetAllStudent();
      Toast("success", res.message);
      setRowSelectedKeys([]);
    } else {
      Toast("error", res.message);
    }
  };
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
  const defaultValueAdd = {
    category: 1,
    amountDay: 0,
    amountFee: 0,
    description: "",
  };

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [formValueAdd, setFormValueAdd] = useState(defaultValueAdd);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [tuitionFee, setTuitionFee] = useState(0);

  //================Form
  useEffect(() => {
    form.setFieldsValue({
      email: formValue?.email,
      name: formValue?.name,
      phone: formValue?.phone,
      address: formValue?.address,
      date: formValue?.date,
      avatar: formValue?.avatar,
      gender: formValue?.gender,
      klass: formValue?.klass,
      tuition: formValue?.tuition,
      course: formValue?.course?.map((item) => item?.courseId),
    });
  }, [formValue, form]);
  useEffect(() => {
    form2.setFieldsValue({
      category: formValueAdd?.category,
      amountFee: formValueAdd?.amountFee,
      amountDay: formValueAdd?.amountDay,
      description: formValueAdd?.description,
    });
  }, [formValueAdd, form2]);
  const findTuitionFee = (name) => {
    let tuitionFind = tuitionList?.find((tuition) => tuition?.name === name);
    setTuitionFee(tuitionFind?.fee || 0);
  };
  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  const handleValuesChange2 = (changedValues, allValues) => {
    setFormValueAdd((prevData) => ({ ...prevData, ...changedValues }));
  };
  const openEdit = (value) => {
    setIdEdit(value?._id);
    setFormValue({
      ...value,
      date: value?.date ? dayjs(value?.date) : null,
    });
    setTimeout(() => {
      setIsOpenEdit(true);
    }, 100);
  };
  const openAdd = (value) => {
    findTuitionFee(value?.tuition);
    setIdEdit(value?._id);
    setEmailSend(value?.email);
    setTimeout(() => {
      setIsOpenAdd(true);
    }, 100);
  };
  const onCancel = () => {
    setIdEdit("");
    form.resetFields();
    setFormValue(defaultValue);
    setIsOpenEdit(false);
    setEmailSend("");
  };
  const onCancelAdd = () => {
    setIdEdit("");
    form2.resetFields();
    setFormValueAdd(defaultValueAdd);
    setTuitionFee(0);
    setIsOpenAdd(false);
  };

  const onOkEdit = () => {
    editStudent(idEdit, formValue);
  };
  const onOkAdd = () => {
    addTuitionStudent(idEdit, formValueAdd);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteStudent(id);
      },
    });
  };
  const handleDeleteAll = () => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteManyUsers(rowSelectedKeys);
      },
    });
  };
  const handleClick = (id) => {
    dispatch(setShowStudent(true));
    dispatch(setStudentId(id));
  };
  const handleOnClose = () => {
    dispatch(setShowStudent(false));
  };
  //Upload
  const handleOnchangeImage = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setFormValue((prevData) => ({ ...prevData, avatar: file.preview }));
    } else {
      setFormValue((prevData) => ({ ...prevData, avatar: "" }));
    }
  };
  // Bat modal xem anh
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleCancelPreview = () => setPreviewOpen(false);

  // Xoa anh khi upload
  const handleRemove = async (file) => {
    const image = file.response.data;
    // await deleteImage(image._id);
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
  const filterOption = (input, option) => {
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
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
      render: (row, index) => (
        <div
          className="cursor-pointer w-full"
          onClick={() => handleClick(row)}
          key={index}>
          <p>{row.slice(0, 2) + "..." + row.slice(-2)}</p>
        </div>
      ),
    },
    {
      title: "Tên học viên",
      dataIndex: "name",
      render: (row) => (
        <p className="capitalize break-words max-w-[100px]">{row} </p>
      ),
      ...getColumnSearchProps("name"),
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
      title: "Email",
      dataIndex: "email",
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
      title: "Học phí",
      dataIndex: "tuition",
    },
    {
      title: "Lớp",
      dataIndex: "klass",
      ...getColumnSearchProps("klass"),
    },
    {
      title: "Khóa học",
      dataIndex: "course",
      render: (row, index) => (
        <div
          key={index}
          className="flex justify-center items-center gap-x-2 w-full flex-wrap break-all max-w-[200px]">
          {row?.map((course, index) => {
            const data = courseList?.find((i) => i?._id === course?.courseId);
            return <p key={index}>{data?.name},</p>;
          })}
        </div>
      ),
    },
    {
      title: " ",
      render: (row, index) => (
        <div
          key={index}
          className="flex items-center gap-x-2 justify-between max-w-[150px]">
          <ButtonAdd onClick={() => openAdd(row)} />
          <ButtonEdit onClick={() => openEdit(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
        </div>
      ),
    },
  ];
  return (
    <main className="relative admin-student container mx-auto p-0 my-0 flex flex-col min-h-[100vh] gap-y-2">
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
        <ExportToExcel data={studentList} fileName="danh-sach-hoc-vien" />
        {rowSelectedKeys.length > 0 && (
          <Button
            style={{
              marginBottom: 10,
            }}
            danger
            onClick={handleDeleteAll}>
            Xóa tất cả
          </Button>
        )}
        <Table
          className="mt-2"
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
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
        onOk={() => onOkEdit()}>
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          name="updateUser"
          className="border p-3 w-full rounded-lg pt-6 "
          labelCol={{ span: 6 }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Input placeholder="Nhập email" disabled />
          </Form.Item>
          <Form.Item label="Tên" name="name">
            <Input placeholder="Nhập tên" />
          </Form.Item>
          <Form.Item label="Ảnh" name="avatar">
            <Upload
              // action={`${createImageURL}`}
              listType="picture-card"
              fileList={fileList}
              onRemove={handleRemove}
              onPreview={handlePreview}
              onChange={handleOnchangeImage}>
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}>
                    Upload
                  </div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Select
              placeholder="Chọn giới tính"
              options={[
                {
                  value: "Nam",
                  label: "Nam",
                  key: 1,
                },
                {
                  value: "Nữ",
                  label: "Nữ",
                  key: 2,
                },
                {
                  value: "Khác",
                  label: "Khác",
                  key: 3,
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Học phí" name="tuition">
            <Select placeholder="Chọn mức học phí">
              {tuitionList?.map((tuition, index) => (
                <Select.Option value={tuition?.name} key={index}>
                  {tuition?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Lớp" name="klass">
            <Select placeholder="Chọn lớp">
              {classList?.map((klass, index) => (
                <Select.Option value={klass?.name} key={index}>
                  {klass?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Khóa học" name="course">
            <Select
              onChange={(value) =>
                setFormValue((pre) => ({
                  ...pre,
                  course: value?.map((id) => ({
                    courseId: id,
                    learningIndex: 0,
                    percent: 0,
                    isStarted: false,
                    isSuccess: false,
                  })),
                }))
              }
              placeholder="Chọn khóa học"
              mode="multiple"
              filterOption={filterOption}>
              {courseList?.map((course, index) => (
                <Select.Option
                  value={course?._id}
                  key={index}
                  label={course?.name}>
                  {course?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="date"
            rules={[
              {
                pattern: isDateBeforeToday(form?.getFieldsValue),
                message: "Ngày sinh phải cách hiện tại ít nhất 5 năm",
              },
            ]}>
            <DatePicker format={"DD/MM/YYYY"} placeholder="Nhập ngày sinh" />
          </Form.Item>
          <Form.Item
            label="Điện thoại"
            name="phone"
            rules={[
              {
                pattern: getRegexPhoneNumber(),
                message: "Vui lòng nhập số điện thoại hợp lệ",
              },
            ]}>
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        forceRender
        open={isOpenAdd}
        title="Thêm học phí Học viên"
        onCancel={() => onCancelAdd()}
        onOk={() => onOkAdd()}>
        <Form
          form={form2}
          onValuesChange={handleValuesChange2}
          name="addTuitionUser"
          className="border p-3 w-full rounded-lg pt-6 "
          labelCol={{ span: 6 }}>
          <Form.Item
            label="Loại học phí"
            name="category"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Radio.Group
              onChange={() =>
                setFormValueAdd((pre) => ({
                  ...pre,
                  amountFee: 0,
                  amountDay: 0,
                }))
              }>
              <Radio value={1}>Hàng tháng</Radio>
              <Radio value={2}>Khác</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Số buổi"
            name="amountDay"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <InputNumber
              style={{
                width: "50%",
              }}
              min={0}
              placeholder="Nhập số buổi"
              disabled={formValueAdd?.category !== 1}
              onChange={(value) =>
                setFormValueAdd((pre) => ({
                  ...pre,
                  amountFee: value * tuitionFee,
                }))
              }
            />
          </Form.Item>
          <Form.Item
            label="Tổng tiền"
            name="amountFee"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <InputNumber
              min={0}
              style={{
                width: "100%",
              }}
              placeholder="Tổng tiền"
              disabled={formValueAdd?.category === 1}
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal open={previewOpen} footer={null} onCancel={handleCancelPreview}>
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      <AdminStudentDetail onClose={handleOnClose} />
    </main>
  );
}
