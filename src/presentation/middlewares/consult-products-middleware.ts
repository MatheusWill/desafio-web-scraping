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
      const { url, filter } = httpRequest.body;

      const resultConsultProduct = await this.consultProduct.consult(url);

      if (!resultConsultProduct) throw new Error("PRODUCTS_NOT_VALID");

      const dataProducts = await this.dataProducts.getDataProducts({
        url,
        filter,
      });

      if (!dataProducts || dataProducts.length === 0)
        throw new Error("PRODUCTS_NOT_FOUND");

      setState({ data: dataProducts });

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
