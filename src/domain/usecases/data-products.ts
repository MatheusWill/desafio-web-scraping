import { ProductModel } from "@/domain/models";

export namespace DataProducts {
  export type Params = {
    filter?: string;
  };

  export type Result = Promise<ProductModel | null>;
}

export interface DataProducts {
  getDataProducts(params: DataProducts.Params): DataProducts.Result;
}
