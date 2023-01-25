import { Controller } from "@/presentation/protocols";
import { ok } from "@/presentation/utils/http-response";
import { DICTIONARY } from "@/util";

export class ConsultProductsController implements Controller {
  async handle(
    httpRequest: Controller.HttpRequest,
    [{ data }]: Controller.State
  ): Controller.Result {
    return ok(DICTIONARY.RESPONSE.MESSAGE.LOCALS.PRODUTOS, {
      data,
    });
  }
}
