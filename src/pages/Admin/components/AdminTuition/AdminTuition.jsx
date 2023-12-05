import {
  ExclamationCircleFilled,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Table,
  Modal,
  Tooltip,
  FloatButton,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { ButtonDelete, ButtonEdit } from "../../../../components";
import * as TuitionService from "../../../../services/tuition.api";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedTuitionSlice,
  setTuitionList,
  updateTuitionList,
} from "../../../../redux/slice/tuition.slice";
import Toast from "../../../../utils/Toast";
import { convertPrice } from "../../../../utils/function";

const { confirm } = Modal;
export default function AdminTuition() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const tuitionList = useSelector((state) => state.tuition.tuitionList);

  const dataTable =
    tuitionList?.length > 0 &&
    tuitionList?.map((tuition) => {
      return { ...tuition, key: tuition._id };
    });

  // *****API
  useEffect(() => {
    if (!tuitionList) {
      handleGetAllTuition();
    }
  }, []);
  const handleGetAllTuition = async () => {
    setIsLoading(true);
    const res = await TuitionService.getAllTuitionAPI();
    if (res.status === "OK") {
      dispatch(setTuitionList(res?.data));
    }
    setIsLoading(false);
  };
  //-----Create
  const createTuition = async () => {
    try {
      const res = await TuitionService.createTuitionAPI(formValue);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        handleGetAllTuition();
        form.resetFields();
        setFormValue(defaultValue);
      }
    } catch (error) {
      Toast("error", error);
    }
  };
  //-----Edit
  const editTuition = async (id, data) => {
    const res = await TuitionService.updateTuitionAPI(
      id,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      dispatch(updateTuitionList({ _id: id, ...data }));
      Toast("success", res.message);
      setTimeout(() => {
        onCancel();
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };
  //-----Del
  const deleteTuition = async (id) => {
    const res = await TuitionService.deleteTuitionAPI(id, user.access_token);
    if (res.status === "OK") {
      Toast("success", res.message);
      setTimeout(() => {
        dispatch(deletedTuitionSlice(id));
      }, 500);
    } else {
      Toast("error", res.message);
    }
  };
  //=========== State
  const defaultValue = {
    name: "",
    fee: 0,
  };
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [idEdit, setIdEdit] = useState("");

  //================Form
  useEffect(() => {
    form.setFieldsValue({
      name: formValue?.name,
      fee: formValue?.fee,
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
    editTuition(idEdit, formValue);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteTuition(id);
      },
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (row) => (
        <p className="max-w-[200px]">{row.slice(0, 2) + row.slice(-4)} </p>
      ),
    },
    {
      title: "Tên mức học phí",
      dataIndex: "name",
      render: (row) => <p className="capitalize">{row}</p>,
    },
    {
      title: "Số tiền",
      dataIndex: "fee",
      render: (row) => (
        <p className="max-w-[200px]">{row ? convertPrice(row) : 0} </p>
      ),
      sorter: (a, b) => a?.fee - b?.fee,
    },
    {
      title: " ",
      render: (row, index) => (
        <div key={index} className="flex items-center justify-center gap-x-4 ">
          <ButtonEdit onClick={() => openEdit(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
        </div>
      ),
    },
  ];
  return (
    <main className="relative admin-tuition container mx-auto p-0 my-0 flex min-h-[100vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-8 lg:mb-10 flex flex-col w-full">
          <h1 className="font-black text-xl text-[#242424]">Quản lý Học phí</h1>
        </div>
        <div className="flex gap-x-6 w-full">
          <div className="flex gap-8 bg-lightOverlay transition duration-700 min-w-[80px] relative">
            <Tooltip title="Thêm loại Tiền lương" placement="right">
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
              } flex gap-8 mx-auto transition duration-700 min-w-[320px] absolute top-0 left-0 bg-white z-[2]`}>
              <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-start gap-4 h-[280px]">
                <h3 className="px-4 py-[10px] text-xl text-blue-500 font-semibold">
                  Thêm loại học phí
                </h3>
                <div className="flex flex-col w-full items-center justify-start gap-4">
                  <div className="w-full">
                    <Form
                      className="w-full"
                      name="admin-schedule"
                      labelCol={{
                        span: 10,
                      }}
                      form={form}>
                      <Form.Item
                        label="Tên loại"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Input placeholder="Nhập tên loại" />
                      </Form.Item>

                      <Form.Item
                        label="Số tiền"
                        name="fee"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <InputNumber placeholder="Nhập học phí" />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-8 w-full">
                  <button
                    type="button"
                    onClick={createTuition}
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
                      setIsOpen(false);
                      onReset();
                    }}
                    className="w-3/4 py-2 rounded-md font-semibold bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 text-gray-900 hover:from-red-300 hover:via-red-400 hover:to-yellow-500  hover:text-white cursor-pointer active:scale-95 dark:text-white">
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full -mt-10">
            <h3 className="font-semibold mb-4 text-lg text-[#424242] text-center">
              Danh sách Mức học phí
            </h3>
            <FloatButton
              icon={<SyncOutlined />}
              style={{
                top: 89,
              }}
              tooltip="Refresh"
              type="primary"
              onClick={handleGetAllTuition}
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
          title="Cập nhật Học phí"
          onCancel={() => onCancel()}
          onOk={() => onOkEdit()}>
          <Form
            form={form}
            onValuesChange={handleValuesChange}
            name="updateProduct"
            className="border p-3 w-full rounded-lg pt-6 "
            labelCol={{ span: 6 }}>
            <Form.Item
              label="Tên loại"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Input placeholder="Nhập tên loại" />
            </Form.Item>

            <Form.Item
              label="Số tiền"
              name="fee"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <InputNumber placeholder="Nhập học phí" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </main>
  );
}
