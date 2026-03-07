import fp from "fastify-plugin";
import { CustomerRepository } from "../infrastructure/repositories/CustomerRepository";
import { CreateCustomerUsecase } from "../application/usecases/CreateCustomerUsecase";
import { CustomerController } from "../interfaces/controllers/customer.controller";
import { BcryptPasswordHasher } from "../infrastructure/services/BcryptPasswordHasher";
import { FastifyPluginAsync } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    customerController: CustomerController;
    bcrypt: {
      hash(password: string, saltRounds?: number): Promise<string>;
      compare(password: string, passwordHash: string): Promise<boolean>;
    };
  }
}

const diPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const customerRepository = new CustomerRepository(fastify);
  const bcryptPasswordHasher = new BcryptPasswordHasher(fastify);
  const createCustomerUsecase = new CreateCustomerUsecase(
    customerRepository,
    bcryptPasswordHasher,
  );
  const customerController = new CustomerController(createCustomerUsecase);

  fastify.decorate("customerController", customerController);
});

export default diPlugin;
