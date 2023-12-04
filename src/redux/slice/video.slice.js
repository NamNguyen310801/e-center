import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  videoItem: null,
  videoList: null,
};
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      const {
        _id = "",
        name = "",
        url = "",
        type = "teacher",
      } = action.payload;
      state.videoItem = {
        id: _id,
        name: name,
        url: url,
        type: type,
      };
    },
    updateVideo: (state, action) => {
      state.videoItem = {
        ...state.videoItem,
        name: action.payload.name,
        url: action.payload.url,
        type: action.payload.type,
      };
    },
    resetVideo: (state) => {
      state.videoItem = null;
    },
    setVideoList: (state, action) => {
      state.videoList = action.payload;
    },
    updateVideoList: (state, action) => {
      const videoEdit = action.payload;
      state.videoList?.find((videoItem, index) => {
        if (videoItem._id === videoEdit._id) {
          state.videoList[index] = videoEdit;
          return true;
        }
        return false;
      });
    },
    deletedVideoSlice: (state, action) => {
      const delId = action.payload;
      const videoItemDel = state.videoList.findIndex(
        (videoItem) => videoItem._id === delId
      );
      if (videoItemDel !== -1) {
        state.videoList?.splice(videoItemDel, 1);
      }
    },
  },
});

export const {
  setVideo,
  updateVideo,
  resetVideo,
  setVideoList,
  updateVideoList,
  deletedVideoSlice,
} = videoSlice.actions;
export default videoSlice.reducer;
