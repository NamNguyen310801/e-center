import axios from "axios";
import {
  createScheduleURL,
  deleteScheduleURL,
  getAllScheduleURL,
  updateScheduleURL,
} from "./routers";
import { axiosJWT } from "./user.api";

//create
export const createScheduleAPI = async (data) => {
  try {
    const res = await axios.post(`${createScheduleURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//update
export const updateScheduleAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateScheduleURL}/${id}`, data, {
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
export const deleteScheduleAPI = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteScheduleURL}/${id}`, {
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
export const getAllScheduleAPI = async () => {
  try {
    const res = await axios.get(`${getAllScheduleURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
