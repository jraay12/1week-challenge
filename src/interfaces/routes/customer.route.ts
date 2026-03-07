import { FastifyInstance } from "fastify";

export async function customerRoutes(fastify: FastifyInstance) {
  fastify.post("/create", (req, reply) =>
    fastify.customerController.create(req, reply),
  );

  fastify.post("/login", (req, reply) =>
    fastify.customerController.login(req, reply),
  );

   fastify.post("/refresh", (req, reply) =>
    fastify.customerController.refresh(req, reply),
  );
}
