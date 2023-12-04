import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  classItem: null,
  classList: null,
};
const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setClass: (state, action) => {
      const { _id = "", name = "", course = "" } = action.payload;
      state.classItem = {
        id: _id,
        name: name,
        course: course,
      };
    },
    updateClass: (state, action) => {
      state.classItem = {
        ...state.classItem,
        name: action.payload.name,
        course: action.payload.course,
      };
    },
    resetClass: (state) => {
      state.classItem = null;
    },
    setClassList: (state, action) => {
      state.classList = action.payload;
    },
    updateClassList: (state, action) => {
      const classEdit = action.payload;
      state.classList?.find((classItem, index) => {
        if (classItem._id === classEdit._id) {
          state.classList[index] = classEdit;
          return true;
        }
        return false;
      });
    },
    deletedClassSlice: (state, action) => {
      const delId = action.payload;
      const classItemDel = state.classList.findIndex(
        (classItem) => classItem._id === delId
      );
      if (classItemDel !== -1) {
        state.classList?.splice(classItemDel, 1);
      }
    },
  },
});

export const {
  setClass,
  updateClass,
  resetClass,
  setClassList,
  updateClassList,
  deletedClassSlice,
} = classSlice.actions;
export default classSlice.reducer;
