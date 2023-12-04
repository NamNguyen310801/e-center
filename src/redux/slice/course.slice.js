import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  course: null,
  courseId: null,
  courseList: null,
  track: null,
  trackStep: null,
};
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      const {
        _id = "",
        name,
        price = 0,
        thumbnail = "",
        discount = 0,
        tracks = [],
        description = "",
        slug = "",
        studentsCount = 0,
        isPro = false,
        isComingSoon = false,
        isSelling = false,
        isCompletable = false,
      } = action.payload;
      state.course = {
        id: _id,
        name: name,
        price: price,
        thumbnail: thumbnail,
        discount: discount,
        tracks: tracks,
        description: description,
        slug: slug,
        studentsCount: studentsCount,
        isPro: isPro,
        isComingSoon: isComingSoon,
        isSelling: isSelling,
        isCompletable: isCompletable,
      };
    },
    updateCourse: (state, action) => {
      state.course = {
        ...state.course,
        name: action.payload.name,
        price: action.payload.price,
        thumbnail: action.payload.thumbnail,
        discount: action.payload.discount,
        description: action.payload.description,
        slug: action.payload.slug,
        studentsCount: action.payload.studentsCount,
        isPro: action.payload.isPro,
        isComingSoon: action.payload.isComingSoon,
        isSelling: action.payload.isSelling,
        isCompletable: action.payload.isCompletable,
      };
    },
    resetCourse: (state) => {
      state.course = null;
    },
    setTrack: (state, action) => {
      const {
        _id = "",
        course_id,
        title = "",
        position = 0,
        trackSteps = [],
        isFree = false,
      } = action.payload;
      state.track = {
        id: _id,
        course_id: course_id,
        title: title,
        position: position,
        trackSteps: trackSteps,
        isFree: isFree,
      };
    },
    updateTrack: (state, action) => {
      state.track = {
        ...state.track,
        course_id: action.payload.course_id,
        title: action.payload.title,
        position: action.payload.position,
        trackSteps: action.payload.trackSteps,
        isFree: action.payload.isFree,
      };
    },
    resetTrack: (state) => {
      state.track = null;
    },
    setTrackStep: (state, action) => {
      const {
        _id = "",
        track_id,
        step_id = "",
        position = 0,
        isPublished = false,
      } = action.payload;
      state.trackStep = {
        id: _id,
        track_id: track_id,
        step_id: step_id,
        position: position,
        isPublished: isPublished,
        // trackSteps: trackSteps,
      };
    },
    updateTrackStep: (state, action) => {
      state.trackStep = {
        ...state.trackStep,
        track_id: action.payload.track_id,
        step_id: action.payload.step_id,
        position: action.payload.position,
        isPublished: action.payload.isPublished,
      };
    },
    resetTrackStep: (state) => {
      state.trackStep = null;
    },
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
    setCourseList: (state, action) => {
      state.courseList = action.payload;
    },
    updateCourseList: (state, action) => {
      const courseEdit = action.payload;
      state.courseList?.find((course, index) => {
        if (course._id === courseEdit._id) {
          state.courseList[index] = courseEdit;
          return true;
        }
        return false;
      });
    },
    deletedCourseSlice: (state, action) => {
      const delId = action.payload;
      const courseDel = state.courseList.findIndex(
        (course) => course._id === delId
      );
      if (courseDel !== -1) {
        state.courseList?.splice(courseDel, 1);
      }
    },
    addTrackToCourseList: (state, action) => {
      const courseId = action.payload?._id;
      state.courseList?.find((course, index) => {
        if (course._id === courseId) {
          state.courseList[index]?.tracks?.push(action.payload?.data);
          state.courseList[index]?.tracks?.sort(
            (a, b) => a.position - b.position
          );
          return true;
        }
        return false;
      });
    },
    updateTrackCourseList: (state, action) => {
      const courseId = action.payload?._id;
      const trackEdit = action.payload?.data;
      const courseEdit = state.courseList?.find(
        (course) => course?._id === courseId
      );
      courseEdit?.tracks?.find((track, index) => {
        if (track?._id === trackEdit?._id) {
          courseEdit.tracks[index] = trackEdit;
          return true;
        }
        return false;
      });
      courseEdit?.tracks?.sort((a, b) => a.position - b.position);
      state.courseList?.find((course, index) => {
        if (course?._id === courseId) {
          state.courseList[index] = courseEdit;
          return true;
        }
        return false;
      });
    },
    deletedTrackCourseList: (state, action) => {
      const courseId = action.payload?._id;
      const trackEdit = action.payload?.data;
      const courseEdit = state.courseList?.find(
        (course) => course?._id === courseId
      );
      const courseDel = courseEdit?.tracks?.findIndex(
        (course) => course._id === trackEdit?._id
      );
      if (courseDel !== -1) {
        courseEdit?.tracks?.splice(courseDel, 1);
      }

      state.courseList?.find((course, index) => {
        if (course?._id === courseId) {
          state.courseList[index] = courseEdit;
          return true;
        }
        return false;
      });
    },
    addLessonToCourse: (state, action) => {
      const courseId = action.payload?._id;
      const trackId = action.payload?.trackId;
      const data = action.payload?.data;
      const courseAdd = state.courseList?.find(
        (course) => course._id === courseId
      );
      const trackAdd = courseAdd?.tracks?.find(
        (track) => track?._id === trackId
      );
      data?.trackSteps?.map((i) => trackAdd?.trackSteps?.push(i));
    },
    deletedLessonInCourse: (state, action) => {
      const courseId = action.payload?._id;
      const trackId = action.payload?.trackId;
      const lessonId = action.payload?.lessonId;
      const courseDel = state.courseList?.find(
        (course) => course._id === courseId
      );
      const trackDel = courseDel?.tracks?.find(
        (track) => track?._id === trackId
      );
      const lessonDel = trackDel?.trackSteps?.findIndex(
        (lesson) => lesson === lessonId
      );
      if (lessonDel !== -1) {
        trackDel?.trackSteps?.splice(lessonDel, 1);
      }
    },
  },
});
export const {
  setCourse,
  setCourseId,
  updateCourse,
  resetCourse,
  setCourseList,
  updateCourseList,
  deletedCourseSlice,
  setTrack,
  updateTrack,
  resetTrack,
  setTrackStep,
  updateTrackStep,
  resetTrackStep,
  addTrackToCourseList,
  updateTrackCourseList,
  deletedTrackCourseList,
  addLessonToCourse,
  deletedLessonInCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
