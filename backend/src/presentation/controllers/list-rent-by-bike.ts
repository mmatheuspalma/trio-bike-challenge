import { Controller } from '@/presentation/controllers/ports/controller';
import { UseCase } from '@/usecases/ports/use-case';
import { HttpResponse } from '@/presentation/controllers/ports/http-response';
import { HttpRequest } from './ports';

export class ListRentByBikeController implements Controller {
  constructor(private useCase: UseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { bikeId } = request.params;
      const rents = await this.useCase.perform(Number(bikeId), request.token);
      return {
        statusCode: 200,
        body: rents,
      };
    } catch (error) {
      return {
        statusCode: error.httpStatus,
        body: error,
      };
    }
  }
}
