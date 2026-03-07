import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { ProductResponseDTO } from "../dto/ProductResponseDTO";

export class GetAllProductUsecase {
  constructor(private productRepo: IProductRepository) {}

  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<ProductResponseDTO[]> {
    const product = await this.productRepo.getAllProduct(page, limit);

    return product.map((product) => product.toJSON());
  }
}
