import { FastifyInstance } from "fastify";
import {
  createSaleSchema,
  createSaleParamsSchema,
  getSalesByMonthQuerySchema,
} from "./schemas/sales.schema";
export async function salesRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/create/:productId",
    {
      preHandler: [fastify.authenticationMiddleware.authenticate],
      schema: {
        body: createSaleSchema,
        params: createSaleParamsSchema,
      },
    },
    (req, reply) => fastify.salesController.create(req, reply),
  );

  fastify.get(
    "/month",
    { schema: { querystring: getSalesByMonthQuerySchema } },
    (req, reply) => fastify.salesController.getSalesByMonth(req, reply),
  );
}
