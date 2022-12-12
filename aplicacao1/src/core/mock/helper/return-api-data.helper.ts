import { IReturnApiDataDto } from '@core/dtos/return-api-data.dto';

export class ReturnApiDataHelper {
  static response<T>(
    data: T | undefined,
    result = true,
    statusCode = 200,
    message = 'Executado com sucesso'
  ): IReturnApiDataDto<T> {
    return {
      data,
      result,
      statusCode,
      message,
      isFromCache: false,
    };
  }
}
