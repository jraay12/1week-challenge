import { Product } from "../../domain/entities/product.entity";
import { IProductRepository } from "../../domain/repositories/IProductRepository";
import { CreateProductDTO } from "../dto/CreateProductDTO";
import { ProductResponseDTO } from "../dto/ProductResponseDTO";

export class CreateProductUsecase {
  constructor(private productRepo: IProductRepository) {}

  async execute(data: CreateProductDTO): Promise<ProductResponseDTO> {
    const product = Product.create(data);

    await this.productRepo.create(product);

    return product.toJSON();
  }
}
