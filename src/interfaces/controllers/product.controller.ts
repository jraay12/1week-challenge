import { CreateProductDTO } from "../../application/dto/CreateProductDTO";
import { CreateProductUsecase } from "../../application/usecases/CreateProductUsecase";
import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllProductUsecase } from "../../application/usecases/GetAllProductUsecase";
import { GetProductQueryDTO } from "../../application/dto/GetProductQueryDTO";
import { AddStockUsecase } from "../../application/usecases/AddStockUsecase";
export class ProductController {
  constructor(
    private createProductUsecase: CreateProductUsecase,
    private getAllProductUsecase: GetAllProductUsecase,
    private addStockUsecase: AddStockUsecase,
  ) {}

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

  getAll = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const query = request.query as GetProductQueryDTO;
    const page = query.page ? parseInt(query.page, 10) : 1;
    const limit = query.limit ? parseInt(query.limit, 10) : 10;

    const product = await this.getAllProductUsecase.execute(page, limit);
    reply.status(200).send({ results: product });
  };

  addStock = async (request: FastifyRequest, reply: FastifyReply) => {
    const { productId } = request.params as { productId: string };
    const { quantity } = request.body as { quantity: number };

    const { productName } = await this.addStockUsecase.execute(
      productId,
      quantity,
    );
    reply
      .status(200)
      .send({
        message: `Successfully added ${quantity} units to ${productName} stock.`,
      });
  };
}
