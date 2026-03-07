import { CreateProductDTO } from "../../application/dto/CreateProductDTO";
import { CreateProductUsecase } from "../../application/usecases/CreateProductUsecase";
import { FastifyRequest, FastifyReply } from "fastify";

export class ProductController {
  constructor(private createProductUsecase: CreateProductUsecase) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const input = request.body as CreateProductDTO;
    const product = await this.createProductUsecase.execute(input);
    reply
      .status(201)
      .send({ message: "Product successfully created", result: product });
  };
}
