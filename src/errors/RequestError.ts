import { ApiErrorResponse } from '@src/types/apis/apiResponse';

export type RequestErrorType = Error &
  ApiErrorResponse & {
    errorHandlingType: {
      type: 'toast' | 'confirm' | 'errorBoundary';
      func?: () => void;
    };
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
