import { ErrorData } from '@src/apis/interceptor';
import RequestError, { RequestErrorType } from '@src/errors/RequestError';

/* eslint-disable */
export const isBase64Encoded = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false; // 디코딩 실패 시 Base64가 아님
  }
};

// 후에 에러 타입 반영 수정
export const isTokenExpiredMessage = (data: ErrorData): boolean => {
  return data?.message == '만료된 엑세스 토큰입니다.';
};

export const isTokenWrong = (data: any): boolean => {
  return (
    data?.message == '잘못된 JWT 서명입니다.' ||
    data?.message == '잘못된 토큰입니다.'
  );
};

export const isRefreshExpired = (data: any): boolean => {
  return data?.message == '만료된 리프레쉬 토큰입니다.';
};

export const validateMimeTypes = (newFile: File) => {
  const validMimeTypes = ['image/png', 'image/jpeg'];
  return validMimeTypes.includes(newFile.type);
};

export const isRequestedError = (error: Error): error is RequestErrorType => {
  return error instanceof RequestError;
};

export const isErrorData = (data: unknown): data is ErrorData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'code' in data &&
    'message' in data
  );
