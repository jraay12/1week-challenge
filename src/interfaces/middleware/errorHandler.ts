import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { ConflictError } from "../../domain/errors/ConflictError";
import { BadRequestError } from "../../domain/errors/BadRequestError";
import { UnAuthorizedError } from "../../domain/errors/UnAuthorizedError";

export function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof NotFoundError) {
    return reply.status(404).send({ error: error.message });
  }

  if (error instanceof ConflictError) {
    return reply.status(409).send({ error: error.message });
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({ error: error.message });
  }

  if (error instanceof UnAuthorizedError) {
    return reply.status(401).send({ error: error.message });
  }

  return reply.status(500).send({ error: "Internal server error" });
}
