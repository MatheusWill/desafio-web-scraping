import { ProductModel } from "@/domain/models";

export namespace DataProductsService {
  export type Result = Promise<ProductModel | null>;
}

export interface DataProductsService {
  getDataProducts(params: any): DataProductsService.Result;
}
