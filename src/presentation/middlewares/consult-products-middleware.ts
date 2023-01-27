import {
  ConsultProduct,
  DataProducts,
  Authentication,
} from "@/domain/usecases";
import { HttpRequest, Middleware } from "@/presentation/protocols";
import {
  serverError,
  notFound,
  unprocessableEntity,
  unauthorized,
  badRequest,
} from "@/presentation/utils";
import { logger } from "@/util";

export class ConsultProductsMiddleware implements Middleware {
  constructor(
    private readonly consultProduct: ConsultProduct,
    private readonly dataProducts: DataProducts,
    private readonly authentication: Authentication
  ) {}
  async handle(
    httpRequest: HttpRequest,
    [, setState]: Middleware.State,
    next: Function
  ): Middleware.Result {
    try {
      const filter = httpRequest.query.filter as string;
      const email = httpRequest.headers.email as string;
      const password = httpRequest.headers.password as string;

      const authentication = await this.authentication.auth({
        email,
        password,
      });

      if (!authentication) throw new Error("AUTHENTICATION_INVALID");

      const resultConsultProduct = await this.consultProduct.consult();

      if (!resultConsultProduct) throw new Error("PRODUCTS_NOT_VALID");

      const dataProducts = await this.dataProducts.getDataProducts({
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
        case "AUTHENTICATION_INVALID":
          return unauthorized("Não autorizado.");
        case "ACCOUNT_NOT_EXIST":
          return badRequest("Ops, ocorreram alguns erros de validações");
        default:
          return serverError(error);
      }
    }
  }
}
