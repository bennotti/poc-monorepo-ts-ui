import { IReturnApiDataTableDto } from '@core/dtos/return-api-data-table.dto';

export class ReturnApiDataTableHelper {
  static response<T>(
    records: Array<T>,
    totalPages = 1,
    totalCountRecords = 0,
    result = true,
    statusCode = 200,
    message = 'Executado com sucesso'
  ): IReturnApiDataTableDto<T> {
    return {
      records,
      result,
      statusCode,
      message,
      isFromCache: false,
      totalCountRecords,
      totalPages,
      page: 1,
      perPage: 10,
    };
  }
}
