import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tuition: null,
  tuitionList: null,
};
const tuitionSlice = createSlice({
  name: "tuition",
  initialState,
  reducers: {
    setTuition: (state, action) => {
      const { _id = "", name = "", fee = "" } = action.payload;
      state.tuition = {
        id: _id,
        name: name,
        fee: fee,
      };
    },
    updateTuition: (state, action) => {
      state.tuition = {
        ...state.tuition,
        name: action.payload.name,
        fee: action.payload.fee,
      };
    },
    resetTuition: (state) => {
      state.tuition = null;
    },
    setTuitionList: (state, action) => {
      state.tuitionList = action.payload;
    },
    updateTuitionList: (state, action) => {
      const tuitionEdit = action.payload;
      state.tuitionList?.find((tuition, index) => {
        if (tuition._id === tuitionEdit._id) {
          state.tuitionList[index] = tuitionEdit;
          return true;
        }
        return false;
      });
    },
    deletedTuitionSlice: (state, action) => {
      const delId = action.payload;
      const tuitionDel = state.tuitionList.findIndex(
        (tuition) => tuition._id === delId
      );
      if (tuitionDel !== -1) {
        state.tuitionList?.splice(tuitionDel, 1);
      }
    },
  },
});

export const {
  setTuition,
  updateTuition,
  resetTuition,
  setTuitionList,
  updateTuitionList,
  deletedTuitionSlice,
} = tuitionSlice.actions;
export default tuitionSlice.reducer;
