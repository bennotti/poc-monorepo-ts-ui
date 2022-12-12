import { IReturnApiDto } from '@core/dtos/return-api.dto';

export class ReturnApiHelper {
  static response(
    result = true,
    statusCode = 200,
    message = 'Executado com sucesso'
  ): IReturnApiDto {
    return {
      result,
      statusCode,
      message,
      isFromCache: false,
    };
  }
}
