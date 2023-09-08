// src/pages/__tests__/EmployeeRecordsPage.test.tsx
import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import EmployeeRecordsPage from "./EmployeeRecordsPage";
import employeeReducer from "../redux/employeesSlice";

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});

const setup = () =>
  render(
    <Provider store={store}>
      <Router>
        <EmployeeRecordsPage />
      </Router>
    </Provider>
  );

describe("Employee Records Page", () => {
  test("it renders Employee Records Page correctly", () => {
    setup();
    expect(screen.getByText("Employee Records")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Deleted")).toBeInTheDocument();
  });

  test("it handles status filter toggle buttons correctly", () => {
    setup();
    const activeButton = screen.getByLabelText("active");
    const deletedButton = screen.getByLabelText("deleted");

    expect(activeButton).toBeInTheDocument();
    expect(deletedButton).toBeInTheDocument();

    fireEvent.click(deletedButton);
    expect(deletedButton).toHaveClass("Mui-selected");

    fireEvent.click(activeButton);
    expect(activeButton).toHaveClass("Mui-selected");
  });

  // Additional tests can be added here to cover other functionalities (e.g., table rendering, pagination, etc.)
});
