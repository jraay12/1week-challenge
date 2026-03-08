import { Prisma } from "@prisma/client";
import { Sales } from "../../domain/entities/sales.entity";
import { ISalesRepository } from "../../domain/repositories/ISalesRepository";
import { FastifyInstance } from "fastify";
import { MonthlySalesDTO } from "../../application/dto/MonthlySalesDTO";

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

  async getSalesByMonth(
    month: number,
    year: number,
    tx?: Prisma.TransactionClient,
  ): Promise<MonthlySalesDTO[]> {
    const client = tx ?? this.fastify.prisma;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const sales = await client.sales.findMany({
      where: {
        saleDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: {
        saleDate: "desc",
      },
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    return sales.map((sale) => ({
      id: sale.id,
      customerName: sale.customer.name,
      productName: sale.product.name,
      quantity: sale.quantity,
      saleDate: sale.saleDate,
    }));
  }
}
