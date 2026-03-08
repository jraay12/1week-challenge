import { Sales } from "../entities/sales.entity";
import { Prisma } from "@prisma/client";

export interface ISalesRepository {
  create(sale: Sales, tx?: Prisma.TransactionClient): Promise<void>;
}
