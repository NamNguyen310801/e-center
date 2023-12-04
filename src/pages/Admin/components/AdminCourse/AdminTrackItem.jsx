import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import AdminLessonItem from "./AdminLessonItem";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ButtonAdd, ButtonDelete, ButtonEdit } from "../../../../components";
import { ExclamationCircleFilled } from "@ant-design/icons";
import * as CourseService from "../../../../services/course.api";

import {
  addLessonToCourse,
  deletedTrackCourseList,
  updateTrackCourseList,
} from "../../../../redux/slice/course.slice";
import Toast from "../../../../utils/Toast";
const { confirm } = Modal;

export default function AdminTrackItem({ item }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const lessonList = useSelector((state) => state.lesson.lessonList);
  const courseId = useSelector((state) => state.course.courseId);
  const courseList = useSelector((state) => state.course.courseList);
  const [show, setShow] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(item);
  }, [item, courseList]);

  const defaultValue = {
    _id: item?._id,
    title: item?.title,
    isFree: item?.isFree,
    position: item?.position,
    trackSteps: item?.trackSteps,
  };
  const defaultAddValue = {
    trackSteps: [],
  };
  const [isOpenAddLesson, setIsOpenAddLesson] = useState(false);
  const [isOpenEditTrack, setIsOpenEditTrack] = useState(false);

  const [formValue, setFormValue] = useState(defaultValue);
  const [formAddValue, setFormAddValue] = useState(defaultAddValue);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const handleValuesChange = (changedValues, allValues) => {
    setFormValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  const filterOption = (input, option) => {
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };
  const handleAddValueChange = (changedValues, allValues) => {
    setFormAddValue((prevData) => ({ ...prevData, ...changedValues }));
  };
  //-----Edit
  const editTrack = async (data) => {
    const res = await CourseService.updateTrackAPI(
      courseId,
      data?._id,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      dispatch(updateTrackCourseList({ _id: courseId, data }));
      Toast("success", res.message);
      setTimeout(() => {
        onCancelEdit();
      }, 1000);
    } else {
      Toast("error", res.message);
    }
  };
  //-----Del
  const deleteTrack = async (data) => {
    const res = await CourseService.deleteTrackAPI(
      courseId,
      data?._id,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      Toast("success", res.message);
      setTimeout(() => {
        dispatch(deletedTrackCourseList({ _id: courseId, data }));
      }, 1000);
    } else {
      Toast("error", res.message);
    }
  };
  //-----AddLesson
  const addLesson = async (trackId, data) => {
    const res = await CourseService.addLessonToCourseAPI(
      courseId,
      trackId,
      data,
      user.access_token
    );
    if (res.status === "OK") {
      dispatch(addLessonToCourse({ _id: courseId, trackId, data }));
      Toast("success", res.message);
      setTimeout(() => {
        onCancelAddLesson();
      }, 1000);
    } else {
      Toast("error", res.message);
    }
  };
  //
  useEffect(() => {
    form.setFieldsValue({
      title: formValue?.title,
      isFree: formValue?.isFree?.toString(),
      position: formValue?.position,
    });
  }, [formValue, form]);
  useEffect(() => {
    form2.setFieldsValue({
      trackSteps: formAddValue?.trackSteps,
    });
  }, [formAddValue, form2]);
  const onReset = () => {
    setFormValue(defaultValue);
    form.resetFields();
  };
  const onReset2 = () => {
    setFormAddValue(defaultAddValue);
    form2.resetFields();
  };
  const onChangeIsFee = (value) => {
    if (value === "true") {
      setFormValue((prev) => ({
        ...prev,
        isFee: true,
      }));
    } else if (value === "false") {
      setFormValue((prev) => ({
        ...prev,
        isFee: false,
      }));
    }
  };

  // Add chương
  const openAdd = () => {
    setIsOpenAddLesson(false);
    setTimeout(() => {
      setIsOpenAddLesson(true);
    }, 100);
  };
  const onCancelAddLesson = () => {
    onReset2();
    form2.resetFields();
    setFormAddValue(defaultAddValue);
    setIsOpenAddLesson(false);
  };

  const onOkAddLesson = () => {
    addLesson(data?._id, formAddValue);
  };
  // Edit chương
  const openEdit = (value) => {
    setIsOpenEditTrack(false);
    setFormValue(value);
    setTimeout(() => {
      setIsOpenEditTrack(true);
    }, 100);
  };
  const onCancelEdit = () => {
    onReset();
    form.resetFields();
    setFormValue(defaultValue);
    setIsOpenEditTrack(false);
  };

  const onOkEdit = () => {
    editTrack(formValue);
  };
  // Del
  const showDeleteConfirm = (data) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa không?",
      icon: <ExclamationCircleFilled />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteTrack(data);
      },
    });
  };
  return (
    <div className="border-none rounded-none mb-2 shadow-none relative">
      <div
        className="bg-[#f0f5f5] border border-[#ebebeb] rounded-md p-0 relative z-[1] select-none "
        onMouseEnter={() => setShowBar(true)}
        onMouseLeave={() => setShowBar(false)}>
        <h5 className="text-base my-0">
          <div
            className="text-[#333] text-base overflow-hidden py-4 pr-[30px] pl-8 relative cursor-pointer "
            onClick={() => setShow((pre) => !pre)}>
            {!show ? (
              <FaPlus
                className="absolute -translate-y-1/2 left-1 text-[#f05123]
     top-[50%] font-normal transition duration-300"
              />
            ) : (
              <FaMinus
                className="absolute -translate-y-1/2 left-1 text-[#f05123]
   top-[50%] font-normal transition duration-300"
              />
            )}
            <span className="float-left">
              <strong>{data?.title}</strong>
            </span>
            <span className="float-right text-right min-w-[72px] text-sm">
              {data?.trackSteps?.length} bài học
            </span>
          </div>
        </h5>
        {showBar && (
          <div className="flex w-1/2 h-full absolute top-0 bg-white right-0 bottom-0 items-center justify-end transition-all duration-500 gap-x-3">
            <ButtonAdd onClick={() => openAdd()} />
            <ButtonEdit onClick={() => openEdit(data)} />
            <ButtonDelete onClick={() => showDeleteConfirm(data)} />
          </div>
        )}
      </div>

      {data?.trackSteps?.map((lessonId, index) => (
        <AdminLessonItem
          hidden={!show}
          lessonId={lessonId}
          key={index}
          trackId={data?._id}
        />
      ))}
      <Modal
        forceRender
        style={{
          zIndex: 2,
        }}
        open={isOpenEditTrack}
        title="Sửa chương học"
        onCancel={() => onCancelEdit()}
        onOk={() => onOkEdit()}>
        <Form
          form={form}
          onValuesChange={handleValuesChange}
          name={`update${item?.title}`}
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
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        forceRender
        style={{
          zIndex: 2,
        }}
        open={isOpenAddLesson}
        title="Thêm bài học vào chương"
        onCancel={() => onCancelAddLesson()}
        onOk={() => onOkAddLesson()}>
        <Form
          onValuesChange={handleAddValueChange}
          name={`addLesson${item?.title}`}
          labelCol={{ span: 6 }}
          form={form2}>
          <Form.Item
            label="Bài học"
            name="trackSteps"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin!",
              },
            ]}>
            <Select
              placeholder="Chọn bài học"
              mode="multiple"
              filterOption={filterOption}>
              {lessonList?.map((lesson) => (
                <Select.Option
                  key={lesson._id}
                  value={lesson?.id}
                  label={lesson?.name}>
                  {lesson?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
