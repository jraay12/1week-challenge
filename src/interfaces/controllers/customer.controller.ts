import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerUsecase } from "../../application/usecases/CreateCustomerUsecase";
import { CreateCustomerDTO } from "../../application/dto/CreateCustomerDTO";
import { CustomerResponseDTO } from "../../application/dto/CustomerResponseDTO";
import { LoginUsecase } from "../../application/usecases/LoginUsecase";
import { LoginDTO } from "../../application/dto/LoginDTO";
import { RefreshTokenUsecase } from "../../application/usecases/RefreshTokenUsecase";
export class CustomerController {
  constructor(
    private createCustomerUsecase: CreateCustomerUsecase,
    private loginUsecase: LoginUsecase,
    private refreshTokenUsecase: RefreshTokenUsecase,
  ) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const input = request.body as CreateCustomerDTO;
    const customer: CustomerResponseDTO =
      await this.createCustomerUsecase.execute(input);
    reply
      .status(201)
      .send({ message: "customer successfully registered", result: customer });
  };

  login = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const input = request.body as LoginDTO;
    const { accessToken, refreshToken } =
      await this.loginUsecase.execute(input);
    reply.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      signed: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });
    reply.status(200).send({ accessToken });
  };

  refresh = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    
    const refreshToken = request.cookies?.refreshToken;
    console.log("Cookie refresh token:", request.cookies?.refreshToken);
    if (!refreshToken) {
      reply.status(401).send({ message: "No refresh token provided" });
      return;
    }

    const { accessToken, newRefreshToken } =
      await this.refreshTokenUsecase.execute(refreshToken);

    if (newRefreshToken) {
      reply.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: "/",
        signed: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    reply.status(200).send({ accessToken });
  };
}
