import { Controller } from '@/presentation/controllers/ports/controller';
import { UseCase } from '@/usecases/ports/use-case';
import { HttpResponse } from '@/presentation/controllers/ports/http-response';
import { HttpRequest } from './ports';

export class BikeRentAmountController implements Controller {
  constructor(private useCase: UseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const amount = await this.useCase.perform(request.body, request.token);
      return {
        statusCode: 200,
        body: amount,
      };
    } catch (error) {
      return {
        statusCode: error.httpStatus,
        body: error,
      };
    }
  }
}
