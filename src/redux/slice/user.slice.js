import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userList: null,
  textSearch: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    addToUserList: (state, action) => {
      state.userList?.push(action.payload);
    },
    updateUserList: (state, action) => {
      const userEdit = action.payload;
      state.userList?.find((user, index) => {
        if (user._id === userEdit._id) {
          state.userList[index] = userEdit;
          return true;
        }
        return false;
      });
    },
    deletedUserSlice: (state, action) => {
      const delId = action.payload;
      const userDel = state.userList.findIndex((user) => user._id === delId);
      if (userDel !== -1) {
        state.userList?.splice(userDel, 1);
      }
    },
    setTextSearch: (state, action) => {
      state.textSearch = action.payload;
    },
  },
});

export const {
  setUserList,
  addToUserList,
  updateUserList,
  deletedUserSlice,
  setTextSearch,
} = userSlice.actions;
export default userSlice.reducer;
