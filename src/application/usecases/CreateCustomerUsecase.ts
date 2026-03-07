import { Customer } from "../../domain/entities/customer.entity";
import { ConflictError } from "../../domain/errors/ConflictError";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { CreateCustomerDTO } from "../dto/CreateCustomerDTO";
import { CustomerResponseDTO } from "../dto/CustomerResponseDTO";

export class CreateCustomerUsecase {
  constructor(private customerRepo: ICustomerRepository) {}

  async execute(data: CreateCustomerDTO): Promise<CustomerResponseDTO> {
    const existingCustomer = await this.customerRepo.findByEmail(data.email);

    if (existingCustomer) throw new ConflictError("Email already exist");

    const customer = Customer.create({
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address ?? null,
      phone: data.phone ?? null,
    });

    await this.customerRepo.register(customer);

    return customer.toJSON();
  }
}
