import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { createEmployeeSchema } from "../schemas/createEmployeeSchema";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "../api/employeeApi";
import { clearEmployee } from "../redux/employeesSlice";

const CreateEmployeeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // not sure how to type this, will check later
  const formikRef: any = useRef();
  const { id, name } = useParams();
  const { employee, status } = useAppSelector((state) => state.employees);

  const formik = useFormik({
    innerRef: formikRef,
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      dateOfEmployment: "",
      homeAddress: {
        city: "",
        ZIPCode: "",
        addressLine1: "",
        addressLine2: "",
      },
      dateOfBirth: "",
    },
    validationSchema: createEmployeeSchema,
    onSubmit: async (values) => {
      console.log("Form data", values);
      let res;
      if (id || name) {
        res = await dispatch(updateEmployee(values));
      } else {
        res = await dispatch(createEmployee(values));
      }
      if (res?.type !== "employees/createEmployee/rejected") {
        formik.resetForm();
        dispatch(clearEmployee());
        navigate("/");
      }
    },
  });

  useEffect(() => {
    if (id) {
      if (status === "idle" && employee === null) {
        dispatch(getEmployeeById(id));
      } else if (status === "failed") {
        navigate("/");
      }
    }
  }, [id, status, navigate, employee, dispatch]);

  useEffect(() => {
    if (employee) {
      formik.setValues(employee);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employee]);

  useEffect(() => {
    return () => {
      dispatch(clearEmployee());
      formik.resetForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={true} onClose={() => {}}>
      <>
        <DialogTitle>
          {employee ? employee.name : "Create New Employee"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ mb: 1, mt: 1 }}
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="dateOfEmployment"
                  name="dateOfEmployment"
                  label="Date of Employment"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.dateOfEmployment}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dateOfEmployment &&
                    Boolean(formik.errors.dateOfEmployment)
                  }
                  helperText={
                    formik.touched.dateOfEmployment &&
                    formik.errors.dateOfEmployment
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="dateOfBirth"
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth)
                  }
                  helperText={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="homeAddress.city"
                  name="homeAddress.city"
                  label="City"
                  value={formik.values.homeAddress?.city}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.homeAddress?.city &&
                    Boolean(formik.errors.homeAddress?.city)
                  }
                  helperText={
                    formik.touched.homeAddress?.city &&
                    formik.errors.homeAddress?.city
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="homeAddress.ZIPCode"
                  name="homeAddress.ZIPCode"
                  label="ZIP Code"
                  value={formik.values.homeAddress?.ZIPCode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.homeAddress?.ZIPCode &&
                    Boolean(formik.errors.homeAddress?.ZIPCode)
                  }
                  helperText={
                    formik.touched.homeAddress?.ZIPCode &&
                    formik.errors.homeAddress?.ZIPCode
                  }
                />
              </Grid>
            </Grid>
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="homeAddress.addressLine1"
              name="homeAddress.addressLine1"
              label="Address Line 1"
              value={formik.values.homeAddress?.addressLine1}
              onChange={formik.handleChange}
              error={
                formik.touched.homeAddress?.addressLine1 &&
                Boolean(formik.errors.homeAddress?.addressLine1)
              }
              helperText={
                formik.touched.homeAddress?.addressLine1 &&
                formik.errors.homeAddress?.addressLine1
              }
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="homeAddress.addressLine2"
              name="homeAddress.addressLine2"
              label="Address Line 2"
              value={formik.values.homeAddress?.addressLine2}
              onChange={formik.handleChange}
              error={
                formik.touched.homeAddress?.addressLine2 &&
                Boolean(formik.errors.homeAddress?.addressLine2)
              }
              helperText={
                formik.touched.homeAddress?.addressLine2 &&
                formik.errors.homeAddress?.addressLine2
              }
            />
            <DialogActions>
              <Button onClick={() => navigate("/")} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {employee ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </>
    </Dialog>
  );
};

export default CreateEmployeeModal;
