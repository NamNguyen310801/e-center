import axios from "axios";
import {
  createVideoURL,
  deleteVideoURL,
  getAllVideoURL,
  updateVideoURL,
} from "./routers";
import { axiosJWT } from "./user.api";
//create
export const createVideoAPI = async (data) => {
  try {
    const res = await axios.post(`${createVideoURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//update
export const updateVideoAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateVideoURL}/${id}`, data, {
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
export const deleteVideoAPI = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteVideoURL}/${id}`, {
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
export const getAllVideoAPI = async () => {
  try {
    const res = await axios.get(`${getAllVideoURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
