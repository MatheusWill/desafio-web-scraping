import { Route } from "@/infra/http/utils";
import { makeCreateAccountController } from "@/main/factories/controllers";
import { makeCreateAccountMiddleware } from "@/main/factories/middlewares";
import { validationMiddlewareAdapter } from "@/main/adapters";
import { defaultAccount } from "@/validation";

export default function (route: Route) {
  route.post(
    "/account",
    validationMiddlewareAdapter(defaultAccount),
    makeCreateAccountMiddleware(),
    makeCreateAccountController()
  );
}
