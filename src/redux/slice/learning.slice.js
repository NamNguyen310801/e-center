import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  learning: null,
  playing: null,
  lessonList: null,
};
const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    setLearning: (state, action) => {
      state.learning = action.payload;
    },
    resetLearning: (state) => {
      state.learning = null;
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    resetPlaying: (state) => {
      state.playing = null;
    },
    setLessonList: (state, action) => {
      state.lessonList = action.payload;
    },
    updateLessonList: (state, action) => {
      const learningEdit = action.payload;
      state.lessonList?.find((learning, index) => {
        if (learning._id === learningEdit._id) {
          state.lessonList[index] = learningEdit;
          return true;
        }
        return false;
      });
    },
    deletedLessonSlice: (state, action) => {
      const delId = action.payload;
      const learningDel = state.lessonList.findIndex(
        (learning) => learning._id === delId
      );
      if (learningDel !== -1) {
        state.lessonList?.splice(learningDel, 1);
      }
    },
  },
});

export const {
  setLearning,
  resetLearning,
  setPlaying,
  resetPlaying,
  setLessonList,
  updateLessonList,
  deletedLessonSlice,
} = learningSlice.actions;
export default learningSlice.reducer;
