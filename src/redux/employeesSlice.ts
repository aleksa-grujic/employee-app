import { createSlice } from "@reduxjs/toolkit";
import { createEmployeeSchema } from "../schemas/createEmployeeSchema";
import {
  createEmployee,
  deleteEmployee,
  getDeletedEmployees,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "../api/employeeApi";
import * as yup from "yup";

interface IEmployee extends yup.InferType<typeof createEmployeeSchema> {
  _id: string;
  isDeleted: boolean;
  deletedAt: string;
  __v: number;
}
interface IState {
  employees: IEmployee[];
  count: number;
  status: "idle" | "loading" | "failed";
  errors: string[];
  employee: IEmployee | null;
}

const initialState: IState = {
  employees: [],
  count: 0,
  status: "idle",
  errors: [],
  employee: null,
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearEmployee: (state) => {
      state.employee = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employees = action.payload.employees;
      state.count = action.payload.count;
      state.status = "idle";
      state.errors = [];
    });
    builder.addCase(getEmployees.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getEmployees.rejected, (state, action) => {
      state.status = "failed";
      state.errors = action.payload as string[];
    });
    builder.addCase(getDeletedEmployees.fulfilled, (state, action) => {
      state.employees = action.payload.employees;
      state.count = action.payload.count;
      state.status = "idle";
      state.errors = [];
    });
    builder.addCase(getDeletedEmployees.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getDeletedEmployees.rejected, (state, action) => {
      state.status = "failed";
      state.errors = action.payload as string[];
    });
    builder.addCase(getEmployeeById.fulfilled, (state, action) => {
      state.employee = action.payload;
      state.status = "idle";
      state.errors = [];
    });
    builder.addCase(getEmployeeById.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getEmployeeById.rejected, (state, action) => {
      state.status = "failed";
      state.errors = action.payload as string[];
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.employees.push(action.payload);
      state.count++;
      state.status = "idle";
      state.errors = [];
    });
    builder.addCase(createEmployee.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.status = "failed";
      state.errors = action.payload as string[];
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      const index = state.employees.findIndex(
        (employee) => employee._id === action.payload._id
      );
      state.employees[index] = action.payload;
      state.status = "idle";
      state.errors = [];
    });
    builder.addCase(updateEmployee.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.status = "failed";
      state.errors = action.payload as string[];
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee._id !== action.payload._id
      );
      state.count--;
      state.status = "idle";
      state.errors = [];
    });
    builder.addCase(deleteEmployee.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.status = "failed";
      state.errors = action.payload as string[];
    });
  },
});

export const { clearEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
