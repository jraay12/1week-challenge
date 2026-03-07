import { UnAuthorizedError } from "../../domain/errors/UnAuthorizedError";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import { ITokenService } from "../../domain/services/ITokenService";
import { LoginDTO } from "../dto/LoginDTO";

export class LoginUsecase {
  constructor(
    private customerRepo: ICustomerRepository,
    private passwordHasher: IPasswordHasher,
    private jwtService: ITokenService,
  ) {}

  async execute(
    data: LoginDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const customer = await this.customerRepo.findByEmail(data.email);

    if (!customer) throw new UnAuthorizedError("Invalid Credentials");

    const match = await this.passwordHasher.compare(
      data.password,
      customer.password,
    );

    if (!match) throw new UnAuthorizedError("Invalid Credentials");

    const accessToken = await this.jwtService.signAccessToken({
      id: customer.id,
    });

    const refreshToken = await this.jwtService.signRefreshToken({
      id: customer.id,
    });

    return { accessToken, refreshToken };
  }
}
