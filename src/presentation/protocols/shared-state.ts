import { ProductModel, AccountModel } from "@/domain/models";

export type SharedState = {
  data?: ProductModel;
  account: AccountModel;
  accessToken?: string;
};
