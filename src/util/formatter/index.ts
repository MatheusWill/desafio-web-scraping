import {
  formateCamelCaseKeysForSnakeCase,
  formateSnakeCaseKeysForCamelCase,
  formateToLowerCase,
} from "@badass-team-code/formatted-cases-words";
import { ValidationError } from "yup";

export const convertSnakeCaseKeysToCamelCase = formateSnakeCaseKeysForCamelCase;
export const convertCamelCaseKeysToSnakeCase = formateCamelCaseKeysForSnakeCase;
export const convertToLowerCase = formateToLowerCase;

export interface PrettyYupError {
  message: string;
  param: string | undefined;
}

export function formatYupError(error: ValidationError): PrettyYupError[] {
  return error.inner.map((item) => ({
    message: item.message,
    param: convertCamelCaseKeysToSnakeCase(item.path),
  }));
}
