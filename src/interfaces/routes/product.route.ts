import { FastifyInstance } from "fastify";

export async function productRoutes(fastify: FastifyInstance) {
  fastify.post("/create", async (req, reply) =>
    fastify.productController.create(req, reply),
  );

  fastify.get(
    "/all-product",
    { preHandler: [fastify.authenticationMiddleware.authenticate] },
    (req, reply) => fastify.productController.getAll(req, reply),
  );

  fastify.patch("/add-stock/:productId", async (req, reply) =>
    fastify.productController.addStock(req, reply),
  );
}
