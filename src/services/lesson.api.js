import axios from "axios";
import {
  createLessonURL,
  deleteLessonURL,
  getAllLessonURL,
  updateLessonURL,
} from "./routers";
import { axiosJWT } from "./user.api";
//create
export const createLessonAPI = async (data) => {
  try {
    const res = await axios.post(`${createLessonURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//update
export const updateLessonAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateLessonURL}/${id}`, data, {
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
export const deleteLessonAPI = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteLessonURL}/${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// Lay tat ca
export const getAllLessonAPI = async () => {
  try {
    const res = await axios.get(`${getAllLessonURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
