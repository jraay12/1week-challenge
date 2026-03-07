import { BadRequestError } from "../errors/BadRequestError";
import crypto from "crypto";

export interface SaleProps {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
  saleDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Sales {
  private props: SaleProps;
  constructor(props: SaleProps) {
    this.props = {
      ...props,
      saleDate: props.saleDate ?? new Date(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  static create(
    props: Omit<SaleProps, "id" | "createdAt" | "updatedAt">,
  ): Sales {
    if (!props.customerId) throw new BadRequestError("Customer is required.");

    if (!props.productId) throw new BadRequestError("Product is required");

    if (props.quantity == null || props.quantity <= 0)
      throw new BadRequestError("Quantity must be greater than zero");

    return new Sales({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  static fromPersistence(data: SaleProps): Sales {
    return new Sales(data);
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      productId: this.productId,
      quantity: this.quantity,
      saleDate: this.saleDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // getters
  get id() {
    return this.props.id;
  }

  get customerId() {
    return this.props.customerId;
  }

  get productId() {
    return this.props.productId;
  }

  get quantity() {
    return this.props.quantity;
  }

  get saleDate() {
    return this.props.saleDate;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
