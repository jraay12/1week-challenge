import { NotFoundError } from "../../domain/errors/NotFoundError";
import { IProductRepository } from "../../domain/repositories/IProductRepository";

export class AddStockUsecase {
  constructor(private productRepo: IProductRepository) {}

  async execute(
    product_id: string,
    quantity: number,
  ): Promise<{ productName: string}> {
    const product = await this.productRepo.findById(product_id);

    if (!product) throw new NotFoundError("Product not found.");

    product.addStock(quantity);

    await this.productRepo.addStock(product_id, quantity);

    return { productName: product.name };
  }
}
