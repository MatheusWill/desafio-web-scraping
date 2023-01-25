import { Controller } from "@/presentation/protocols";
import { ok } from "@/presentation/utils/http-response";
import { DICTIONARY } from "@/util";

export class CreateAccountController implements Controller {
  async handle(
    httpRequest: Controller.HttpRequest,
    [{ account, accessToken }]: Controller.State
  ): Controller.Result {
    return ok(DICTIONARY.RESPONSE.MESSAGE.OK, {
      account,
      accessToken,
    });
  }
}
