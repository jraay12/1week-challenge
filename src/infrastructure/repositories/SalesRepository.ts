import { Prisma } from "@prisma/client";
import { Sales } from "../../domain/entities/sales.entity";
import { ISalesRepository } from "../../domain/repositories/ISalesRepository";
import { FastifyInstance } from "fastify";

export class SalesRepository implements ISalesRepository {
  constructor(private fastify: FastifyInstance) {}

  async create(sale: Sales, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx ?? this.fastify.prisma;

    await client.sales.create({
      data: {
        id: sale.id,
        customerId: sale.customerId,
        productId: sale.productId,
        quantity: sale.quantity,
        saleDate: sale.saleDate,
        createdAt: sale.createdAt,
        updatedAt: sale.updatedAt,
      },
    });
  }
}
