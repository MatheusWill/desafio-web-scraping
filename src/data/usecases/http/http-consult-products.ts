import { ConsultProductsService } from "@/data/protocols/http";
import { ConsultProduct } from "@/domain/usecases";

export class HttpConsultProducts implements ConsultProduct {
  constructor(
    private readonly consultProductsService: ConsultProductsService
  ) {}
  async consult(): ConsultProduct.Result {
    const products = await this.consultProductsService.consult();

    return products;
  }
}
