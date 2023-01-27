export namespace ConsultProduct {
  export type Result = Promise<{ data: any } | null>;
}

export interface ConsultProduct {
  consult(): ConsultProduct.Result;
}
