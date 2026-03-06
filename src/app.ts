import Fastify from "fastify";

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

export default fastify;
