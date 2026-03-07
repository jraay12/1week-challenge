import { ProductResponseDTO } from "../../application/dto/ProductResponseDTO";
import { BadRequestError } from "../errors/BadRequestError";

export interface ProductProps {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  private props: ProductProps;
  private static readonly MAX_DESCRIPTION_LENGTH = 100;
  private static readonly MIN_PRICE_AMOUNT = 1;
  constructor(props: ProductProps) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  static create(
    props: Omit<ProductProps, "id" | "createdAt" | "updatedAt">,
  ): Product {
    if (
      props.description &&
      props.description?.length > this.MAX_DESCRIPTION_LENGTH
    ) {
      throw new BadRequestError("Description exceeds maximum length");
    }

    if (props.price == null) {
      throw new BadRequestError("Price is required");
    }

    if (props.price < this.MIN_PRICE_AMOUNT)
      throw new BadRequestError(
        `Price should be greater than ${this.MIN_PRICE_AMOUNT}`,
      );

    if (props.stock == null) {
      throw new BadRequestError("Stock is required");
    }

    if (props.stock < 0) {
      throw new BadRequestError("Stock cannot be negative");
    }

    return new Product({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  static fromPersistenceArray(data: ProductProps[]): Product[] {
    return data.map((product) => new Product(product));
  }

   toJSON(): ProductResponseDTO {
      return {
        id: this.id,
        name: this.name,
        price: this.price,
        stock: this.stock,
        description: this.description,
        createdAt: this.createdAt!,
        updatedAt: this.updatedAt!,
      };
    }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  get stock(): number {
    return this.props.stock;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get description(): string | undefined | null {
    return this.props.description
  }
}
