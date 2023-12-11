import axios from "axios";
import {
  addSalaryTeacherURL,
  addTuitionStudentURL,
  deleteManyUserURL,
  deleteSalaryTeacherURL,
  deleteTuitionStudentURL,
  deleteUserURL,
  forgetPasswordURL,
  getAllStudentURL,
  getAllTeacherURL,
  getAllUserURL,
  getDetailUserURL,
  loginURL,
  logoutURL,
  refreshTokenURL,
  registerCourseURL,
  registerURL,
  resetPasswordURL,
  updateCourseStudentURL,
  updateSalaryTeacherURL,
  updateStudentURL,
  updateTeacherURL,
  updateTuitionStudentURL,
  updateUserURL,
  verifyOTPURL,
} from "./routers";

export const axiosJWT = axios.create();

// export const getUser = async () => {
//   try {
//     const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
//     const { data } = await axios.get(url, { withCredentials: true });
//     setUser(data.user._json);
//   } catch (err) {
//     console.log(err);
//   }
// };
//Login
export const loginAPI = async (data) => {
  try {
    const res = await axios.post(`${loginURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//Register
export const registerAPI = async (data) => {
  try {
    const res = await axios.post(`${registerURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
// refreshTokenURL
export const refreshTokenAPI = async (refToken) => {
  try {
    const res = await axios.post(
      `${refreshTokenURL}`,
      {
        withCredentials: true,
      },
      {
        headers: {
          Authorization: refToken,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
//Logout
export const logoutAPI = async (data) => {
  try {
    const res = await axios.post(`${logoutURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

//Get all
export const getAllUserAPI = async () => {
  try {
    const res = await axios.get(`${getAllUserURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getAllTeacherAPI = async () => {
  try {
    const res = await axios.get(`${getAllTeacherURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const getAllStudentAPI = async () => {
  try {
    const res = await axios.get(`${getAllStudentURL}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
// Get detail
export const getDetailUserAPI = async (id, access_token) => {
  try {
    const res = await axiosJWT.get(`${getDetailUserURL}/${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

//Update
export const updateUserAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateUserURL}/${id}`, data, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const updateTeacherAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateTeacherURL}/${id}`, data, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const updateStudentAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${updateStudentURL}/${id}`, data, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const registerCourseAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${registerCourseURL}/${id}`, data, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const updateCourseStudentAPI = async (
  id,
  courseId,
  data,
  access_token
) => {
  try {
    const res = await axiosJWT.put(
      `${updateCourseStudentURL}/${id}/${courseId}`,
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
export const addTuitionStudentAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${addTuitionStudentURL}/${id}`, data, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const updateTuitionStudentAPI = async (
  id,
  tuitionId,
  data,
  access_token
) => {
  try {
    const res = await axiosJWT.put(
      `${updateTuitionStudentURL}/${id}/${tuitionId}`,
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
export const deleteTuitionStudentAPI = async (id, tuitionId, access_token) => {
  try {
    const res = await axiosJWT.delete(
      `${deleteTuitionStudentURL}/${id}/${tuitionId}`,
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
export const addSalaryTeacherAPI = async (id, data, access_token) => {
  try {
    const res = await axiosJWT.put(`${addSalaryTeacherURL}/${id}`, data, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const updateSalaryTeacherAPI = async (
  id,
  salaryId,
  data,
  access_token
) => {
  try {
    const res = await axiosJWT.put(
      `${updateSalaryTeacherURL}/${id}/${salaryId}`,
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
export const deleteSalaryTeacherAPI = async (id, salaryId, access_token) => {
  try {
    const res = await axiosJWT.delete(
      `${deleteSalaryTeacherURL}/${id}/${salaryId}`,
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
//Delete
export const deleteUserAPI = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(`${deleteUserURL}/${id}`, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
// delete many
export const deleteManyUserAPI = async (data, access_token) => {
  try {
    const res = await axiosJWT.post(`${deleteManyUserURL}`, data, {
      headers: {
        Authorization: access_token,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
// forget
export const forgetPasswordAPI = async (data) => {
  try {
    const res = await axios.post(`${forgetPasswordURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const verifyOTPAPI = async (data) => {
  try {
    const res = await axios.post(`${verifyOTPURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
// reset
export const resetPasswordAPI = async (data) => {
  try {
    const res = await axios.post(`${resetPasswordURL}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
