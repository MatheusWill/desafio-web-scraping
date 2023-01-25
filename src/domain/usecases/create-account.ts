import { AccountModel } from "@/domain/models";

export namespace CreateAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = Promise<Omit<Params, "password"> | null>;
}

export interface CreateAccount {
  create(params: CreateAccount.Params): CreateAccount.Result;
}
