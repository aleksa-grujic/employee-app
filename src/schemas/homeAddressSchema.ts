import * as yup from "yup";

export const homeAddressSchema = yup.object().shape({
  city: yup.string().required("City is required"),
  ZIPCode: yup.string().required("ZIP Code is required"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  addressLine2: yup.string().required("Address Line 2 is required"),
});
