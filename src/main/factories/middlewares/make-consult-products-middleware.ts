import { HttpDataProducts, HttpConsultProducts } from "@/data/usecases/http";
import {
  ConsultProductsService,
  RequestAdapter,
  httpConsultProducts as httpConsultProductsService,
} from "@/infra/http/service";
import { ConsultProductsMiddleware } from "@/presentation/middlewares";
import { logger } from "@/util";

export const makeConsultProductsMiddleware = () => {
  const requestAdapter = new RequestAdapter(httpConsultProductsService);

  const consultProductsService = new ConsultProductsService(requestAdapter);

  const httpConsultProducts = new HttpConsultProducts(consultProductsService);

  const httpDataProducts = new HttpDataProducts();

  return new ConsultProductsMiddleware(httpConsultProducts, httpDataProducts);
};
