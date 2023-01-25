import {
  ConsultProductsService as ConsultProductsServiceProtocol,
  HttpClient,
} from "@/data/protocols/http";

export class ConsultProductsService implements ConsultProductsServiceProtocol {
  constructor(private readonly httpClient: HttpClient) {}

  async consult(url: string): ConsultProductsServiceProtocol.Result {
    const result = await this.httpClient.request({
      method: "GET",
      url,
    });

    if (result.statusCode !== 200 || !result.body) return null;

    return { ...result.body, url };
  }
}
