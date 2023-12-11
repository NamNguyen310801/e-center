import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import * as UserService from "../../../../services/user.api";
import dayjs from "dayjs";
import { Table, Modal, Input, InputNumber, Form, Select, Radio } from "antd";
import { ButtonDelete, ButtonEdit } from "../../../../components";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Toast from "../../../../utils/Toast";
import { convertPrice } from "../../../../utils/function";
import {
  deleteSalaryTeacherList,
  updateSalaryTeacherList,
} from "../../../../redux/slice/teacher.slice";
import { Avatar } from "../../../../assets";
const { confirm } = Modal;

export default function AdminTeacherDetail({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const teacherId = useSelector((state) => state.teacher.teacherId);
  const teacherList = useSelector((state) => state.teacher.teacherList);
  const showTeacher = useSelector((state) => state.show.showTeacher);
  const salaryList = useSelector((state) => state.salary.salaryList);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    getTeacher(teacherId);
  }, [teacherId, teacherList]);

  const getTeacher = async (id) => {
    const teacherItem = await teacherList?.find((item) => item._id === id);
    setTeacher(teacherItem);
  };
  const handleOnClose = (e) => {
    if (e.target.id === "teacherDetail") onClose();
  };
  const dataTable =
    teacher?.salaryList?.length > 0 &&
    teacher?.salaryList?.map((salary) => {
      return { ...salary, key: salary._id };
    });
  // API
  const updateSalaryTeacher = async (salaryId, data) => {
    const res = await UserService.updateSalaryTeacherAPI(
      teacherId,
      salaryId,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      Toast("success", res.message);
      dispatch(
        updateSalaryTeacherList({
          id: teacherId,
          salaryId,
          data: {
            _id: salaryId,
            type: data?.type,
            amountSalary: data?.amountSalary,
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
  const deleteSalaryTeacher = async (salaryId) => {
    const res = await UserService.deleteSalaryTeacherAPI(
      teacherId,
      salaryId,
      user.access_token
    );
    if (res.status === "OK") {
      Toast("success", res.message);
      dispatch(
        deleteSalaryTeacherList({
          id: teacherId,
          salaryId,
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
      title: "Loại lương",
      dataIndex: "type",
      render: (row) => <p>{row === 1 ? "Hàng tháng" : "Khác"}</p>,
    },
    {
      title: "Số tiền",
      dataIndex: "amountSalary",
      render: (row) => <p>{row ? convertPrice(row) : 0}</p>,
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      render: (row) => <p className="max-w-[150px] break-words">{row}</p>,
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
    type: 1,
    amountSalary: 0,
    description: "",
    status: false,
  };
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState(defaultValue);
  const [salaryFee, setSalaryFee] = useState(0);
  useEffect(() => {
    const salaryFind = salaryList?.find(
      (salary) => salary?.name === teacher?.salary
    );
    setSalaryFee(salaryFind?.basicSalary + salaryFind?.bonusSalary);
  }, [teacher, salaryList]);
  useEffect(() => {
    form.setFieldsValue({
      type: formValue?.type,
      amountSalary: formValue?.amountSalary,
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
    updateSalaryTeacher(idEdit, formValue);
  };
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteSalaryTeacher(id);
      },
    });
  };
  return (
    <div
      id="teacherDetail"
      onClick={handleOnClose}
      className={`${
        showTeacher ? "" : "hidden "
      }fixed z-[51] flex items-center justify-center w-full top-0 left-0 h-full bg-gray-400 bg-opacity-20 backdrop-blur-sm min-h-[100vh] `}>
      <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl max-h-[560px] overflow-hidden">
        <div className="relative flex w-full flex-col max-h-[560px] overflow-y-scroll rounded-md bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-4 lg:top-4">
            <AiOutlineClose className="text-xl" />
          </button>

          <section className="w-full px-4 lg:max-w-[100%] basis-full flex flex-col gap-y-2">
            <h1 className="font-bold mt-4 min-h-[33px] text-[26px] w-full text-left">
              Thông tin giáo viên
            </h1>
            <h2 className="w-full flex items-center justify-start">
              <div className="w-1/3 flex items-center justify-start font-semibold text-xl float-left capitalize gap-x-4">
                <img
                  src={teacher?.avatar || Avatar}
                  alt={teacher?.name}
                  className="w-16 h-16 rounded-full bg-contain bg-center overflow-hidden border-2"
                />
                <div>{teacher?.name}</div>
              </div>
              <ul className="flex flex-col m-0 pl-0 gap-y-2 w-2/3 text-sm">
                <li className="inline-block">
                  <span>
                    Email:{" "}
                    {(teacher?.email &&
                      (teacher?.email?.length > 30
                        ? teacher?.email?.slice(0, 30) + "..."
                        : teacher?.email)) ||
                      ""}
                  </span>
                </li>
                <li className="flex w-full">
                  <span className="w-2/3">
                    Địa chỉ:{" "}
                    {(teacher?.address &&
                      (teacher?.address?.length > 30
                        ? teacher?.address?.slice(0, 30) + "..."
                        : teacher?.address)) ||
                      ""}
                  </span>
                  <span className="w-1/3">
                    Điện thoại: {teacher?.phone || ""}
                  </span>
                </li>
              </ul>
            </h2>

            <div className="text-sm font-semibold">Thông tin</div>
            <div className="flex items-start text-base border-t-2 -mt-2 w-full">
              <ul className="flex flex-col m-0 pl-0 gap-y-2 text-sm w-full">
                <li className="inline-block">
                  <span>
                    Giới thiệu:
                    {teacher?.intro}
                  </span>
                </li>
                <li className="inline-block grid grid-cols-3 gap-x-8">
                  <span>Giới tính: {teacher?.gender || ""}</span>
                  <span>
                    Ngày sinh:{" "}
                    {(teacher?.date &&
                      dayjs(teacher?.date).format("DD/MM/YYYY")) ||
                      ""}
                  </span>
                  <span>Mức lương: {teacher?.salary || ""}</span>
                </li>
              </ul>
            </div>
            <div className="text-sm font-semibold">Liên hệ</div>
            <div className="flex items-start text-base border-t-2 -mt-2 w-full">
              <ul className="flex flex-col m-0 pl-0 gap-y-2 text-sm w-full">
                <li className="inline-block">
                  <span>Facebook: {teacher?.facebook}</span>
                </li>
                <li className="inline-block">
                  <span>Instagram: {teacher?.instagram}</span>
                </li>
                <li className="inline-block">
                  <span>Google: {teacher?.google}</span>
                </li>
                <li className="inline-block">
                  <span>Youtube: {teacher?.youtube}</span>
                </li>
              </ul>
            </div>
            <div className="text-sm font-semibold">Lương</div>
            <div className="w-full max-h-[250px] overflow-y-scroll admin-teacher-detail border-t-2 -mt-2">
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
              title="Cập nhật lương giáo viên"
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
                form={form}
                onValuesChange={handleValuesChange}
                name={teacher?._id + "edit"}
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
                      setFormValue((pre) => ({
                        ...pre,
                        amountSalary: formValue?.type !== 1 ? salaryFee : 0,
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
                    style={{
                      width: "100%",
                    }}
                    min={0}
                    placeholder="Tổng tiền"
                    disabled={formValue?.type === 1}
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
