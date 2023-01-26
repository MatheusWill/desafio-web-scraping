import { HttpDataProducts, HttpConsultProducts } from "@/data/usecases/http";
import {
  ConsultProductsService,
  RequestAdapter,
  httpConsultProducts as httpConsultProductsService,
} from "@/infra/http/service";
import { ConsultProductsMiddleware } from "@/presentation/middlewares";
import { BcryptAdapter } from "@/infra/criptography/bcrypt-adapter";
import { JwtAdapter } from "@/infra/criptography/jwt-adapter";
import { AccountRepository } from "@/infra/db";
import { DbAuthentication } from "@/data/usecases/authentication";

export const makeConsultProductsMiddleware = () => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter("TESTE");

  const accountRepository = new AccountRepository();

  const requestAdapter = new RequestAdapter(httpConsultProductsService);

  const consultProductsService = new ConsultProductsService(requestAdapter);

  const httpConsultProducts = new HttpConsultProducts(consultProductsService);

  const httpDataProducts = new HttpDataProducts();

  const dbAuthentication = new DbAuthentication(
    bcryptAdapter,
    accountRepository,
    jwtAdapter,
    accountRepository
  );

  return new ConsultProductsMiddleware(
    httpConsultProducts,
    httpDataProducts,
    dbAuthentication
  );
};
