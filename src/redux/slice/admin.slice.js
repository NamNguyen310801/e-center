import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  admin: null,
  adminList: null,
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.adminList = action.payload;
    },
    updateUserList: (state, action) => {
      const adminEdit = action.payload;
      state.adminList?.find((admin, index) => {
        if (admin._id === adminEdit._id) {
          state.adminList[index] = adminEdit;
          return true;
        }
        return false;
      });
    },
    deletedUserSlice: (state, action) => {
      const delId = action.payload;
      const adminDel = state.adminList.findIndex(
        (admin) => admin._id === delId
      );
      if (adminDel !== -1) {
        state.adminList?.splice(adminDel, 1);
      }
    },
  },
});

export const { setUserList, updateUserList, deletedUserSlice } =
  adminSlice.actions;
export default adminSlice.reducer;
