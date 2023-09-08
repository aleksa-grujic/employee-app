// Path: src/api/employeeApi.test.ts
import { getEmployees } from "./employeeApi";
import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../redux/employeesSlice";
import toastReducer from "../redux/toastSlice";
import axios from "axios";

jest.mock("axios");

describe("getEmployees", () => {
  it("should return employees", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedStore = configureStore({
      reducer: {
        employees: employeesReducer,
        toast: toastReducer,
      },
    });

    const mockedResponse = {
      employees: [
        {
          _id: "60d1a6b5b2a2a509d8eb0a5f",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@gmail",
          phone: "1234567890",
          address: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "12345",
          isDeleted: false,
          deletedAt: null,
          __v: 0,
        },
      ],
      count: 1,
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    const result = await mockedStore.dispatch(
      getEmployees({ page: 1, limit: 10 })
    );
    console.log(result.payload);
    expect(result.payload).toEqual(mockedResponse);
  });
  it("should return error messages", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedStore = configureStore({
      reducer: {
        employees: employeesReducer,
        toast: toastReducer,
      },
    });

    const mockedResponse = {
      response: {
        data: {
          error: "Bad Request",
          message: ["Invalid page"],
          statusCode: 400,
        },
      },
    };

    mockedAxios.get.mockRejectedValueOnce(mockedResponse);
    const result = await mockedStore.dispatch(
      getEmployees({ page: 1, limit: 10 })
    );
    expect(result.payload).toEqual(mockedResponse.response.data.message);
  });
});
