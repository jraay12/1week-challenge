import { Customer } from "../entities/customer.entity";

export interface ICustomerRepository {
  register(customer: Customer): Promise<void>;
  findByEmail(email: string): Promise<Customer | null>;
}
