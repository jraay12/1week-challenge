import { FastifyInstance } from "fastify";
import { createProductSchema , addStockSchema} from "./schemas/product.schema";

export async function productRoutes(fastify: FastifyInstance) {
  fastify.post("/create", {schema: {body: createProductSchema}},  (req, reply) =>
    fastify.productController.create(req, reply),
  );

  fastify.get(
    "/all-product",
    { preHandler: [fastify.authenticationMiddleware.authenticate] },
    (req, reply) => fastify.productController.getAll(req, reply),
  );

  fastify.patch("/add-stock/:productId", {schema: {body: addStockSchema}}, (req, reply) =>
    fastify.productController.addStock(req, reply),
  );
}
