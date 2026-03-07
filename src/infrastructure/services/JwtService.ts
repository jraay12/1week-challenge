import { UnAuthorizedError } from "../../domain/errors/UnAuthorizedError";
import { ITokenService, Payload } from "../../domain/services/ITokenService";
import { FastifyInstance } from "fastify";

export class JwtService implements ITokenService {
  constructor(private fastify: FastifyInstance) {}

  async signAccessToken(payload: Payload): Promise<string> {
    return this.fastify.jwt.signAccessToken(payload);
  }

  async verifyAccessToken<T = unknown>(token: string): Promise<T> {
    try {
      return this.fastify.jwt.verifyAccessToken(token) as T;
    } catch {
      throw new UnAuthorizedError("Invalid or expired access token");
    }
  }

  async signRefreshToken(payload: Payload): Promise<string> {
    return this.fastify.jwt.signRefreshToken(payload);
  }

  async verifyRefreshToken<T = unknown>(token: string): Promise<T> {
    try {
      return this.fastify.jwt.verifyRefreshToken(token) as T;
    } catch {
      throw new UnAuthorizedError("Invalid or expired refresh token");
    }
  }
}
