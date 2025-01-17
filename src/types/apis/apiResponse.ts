import type { ErrorCodeType } from '@src/constants/constants';

type ApiSuccessResponse<T> = {
  data: T;
};

export type ApiErrorResponse = {
  timestamp: string;
  status: number;
  code: ErrorCodeType;
  message: string;
  path: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
