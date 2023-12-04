import React, { useEffect, useState } from "react";
import {
  ActionBar,
  LearningContent,
  LearningHeader,
  LearningTrack,
} from "./components";
import { CommentButton } from "../../components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDetailCourseAPI } from "../../services/course.api";
import {
  setLearning,
  setLessonList,
  setPlaying,
} from "../../redux/slice/learning.slice";

export default function Learning() {
  const dispatch = useDispatch();
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

  return (
    <section className="w-full bg-white relative p-0 m-0">
      <LearningHeader />
      <LearningTrack />
      <div className="hidden"></div>
      <LearningContent />
      <ActionBar />
      <CommentButton />
    </section>
  );
}
