import { CreateSaleDTO } from "../../application/dto/CreateSaleDTO";
import { CreateSalesUsecase } from "../../application/usecases/CreateSaleUsecase";
import { FastifyRequest, FastifyReply } from "fastify";
import { GetSalesMonthUsecase } from "../../application/usecases/GetSalesByMonthUsecase";
import { MonthlySalesDTO } from "../../application/dto/MonthlySalesDTO";

export class SalesController {
  constructor(private createSalesUsecase: CreateSalesUsecase, private getMonthlySalesUsecase: GetSalesMonthUsecase) {}

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    const { productId } = request.params as { productId: string };
    const { quantity } = request.body as { quantity: number };

    const customerId = "01e77510-c1d4-40e1-a9b3-7c71fbfeb024";

    const input: CreateSaleDTO = {
      customerId,
      productId,
      quantity,
    };

    const sale = await this.createSalesUsecase.execute(input);
    reply.status(201).send({
      message: "Sale created successfully",
      result: sale,
    });
  };

  getSalesByMonth = async (request: FastifyRequest, reply: FastifyReply) => {
    const { month, year } = request.query as { month: number; year: number };
    const sales: MonthlySalesDTO[] = await this.getMonthlySalesUsecase.execute(month, year);
    reply.status(200).send({
      message: `Sales for ${month}/${year}`,
      result: sales,
    });
  };
}
