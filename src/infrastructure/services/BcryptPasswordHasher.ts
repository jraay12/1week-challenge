import { FastifyInstance } from "fastify";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";

export class BcryptPasswordHasher implements IPasswordHasher {
  constructor(private fastify: FastifyInstance) {}

  async hash(password: string): Promise<string> {
    return this.fastify.bcrypt.hash(password);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return this.fastify.bcrypt.compare(password, hashedPassword);
  }
}
