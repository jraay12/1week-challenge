import fp from "fastify-plugin"
import { CustomerRepository } from "../infrastructure/CustomerRepository"
import { CreateCustomerUsecase } from "../application/usecases/CreateCustomerUsecase"
import { CustomerController } from "../interfaces/controllers/customer.controller"
import { FastifyPluginAsync } from "fastify"


declare module "fastify" {
  interface FastifyInstance {
    customerController: CustomerController;
  }
}


const diPlugin: FastifyPluginAsync =  fp(async (fasitfy) => {
  const customerRepository = new CustomerRepository(fasitfy)  
  const createCustomerUsecase = new CreateCustomerUsecase(customerRepository)
  const customerController = new CustomerController(createCustomerUsecase)
  

  fasitfy.decorate("customerController", customerController)
})

export default diPlugin