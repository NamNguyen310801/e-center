import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  salary: null,
  salaryList: null,
};
const salarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    setSalary: (state, action) => {
      const {
        _id = "",
        name = "",
        basicSalary = 0,
        bonusSalary = 0,
      } = action.payload;
      state.salary = {
        id: _id,
        name: name,
        basicSalary: basicSalary,
        bonusSalary: bonusSalary,
      };
    },
    updateSalary: (state, action) => {
      state.salary = {
        ...state.salary,
        name: action.payload.name,
        basicSalary: action.payload.basicSalary,
        bonusSalary: action.payload.bonusSalary,
      };
    },
    resetSalary: (state) => {
      state.salary = null;
    },
    setSalaryList: (state, action) => {
      state.salaryList = action.payload;
    },
    updateSalaryList: (state, action) => {
      const salaryEdit = action.payload;
      state.salaryList?.find((salary, index) => {
        if (salary._id === salaryEdit._id) {
          state.salaryList[index] = salaryEdit;
          return true;
        }
        return false;
      });
    },
    deletedSalarySlice: (state, action) => {
      const delId = action.payload;
      const salaryDel = state.salaryList.findIndex(
        (salary) => salary._id === delId
      );
      if (salaryDel !== -1) {
        state.salaryList?.splice(salaryDel, 1);
      }
    },
  },
});

export const {
  setSalary,
  updateSalary,
  resetSalary,
  setSalaryList,
  updateSalaryList,
  deletedSalarySlice,
} = salarySlice.actions;
export default salarySlice.reducer;
