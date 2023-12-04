import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  student: null,
  studentId: null,
  studentList: null,
};
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },
    setStudent: (state, action) => {
      const {
        _id = "",
        email = "",
        tuition = "",
        klass = "",
        course = [],
        tuitionList = [],
      } = action.payload;
      state.student = {
        id: _id,
        email: email,
        tuition: tuition,
        klass: klass,
        course: course,
        tuitionList: tuitionList,
      };
    },
    updateStudent: (state, action) => {
      state.student = {
        ...state.student,
        tuition: action.payload.tuition,
        klass: action.payload.klass,
        course: action.payload.course,
        tuitionList: action.payload.tuitionList,
      };
    },
    resetStudent: (state) => {
      state.student = null;
    },
    setStudentList: (state, action) => {
      state.studentList = action.payload;
    },
    updateStudentList: (state, action) => {
      const studentEdit = action.payload;
      state.studentList?.find((student, index) => {
        if (student._id === studentEdit._id) {
          state.studentList[index] = studentEdit;
          return true;
        }
        return false;
      });
    },
    addStudentCourseList: (state, action) => {
      const studentId = action.payload?.id;
      const data = action.payload?.data;
      state.studentList?.find((student, index) => {
        if (student._id === studentId) {
          data?.map((id) =>
            state.studentList[index]?.course?.push({
              courseId: id,
              learningIndex: 0,
              percent: 0,
              isStarted: false,
              isSuccess: false,
            })
          );
          return true;
        }
        return false;
      });
    },
    updateStudentCourseList: (state, action) => {
      const studentId = action.payload?.id;
      const courseId = action.payload?.courseId;
      const courseEdit = action.payload?.data;
      const studentEdit = state.studentList?.find(
        (student) => student?._id === studentId
      );
      studentEdit?.course?.find((item, index) => {
        if (item?.courseId === courseId) {
          studentEdit.course[index] = courseEdit;
          return true;
        }
        return false;
      });
      state.studentList?.find((student, index) => {
        if (student?._id === studentId) {
          state.studentList[index] = studentEdit;
          return true;
        }
        return false;
      });
    },
    addStudentTuitionList: (state, action) => {
      const studentId = action.payload?.id;
      const data = action.payload?.data;
      state.studentList?.find((student, index) => {
        if (student._id === studentId) {
          state.studentList[index].tuitionList = data;
          return true;
        }
        return false;
      });
    },
    updateStudentTuitionList: (state, action) => {
      const studentId = action.payload?.id;
      const tuitionId = action.payload?.tuitionId;
      const tuitionEdit = action.payload?.data;
      const studentEdit = state.studentList?.find(
        (student) => student?._id === studentId
      );
      studentEdit?.tuitionList?.find((item, index) => {
        if (item?._id === tuitionId) {
          studentEdit.tuitionList[index] = tuitionEdit;
          return true;
        }
        return false;
      });
      state.studentList?.find((student, index) => {
        if (student?._id === studentId) {
          state.studentList[index] = studentEdit;
          return true;
        }
        return false;
      });
    },
    deleteStudentTuitionList: (state, action) => {
      const studentId = action.payload?.id;
      const tuitionId = action.payload?.tuitionId;
      const studentEdit = state.studentList?.find(
        (student) => student?._id === studentId
      );
      const tuitionDel = studentEdit.tuitionList?.findIndex(
        (tuition) => tuition?._id === tuitionId
      );
      if (tuitionDel !== -1) {
        studentEdit.tuitionList?.splice(tuitionDel, 1);
      }
      state.studentList?.find((student, index) => {
        if (student?._id === studentId) {
          state.studentList[index] = studentEdit;
          return true;
        }
        return false;
      });
    },
    deletedStudentSlice: (state, action) => {
      const delId = action.payload;
      const studentDel = state.studentList.findIndex(
        (student) => student._id === delId
      );
      if (studentDel !== -1) {
        state.studentList?.splice(studentDel, 1);
      }
    },
  },
});

export const {
  setStudentId,
  setStudent,
  updateStudent,
  resetStudent,
  setStudentList,
  updateStudentList,
  deletedStudentSlice,
  addStudentCourseList,
  updateStudentCourseList,
  addStudentTuitionList,
  updateStudentTuitionList,deleteStudentTuitionList
} = studentSlice.actions;
export default studentSlice.reducer;
