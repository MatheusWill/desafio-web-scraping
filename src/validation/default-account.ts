import { DICTIONARY } from "@/util/constants";
import * as yup from "yup";

const { YUP } = DICTIONARY;

export const defaultAccount = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),

  email: yup
    .string()
    .trim()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Valor inserido não corresponde a um e-mail"
    )
    .nullable(true)
    .required("O e-mail é obrigatório"),

  password: yup.string().required("A senha é obrigatória"),
});
