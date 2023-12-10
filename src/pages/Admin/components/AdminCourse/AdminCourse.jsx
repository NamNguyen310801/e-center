import {
  ExclamationCircleFilled,
  PlusOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  FloatButton,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Spin,
  Table,
  Tooltip,
  Upload,
} from "antd";
import * as CourseService from "../../../../services/course.api";

import { useEffect, useRef, useState } from "react";
import { ButtonDelete, ButtonEdit, ButtonAdd } from "../../../../components";
import { convertPrice, getBase64 } from "../../../../utils/function";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../../utils/Toast";
import {
  addTrackToCourseList,
  deletedCourseSlice,
  setCourse,
  setCourseId,
  setCourseList,
  updateCourseList,
} from "../../../../redux/slice/course.slice";
import { setShowCourse } from "../../../../redux/slice/show.slice";
import AdminCourseDetail from "./AdminCourseDetail";
import { getAllLessonAPI } from "../../../../services/lesson.api";
import { setLessonList } from "../../../../redux/slice/lesson.slice";
const { confirm } = Modal;

export default function AdminCourse() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const courseList = useSelector((state) => state.course.courseList);
  const lessonList = useSelector((state) => state.lesson.lessonList);
  const dataTable =
    courseList?.length > 0 &&
    courseList?.map((course) => {
      return {
        ...course,
        key: course._id,
        status:
          (course?.isCompletable && 3) ||
          (course?.isComingSoon && 1) ||
          (course?.isSelling && 2),
      };
    });

  // *****API
  useEffect(() => {
    if (!courseList) {
      handleGetAllCourse();
    }
  }, []);
  useEffect(() => {
    if (!lessonList) {
      handleGetAllLesson();
    }
  }, []);
  const handleGetAllCourse = async () => {
    setIsLoading(true);
    const res = await CourseService.getAllCourseAPI();
    if (res.status === "OK") {
      dispatch(setCourseList(res?.data));
    }
    setIsLoading(false);
  };
  const handleGetAllLesson = async () => {
    const res = await getAllLessonAPI();
    if (res.status === "OK") {
      dispatch(setLessonList(res.data));
    }
  };
  //-----Create
  const createCourse = async () => {
    try {
      const res = await CourseService.createCourseAPI(formValue);
      if (res && res.status === "ERROR") {
        Toast("error", res.message);
      } else if (res.data) {
        Toast("success", res.message);
        handleGetAllCourse();
        form.resetFields();
        setFormValue(defaultValue);
      }
    } catch (error) {
      Toast("error", error);
    }
  };
  //-----Edit
  const editCourse = async (id, data) => {
    const res = await CourseService.updateCourseAPI(
      id,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      dispatch(updateCourseList({ _id: id, ...data }));
      Toast("success", res.message);
      setTimeout(() => {
        onCancel();
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };
  //-----AddTrackToCourse
  const addTrackToCourse = async (id, data) => {
    const res = await CourseService.addTrackToCourseAPI(
      id,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      const trackData = res?.data?.tracks?.find(
        (track) => track?.title === data?.title
      );
      // console.log(track);
      dispatch(addTrackToCourseList({ _id: id, data: trackData }));
      Toast("success", res.message);
      setTimeout(() => {
        onCancelAdd();
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };
  //-----Del
  const deleteCourse = async (id) => {
    const res = await CourseService.deleteCourseAPI(id, user.access_token);
    if (res.status === "OK") {
      Toast("success", res.message);
      setTimeout(() => {
        dispatch(deletedCourseSlice(id));
      }, 1500);
    } else {
      Toast("error", res.message);
    }
  };

  //=========== State
  const defaultValue = {
    name: "",
    price: 0,
    thumbnail: "",
    discount: 0,
    description: "",
    isPro: false,
    isComingSoon: false,
    isSelling: false,
    isCompletable: false,
  };
  const defaultValue2 = {
    title: "",
    isFree: false,
    position: 1,
    trackSteps: [],
  };
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenAddTrack, setIsOpenAddTrack] = useState(false);
  const [formValue, setFormValue] = useState(defaultValue);
  const [formValue2, setFormValue2] = useState(defaultValue2);

  const [fileList, setFileList] = useState([]);
  const [idEdit, setIdEdit] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  //================Form
  useEffect(() => {
    form.setFieldsValue({
      name: formValue?.name,
      price: formValue?.price,
      thumbnail: formValue?.thumbnail,
      discount: formValue?.discount,
      description: formValue?.description,
      isPro: formValue?.isPro?.toString(),
      isComingSoon: formValue?.isComingSoon,
      isSelling: formValue?.isSelling,
      isCompletable: formValue?.isCompletable,
      status: formValue?.status,
    });
  }, [formValue, form]);
  useEffect(() => {
    form1.setFieldsValue({
      title: formValue2?.title,
      isFree: formValue2?.isFree?.toString(),
      position: formValue2?.position,
    });
  }, [formValue2, form1]);
  const onReset = () => {
    setFormValue(defaultValue);
    setFileList([]);
    form.resetFields();
  };
  const onReset2 = () => {
    setFormValue2(defaultValue2);
    setFileList([]);
    form1.resetFields();
  };
  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  const handleValuesChange2 = (changedValues, allValues) => {
    setFormValue2((prevData) => ({ ...prevData, ...changedValues }));
  };
  //
  const onChangeStatus = (value) => {
    if (value === 1) {
      setFormValue((prev) => ({
        ...prev,
        isComingSoon: true,
        isSelling: false,
        isCompletable: false,
      }));
    } else if (value === 2) {
      setFormValue((prev) => ({
        ...prev,
        isComingSoon: false,
        isSelling: true,
      }));
    } else if (value === 3) {
      setFormValue((prev) => ({
        ...prev,
        isCompletable: true,
      }));
    }
  };
  //
  const onChangeIsPro = (value) => {
    if (value === "true") {
      setFormValue((prev) => ({
        ...prev,
        isPro: true,
      }));
    } else if (value === "false") {
      setFormValue((prev) => ({
        ...prev,
        isPro: false,
      }));
    }
  };
  //
  const onChangeIsFee = (value) => {
    if (value === "true") {
      setFormValue2((prev) => ({
        ...prev,
        isFee: true,
      }));
    } else if (value === "false") {
      setFormValue2((prev) => ({
        ...prev,
        isFee: false,
      }));
    }
  };

  //edit course
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
    editCourse(idEdit, formValue);
  };
  // Add chương
  const openAdd = (value) => {
    setIdEdit(value?._id);
    setIsOpenAddTrack(false);
    setTimeout(() => {
      setIsOpenAddTrack(true);
    }, 100);
  };
  const onCancelAdd = () => {
    setIdEdit("");
    onReset2();
    form1.resetFields();
    setFormValue(defaultValue2);
    setIsOpenAddTrack(false);
  };

  const onOkAdd = () => {
    addTrackToCourse(idEdit, formValue2);
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
        deleteCourse(id);
      },
    });
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
  //
  const handleClick = (id) => {
    dispatch(setShowCourse(true));
    dispatch(setCourseId(id));
  };
  const handleOnClose = () => {
    dispatch(setShowCourse(false));
  };
  //Columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (row, index) => (
        <div
          className="cursor-pointer w-full"
          onClick={() => handleClick(row)}
          key={index}>
          <p>{row.slice(0, 4) + "..." + row.slice(-4)}</p>
        </div>
      ),
    },
    {
      title: "Tên khóa học",
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
      title: "Giá",
      dataIndex: "price",
      render: (row) => (
        <p className="max-w-[200px]">{row ? convertPrice(row) : 0} </p>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (row) => (
        <p>{row?.length > 15 ? row.slice(0, 15) + "... " : row}</p>
      ),
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      render: (row) => <p>{row}% </p>,
    },
    {
      title: "Loại",
      dataIndex: "isPro",
      render: (row) => <p>{row ? "Pro" : "Bình thường"} </p>,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (row) => (
        <p>
          {(row === 1 && "Sắp ra mắt") ||
            (row === 2 && "Đang bán") ||
            (row === 3 && "Đã hoàn thành")}
        </p>
      ),
    },
    {
      title: " ",
      render: (row, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-x-2 max-w-[120px]">
          <ButtonAdd onClick={() => openAdd(row)} />
          <ButtonEdit onClick={() => openEdit(row)} />
          <ButtonDelete onClick={() => showDeleteConfirm(row?._id)} />
        </div>
      ),
    },
  ];
  return (
    <main className="relative admin-course container mx-auto p-0 my-0 flex min-h-[100vh]">
      <div className="pt-0 px-4 md:pt-2 lg:px-0 flex flex-col flex-1 w-full">
        <div className="mb-8 lg:mb-10 flex flex-col w-full">
          <h1 className="font-black text-xl text-[#242424]">
            Quản lý Khóa học
          </h1>
        </div>
        <div className="flex gap-x-6 w-full">
          <div className="flex gap-8 bg-lightOverlay transition duration-700 lg:min-w-[80px] max-h-[600px] relative">
            <Tooltip title="Thêm Khóa học" placement="right">
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
              } flex gap-8 mx-auto transition duration-700 lg:min-w-[320px] absolute top-0 left-0 z-[2] bg-white`}>
              <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-start gap-4">
                <h3 className="px-4 py-[10px] text-xl text-blue-500 font-semibold">
                  Thêm Khóa học
                </h3>
                <div className="flex flex-col w-full items-center justify-center gap-4">
                  <div className="w-full">
                    <Form
                      className="w-full"
                      style={{
                        background: "#fff",
                        zIndex: 32,
                      }}
                      name="admin-course"
                      labelCol={{
                        span: 10,
                      }}
                      form={form}>
                      <Form.Item
                        label="Tên khóa học"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập thông tin!",
                          },
                        ]}>
                        <Input placeholder="Nhập tên khóa học" />
                      </Form.Item>
                      <Form.Item label="Giá" name="price">
                        <InputNumber
                          min={0}
                          placeholder="Nhập giá"
                          className="w-full"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Ảnh"
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
                      <Form.Item label="Giảm giá" name="discount">
                        <InputNumber
                          min={0}
                          placeholder="Nhập giảm giá"
                          className="w-full"
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
                        <Input placeholder="Nhập mô tả"></Input>
                      </Form.Item>
                      <Form.Item
                        label="Loại"
                        name="isPro"
                        onChange={(value) => onChangeIsPro(value)}>
                        <Select
                          placeholder="Chọn loại khóa học"
                          options={[
                            {
                              value: "true",
                              label: "Pro",
                            },
                            {
                              value: "false",
                              label: "Bình thường",
                            },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item label="Tình trạng" name="status">
                        <Select
                          onChange={(value) => onChangeStatus(value)}
                          placeholder="Chọn tình trạng"
                          options={[
                            {
                              value: 1,
                              label: "Sắp ra mắt",
                            },
                            {
                              value: 2,
                              label: "Đang bán",
                            },
                            {
                              value: 3,
                              label: "Đã hoàn thành",
                            },
                          ]}></Select>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-8 w-full">
                  <button
                    type="button"
                    onClick={createCourse}
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
                    Thoát
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:-mt-11">
            <h2 className="font-semibold mb-4 text-lg text-[#424242] text-center">
              Danh sách Khóa học
            </h2>
            <FloatButton
              icon={<SyncOutlined />}
              style={{
                top: 89,
              }}
              tooltip="Refresh"
              type="primary"
              onClick={handleGetAllCourse}
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
          title="Cập nhật khóa học"
          onCancel={() => onCancel()}
          onOk={() => onOkEdit()}>
          <Form
            form={form}
            onValuesChange={handleValuesChange}
            name="updateCourse"
            labelCol={{ span: 6 }}>
            <Form.Item
              label="Tên khóa học"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Input placeholder="Nhập tên khóa học" />
            </Form.Item>
            <Form.Item label="Giá" name="price">
              <InputNumber
                placeholder="Nhập giá"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            <Form.Item
              label="Ảnh"
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
            <Form.Item label="Giảm giá" name="discount">
              <InputNumber
                min={0}
                placeholder="Nhập giảm giá"
                style={{
                  width: "100%",
                }}
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
            <Form.Item
              label="Loại"
              name="isPro"
              onChange={(value) => onChangeIsPro(value)}>
              <Select
                placeholder="Chọn loại khóa học"
                options={[
                  {
                    value: "true",
                    label: "Pro",
                  },
                  {
                    value: "false",
                    label: "Bình thường",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Tình trạng" name="status">
              <Select
                placeholder="Chọn tình trạng"
                onChange={(value) => onChangeStatus(value)}
                options={[
                  {
                    value: 1,
                    label: "Sắp ra mắt",
                  },
                  {
                    value: 2,
                    label: "Đang bán",
                  },
                  {
                    value: 3,
                    label: "Đã hoàn thành",
                  },
                ]}></Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          forceRender
          open={isOpenAddTrack}
          title="Thêm chương học"
          onCancel={() => onCancelAdd()}
          onOk={() => onOkAdd()}>
          <Form
            form={form1}
            onValuesChange={handleValuesChange2}
            name="addTrackCourse"
            labelCol={{ span: 6 }}>
            <Form.Item
              label="Tên chương học"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <Input placeholder="Nhập tên chương học" />
            </Form.Item>

            <Form.Item
              label="Vị trí"
              name="position"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thông tin!",
                },
              ]}>
              <InputNumber
                min={0}
                placeholder="Nhập vị trí"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item label="Loại" name="isFree">
              <Select
                onChange={(value) => onChangeIsFee(value)}
                placeholder="Chọn loại khóa học"
                options={[
                  {
                    value: "true",
                    label: "Tính phí",
                  },
                  {
                    value: "false",
                    label: "Miễn phí",
                  },
                ]}></Select>
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
        <AdminCourseDetail onClose={handleOnClose} />
      </div>
    </main>
  );
}
