import * as yup from "yup";

export const defaultConsult = yup.object().shape({
  url: yup
    .string()
    .matches(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:\\/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/,
      "A url está inválida"
    )
    .nullable(true)
    .required("A url é obrigatória"),

  filter: yup.string().notRequired(),
});
