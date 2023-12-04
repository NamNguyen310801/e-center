import axios from "axios";
import {
  createClassURL,
  deleteClassURL,
  getAllClassURL,
  updateClassURL,
} from "./routers";
import { axiosJWT } from "./user.api";
//create
export const createClassAPI = async (data) => {
  try {
    const res = await axios.post(`${createClassURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//update
export const updateClassAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateClassURL}/${id}`, data, {
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
export const deleteClassAPI = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteClassURL}/${id}`, {
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
export const getAllClassAPI = async () => {
  try {
    const res = await axios.get(`${getAllClassURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
