import fp from "fastify-plugin";
import jwt from "jsonwebtoken";
import { Payload } from "../domain/services/ITokenService";

export const jwtPlugin = fp(async (fastify) => {
  fastify.decorate("jwt", {
    signAccessToken: (payload: Payload) =>
      jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m"}),
    verifyAccessToken: (token: string) =>
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as Payload,
    signRefreshToken: (payload: Payload) =>
      jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" }),
    verifyRefreshToken: (token: string) =>
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as Payload,
  });
});
