import { ConsultProduct, DataProducts } from "@/domain/usecases";
import { HttpRequest, Middleware } from "@/presentation/protocols";
import {
  serverError,
  notFound,
  unprocessableEntity,
} from "@/presentation/utils";
import { logger } from "@/util";

export class ConsultProductsMiddleware implements Middleware {
  constructor(
    private readonly consultProduct: ConsultProduct,
    private readonly dataProducts: DataProducts
  ) {}
  async handle(
    httpRequest: HttpRequest,
    [, setState]: Middleware.State,
    next: Function
  ): Middleware.Result {
    try {
      const { url } = httpRequest.body;

      const products = await this.consultProduct.consult(url);

      if (!products) throw new Error("PRODUCTS_NOT_VALID");

      const data = await this.dataProducts.getDataProducts(products);

      if (!data) throw new Error("PRODUCTS_NOT_FOUND");

      setState(data);

      return next();
    } catch (error) {
      logger.log(error);
      switch (error.message) {
        case "PRODUCTS_NOT_VALID":
          return unprocessableEntity("Não foi possível validar o link");
        case "PRODUCTS_NOT_FOUND":
          return notFound("Não foi possível localizar os produtos");
        default:
          return serverError(error);
      }
    }
  }
}
