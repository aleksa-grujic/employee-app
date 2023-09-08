import { useEffect } from "react";
import { getDeletedEmployees, getEmployees } from "../api/employeeApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const useGetEmployees = (
  page: number,
  limit: number,
  employeeStatus: "active" | "deleted"
) => {
  const dispatch = useAppDispatch();
  const { employees, count, status, errors } = useAppSelector(
    (state) => state.employees
  );

  useEffect(() => {
    if (employeeStatus === "active") {
      dispatch(getEmployees({ page, limit }));
    } else {
      dispatch(getDeletedEmployees({ page, limit }));
    }
  }, [dispatch, page, limit, employeeStatus]);

  const isLoading = status === "loading";
  const isError = status === "failed";

  return { employees, count, isLoading, isError, errors };
};
