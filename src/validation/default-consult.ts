import * as yup from "yup";

export const defaultConsult = yup.object().shape({
  filter: yup.string().notRequired(),
});
