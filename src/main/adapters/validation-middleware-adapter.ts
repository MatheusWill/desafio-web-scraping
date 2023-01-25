import { YupSchema } from "@/presentation/protocols";
import { badRequest } from "@/presentation/utils/http-response";
import { convertCamelCaseKeysToSnakeCase, formatYupError } from "@/util";
import { NextFunction, Request, Response } from "express";

export function validationMiddlewareAdapter(
  schema: YupSchema
): (req: Request, res: Response, next: NextFunction) => Promise<any> {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    try {
      const httpRequestInSnakeCase =
        convertCamelCaseKeysToSnakeCase(httpRequest);

      await schema.validate(httpRequestInSnakeCase, {
        abortEarly: false,
      });

      return next();
    } catch (error) {
      const bad = badRequest(formatYupError(error));
      return res.status(bad.statusCode).json(bad.body);
    }
  };
}
