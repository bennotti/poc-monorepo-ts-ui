import { IReturnApiDto } from './return-api.dto';

export interface IReturnApiDataTableDto<T> extends IReturnApiDto {
  totalCountRecords: number;
  totalPages: number;
  records: Array<T>;
  page: number;
  perPage: number;
}
