import { DbCreateAccount } from "@/data/usecases/db";
import { DbAuthentication } from "@/data/usecases/authentication";
import { AccountRepository } from "@/infra/db";
import { CreateAccountMiddleware } from "@/presentation/middlewares";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter";

export const makeCreateAccountMiddleware = () => {
  const accountRepository = new AccountRepository();

  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter("TESTE");

  const dbCreateAccount = new DbCreateAccount(
    bcryptAdapter,
    accountRepository,
    accountRepository
  );

  const dbAuthentication = new DbAuthentication(
    bcryptAdapter,
    accountRepository,
    jwtAdapter,
    accountRepository
  );

  return new CreateAccountMiddleware(dbCreateAccount, dbAuthentication);
};
