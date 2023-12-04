import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  teacher: null,
  teacherId: null,
  teacherList: null,
};
const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeacherId: (state, action) => {
      state.teacherId = action.payload;
    },
    setTeacher: (state, action) => {
      const {
        _id = "",
        email = "",
        facebook = "",
        instagram = "",
        google = "",
        youtube = "",
        salary = "",
        salaryList = [],
      } = action.payload;
      state.teacher = {
        id: _id,
        email: email,
        facebook: facebook,
        instagram: instagram,
        google: google,
        youtube: youtube,
        salary: salary,
        salaryList: salaryList,
      };
    },
    updateTeacher: (state, action) => {
      state.teacher = {
        ...state.teacher,
        facebook: action.payload.facebook,
        instagram: action.payload.instagram,
        google: action.payload.google,
        youtube: action.payload.youtube,
        salary: action.payload.salary,
        salaryList: action.payload.salaryList,
      };
    },
    resetTeacher: (state) => {
      state.teacher = null;
    },
    setTeacherList: (state, action) => {
      state.teacherList = action.payload;
    },
    updateTeacherList: (state, action) => {
      const teacherEdit = action.payload;
      state.teacherList?.find((teacher, index) => {
        if (teacher._id === teacherEdit._id) {
          state.teacherList[index] = teacherEdit;
          return true;
        }
        return false;
      });
    },
    addSalaryTeacherList: (state, action) => {
      const teacherId = action.payload?.id;
      const data = action.payload?.data;
      state.teacherList?.find((teacher, index) => {
        if (teacher._id === teacherId) {
          state.teacherList[index].salaryList = data;
          return true;
        }
        return false;
      });
    },
    updateSalaryTeacherList: (state, action) => {
      const teacherId = action.payload?.id;
      const salaryId = action.payload?.salaryId;
      const salaryEdit = action.payload?.data;
      const teacherEdit = state.teacherList?.find(
        (teacher) => teacher?._id === teacherId
      );
      teacherEdit?.salaryList?.find((item, index) => {
        if (item?._id === salaryId) {
          teacherEdit.salaryList[index] = salaryEdit;
          return true;
        }
        return false;
      });
      state.teacherList?.find((teacher, index) => {
        if (teacher?._id === teacherId) {
          state.teacherList[index] = teacherEdit;
          return true;
        }
        return false;
      });
    },
    deleteSalaryTeacherList: (state, action) => {
      const teacherId = action.payload?.id;
      const salaryId = action.payload?.salaryId;
      const teacherEdit = state.teacherList?.find(
        (teacher) => teacher?._id === teacherId
      );
      const salaryDel = teacherEdit.salaryList?.findIndex(
        (salary) => salary?._id === salaryId
      );
      if (salaryDel !== -1) {
        teacherEdit.salaryList?.splice(salaryDel, 1);
      }
      state.teacherList?.find((teacher, index) => {
        if (teacher?._id === teacherId) {
          state.teacherList[index] = teacherEdit;
          return true;
        }
        return false;
      });
    },
    deletedTeacherSlice: (state, action) => {
      const delId = action.payload;
      const teacherDel = state.teacherList.findIndex(
        (teacher) => teacher._id === delId
      );
      if (teacherDel !== -1) {
        state.teacherList?.splice(teacherDel, 1);
      }
    },
  },
});

export const {
  setTeacherId,
  setTeacher,
  updateTeacher,
  resetTeacher,
  setTeacherList,
  updateTeacherList,
  deletedTeacherSlice,
  addSalaryTeacherList,
  updateSalaryTeacherList,
  deleteSalaryTeacherList,
} = teacherSlice.actions;
export default teacherSlice.reducer;
