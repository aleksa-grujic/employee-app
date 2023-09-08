// src/store/toastSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ToastState {
  message: string;
  type: "success" | "error" | "info" | undefined;
}

const initialState: ToastState = {
  message: "",
  type: undefined,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearToast: (state) => {
      state.message = "";
      state.type = undefined;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
