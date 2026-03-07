import { Product } from "../entities/product.entity";

export interface IProductRepository {
  create(product: Product): Promise<void>
}