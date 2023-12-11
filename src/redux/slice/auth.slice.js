import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        _id = "",
        email,
        role = 0,
        name = "",
        phone = "",
        address = "",
        date = "",
        gender = "",
        avatar = "",
        coverImage = "",
        intro = "",
        createdAt = "",
        access_token,
        refresh_token,
      } = action.payload;
      state.user = {
        id: _id,
        email: email,
        role: role,
        name: name || email,
        phone: phone,
        date: date,
        gender: gender,
        address: address,
        avatar: avatar,
        intro: intro,
        coverImage: coverImage,
        createdAt: createdAt,
        access_token: access_token,
        refresh_token: refresh_token,
      };
    },
    updateAccessToken: (state, action) => {
      state.user = {
        ...state.user,
        access_token: action.payload,
      };
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        name: action.payload.name,
        phone: action.payload.phone,
        role: action.payload.role,
        date: action.payload.date,
        gender: action.payload.gender,
        address: action.payload.address,
        intro: action.payload.intro,
        avatar: action.payload.avatar,
        coverImage: action.payload.coverImage,
      };
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateAccessToken, updateUser, resetUser } =
  authSlice.actions;
export default authSlice.reducer;
