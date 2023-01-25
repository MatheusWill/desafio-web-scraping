import { Route } from "@/infra/http/utils";
import { makeConsultProductsController } from "@/main/factories/controllers";
import { makeConsultProductsMiddleware } from "@/main/factories/middlewares";
import { validationMiddlewareAdapter } from "@/main/adapters";
import { defaultConsult } from "@/validation";

export default function (route: Route) {
  route.get(
    "/products",
    validationMiddlewareAdapter(defaultConsult),
    makeConsultProductsMiddleware(),
    makeConsultProductsController()
  );
}
