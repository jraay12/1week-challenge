import { FastifyInstance } from "fastify";

export async function productRoutes(fastify: FastifyInstance) {
  fastify.post("/create", async (req, reply) =>
    fastify.productController.create(req, reply),
  );
}
