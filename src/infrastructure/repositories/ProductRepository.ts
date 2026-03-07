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

  async getAllProduct(
    page: number = 1,
    limit: number = 10,
  ): Promise<Product[]> {
    const skip = (page - 1) * limit;
    const product = await this.fastify.prisma.product.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        stock: {
          gt: 0,
        },
      },
    });

    return Product.fromPersistenceArray(product);
  }
}
