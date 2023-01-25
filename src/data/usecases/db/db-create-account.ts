import { CreateAccount } from "@/domain/usecases";
import {
  CreateAccountRepository,
  CheckAccountByEmailRepository,
} from "@/data/protocols/db";
import { Hasher } from "@/data/protocols/criptography";

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly encrypter: Hasher,
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async create(params: CreateAccount.Params): CreateAccount.Result {
    const account = await this.checkAccountByEmailRepository.checkByEmail(
      params.email
    );

    if (account) throw new Error("ACCOUNT_EMAIL_EXISTING");

    const hashedPassword = await this.encrypter.hash(params.password);

    const newAccount = await this.createAccountRepository.create(
      Object.assign({}, params, { password: hashedPassword })
    );

    return newAccount;
  }
}
