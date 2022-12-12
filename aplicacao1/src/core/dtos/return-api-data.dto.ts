import { IReturnApiDto } from './return-api.dto';

export interface IReturnApiDataDto<T> extends IReturnApiDto {
  data: T | undefined;
}
