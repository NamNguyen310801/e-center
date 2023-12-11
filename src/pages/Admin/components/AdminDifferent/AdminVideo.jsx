import {
  Form,
  Input,
  Table,
  Modal,
  Tooltip,
  FloatButton,
  Spin,
  Upload,
  Select,
  Space,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../../utils/Toast";
import * as VideoService from "../../../../services/video.api";

import {
  ExclamationCircleFilled,
  PlusOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { ButtonDelete, ButtonEdit } from "../../../../components";
import {
  addToVideoList,
  deletedVideoSlice,
  setVideoList,
  updateVideoList,
} from "../../../../redux/slice/video.slice";
const { confirm } = Modal;

export default function AdminVideo() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const videoList = useSelector((state) => state.video.videoList);
  const dataTable =
    videoList?.length > 0 &&
    videoList?.map((video) => {
      return { ...video, key: video._id };
    });
  // API
  useEffect(() => {
    if (!videoList) {
      handleGetVideoList();
    }
  }, []);
  const handleGetVideoList = async () => {
    setIsLoading(true);
    const res = await VideoService.getAllVideoAPI();
    if (res.status === "OK") {
      dispatch(setVideoList(res?.data));
    }
    setIsLoading(false);
  };

  const createVideo = async (data) => {
    try {
      const res = await VideoService.createVideoAPI(data);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        dispatch(addToVideoList(res?.data));
        form.resetFields();
        setFormValue(defaultValue);
      }
    } catch (error) {
      Toast("error", error);
    }
  };
  const editVideo = async (id, data) => {
    try {
      const res = await VideoService.updateVideoAPI(
        id,
        data,
        user?.access_token
      );
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        dispatch(updateVideoList(res?.data));
        onCancel();
      }
    } catch (error) {
      Toast("error", error);
    }
  };

  const deleteVideo = async (id) => {
    const res = await VideoService.deleteVideoAPI(id, user.access_token);
    if (res.status === "OK") {
      Toast("success", res.message);
      setTimeout(() => {
        dispatch(deletedVideoSlice(id));
      }, 500);
    } else {
      Toast("error", res.message);
    }
  };
  const defaultValue = {
    name: "",
    url: "",
    type: "teacher",
  };
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [idEdit, setIdEdit] = useState("");
  //================Form
  useEffect(() => {
    form.setFieldsValue({
      name: formValue?.name,
      url: formValue?.url,
      type: formValue?.type,
    });
  }, [formValue, form]);
  useEffect(() => {
    formEdit.setFieldsValue({
      name: formValue?.name,
      url: formValue?.url,
      type: formValue?.type,
    });
  }, [formValue, formEdit]);
  const onReset = () => {
    form.resetFields();
    formEdit.resetFields();
    setFormValue(defaultValue);
  };
  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  const openEdit = (value) => {
    setIsOpen(false);
    setIdEdit(value._id);
    setFormValue({
      name: value?.name,
      url: value?.url,
      type: value?.type,
    });
    setTimeout(() => {
      setIsOpenEdit(true);
    }, 100);
  };
  const onCancel = () => {
    setIdEdit("");
    form.resetFields();
    formEdit.resetFields();
    setFormValue(defaultValue);
    setIsOpenEdit(false);
  };
  const onOkEdit = () => {
    editVideo(idEdit, formValue);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteVideo(id);
      },
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (row) => (
        <p className="max-w-[200px]">
          {row.slice(0, 2) + "..." + row.slice(-2)}
        </p>
      ),
    },
    {
      title: "Tên video",
      dataIndex: "name",
      render: (row) => <p className="capitalize line-clamp-2">{row}</p>,
    },
    {
      title: "Url",
      dataIndex: "url",
      render: (row) => (
        <p className="max-w-[200px]">
          {row?.length > 20 ? row?.slice(0, 20) + "..." : row}
        </p>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      render: (row) => <p className="capitalize">{row}</p>,
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
    <div className="relative admin-tuition container mx-auto p-0 my-0 flex min-h-[100vh] max-w-[50%]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-8 lg:mb-10 flex flex-col w-full">
          <h1 className="font-black text-xl text-[#242424]">Quản lý Video</h1>
        </div>
        <div className="flex gap-x-6 w-full">
          <div className="flex gap-8 bg-lightOverlay transition duration-700 min-w-[80px] relative">
            <Tooltip title="Thêm video" placement="right">
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
                  Thêm video
                </h3>
                <div className="flex flex-col w-full items-center justify-start gap-4">
                  <div className="w-full">
                    <Form
                      onFinish={(value) => createVideo(value)}
                      className="w-full"
                      name="admin-video"
                      labelCol={{
                        span: 10,
                      }}
                      form={form}>
                      <Form.Item label="Tên video" name="name">
                        <Input placeholder="Nhập tên video" />
                      </Form.Item>

                      <Form.Item
                        label="Url"
                        name="url"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Input placeholder="Nhập url" />
                      </Form.Item>
                      <Form.Item label="Loại" name="type">
                        <Select
                          placeholder="Chọn loại"
                          options={[
                            {
                              value: "teacher",
                              label: "Giáo viên",
                            },
                            {
                              value: "student",
                              label: "Học viên",
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        style={{
                          width: "100%",
                        }}>
                        <Space
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}>
                          <Button type="primary" htmlType="submit">
                            Thêm
                          </Button>
                          <Button onClick={onReset}>Làm mơi</Button>
                          <Button
                            danger
                            onClick={() => {
                              setIsOpen(false);
                              onReset();
                            }}>
                            Đóng
                          </Button>
                        </Space>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full -mt-10">
            <h3 className="font-semibold mb-4 text-lg text-[#424242] text-center">
              Danh sách Video
            </h3>
            <FloatButton
              icon={<SyncOutlined />}
              style={{
                top: 125,
                background: "#4cd964",
                color: "#fff",
              }}
              tooltip="Làm mới Video"
              type="default"
              onClick={handleGetVideoList}
            />
            <div className="min-h-[180px] pb-4 pt-1 -mt-1 md:min-h-[200px] md:py-0 w-full flex md:justify-center md:items-center">
              <Spin spinning={isLoading} className="z-30 w-full">
                <Table
                  dataSource={dataTable}
                  columns={columns}
                  pagination
                  bordered
                  className="w-full"
                />
              </Spin>
            </div>
          </div>
        </div>
        <Modal
          forceRender
          open={isOpenEdit}
          title="Cập nhật Video"
          onCancel={() => onCancel()}
          onOk={() => {
            form
              .validateFields()
              .then(() => onOkEdit())
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}>
          <Form
            form={formEdit}
            onValuesChange={handleValuesChange}
            name="edit-video"
            className="border p-3 w-full rounded-lg pt-6 "
            labelCol={{ span: 6 }}>
            <Form.Item label="Tên video" name="name">
              <Input placeholder="Nhập tên video" />
            </Form.Item>
            <Form.Item
              label="Url"
              name="url"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Input placeholder="Nhập url" />
            </Form.Item>
            <Form.Item label="Loại" name="type">
              <Select
                placeholder="Chọn loại"
                options={[
                  {
                    value: "teacher",
                    label: "Giáo viên",
                  },
                  {
                    value: "student",
                    label: "Học viên",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
