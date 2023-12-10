import {
  ExclamationCircleFilled,
  PlusOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  Table,
  Modal,
  Tooltip,
  Upload,
  InputNumber,
  FloatButton,
  Spin,
  Image,
  Space,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import * as LessonService from "../../../../services/lesson.api";

import { ButtonDelete, ButtonEdit } from "../../../../components";
import { getBase64 } from "../../../../utils/function";
import { useDispatch, useSelector } from "react-redux";
import {
  deletedLessonSlice,
  setLessonList,
  updateLessonList,
} from "../../../../redux/slice/lesson.slice";
import Toast from "../../../../utils/Toast";
const { confirm } = Modal;

export default function AdminLesson() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const lessonList = useSelector((state) => state.lesson.lessonList);

  const dataTable =
    lessonList?.length > 0 &&
    lessonList?.map((lesson) => {
      return { ...lesson, key: lesson._id };
    });

  // *****API
  useEffect(() => {
    if (!lessonList) {
      handleGetAllLesson();
    }
  }, []);
  const handleGetAllLesson = async () => {
    setIsLoading(true);
    const res = await LessonService.getAllLessonAPI();
    if (res.status === "OK") {
      dispatch(setLessonList(res.data));
    }
    setIsLoading(false);
  };
  //-----Create
  const createLesson = async () => {
    try {
      const res = await LessonService.createLessonAPI(formValue);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        handleGetAllLesson();
        form.resetFields();
        setFormValue(defaultValue);
      }
    } catch (error) {
      Toast("error", error);
    }
  };
  //-----Edit
  const editLesson = async (id, data) => {
    const res = await LessonService.updateLessonAPI(
      id,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      dispatch(updateLessonList({ _id: id, ...data }));
      Toast("success", res.message);
      setTimeout(() => {
        onCancel();
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };

  //-----Del
  const deleteLesson = async (id) => {
    const res = await LessonService.deleteLessonAPI(id, user.access_token);
    if (res.status === "OK") {
      Toast("success", res.message);
      setTimeout(() => {
        dispatch(deletedLessonSlice(id));
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };
  //=========== State
  const defaultValue = {
    name: "",
    url: "",
    thumbnail: "",
    description: "",
    isPublished: false,
    position: 1,
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

  // Cap nhat gia tri form
  //================Form
  useEffect(() => {
    form.setFieldsValue({
      name: formValue?.name,
      url: formValue?.url,
      thumbnail: formValue?.thumbnail,
      description: formValue?.description,
      isPublished: formValue?.isPublished?.toString(),
      position: formValue?.position,
    });
  }, [formValue, form]);
  const onReset = () => {
    setFileList([]);
    setFormValue(defaultValue);
    form.resetFields();
  };
  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  //edit lesson
  const openEdit = (value) => {
    setIdEdit(value?._id);
    setFormValue(value);
    setIsOpen(false);
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
    editLesson(idEdit, formValue);
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
        deleteLesson(id);
      },
    });
  };

  const onChangeIsPublished = (value) => {
    if (value === "true") {
      setFormValue((prev) => ({
        ...prev,
        isPublished: true,
      }));
    } else if (value === "false") {
      setFormValue((prev) => ({
        ...prev,
        isPublished: false,
      }));
    }
  };
  //Cap nhat anh
  const handleOnchangeImage = async ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setFormValue((prevData) => ({ ...prevData, thumbnail: file.preview }));
    } else {
      setFormValue((prevData) => ({ ...prevData, thumbnail: "" }));
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
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (row) => <p>{row.slice(0, 4) + "..." + row.slice(-4)} </p>,
    },
    {
      title: "Tên bài học",
      dataIndex: "name",
      render: (row) => <p className="capitalize">{row} </p>,
    },
    {
      title: "Ảnh nền",
      dataIndex: "thumbnail",
      render: (row, index) =>
        row ? <Image width={80} key={index} src={row} /> : null,
    },
    {
      title: "URL",
      dataIndex: "url",
      render: (row) => (
        <p>{row?.length > 10 ? row.slice(0, 10) + "... " : row}</p>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (row) => (
        <p>{row?.length > 10 ? row.slice(0, 10) + "... " : row}</p>
      ),
    },
    {
      title: "Vị trí",
      dataIndex: "position",
    },
    {
      title: "Trạng thái",
      dataIndex: "isPublished",
      render: (row) => <p>{row ? "Công khai" : "Không công khai"} </p>,
    },
    {
      title: " ",
      render: (row, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-x-2 max-w-[150px]">
          <ButtonEdit onClick={() => openEdit(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
        </div>
      ),
    },
  ];
  return (
    <div className="relative admin-lesson container mx-auto p-0 my-0 flex min-h-[100vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-8 lg:mb-10 flex flex-col w-full">
          <h1 className="font-black text-xl text-[#242424]">Quản lý bài học</h1>
        </div>
        <div className="flex gap-x-6 w-full">
          <div className="flex gap-8 bg-lightOverlay transition duration-700 min-w-[80px] relative">
            <Tooltip title="Thêm bài học" placement="right">
              <button
                className={`${
                  isOpen ? "hidden" : ""
                } transition duration-700 rounded-lg w-20 h-20 border-dashed border border-gray-300 hover:text-blue-500 hover:border-blue-500`}
                onClick={() => setIsOpen(true)}>
                <PlusOutlined style={{ fontSize: "60px" }} />
              </button>
            </Tooltip>
            <div
              className={`${
                isOpen ? " " : "hidden"
              } flex gap-8 mx-auto transition duration-700 min-w-[320px] bg-white absolute z-[2] top-0 left-0`}>
              <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-start gap-4">
                <h3 className="px-4 py-[10px] text-xl text-blue-500 font-semibold">
                  Thêm bài học
                </h3>
                <div className="flex flex-col w-full items-center justify-center gap-4">
                  <div className="w-full">
                    <Form
                      className="w-full"
                      name="admin-lesson"
                      labelCol={{
                        span: 10,
                      }}
                      form={form}>
                      <Form.Item
                        label="Tên bài học"
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
                        label="Url"
                        name="url"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Input placeholder="Nhập đường link" />
                      </Form.Item>
                      <Form.Item
                        label="Ảnh nền"
                        name="thumbnail"
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
                      <Form.Item label="Mô tả" name="description">
                        <Input placeholder="Nhập mô tả" />
                      </Form.Item>
                      <Form.Item label="Vị trí" name="position">
                        <InputNumber
                          min={1}
                          placeholder="Nhập vị trí"
                          style={{
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Trạng thái"
                        name="isPublished"
                        onChange={(value) => onChangeIsPublished(value)}>
                        <Select
                          placeholder="Chọn trạng thái"
                          options={[
                            {
                              value: "true",
                              label: "Công khai",
                            },
                            {
                              value: "false",
                              label: "Không công khai",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-8 w-full">
                  <button
                    type="button"
                    onClick={createLesson}
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
          <div className="relative w-full -mt-11">
            <h3 className="font-semibold mb-4 text-lg text-[#424242] text-center">
              Danh sách Bài học
            </h3>
            <FloatButton
              icon={<SyncOutlined />}
              style={{
                top: 89,
              }}
              tooltip="Refresh"
              type="primary"
              onClick={handleGetAllLesson}
            />
            <Spin spinning={isLoading} className="z-30">
              <Table
                className="mt-2"
                dataSource={dataTable}
                columns={columns}
                pagination
                bordered
              />
            </Spin>
          </div>
        </div>
        <Modal
          forceRender
          open={isOpenEdit}
          title="Cập nhật bài học"
          onCancel={() => onCancel()}
          onOk={() => onOkEdit()}>
          <Form
            form={form}
            onValuesChange={handleValuesChange}
            name="updateLesson"
            labelCol={{ span: 6 }}>
            <Form.Item
              label="Tên bài học"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Input placeholder="Nhập tên bài học" />
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
              <Input placeholder="Nhập đường link" />
            </Form.Item>
            <Form.Item
              label="Ảnh nền"
              name="thumbnail"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Space style={{ display: "flex" }}>
                {formValue?.thumbnail && (
                  <Image width={100} src={formValue?.thumbnail} />
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
            <Form.Item label="Mô tả" name="description">
              <Input placeholder="Nhập mô tả" />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="isPublished"
              onChange={(value) => onChangeIsPublished(value)}>
              <Select
                placeholder="Chọn trạng thái"
                options={[
                  {
                    value: "true",
                    label: "Công khai",
                  },
                  {
                    value: "false",
                    label: "Không công khai",
                  },
                ]}
              />
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
      </div>
    </div>
  );
}
