import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
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

fastify.register(prismaPlugin)

export default fastify;
