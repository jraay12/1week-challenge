import { FastifyInstance } from "fastify";

export async function customerRoutes(fastify: FastifyInstance) {
  fastify.post("/create", (req, reply) =>
    fastify.customerController.create(req, reply),
  );
}
