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

  async addStock(product_id: string, quantity: number): Promise<void> {
    await this.fastify.prisma.product.update({
      where: {
        id: product_id,
      },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
  }

  async findById(product_id: string): Promise<Product | null> {
    const product = await this.fastify.prisma.product.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!product) return null;

    return Product.fromPersistence(product);
  }
}
