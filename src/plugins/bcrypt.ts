import fp from "fastify-plugin";
import bcrypt from "bcrypt";

export const bcryptPlugin = fp(async (fastify) => {
  fastify.decorate("bcrypt", {
    hash: async (password: string, saltRounds = 10) =>
      bcrypt.hash(password, saltRounds),
    compare: async (password: string, passwordHash: string) =>
      bcrypt.compare(password, passwordHash),
  });
});
