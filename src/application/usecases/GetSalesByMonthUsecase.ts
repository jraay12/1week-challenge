import { BadRequestError } from "../../domain/errors/BadRequestError";
import { ISalesRepository } from "../../domain/repositories/ISalesRepository";
import { MonthlySalesDTO } from "../dto/MonthlySalesDTO";

export class GetSalesMonthUsecase {
  constructor(private salesRepo: ISalesRepository) {}

  async execute(month: number, year: number): Promise<MonthlySalesDTO[]> {
    if (!month || month < 1 || month > 12) {
      throw new BadRequestError("Month must be between 1 and 12");
    }

    if (!year || year < 1900) {
      throw new BadRequestError("Year must be valid");
    }

    const monthlySales = await this.salesRepo.getSalesByMonth(month, year);

    return monthlySales;
  }
}
