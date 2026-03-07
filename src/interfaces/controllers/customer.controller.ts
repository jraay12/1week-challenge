import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerUsecase } from "../../application/usecases/CreateCustomerUsecase";
import { CreateCustomerDTO } from "../../application/dto/CreateCustomerDTO";
import { CustomerResponseDTO } from "../../application/dto/CustomerResponseDTO";

export class CustomerController {
  constructor(private createCustomerUsecase: CreateCustomerUsecase) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const input = request.body as CreateCustomerDTO;
    const customer: CustomerResponseDTO =
      await this.createCustomerUsecase.execute(input);
    reply.status(201).send({message: "customer successfully registered", result: customer});
  };
}
