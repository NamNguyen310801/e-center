import axios from "axios";
import {
  createSalaryURL,
  deleteSalaryURL,
  getAllSalaryURL,
  updateSalaryURL,
} from "./routers";
import { axiosJWT } from "./user.api";

//create
export const createSalaryAPI = async (data) => {
  try {
    const res = await axios.post(`${createSalaryURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//update
export const updateSalaryAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateSalaryURL}/${id}`, data, {
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
export const deleteSalaryAPI = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteSalaryURL}/${id}`, {
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
export const getAllSalaryAPI = async () => {
  try {
    const res = await axios.get(`${getAllSalaryURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
