import { HashComparer, Encrypter } from "@/data/protocols/criptography";
import { Authentication } from "@/domain/usecases";
import { AuthenticationModel } from "@/domain/models";
import {
  CheckAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from "@/data/protocols/db";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly hashComparer: HashComparer,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    const account = await this.checkAccountByEmailRepository.checkByEmail(
      authentication.email
    );

    if (!account) throw new Error("ACCOUNT_NOT_EXIST");

    const isValid = await this.hashComparer.compare(
      authentication.password,
      account.password
    );

    if (!isValid) throw new Error("NOT_VALID");

    const accessToken = await this.encrypter.encrypt(account.id);
    await this.updateAccessTokenRepository.updateAccessToken(
      account.id,
      accessToken
    );

    return accessToken;
  }
}
