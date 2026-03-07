import { Product } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { FastifyInstance } from "fastify";

export class ProductRepository implements IProductRepository {
  constructor(private fastify: FastifyInstance) {}

  async create(product: Product): Promise<void> {
    await this.fastify.prisma.product.create({
      data: product,
    });
  }
}
