import axios from "axios";
import {
  createTuitionURL,
  deleteTuitionURL,
  getAllTuitionURL,
  updateTuitionURL,
} from "./routers";
import { axiosJWT } from "./user.api";

//create
export const createTuitionAPI = async (data) => {
  try {
    const res = await axiosJWT.post(`${createTuitionURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//update
export const updateTuitionAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateTuitionURL}/${id}`, data, {
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
export const deleteTuitionAPI = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteTuitionURL}/${id}`, {
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
export const getAllTuitionAPI = async () => {
  try {
    const res = await axios.get(`${getAllTuitionURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
