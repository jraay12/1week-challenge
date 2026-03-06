import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import { errorHandler } from "./interfaces/middleware/errorHandler";
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

export default fastify;
