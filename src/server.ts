import fastify from "./app";

const PORT = Number(process.env.PORT) || 3000;

fastify.listen({ port: PORT,  host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
