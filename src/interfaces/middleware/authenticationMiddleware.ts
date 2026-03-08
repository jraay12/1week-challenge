import { FastifyReply, FastifyRequest } from "fastify";
import { UnAuthorizedError } from "../../domain/errors/UnAuthorizedError";
import { ITokenService } from "../../domain/services/ITokenService";

export class AuthenticationMiddleware {
  constructor(private tokenService: ITokenService) {}

  authenticate = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnAuthorizedError("Unauthorized");
    }

     const token = authHeader.split(" ")[1];
     const payload = await this.tokenService.verifyAccessToken<{
      id: string;
      role: string;
    }>(token);

    request.user = payload;

  };
}
