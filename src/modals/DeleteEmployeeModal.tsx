import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useAppDispatch } from "../redux/hooks";
import { deleteEmployee } from "../api/employeeApi";

export const DeleteEmployeeModal = ({
  id,
  isOpen,
  onClose,
}: {
  id: string | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    if (id) {
      await dispatch(deleteEmployee(id));
      onClose();
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Employee</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this employee?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onDelete} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
