import axios from "axios";
import {
  courseURL,
  createCourseURL,
  deleteCourseURL,
  getAllCourseURL,
  getDetailCourseURL,
  updateCourseURL,
} from "./routers";
import { axiosJWT } from "./user.api";
//create
export const createCourseAPI = async (data) => {
  try {
    const res = await axios.post(`${createCourseURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//update
export const updateCourseAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateCourseURL}/${id}`, data, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
// delete
export const deleteCourseAPI = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteCourseURL}/${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
//addTrackToCourse
export const addTrackToCourseAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${courseURL}/${id}/add-track`, data, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
//updateTrack
export const updateTrackAPI = async (courseId, trackId, data, access_token) => {
  try {
    const res = await axiosJWT.put(
      `${courseURL}/${courseId}/update-track/${trackId}`,
      data,
      {
        headers: {
          Authorization: access_token,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
//deleteTrack
export const deleteTrackAPI = async (courseId, trackId, data, access_token) => {
  try {
    const res = await axiosJWT.put(
      `${courseURL}/${courseId}/delete-track/${trackId}`,
      data,
      {
        headers: {
          Authorization: access_token,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

//addLesson
export const addLessonToCourseAPI = async (
  courseId,
  trackId,
  data,
  access_token
) => {
  try {
    const res = await axiosJWT.put(
      `${courseURL}/${courseId}/${trackId}/add-lesson`,
      data,
      {
        headers: {
          Authorization: access_token,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
//deleteLesson
export const deleteLessonInCourseAPI = async (
  courseId,
  trackId,
  lessonId,
  access_token
) => {
  try {
    const res = await axiosJWT.delete(
      `${courseURL}/${courseId}/${trackId}/delete-lesson/${lessonId}`,
      {
        headers: {
          Authorization: access_token,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
// Lay tat ca
export const getAllCourseAPI = async () => {
  try {
    const res = await axios.get(`${getAllCourseURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
// Lay chi tiet
export const getDetailCourseAPI = async (id) => {
  try {
    const res = await axios.get(`${getDetailCourseURL}/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
