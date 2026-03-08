import { FastifyInstance } from "fastify";

export async function salesRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/create/:productId",
    { preHandler: [fastify.authenticationMiddleware.authenticate] },
    (req, reply) => fastify.salesController.create(req, reply),
  );

  fastify.get("/month", async (req, reply) =>
    fastify.salesController.getSalesByMonth(req, reply),
  );
}
