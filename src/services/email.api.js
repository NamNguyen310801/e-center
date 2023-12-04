import axios from "axios";
import {
  confirmRegisterCourseURL,
  sendSalaryURL,
  sendTuitionURL,
} from "./routers";
export const sendSalaryAPI = async (data) => {
  try {
    const res = await axios.post(`${sendSalaryURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const sendTuitionAPI = async (data) => {
  try {
    const res = await axios.post(`${sendTuitionURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const confirmRegisterCourseAPI = async (data) => {
  try {
    const res = await axios.post(`${confirmRegisterCourseURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
