import fp from "fastify-plugin";
import { CustomerRepository } from "../infrastructure/repositories/CustomerRepository";
import { CreateCustomerUsecase } from "../application/usecases/CreateCustomerUsecase";
import { CustomerController } from "../interfaces/controllers/customer.controller";
import { BcryptPasswordHasher } from "../infrastructure/services/BcryptPasswordHasher";
import { FastifyPluginAsync } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    customerController: CustomerController;
  }
}

const diPlugin: FastifyPluginAsync = fp(async (fasitfy) => {
  const customerRepository = new CustomerRepository(fasitfy);
  const bcryptPasswordHasher = new BcryptPasswordHasher(fasitfy)
  const createCustomerUsecase = new CreateCustomerUsecase(customerRepository, bcryptPasswordHasher);
  const customerController = new CustomerController(createCustomerUsecase);

  fasitfy.decorate("customerController", customerController);
});

export default diPlugin;
