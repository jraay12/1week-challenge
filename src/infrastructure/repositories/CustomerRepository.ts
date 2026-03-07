import { Customer } from "../../domain/entities/customer.entity";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { FastifyInstance } from "fastify";
export class CustomerRepository implements ICustomerRepository {
  constructor(private fastify: FastifyInstance) {}
  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.fastify.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!customer) return null;

    return Customer.fromPersistence({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      password: customer.password,
      address: customer.address,
      phone: customer.phone,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    });
  }
  async register(customer: Customer): Promise<void> {
    await this.fastify.prisma.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        password: customer.password,
        address: customer.address,
        phone: customer.phone,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      },
    });
  }
}
