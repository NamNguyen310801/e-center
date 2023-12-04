import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import * as UserService from "../../../../services/user.api";
import dayjs from "dayjs";
import AdminStudentCoursesItem from "./AdminStudentCoursesItem";
import { Table, Modal, Input, InputNumber, Form, Select } from "antd";
import { ButtonDelete, ButtonEdit } from "../../../../components";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Toast from "../../../../utils/Toast";
import {
  updateStudentTuitionList,
  deleteStudentTuitionList,
} from "../../../../redux/slice/student.slice";
import { convertPrice } from "../../../../utils/function";
import { Avatar } from "../../../../assets";
const { confirm } = Modal;

export default function AdminStudentDetail({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const studentId = useSelector((state) => state.student.studentId);
  const studentList = useSelector((state) => state.student.studentList);
  const showStudent = useSelector((state) => state.show.showStudent);
  const tuitionList = useSelector((state) => state.tuition.tuitionList);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    getStudent(studentId);
  }, [studentId, studentList]);

  const getStudent = async (id) => {
    const studentItem = await studentList?.find((item) => item._id === id);
    setStudent(studentItem);
  };
  const handleOnClose = (e) => {
    if (e.target.id === "studentDetail") onClose();
  };

  const dataTable =
    student?.tuitionList?.length > 0 &&
    student?.tuitionList?.map((tuition) => {
      return { ...tuition, key: tuition._id };
    });
  // API
  const updateTuitionStudent = async (tuitionId, data) => {
    const res = await UserService.updateTuitionStudentAPI(
      studentId,
      tuitionId,
      {
        amountDay: data?.amountDay,
        amountFee: data?.amountFee,
        description: data?.description,
        status: data?.status,
      },
      user.access_token
    );
    if (res.status === "OK") {
      Toast("success", res.message);
      dispatch(
        updateStudentTuitionList({
          id: studentId,
          tuitionId,
          data: {
            _id: tuitionId,
            amountDay: data?.amountDay,
            amountFee: data?.amountFee,
            description: data?.description,
            status: data?.status,
          },
        })
      );
      onCancel();
    } else {
      Toast("error", res.message);
    }
  };
  const deleteTuitionStudent = async (tuitionId) => {
    const res = await UserService.deleteTuitionStudentAPI(
      studentId,
      tuitionId,
      user.access_token
    );
    if (res.status === "OK") {
      Toast("success", res.message);
      dispatch(
        deleteStudentTuitionList({
          id: studentId,
          tuitionId,
        })
      );
      onCancel();
    } else {
      Toast("error", res.message);
    }
  };
  //Column
  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      render: (row, index) => (
        <div className="cursor-pointer w-full" key={index}>
          <p>{row.slice(0, 2) + "..." + row.slice(-2)}</p>
        </div>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      render: (row) => <p className="max-w-[150px] break-words">{row}</p>,
    },
    {
      title: "Số buổi",
      dataIndex: "amountDay",
    },
    {
      title: "Số tiền",
      dataIndex: "amountFee",
      render: (row) => <p>{row ? convertPrice(row) : 0}</p>,
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      render: (row) => <p>{row ? "Đã thanh toán" : "Chưa thanh toán"}</p>,
    },
    {
      title: " ",
      render: (row, index) => (
        <div
          key={index}
          className="flex items-center gap-x-2 justify-between max-w-[150px]">
          {!row?.status && (
            <>
              <ButtonEdit onClick={() => openEdit(row)} />
              <ButtonDelete onClick={() => showDeleteConfirm(row._id)} />
            </>
          )}
        </div>
      ),
    },
  ];
  const defaultValue = {
    category: 1,
    amountDay: 0,
    amountFee: 0,
    description: "",
    status: false,
  };
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState(defaultValue);
  const [tuitionFee, setTuitionFee] = useState(0);
  useEffect(() => {
    const tuitionFind = tuitionList?.find(
      (tuition) => tuition?.name === student?.tuition
    );
    setTuitionFee(tuitionFind?.fee);
  }, [student, tuitionList]);
  useEffect(() => {
    form.setFieldsValue({
      category: formValue?.category,
      amountFee: formValue?.amountFee,
      amountDay: formValue?.amountDay,
      description: formValue?.description,
      status: formValue?.status,
    });
  }, [formValue, form]);

  // Cap nhat gia tri form
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  const openEdit = (value) => {
    setIdEdit(value?._id);
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
    updateTuitionStudent(idEdit, formValue);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteTuitionStudent(id);
      },
    });
  };
  return (
    <div
      id="studentDetail"
      onClick={handleOnClose}
      className={`${
        showStudent ? "" : "hidden "
      }fixed z-[51] flex items-center justify-center w-full top-0 left-0 h-full bg-gray-400 bg-opacity-20 backdrop-blur-sm min-h-[100vh] `}>
      <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl max-h-[560px] overflow-hidden">
        <div className="relative flex w-full flex-col max-h-[560px] overflow-y-scroll rounded-md bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-4 lg:top-4">
            <AiOutlineClose className="text-xl" />
          </button>

          <section className="w-full px-4 lg:max-w-[100%] basis-full flex flex-col gap-y-2">
            <h1 className="font-bold mt-4 min-h-[33px] text-[26px] w-full text-left ">
              Thông tin học viên
            </h1>
            <h2 className="w-full flex items-center justify-start">
              <div className="w-1/3 flex items-center justify-start font-semibold text-xl float-left capitalize gap-x-4">
                <img
                  src={student?.avatar || Avatar}
                  alt={student?.name}
                  className="w-16 h-16 rounded-full bg-contain bg-center overflow-hidden border-2"
                />
                <div>{student?.name}</div>
              </div>
              <ul className="flex flex-col m-0 pl-0 gap-y-2 w-2/3 text-sm">
                <li className="inline-block">
                  <span>
                    Email:{" "}
                    {(student?.email &&
                      (student?.email?.length > 30
                        ? student?.email?.slice(0, 30) + "..."
                        : student?.email)) ||
                      ""}
                  </span>
                </li>
                <li className="flex w-full">
                  <span className="w-full">
                    Địa chỉ:{" "}
                    {(student?.address &&
                      (student?.address?.length > 30
                        ? student?.address?.slice(0, 30) + "..."
                        : student?.address)) ||
                      ""}
                  </span>
                </li>
              </ul>
            </h2>
            <div className="text-sm font-semibold">Thông tin</div>
            <div className="flex items-start text-sm grid grid-cols-3 gap-x-8 border-t-2 -mt-2 pt-2">
              <ul className="flex flex-col m-0 pl-0 gap-y-2">
                <li className="inline-block">
                  <span>Giới tính: {student?.gender || ""}</span>
                </li>{" "}
                <li className="inline-block">
                  <span>
                    Ngày sinh:{" "}
                    {(student?.date &&
                      dayjs(student?.date).format("DD/MM/YYYY")) ||
                      ""}
                  </span>
                </li>
              </ul>
              <ul className="flex flex-col m-0 pl-0 gap-y-2">
                <li className="inline-block">
                  <span>Lớp: {student?.klass || ""}</span>
                </li>
                <li className="inline-block">
                  <span>Điện thoại: {student?.phone || ""}</span>
                </li>
              </ul>
              <ul className="flex flex-col m-0 pl-0 gap-y-2">
                <li className="inline-block">
                  <span>Học phí: {student?.tuition || ""}</span>
                </li>
              </ul>
            </div>
            <div className="text-sm font-semibold">Khóa học đã tham gia</div>
            <div className="w-full max-h-[270px] overflow-y-scroll border-t-2 -mt-2">
              <div className="flex gap-y-2 flex-wrap w-full -mx-2 py-2">
                {student?.course?.map((item, index) => (
                  <AdminStudentCoursesItem item={item} key={index} />
                ))}
              </div>
            </div>
            <div className="text-sm font-semibold">Học phí</div>
            <div className="w-full max-h-[250px] overflow-y-scroll admin-student-detail border-t-2 -mt-2">
              <Table
                dataSource={dataTable}
                columns={columns}
                pagination
                bordered
                className="w-full mt-2"
              />
            </div>
            <Modal
              forceRender
              open={isOpenEdit}
              title="Cập nhật học phí Học viên"
              onCancel={() => onCancel()}
              onOk={() => onOkEdit()}>
              <Form
                form={form}
                onValuesChange={handleValuesChange}
                name={student?._id + "edit"}
                className="border p-3 w-full rounded-lg pt-6 "
                labelCol={{ span: 6 }}>
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
                    disabled={formValue?.amountDay === 0}
                    onChange={(value) =>
                      setFormValue((pre) => ({
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
                    style={{
                      width: "100%",
                    }}
                    min={0}
                    placeholder="Tổng tiền"
                    disabled={formValue?.amountDay !== 0}
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
                  label="Tình trạng"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin!",
                    },
                  ]}>
                  <Select
                    placeholder="Chọn tình trạng"
                    options={[
                      {
                        value: false,
                        label: "Chưa thanh toán",
                        key: 1,
                      },
                      {
                        value: true,
                        label: "Đã thanh toán",
                        key: 2,
                      },
                    ]}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </section>
        </div>
      </div>
    </div>
  );
}
