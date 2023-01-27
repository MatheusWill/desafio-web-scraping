import {
  ConsultProductsService as ConsultProductsServiceProtocol,
  HttpClient,
} from "@/data/protocols/http";
import { CONSTANTS } from "./utils/constants";

const URL = CONSTANTS.URL;

export class ConsultProductsService implements ConsultProductsServiceProtocol {
  constructor(private readonly httpClient: HttpClient) {}

  async consult(): ConsultProductsServiceProtocol.Result {
    const result = await this.httpClient.request({
      method: "GET",
      url: URL,
    });

    if (result.statusCode !== 200 || !result.body) return null;

    return { ...result.body, URL };
  }
}
