import { CustomerResponseDTO } from "../../application/dto/CustomerResponseDTO";
import { BadRequestError } from "../errors/BadRequestError";
import crypto from "crypto";

export interface CustomerProps {
  id: string;
  email: string;
  name: string;
  password: string;
  address: string | null;
  phone: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer {
  private props: CustomerProps;
  private static readonly MAX_NAME_LENGTH = 100;
  private static readonly MIN_PASSWORD_LENGTH = 6;

  private constructor(props: CustomerProps) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  static create(props: Omit<CustomerProps, "id" | "createdAt" | "updatedAt">) {
    if (props.name.length > this.MAX_NAME_LENGTH)
      throw new BadRequestError(
        `Name cannot exceed ${this.MAX_NAME_LENGTH} characters`,
      );

    if (props.password.length < this.MIN_PASSWORD_LENGTH)
      throw new BadRequestError(
        `Password must be at least ${this.MIN_PASSWORD_LENGTH} characters`,
      );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(props.email)) {
      throw new BadRequestError("Invalid email format");
    }

    // Philippine phone number formats: +63XXXXXXXXX, 09XXXXXXXXX, 9XXXXXXXXX
    const phoneRegex = /^(\+63|0)?9\d{9}$/;
    if (props.phone && !phoneRegex.test(props.phone)) {
      throw new BadRequestError(
        "Phone number must start with +63, 09, or 9 and have 10 digits after the prefix",
      );
    }

    return new Customer({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  static fromPersistence(props: CustomerProps): Customer {
    return new Customer(props);
  }

  toJSON(): CustomerResponseDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  setPassword(hash: string) {
    this.props.password = hash;
  }

  // Getters
  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  get createdAt() {
    return this.props.createdAt!;
  }
  get updatedAt() {
    return this.props.updatedAt!;
  }

  get phone() {
    return this.props.phone!;
  }

  get address() {
    return this.props.address!;
  }
}
