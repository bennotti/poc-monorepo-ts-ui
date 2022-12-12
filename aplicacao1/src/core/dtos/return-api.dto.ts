export interface IReturnApiDto {
  result: boolean;
  statusCode: number;
  message?: string;
  resultId?: string;
  modelState?: unknown;
  isFromCache: boolean;
}
