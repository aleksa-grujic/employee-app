import * as yup from "yup";
import { homeAddressSchema } from "./homeAddressSchema";

export const createEmployeeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  homeAddress: homeAddressSchema,
  dateOfEmployment: yup.string().required("Date of Employment is required"),
  dateOfBirth: yup.string().required("Date of Birth is required"),
});
