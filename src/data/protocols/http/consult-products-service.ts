export namespace ConsultProductsService {
  export type Result = Promise<{ data: any; url: string } | null>;
}

export interface ConsultProductsService {
  consult(url: string): ConsultProductsService.Result;
}
