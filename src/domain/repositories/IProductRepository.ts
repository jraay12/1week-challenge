import { Product } from "../entities/product.entity";
import { Prisma } from "@prisma/client";

export interface IProductRepository {
  create(product: Product, tx?: Prisma.TransactionClient): Promise<void>;

  getAllProduct(
    page: number,
    limit: number,
    tx?: Prisma.TransactionClient
  ): Promise<Product[]>;

  addStock(
    product_id: string,
    quantity: number,
    tx?: Prisma.TransactionClient
  ): Promise<void>;

  findById(
    product_id: string,
    tx?: Prisma.TransactionClient
  ): Promise<Product | null>;

  deductStock(product_id: string, quantity: number, tx?: Prisma.TransactionClient): Promise<void>
}