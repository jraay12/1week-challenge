import { FastifyInstance } from "fastify";
import { createCustomerSchema, loginSchema } from "./schemas/customer.schema";
export async function customerRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/create",
    { schema: { body: createCustomerSchema }},
    (req, reply) => fastify.customerController.create(req, reply),
  );

  fastify.post("/login", {schema: {body: loginSchema}}, (req, reply) =>
    fastify.customerController.login(req, reply),
  );

  fastify.post("/refresh", (req, reply) =>
    fastify.customerController.refresh(req, reply),
  );
}
