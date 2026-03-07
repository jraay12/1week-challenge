import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { ITokenService, Payload } from "../../domain/services/ITokenService";
import { UnAuthorizedError } from "../../domain/errors/UnAuthorizedError";

export class RefreshTokenUsecase {
  constructor(
    private tokenService: ITokenService,
    private customerRepo: ICustomerRepository,
  ) {}

  async execute(
    refreshToken: string,
  ): Promise<{ accessToken: string; newRefreshToken: string }> {
    const payload =
      await this.tokenService.verifyRefreshToken<Payload>(refreshToken);
      console.log(payload)

    const customer = await this.customerRepo.findById(payload.id);
    if (!customer) throw new UnAuthorizedError("User not found");

    const accessToken = await this.tokenService.signAccessToken({
      id: payload.id,
    });

    const newRefreshToken = await this.tokenService.signRefreshToken({
      id: payload.id,
    });

    return { accessToken, newRefreshToken: newRefreshToken };
  }
}
