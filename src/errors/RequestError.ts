import { ApiErrorResponse } from '@src/types/apis/apiResponse';

export type RequestErrorType = Error &
  ApiErrorResponse & {
    errorHandlingType: 'toast' | 'errorBoundary';
  };

class RequestError extends Error {
  code;

  errorHandlingType;

  constructor({ name, code, errorHandlingType }: RequestErrorType) {
    super(name);

    this.code = code;
    this.errorHandlingType = errorHandlingType;
  }
}

export default RequestError;
