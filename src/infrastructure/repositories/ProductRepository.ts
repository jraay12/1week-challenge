import { Product } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { FastifyInstance } from "fastify";
import { Prisma } from "@prisma/client";

export class ProductRepository implements IProductRepository {
  constructor(private fastify: FastifyInstance) {}

  async create(product: Product, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx ?? this.fastify.prisma;

    await client.product.create({
      data: product,
    });
  }

  async getAllProduct(
    page: number = 1,
    limit: number = 10,
    tx?: Prisma.TransactionClient,
  ): Promise<Product[]> {
    const client = tx ?? this.fastify.prisma;

    const skip = (page - 1) * limit;

    const product = await client.product.findMany({
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

  async addStock(
    product_id: string,
    quantity: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.fastify.prisma;

    await client.product.update({
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

  async findById(
    product_id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Product | null> {
    const client = tx ?? this.fastify.prisma;

    const product = await client.product.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!product) return null;

    return Product.fromPersistence(product);
  }

  async deductStock(
    product_id: string,
    quantity: number,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const client = tx ?? this.fastify.prisma;
    await client.product.update({
      where: {
        id: product_id,
      },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }
}
