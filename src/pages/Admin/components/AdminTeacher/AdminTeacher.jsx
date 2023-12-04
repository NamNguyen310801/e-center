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
  DatePicker,
  Select,
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
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../../../services/user.api";
import {
  addSalaryTeacherList,
  deletedTeacherSlice,
  setTeacherId,
  setTeacherList,
  updateTeacherList,
} from "../../../../redux/slice/teacher.slice";
import Toast from "../../../../utils/Toast";
import dayjs from "dayjs";
import { getRegexPhoneNumber } from "../../../../utils/stringsUtils";
import { getBase64 } from "../../../../utils/function";
import {
  deletedUserSlice,
  setUserList,
  updateUserList,
} from "../../../../redux/slice/user.slice";
import { setShowTeacher } from "../../../../redux/slice/show.slice";
import { getAllSalaryAPI } from "../../../../services/salary.api";
import { setSalaryList } from "../../../../redux/slice/salary.slice";
import AdminTeacherDetail from "./AdminTeacherDetail";

const { confirm } = Modal;
export default function AdminTeacher() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const teacherList = useSelector((state) => state.teacher.teacherList);
  const salaryList = useSelector((state) => state.salary.salaryList);

  const dataTable =
    teacherList?.length > 0 &&
    teacherList?.map((teacher) => {
      return { ...teacher, key: teacher._id };
    });
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };
  // *****API
  useEffect(() => {
    if (!teacherList) {
      handleGetAllTeacher();
    }
  }, [teacherList]);
  useEffect(() => {
    if (!salaryList) {
      handleGetAllSalary();
    }
  }, [salaryList]);
  const handleGetAllSalary = async () => {
    const res = await getAllSalaryAPI();
    if (res.status === "OK") {
      dispatch(setSalaryList(res?.data));
    }
  };
  const handleGetAllTeacher = async () => {
    setIsLoading(true);
    const res = await UserService.getAllTeacherAPI();
    if (res.status === "OK") {
      dispatch(setTeacherList(res?.data));
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
  const editTeacher = async (id, data) => {
    const dataTeacher = {
      salary: data?.salary,
      facebook: data?.facebook,
      google: data?.google,
      instagram: data?.instagram,
      youtube: data?.youtube,
    };
    const dataUser = {
      email: data?.email,
      name: data?.name,
      role: 2,
      phone: data?.phone,
      address: data?.address,
      date: data?.date?.format(),
      gender: data?.gender,
      avatar: data?.avatar,
      intro: data?.intro || "",
      coverImage: data?.coverImage || "",
    };
    const res = await UserService.updateTeacherAPI(
      id,
      dataTeacher,
      user.access_token
    );
    const resUser = await UserService.updateUserAPI(
      id,
      dataUser,
      user.access_token
    );
    if (res.status === "OK" && resUser.status === "OK") {
      dispatch(updateUserList({ _id: id, ...dataUser }));
      dispatch(
        updateTeacherList({ _id: id, ...data, date: data?.date?.format() })
      );
      Toast("success", res.message);
      setTimeout(() => {
        onCancel();
        setFileList([]);
      }, 2000);
    } else {
      Toast("error", res.message);
    }
  };
  const addSalaryTeacher = async (id, data) => {
    const res = await UserService.addSalaryTeacherAPI(
      id,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      Toast("success", res.message);
      dispatch(addSalaryTeacherList({ id, data: res?.data?.salaryList }));
      onCancelAdd();
    } else {
      Toast("error", res.message);
    }
  };
  //-----Del
  const deleteTeacher = async (id) => {
    const res = await UserService.deleteUserAPI(id, user.access_token);
    if (res.status === "OK") {
      dispatch(deletedUserSlice(id));
      dispatch(deletedTeacherSlice(id));
      Toast("success", res.message);
    } else {
      Toast("error", res.message);
    }
  };
  const deleteManyUsers = async (ids) => {
    const res = await UserService.deleteManyUserAPI(ids, user.access_token);
    if (res.status === "OK") {
      handleGetAllTeacher();
      handleGetAllUser();
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
    salary: "",
  };
  const defaultValueAdd = {
    type: 1,
    amountSalary: 0,
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
  const [salaryFee, setSalary] = useState(0);

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
      salary: formValue?.salary,
    });
  }, [formValue, form]);
  useEffect(() => {
    form2.setFieldsValue({
      type: formValueAdd?.type,
      amountSalary: formValueAdd?.amountSalary,
      description: formValueAdd?.description,
    });
  }, [formValueAdd, form2]);
  const findSalary = (name) => {
    let salaryFind = salaryList?.find((salary) => salary?.name === name);
    setFormValueAdd((pre) => ({
      ...pre,
      amountSalary: salaryFind?.basicSalary + salaryFind?.bonusSalary,
    }));
    setSalary(salaryFind?.basicSalary + salaryFind?.bonusSalary);
  };
  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  const handleValuesChange2 = (changedValues, allValues) => {
    setFormValueAdd((prevData) => ({ ...prevData, ...changedValues }));
  };
  const openEdit = (value) => {
    setIdEdit(value._id);
    setFormValue({
      ...value,
      date: value?.date ? dayjs(value?.date) : null,
    });
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
    editTeacher(idEdit, formValue);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteTeacher(id);
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
  const openAdd = (value) => {
    findSalary(value?.salary);
    setIdEdit(value?._id);
    setTimeout(() => {
      setIsOpenAdd(true);
    }, 100);
  };
  const onCancelAdd = () => {
    setIdEdit("");
    form2.resetFields();
    setFormValueAdd(defaultValueAdd);
    setSalary(0);
    setIsOpenAdd(false);
  };
  const onOkAdd = () => {
    addSalaryTeacher(idEdit, formValueAdd);
  };
  const handleClick = (id) => {
    dispatch(setShowTeacher(true));
    dispatch(setTeacherId(id));
  };
  const handleOnClose = () => {
    dispatch(setShowTeacher(false));
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
      title: "Tên giáo viên",
      dataIndex: "name",
      render: (row) => <p className="capitalize">{row} </p>,
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
    },
    {
      title: "Ngày sinh",
      dataIndex: "date",
      render: (row) => (row ? dayjs(row).format("DD/MM/YYYY") : ""),
    },
    {
      title: "Mức lương",
      dataIndex: "salary",
    },
    {
      title: " ",
      render: (row, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-x-2 max-w-[120px]">
          <ButtonAdd onClick={() => openAdd(row)} />
          <ButtonEdit onClick={() => openEdit(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
        </div>
      ),
    },
  ];
  return (
    <main className="relative admin-teacher container mx-auto p-0 my-0 flex flex-col min-h-screen gap-y-2">
      <h2 className="text-[28px] text-headingColor text-center font-sans font-extrabold tracking-wider">
        Danh sách Giáo viên
      </h2>
      <FloatButton
        icon={<SyncOutlined />}
        style={{
          top: 89,
        }}
        tooltip="Refresh"
        type="primary"
        onClick={handleGetAllTeacher}
      />
      <Spin spinning={isLoading} className="z-30">
        <ExportToExcel data={teacherList} fileName="danh-sach-giang-vien" />
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
        title="Cập nhật Giảng viên"
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
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
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
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Select
              placeholder="Chọn giới tính"
              options={[
                {
                  value: "Nam",
                  label: "Nam",
                },
                {
                  value: "Nữ",
                  label: "Nữ",
                },
                {
                  value: "Khác",
                  label: "Khác",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Lương"
            name="salary"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Select placeholder="Chọn mức lương">
              {salaryList?.map((salary) => (
                <Select.Option value={salary?.name} key={salary._id}>
                  {salary?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Ngày sinh" name="date">
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
        title="Thêm lương giáo viên"
        onCancel={() => onCancelAdd()}
        onOk={() => onOkAdd()}>
        <Form
          form={form2}
          onValuesChange={handleValuesChange2}
          name="addSalaryUser"
          className="border p-3 w-full rounded-lg pt-6 "
          labelCol={{ span: 6 }}>
          <Form.Item
            label="Loại lương"
            name="type"
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
                  amountSalary: formValueAdd?.type !== 1 ? salaryFee : 0,
                }))
              }>
              <Radio value={1}>Hàng tháng</Radio>
              <Radio value={2}>Khác</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Tổng tiền"
            name="amountSalary"
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
              disabled={formValueAdd?.type === 1}
              placeholder="Tổng tiền"
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
      <AdminTeacherDetail onClose={handleOnClose} />
    </main>
  );
}
