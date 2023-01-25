import { AccountModel } from "@/domain/models";

export namespace CheckAccountByEmailRepository {
  export type Params = string;

  export type Result = Promise<AccountModel>;
}

export interface CheckAccountByEmailRepository {
  checkByEmail(
    email: CheckAccountByEmailRepository.Params
  ): CheckAccountByEmailRepository.Result;
}
