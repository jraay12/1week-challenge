import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import diPlugin from "./plugins/di";
import { errorHandler } from "./interfaces/middleware/errorHandler";
import { customerRoutes } from "./interfaces/routes/customer.route";
import fastifyBcrypt from "fastify-bcrypt-plugin";
const fastify = Fastify({
  logger: true,
});

// Server checker
fastify.get("/health", async () => {
  return {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
});

fastify.setErrorHandler(errorHandler)
fastify.register(prismaPlugin)
fastify.register(diPlugin)
fastify.register(fastifyBcrypt)
fastify.register(customerRoutes, {prefix: "/customers"})

export default fastify;
