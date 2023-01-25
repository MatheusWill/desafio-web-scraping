import { Route } from "@/infra/http/utils";
import { makeConsultProductsController } from "@/main/factories/controllers";
import { makeConsultProductsMiddleware } from "@/main/factories/middlewares";

export default function (route: Route) {
  route.get(
    "/products",
    makeConsultProductsMiddleware(),
    makeConsultProductsController()
  );
}
