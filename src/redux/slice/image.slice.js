import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  imageItem: null,
  imageList: null,
};
const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action) => {
      const { _id = "", name = "", url = "", type = "active" } = action.payload;
      state.imageItem = {
        id: _id,
        name: name,
        url: url,
        type: type,
      };
    },
    updateImage: (state, action) => {
      state.imageItem = {
        ...state.imageItem,
        name: action.payload.name,
        url: action.payload.url,
        type: action.payload.type,
      };
    },
    resetImage: (state) => {
      state.imageItem = null;
    },
    setImageList: (state, action) => {
      state.imageList = action.payload;
    },
    updateImageList: (state, action) => {
      const imageEdit = action.payload;
      state.imageList?.find((imageItem, index) => {
        if (imageItem._id === imageEdit._id) {
          state.imageList[index] = imageEdit;
          return true;
        }
        return false;
      });
    },
    deletedImageSlice: (state, action) => {
      const delId = action.payload;
      const imageItemDel = state.imageList.findIndex(
        (imageItem) => imageItem._id === delId
      );
      state.imageList?.splice(imageItemDel, 1);
    },
  },
});

export const {
  setImage,
  updateImage,
  resetImage,
  setImageList,
  updateImageList,
  deletedImageSlice,
} = imageSlice.actions;
export default imageSlice.reducer;
