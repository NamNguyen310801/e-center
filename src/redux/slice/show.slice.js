import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showMenu: false,
  showPlaylist: false,
  showLesson: false,
  showCourse: false,
  showStudent: false,
  showTeacher: false,
};

const showSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    setShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    setShowPlaylist: (state, action) => {
      state.showPlaylist = action.payload;
    },
    setShowCourse: (state, action) => {
      state.showCourse = action.payload;
    },
    setShowStudent: (state, action) => {
      state.showStudent = action.payload;
    },
    setShowTeacher: (state, action) => {
      state.showTeacher = action.payload;
    },
  },
});

export const {
  setShowMenu,
  setShowPlaylist,
  setShowCourse,
  setShowStudent,
  setShowTeacher,
} = showSlice.actions;
export default showSlice.reducer;
