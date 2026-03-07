import Fastify from "fastify";
import prismaPlugin from "./plugins/prisma";
import diPlugin from "./plugins/di";
import { errorHandler } from "./interfaces/middleware/errorHandler";
import { customerRoutes } from "./interfaces/routes/customer.route";
import { bcryptPlugin } from "./plugins/bcrypt";
import { jwtPlugin } from "./plugins/jwt";
import fastifyCookie from "@fastify/cookie";
import { productRoutes } from "./interfaces/routes/product.route";
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

fastify.setErrorHandler(errorHandler);
fastify.register(prismaPlugin);
fastify.register(diPlugin);
fastify.register(bcryptPlugin);
fastify.register(jwtPlugin);
fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_TOKEN_SECRET!,
});
fastify.register(customerRoutes, { prefix: "/customers" });
fastify.register(productRoutes, {prefix: "/products"})

export default fastify;
