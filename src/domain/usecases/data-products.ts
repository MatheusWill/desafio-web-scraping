import { ProductModel } from "@/domain/models";

export namespace DataProducts {
  export type Params = {
    data: any;
    url: string;
  };

  export type Result = Promise<ProductModel | null>;
}

export interface DataProducts {
  getDataProducts(params: any): DataProducts.Result;
}
