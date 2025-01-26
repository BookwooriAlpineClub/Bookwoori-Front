import type { ErrorCodeType } from '@src/constants/constants';

export type ApiSuccessResponse<T> = {
  data: T;
};

export type ApiErrorResponse = Error & {
  timestamp: string;
  status: number;
  code: ErrorCodeType;
  message: string;
  path: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
