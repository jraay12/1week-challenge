import { Sales } from "../../domain/entities/sales.entity";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { ISalesRepository } from "../../domain/repositories/ISalesRepository";
import { CreateSaleDTO } from "../dto/CreateSaleDTO";
import { FastifyInstance } from "fastify";

export class CreateSalesUsecase {
  constructor(
    private salesRepo: ISalesRepository,
    private productRepo: IProductRepository,
    private fastify: FastifyInstance,
  ) {}

  async execute(data: CreateSaleDTO) {
    await this.fastify.prisma.$transaction(async (tx) => {
      const product = await this.productRepo.findById(data.productId, tx);

      if (!product) throw new NotFoundError("Product not found.");

      if (data.quantity > product.stock)
        throw new BadRequestError("Insufficient stock");

      const sales = Sales.create(data);
      await this.salesRepo.create(sales);
      await this.productRepo.deductStock(data.productId, data.quantity)
    });
  }
}
