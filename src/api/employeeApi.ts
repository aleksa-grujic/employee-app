// I want to create base api with axios and to make calls with error handling with createAsyncThunk
import { BASE_URL } from "../constants";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToast } from "../redux/toastSlice";

export type CustomError = {
  response: {
    data: {
      error: string;
      message: Array<string>;
      statusCode: number;
    };
  };
};
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (params: { page: number; limit: number }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/employees?page=${params.page}&limit=${params.limit}`
      );
      return response.data;
    } catch (error) {
      const customError = error as CustomError;
      const messages = customError.response.data.message;
      return thunkAPI.rejectWithValue(messages);
    }
  }
);

export const getDeletedEmployees = createAsyncThunk(
  "employees/getDeletedEmployees",
  async (params: { page: number; limit: number }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/employees/deleted?page=${params.page}&limit=${params.limit}`
      );
      return response.data;
    } catch (error) {
      const customError = error as CustomError;
      const messages = customError.response.data.message;
      return thunkAPI.rejectWithValue(messages);
    }
  }
);

export const getEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${BASE_URL}/employees/id/${id}`);
      return response.data;
    } catch (error) {
      const customError = error as CustomError;
      const messages = customError.response.data.message;
      if (Array.isArray(messages)) {
        for (const err of messages) {
          dispatch(setToast({ message: err, type: "error" }));
        }
      } else {
        dispatch(setToast({ message: messages, type: "error" }));
      }
      return rejectWithValue(messages);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employee: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/employees`, employee);
      dispatch(setToast({ message: "Employee created", type: "success" }));
      return response.data;
    } catch (error) {
      const customError = error as CustomError;
      console.log(customError);
      const messages = customError.response.data.message;
      if (Array.isArray(messages)) {
        for (const err of messages) {
          dispatch(setToast({ message: err, type: "error" }));
        }
      } else {
        dispatch(setToast({ message: messages, type: "error" }));
      }

      return rejectWithValue(messages);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (employee: any, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/employees/${employee._id}`,
        employee
      );
      dispatch(setToast({ message: "Employee updated", type: "success" }));
      return response.data;
    } catch (error) {
      const customError = error as CustomError;
      const messages = customError.response.data.message;
      if (Array.isArray(messages)) {
        for (const err of messages) {
          dispatch(setToast({ message: err, type: "error" }));
        }
      } else {
        dispatch(setToast({ message: messages, type: "error" }));
      }
      return rejectWithValue(messages);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/employees/soft-delete/${id}`
      );
      dispatch(setToast({ message: "Employee deleted", type: "success" }));
      return response.data;
    } catch (error) {
      const customError = error as CustomError;
      const messages = customError.response.data.message;
      if (Array.isArray(messages)) {
        for (const err of messages) {
          dispatch(setToast({ message: err, type: "error" }));
        }
      } else {
        dispatch(setToast({ message: messages, type: "error" }));
      }
      return rejectWithValue(messages);
    }
  }
);
