import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    toast: toastReducer,
    // [employeeApi.reducerPath]: employeeApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(employeeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
