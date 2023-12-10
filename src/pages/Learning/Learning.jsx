import React, { useEffect, useState } from "react";
import {
  ActionBar,
  LearningContent,
  LearningHeader,
  LearningTrack,
} from "./components";
import { CommentButton, RateButton } from "../../components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createRatingAPI,
  getDetailCourseAPI,
  updateCourseRatingAPI,
} from "../../services/course.api";
import {
  setLearning,
  setLessonList,
  setPlaying,
} from "../../redux/slice/learning.slice";
import { Modal, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import Toast from "../../utils/Toast";

export default function Learning() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const defaultData = {
    courseId: "",
    userId: "",
    rating: 5,
    description: "",
  };
  const [data, setData] = useState(defaultData);
  const [showModalRate, setShowModalRate] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    handleGetDetailCourse(id);
  }, [id]);
  const handleGetDetailCourse = async (id) => {
    const res = await getDetailCourseAPI(id);
    if (res?.status === "OK") {
      dispatch(setLearning(res?.data));
      dispatch(
        setLessonList(res?.data?.tracks?.flatMap((track) => track.trackSteps))
      );
      dispatch(setPlaying(res?.data?.tracks[0]?.trackSteps[0]));
    }
  };
  useEffect(() => {
    setData((pre) => ({ ...pre, courseId: id, userId: user?.id }));
  }, [id, user]);
  const handleRating = async (data) => {
    const res = await createRatingAPI(data);
    if (res?.status === "OK") {
      Toast("success", res?.message);
      handleCancel();
      await updateCourseRatingAPI({ courseId: data?.courseId });
    } else {
      Toast("error", res?.message);
    }
  };
  const showModal = () => {
    setShowModalRate(true);
  };
  const handleCancel = () => {
    setShowModalRate(false);
    setData((pre) => ({ ...pre, rating: 5, description: "" }));
  };
  const handleOk = () => {
    handleRating(data);
  };
  return (
    <section className="w-full bg-white relative p-0 m-0 learning">
      <LearningHeader />
      <LearningTrack />
      <div className="hidden"></div>
      <LearningContent />
      <ActionBar />
      <CommentButton />
      <RateButton onClick={showModal} />
      <Modal
        className="modalRate"
        open={showModalRate}
        title="Đánh giá của bạn"
        onOk={handleOk}
        onCancel={handleCancel}>
        <div
          style={{
            display: "flex",
          }}>
          <span
            style={{
              fontSize: 12,
              minWidth: 60,
              fontWeight: 600,
              marginRight: 8,
            }}>
            Đánh giá:
          </span>
          <Rate
            allowHalf
            defaultValue={3}
            onChange={(value) => setData((pre) => ({ ...pre, rating: value }))}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 10,
          }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              minWidth: 60,
            }}>
            Mô tả:
          </span>
          <TextArea
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
            placeholder="Viết mô tả của bạn."
            onChange={(e) =>
              setData((pre) => ({ ...pre, description: e.target.value }))
            }
          />
        </div>
      </Modal>
    </section>
  );
}
