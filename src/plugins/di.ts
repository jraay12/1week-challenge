import fp from "fastify-plugin";
import { CustomerRepository } from "../infrastructure/repositories/CustomerRepository";
import { CreateCustomerUsecase } from "../application/usecases/CreateCustomerUsecase";
import { CustomerController } from "../interfaces/controllers/customer.controller";
import { BcryptPasswordHasher } from "../infrastructure/services/BcryptPasswordHasher";
import { FastifyPluginAsync } from "fastify";
import { Payload } from "../domain/services/ITokenService";
import { LoginUsecase } from "../application/usecases/LoginUsecase";
import { JwtService } from "../infrastructure/services/JwtService";
import { RefreshTokenUsecase } from "../application/usecases/RefreshTokenUsecase";
import { ProductController } from "../interfaces/controllers/product.controller";
import { ProductRepository } from "../infrastructure/repositories/ProductRepository";
import { CreateProductUsecase } from "../application/usecases/CreateProductUsecase";

declare module "fastify" {
  interface FastifyInstance {
    customerController: CustomerController;
    productController: ProductController;
    bcrypt: {
      hash(password: string, saltRounds?: number): Promise<string>;
      compare(password: string, passwordHash: string): Promise<boolean>;
    };
    jwt: {
      signAccessToken(payload: Payload): string;
      signRefreshToken(payload: Payload): string;
      verifyAccessToken(token: string): Payload;
      verifyRefreshToken(token: string): Payload;
    };
  }
}

const diPlugin: FastifyPluginAsync = fp(async (fastify) => {
  // Service
  const customerRepository = new CustomerRepository(fastify);
  const productRepository = new ProductRepository(fastify);
  const bcryptPasswordHasher = new BcryptPasswordHasher(fastify);
  const jwtService = new JwtService(fastify);

  // Usecase
  const createCustomerUsecase = new CreateCustomerUsecase(
    customerRepository,
    bcryptPasswordHasher,
  );
  const loginUsecase = new LoginUsecase(
    customerRepository,
    bcryptPasswordHasher,
    jwtService,
  );
  const refreshTokenUsecase = new RefreshTokenUsecase(
    jwtService,
    customerRepository,
  );
  const createProductUsecase = new CreateProductUsecase(productRepository);

  // Controllers
  const customerController = new CustomerController(
    createCustomerUsecase,
    loginUsecase,
    refreshTokenUsecase,
  );

  const productController = new ProductController(createProductUsecase);

  fastify.decorate("customerController", customerController);
  fastify.decorate("productController", productController);
});

export default diPlugin;
