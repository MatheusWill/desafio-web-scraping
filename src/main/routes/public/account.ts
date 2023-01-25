import { Route } from "@/infra/http/utils";
import { makeCreateAccountController } from "@/main/factories/controllers";
import { makeCreateAccountMiddleware } from "@/main/factories/middlewares";

export default function (route: Route) {
  route.post(
    "/account",
    makeCreateAccountMiddleware(),
    makeCreateAccountController()
  );
}
