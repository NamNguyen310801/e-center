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
  Image,
  Button,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ImageService from "../../../../services/image.api";

import Toast from "../../../../utils/Toast";
import {
  ExclamationCircleFilled,
  PlusOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ButtonDelete, ButtonEdit } from "../../../../components";
import { getBase64 } from "../../../../utils/function";
import {
  addToImageList,
  deletedImageSlice,
  setImageList,
  updateImageList,
} from "../../../../redux/slice/image.slice";
const { confirm } = Modal;
export default function AdminImage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const imageList = useSelector((state) => state.image.imageList);
  const dataTable =
    imageList?.length > 0 &&
    imageList?.map((image) => {
      return { ...image, key: image._id };
    });

  useEffect(() => {
    if (!imageList) {
      handleGetImageList();
    }
  }, []);
  const handleGetImageList = async () => {
    setIsLoading(true);
    const res = await ImageService.getAllImageAPI();
    if (res.status === "OK") {
      dispatch(setImageList(res?.data));
    }
    setIsLoading(false);
  };
  //-----Create
  const createImage = async (data) => {
    try {
      const res = await ImageService.createImageAPI(data);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        dispatch(addToImageList(res?.data));
        form.resetFields();
        setFileList([]);
        setFormValue(defaultValue);
        handleGetImageList();
      }
    } catch (error) {
      Toast("error", error);
    }
  };
  //-----Edit
  const editImage = async (id, data) => {
    const res = await ImageService.updateImageAPI(id, data, user.access_token);
    if (res.status === "OK") {
      dispatch(updateImageList(res?.data));
      Toast("success", res.message);
      onCancel();
    } else {
      Toast("error", res.message);
    }
  };
  //-----Del
  const deleteImage = async (id) => {
    const res = await ImageService.deleteImageAPI(id, user.access_token);
    if (res.status === "OK") {
      Toast("success", res.message);
      setTimeout(() => {
        dispatch(deletedImageSlice(id));
      }, 500);
    } else {
      Toast("error", res.message);
    }
  };
  //=========== State
  const defaultValue = {
    name: "",
    image: "",
    type: 1,
  };
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [idEdit, setIdEdit] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  //================Form
  useEffect(() => {
    form.setFieldsValue({
      name: formValue?.name,
      image: formValue?.image,
      type: formValue?.type,
    });
  }, [formValue, form]);
  useEffect(() => {
    formEdit.setFieldsValue({
      name: formValue?.name,
      image: formValue?.image,
      type: formValue?.type,
    });
  }, [formValue, formEdit]);

  const onReset = () => {
    setFormValue(defaultValue);
    form.resetFields();
    setFileList([]);
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
      image: value?.image,
      type: value?.type,
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
    editImage(idEdit, formValue);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteImage(id);
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
      title: "Tên ảnh",
      dataIndex: "name",
      render: (row) => (
        <p className="max-w-[200px] capitalize line-clamp-2">{row}</p>
      ),
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (row) => <Image width={80} src={row} />,
    },
    {
      title: "Loại",
      dataIndex: "type",
      render: (row) => (
        <p className="capitalize">{row === 1 ? "Hoạt động" : "Cảm nhận"}</p>
      ),
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
  const handleOnchangeImage = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setFormValue((prevData) => ({ ...prevData, image: file.preview }));
    } else {
      setFormValue((prevData) => ({ ...prevData, image: "" }));
    }
  };
  // Bat modal xem anh
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  // Xoa anh
  const handleRemove = async (file) => {
    const image = file.response.data;
    // await deleteImage(image._id);
  };
  //Tat modal xem anh
  const handleCancelPreview = () => setPreviewOpen(false);
  return (
    <div className="relative admin-image container mx-auto p-0 my-0 flex min-h-[100vh] max-w-[50%]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-8 lg:mb-10 flex flex-col w-full">
          <h1 className="font-black text-xl text-[#242424]">
            Quản lý Hình ảnh
          </h1>
        </div>
        <div className="flex gap-x-6 w-full">
          <div className="flex gap-8 bg-lightOverlay transition duration-700 min-w-[80px] relative">
            <Tooltip title="Thêm hình ảnh" placement="right">
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
              } flex gap-8 mx-auto transition duration-700 min-w-[320px] overflow-hidden absolute top-0 left-0 bg-white z-[2]`}>
              <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-start gap-4 h-[350px] overflow-hidden">
                <h3 className="px-4 py-[10px] text-xl text-blue-500 font-semibold">
                  Thêm hình ảnh
                </h3>
                <div className="flex flex-col w-full items-center justify-start gap-4">
                  <div className="w-full">
                    <Form
                      className="w-full"
                      onFinish={(value) => createImage(value)}
                      name="admin-image"
                      labelCol={{
                        span: 10,
                      }}
                      form={form}
                      onValuesChange={handleValuesChange}>
                      <Form.Item
                        label="Tên ảnh"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Input placeholder="Nhập tên ảnh" />
                      </Form.Item>

                      <Form.Item
                        label="Ảnh"
                        name="image"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
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
                      <Form.Item label="Loại" name="type">
                        <Select
                          placeholder="Chọn loại"
                          options={[
                            {
                              value: 1,
                              label: "Hoạt động",
                            },
                            {
                              value: 2,
                              label: "Cảm nhận",
                            },
                          ]}></Select>
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
              Danh sách Hình ảnh
            </h3>
            <FloatButton
              icon={<SyncOutlined />}
              style={{
                top: 80,
                background: "#5ac8fa",
                color: "#fff",
              }}
              tooltip="Làm mới Ảnh"
              type="default"
              onClick={handleGetImageList}
            />
            <div className="min-h-[180px] pb-4 pt-1 md:min-h-[200px] md:py-0 w-full flex md:justify-center md:items-start -mt-1">
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
          title="Cập nhật Hình ảnh"
          onCancel={() => onCancel()}
          onOk={() => onOkEdit()}>
          <Form
            form={formEdit}
            onValuesChange={handleValuesChange}
            name="edit-image"
            className="border p-3 w-full rounded-lg pt-6 "
            labelCol={{ span: 6 }}>
            <Form.Item
              label="Tên ảnh"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Input placeholder="Nhập tên ảnh" />
            </Form.Item>
            <Form.Item
              label="Ảnh"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Space style={{ display: "flex" }}>
                {formValue?.image && (
                  <Image width={100} src={formValue?.image} />
                )}
                <Upload
                  // action={`${createImageURL}`}
                  fileList={fileList}
                  onRemove={handleRemove}
                  onPreview={handlePreview}
                  onChange={handleOnchangeImage}>
                  {fileList.length >= 1 ? null : (
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  )}
                </Upload>
              </Space>
            </Form.Item>
            <Form.Item
              label="Loại"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Select
                placeholder="Chọn loại"
                options={[
                  {
                    value: 1,
                    label: "Hoạt động",
                  },
                  {
                    value: 2,
                    label: "Cảm nhận",
                  },
                ]}></Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Modal open={previewOpen} footer={null} onCancel={handleCancelPreview}>
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
}
