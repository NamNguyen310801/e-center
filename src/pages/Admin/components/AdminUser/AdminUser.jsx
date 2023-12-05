import {
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  FloatButton,
  Form,
  Input,
  Select,
  Spin,
  Modal,
  Table,
  Tooltip,
  Upload,
  DatePicker,
  Space,
  Avatar,
} from "antd";
import { useEffect, useRef, useState } from "react";
import {
  ButtonDelete,
  ButtonEdit,
  ExportToExcel,
} from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getBase64, isDateBeforeToday } from "../../../../utils/function";
import Toast from "../../../../utils/Toast";
import * as UserService from "../../../../services/user.api";
import {
  addToUserList,
  deletedUserSlice,
  setUserList,
  updateUserList,
} from "../../../../redux/slice/user.slice";
import {
  getRegexPassword,
  getRegexPhoneNumber,
} from "../../../../utils/stringsUtils";
import { AiOutlineClose } from "react-icons/ai";
import {} from "antd";
import dayjs from "dayjs";

const { confirm } = Modal;

export default function AdminUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userList = useSelector((state) => state.user.userList);

  const [isLoading, setIsLoading] = useState(false);
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const dataTable =
    userList?.length > 0 &&
    userList?.map((product) => {
      return { ...product, key: product._id };
    });
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tên",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      render: (row, index) =>
        row ? <Avatar size={64} key={index} src={row} /> : null,
    },
    {
      title: "Chức vị",
      dataIndex: "role",
      render: (row) =>
        (row === 1 && "Quản lý") ||
        (row === 2 && "Giảng viên") ||
        (row === 3 && "Học viên"),
      filters: [
        {
          text: "Quản lý",
          value: 1,
        },
        {
          text: "Giảng viên",
          value: 2,
        },
        {
          text: "Học viên",
          value: 3,
        },
      ],
      onFilter: (value, record) => {
        if (value === 1) {
          return record?.role === 1;
        }
        if (value === 2) {
          return record?.role === 2;
        }
        return record?.role === 3;
      },
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "date",
      render: (row, index) => (row ? dayjs(row).format("DD/MM/YYYY") : ""),
      ...getColumnSearchProps("date"),
    },
    {
      title: " ",
      render: (row, index) => (
        <div key={index} className="flex items-center justify-center gap-x-4">
          <ButtonEdit onClick={() => openEdit(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
        </div>
      ),
    },
  ];

  //=========== State
  const defaultValue = {
    email: "",
    role: 3,
    name: "",
    phone: "",
    address: "",
    date: "",
    gender: "",
    avatar: "",
  };
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [idEdit, setIdEdit] = useState("");

  //===========API
  useEffect(() => {
    if (userList?.length === 0) {
      handleGetAllUser();
    }
  }, []);
  const handleGetAllUser = async () => {
    setIsLoading(true);
    const res = await UserService.getAllUserAPI();
    if (res.status === "OK") {
      dispatch(setUserList(res.data));
    }
    setIsLoading(false);
  };
  //-----Create
  const createUser = async (data) => {
    try {
      const res = await UserService.registerAPI({
        ...data,
        date: data?.date !== "" ? data?.date?.format() : "",
      });
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        dispatch(addToUserList(res.data));
        handleGetAllUser();
        form.resetFields();
        setFormValue(defaultValue);
        setFileList([]);
      }
    } catch (error) {
      Toast("error", error);
    }
  };
  //-----Edit
  const editUser = async (id, data) => {
    const res = await UserService.updateUserAPI(
      id,
      { ...data, date: data?.date?.format() },
      user.access_token
    );
    if (res.status === "OK") {
      dispatch(
        updateUserList({ _id: id, ...data, date: data?.date?.format() })
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
  //-----Del
  const deleteUser = async (id) => {
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
      Toast("success", res.message);
      setRowSelectedKeys([]);
    } else {
      Toast("error", res.message);
    }
  };
  //================Form
  useEffect(() => {
    form.setFieldsValue({
      email: formValue?.email,
      role: formValue?.role,
      name: formValue?.name,
      phone: formValue?.phone,
      address: formValue?.address,
      date: formValue?.date,
      avatar: formValue?.avatar,
    });
  }, [formValue, form]);
  useEffect(() => {
    formEdit.setFieldsValue({
      email: formValue?.email,
      role: formValue?.role,
      name: formValue?.name,
      phone: formValue?.phone,
      address: formValue?.address,
      date: formValue?.date,
      avatar: formValue?.avatar,
    });
  }, [formValue, formEdit]);
  const onReset = () => {
    setFormValue(defaultValue);
    form.resetFields();
  };
  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
  };
  const openEdit = (value) => {
    setIsOpenAdd(false);
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
    formEdit.resetFields();
    setFormValue(defaultValue);
    setIsOpenEdit(false);
  };

  const onOkEdit = () => {
    editUser(idEdit, formValue);
  };
  //onResetEdit
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteUser(id);
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

  return (
    <main className="relative admin-user container min-h-screen mx-auto p-0 my-0 flex flex-col gap-y-2">
      <h2 className="text-[28px] text-headingColor text-center font-sans font-extrabold tracking-wider">
        Danh sách Người dùng
      </h2>
      <FloatButton
        icon={<SyncOutlined />}
        style={{
          top: 89,
        }}
        tooltip="Refresh"
        type="primary"
        onClick={handleGetAllUser}
      />
      <div className="flex gap-x-6 w-full">
        <div className="flex gap-8 bg-lightOverlay transition duration-700 min-w-[60px] relative">
          <Tooltip title="Thêm Người dùng" placement="right">
            <button
              className={`${
                isOpenAdd ? "hidden" : ""
              } transition duration-700 rounded-lg w-20 h-20 border-dashed border border-gray-300 hover:text-blue-500 hover:border-blue-500`}
              onClick={() => setIsOpenAdd(true)}>
              <PlusOutlined style={{ fontSize: "60px" }} />
            </button>
          </Tooltip>
          <div
            className={`${
              isOpenAdd ? " " : "hidden"
            } absolute top-0 left-0 z-[2] flex gap-8 mx-auto transition max-h-[680px] duration-700 min-w-[360px] bg-white `}>
            <div className="border relative border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-start gap-4 h-auto">
              <h3 className="px-4 py-[10px] text-xl text-blue-500 font-semibold">
                Thêm Người dùng
              </h3>
              <div
                className="absolute top-2 right-2 cursor-pointer text-lg px-[2px] py-[2px] text-gray-400"
                onClick={() => {
                  setIsOpenAdd(false);
                  onReset();
                }}>
                <AiOutlineClose />
              </div>
              <div className="flex flex-col w-full items-start justify-center gap-4">
                <div className="w-full">
                  <Form
                    className="w-full"
                    name="admin-user"
                    onFinish={(value) => createUser(value)}
                    labelCol={{
                      span: 10,
                    }}
                    form={form}
                    onValuesChange={handleValuesChange}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin!",
                        },
                      ]}>
                      <Input placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin!",
                        },
                        {
                          pattern: getRegexPassword(),
                          message:
                            "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                        },
                      ]}>
                      <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item
                      label="Xác nhận"
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Mật khẩu không trùng khớp!")
                            );
                          },
                        }),
                      ]}>
                      <Input.Password placeholder="Nhập mật khẩu" />
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
                      label="Chức vị"
                      name="role"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thông tin!",
                        },
                      ]}>
                      <Select
                        placeholder="Chọn chức vị"
                        options={[
                          {
                            value: 1,
                            label: "Quản lý",
                          },
                          {
                            value: 2,
                            label: "Giáo viên",
                          },
                          {
                            value: 3,
                            label: "Học viên",
                          },
                        ]}
                      />
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
                      label="Ngày sinh"
                      name="date"
                      rules={[
                        {
                          pattern: isDateBeforeToday(form?.getFieldsValue),
                          message: "Ngày sinh phải cách hiện tại ít nhất 5 năm",
                        },
                      ]}>
                      <DatePicker
                        format={"DD/MM/YYYY"}
                        placeholder="Nhập ngày sinh"
                      />
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
                    <Form.Item>
                      <div className="flex items-center justify-center gap-8 w-full">
                        <button
                          type="submit"
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
                            setIsOpenAdd(false);
                            onReset();
                          }}
                          className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:from-red-300 hover:via-red-400 hover:to-yellow-500  hover:text-white cursor-pointer active:scale-95 dark:text-white">
                          Đóng
                        </button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <div className="min-h-[180px] pb-4 pt-1 md:min-h-[200px] md:py-0 w-full flex md:justify-center md:items-center">
            <Spin spinning={isLoading} className="z-30 w-full">
              <ExportToExcel data={userList} fileName="danh-sach-nguoi-dung" />
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
                style={{
                  width: "100%",
                  minWidth: "1080px",
                }}
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
          </div>
          {/* MODAL EDIT USER */}
          <Modal
            forceRender
            open={isOpenEdit}
            title="Cập nhật Người dùng"
            onCancel={() => onCancel()}
            onOk={() => onOkEdit()}>
            <Form
              form={formEdit}
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
                label="Chức vị"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập thông tin!",
                  },
                ]}>
                <Select
                  placeholder="Chọn chức vị"
                  options={[
                    {
                      value: 1,
                      label: "Quản lý",
                    },
                    {
                      value: 2,
                      label: "Giáo viên",
                    },
                    {
                      value: 3,
                      label: "Học viên",
                    },
                  ]}
                />
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
                label="Ngày sinh"
                name="date"
                rules={[
                  {
                    pattern: isDateBeforeToday(formEdit?.getFieldsValue),
                    message: "Ngày sinh phải cách hiện tại ít nhất 5 năm",
                  },
                ]}>
                <DatePicker
                  format={"DD/MM/YYYY"}
                  placeholder="Nhập ngày sinh"
                />
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
            open={previewOpen}
            footer={null}
            onCancel={handleCancelPreview}>
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </div>
      </div>
    </main>
  );
}
