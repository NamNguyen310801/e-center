import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  schedule: null,
  scheduleList: null,
};
const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedule: (state, action) => {
      const {
        _id = "",
        nameClass = "",
        dayOfWeek = [],
        caHoc = "",
        time = "",
        teacher = "",
        monHoc = "",
      } = action.payload;
      state.schedule = {
        id: _id,
        nameClass: nameClass,
        dayOfWeek: dayOfWeek,
        caHoc: caHoc,
        time: time,
        teacher: teacher,
        monHoc: monHoc,
      };
    },
    updateSchedule: (state, action) => {
      state.schedule = {
        ...state.schedule,
        nameClass: action.payload.nameClass,
        dayOfWeek: action.payload.dayOfWeek,
        caHoc: action.payload.caHoc,
        time: action.payload.time,
        teacher: action.payload.teacher,
        monHoc: action.payload.monHoc,
      };
    },
    resetSchedule: (state) => {
      state.schedule = null;
    },
    setScheduleList: (state, action) => {
      state.scheduleList = action.payload;
    },
    updateScheduleList: (state, action) => {
      const scheduleEdit = action.payload;
      state.scheduleList?.find((schedule, index) => {
        if (schedule._id === scheduleEdit._id) {
          state.scheduleList[index] = scheduleEdit;
          return true;
        }
        return false;
      });
    },
    deletedScheduleSlice: (state, action) => {
      const delId = action.payload;
      const scheduleDel = state.scheduleList.findIndex(
        (schedule) => schedule._id === delId
      );
      if (scheduleDel !== -1) {
        state.scheduleList?.splice(scheduleDel, 1);
      }
    },
  },
});

export const {
  setSchedule,
  updateSchedule,
  resetSchedule,
  setScheduleList,
  updateScheduleList,
  deletedScheduleSlice,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
