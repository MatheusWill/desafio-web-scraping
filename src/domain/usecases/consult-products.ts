export namespace ConsultProduct {
  export type Result = Promise<{ data: any } | null>;
}

export interface ConsultProduct {
  consult(url: string): ConsultProduct.Result;
}
