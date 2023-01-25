import { ConsultProductsService } from "@/data/protocols/http";
import { ConsultProduct } from "@/domain/usecases";

export class HttpConsultProducts implements ConsultProduct {
  constructor(
    private readonly consultProductsService: ConsultProductsService
  ) {}
  async consult(url: string): ConsultProduct.Result {
    const products = await this.consultProductsService.consult(url);

    return products;
  }
}
