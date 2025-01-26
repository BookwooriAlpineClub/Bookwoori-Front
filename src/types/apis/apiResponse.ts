import type { ErrorCodeType } from '@src/constants/constants';

export type ApiErrorResponse = Error & {
  timestamp: string;
  status: number;
  code: ErrorCodeType;
  message: string;
  path: string;
};
