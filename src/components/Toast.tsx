import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearToast } from "../redux/toastSlice";

const Toast: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, type } = useAppSelector((state) => state.toast);

  const handleClose = () => {
    dispatch(clearToast());
  };

  return (
    <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
