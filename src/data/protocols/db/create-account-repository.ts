import { AccountModel } from "@/domain/models";

export namespace CreateAccountRepository {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = Promise<Omit<Params, "password">>;
}

export interface CreateAccountRepository {
  create(
    params: CreateAccountRepository.Params
  ): CreateAccountRepository.Result;
}
