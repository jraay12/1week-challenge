import { Product } from "../entities/product.entity";

export interface IProductRepository {
  create(product: Product): Promise<void>;
  getAllProduct(page: number, limit: number): Promise<Product[]>;
  addStock(product_id: string, quantity: number): Promise<void>;
  findById(product_id: string): Promise<Product | null>
}
