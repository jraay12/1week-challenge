import { CreateSaleDTO } from "../../application/dto/CreateSaleDTO";
import { CreateSalesUsecase } from "../../application/usecases/CreateSaleUsecase";
import { FastifyRequest, FastifyReply } from "fastify";

export class SalesController {
  constructor(private createSalesUsecase: CreateSalesUsecase) {}

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    const { productId } = request.params as { productId: string };
    const { quantity } = request.body as { quantity: number };

    const customerId = "01e77510-c1d4-40e1-a9b3-7c71fbfeb024";

    const input: CreateSaleDTO = {
      customerId,
      productId,
      quantity,
    };

    const sale = await this.createSalesUsecase.execute(input);
    reply.status(201).send({
      message: "Sale created successfully",
      result: sale,
    });
  };
}
