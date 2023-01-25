import { CreateAccount, Authentication } from "@/domain/usecases";
import { HttpRequest, Middleware } from "@/presentation/protocols";
import { serverError, conflict } from "@/presentation/utils";
import { logger } from "@/util";

export class CreateAccountMiddleware implements Middleware {
  constructor(
    private readonly createAccount: CreateAccount,
    private readonly authentication: Authentication
  ) {}

  async handle(
    httpRequest: HttpRequest,
    [, setState]: Middleware.State,
    next: Function
  ): Middleware.Result {
    try {
      const { name, email, password } = httpRequest.body;

      const account = await this.createAccount.create({
        name,
        email,
        password,
      });

      const accessToken = await this.authentication.auth({
        email,
        password,
      });

      setState({ account, accessToken });

      return next();
    } catch (error) {
      logger.log(error);
      switch (error.message) {
        case "ACCOUNT_EMAIL_EXISTING":
          return conflict("Email já existente.");
        default:
          return serverError(error);
      }
    }
  }
}
