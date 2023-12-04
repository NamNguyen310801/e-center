import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  lesson: null,
  lessonList: null,
};
const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLesson: (state, action) => {
      const {
        _id = "",
        name = "",
        url = "",
        thumbnail = "",
        description = "",
        isPublished = false,
        position = 0,
      } = action.payload;
      state.lesson = {
        id: _id,
        name: name,
        url: url,
        thumbnail: thumbnail,
        description: description,
        position: position,
        isPublished: isPublished,
      };
    },
    updateLesson: (state, action) => {
      state.lesson = {
        ...state.lesson,
        name: action.payload.name,
        url: action.payload.url,
        thumbnail: action.payload.thumbnail,
        description: action.payload.description,
      };
    },
    resetLesson: (state) => {
      state.lesson = null;
    },
    setLessonList: (state, action) => {
      state.lessonList = action.payload;
    },
    updateLessonList: (state, action) => {
      const lessonEdit = action.payload;
      state.lessonList?.find((lesson, index) => {
        if (lesson._id === lessonEdit._id) {
          state.lessonList[index] = lessonEdit;
          return true;
        }
        return false;
      });
    },
    deletedLessonSlice: (state, action) => {
      const delId = action.payload;
      const lessonDel = state.lessonList.findIndex(
        (lesson) => lesson._id === delId
      );
      if (lessonDel !== -1) {
      }
      state.lessonList?.splice(lessonDel, 1);
    },
  },
});

export const {
  setLesson,
  updateLesson,
  resetLesson,
  setLessonList,
  updateLessonList,
  deletedLessonSlice,
} = lessonSlice.actions;
export default lessonSlice.reducer;
