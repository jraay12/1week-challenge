import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerUsecase } from "../../application/usecases/CreateCustomerUsecase";
import { CreateCustomerDTO } from "../../application/dto/CreateCustomerDTO";
import { CustomerResponseDTO } from "../../application/dto/CustomerResponseDTO";
import { LoginUsecase } from "../../application/usecases/LoginUsecase";
import { LoginDTO } from "../../application/dto/LoginDTO";
export class CustomerController {
  constructor(
    private createCustomerUsecase: CreateCustomerUsecase,
    private loginUsecase: LoginUsecase,
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
      signed: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });
    reply.status(200).send({ accessToken });
  };
}
