import {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosHeaderValue,
} from 'axios';
import { ROUTE_PATH } from '@src/constants/routePath';
import { postRefreshToken } from '@src/apis/auth';
import authClient from '@src/apis/authClient';
import {
  isRefreshExpired,
  isTokenExpiredMessage,
  isTokenWrong,
  isErrorData,
} from '@src/utils/validators';
import RequestError from '@src/errors/RequestError';
import { ERROR_HANDLING } from '@src/constants/constants';
import { ApiErrorResponse } from '@src/types/apis/apiResponse';

type ConfigWithHeaders = AxiosRequestConfig & {
  headers?: Record<string, AxiosHeaderValue>;
};

type WithConfig = {
  config: ConfigWithHeaders;
};

type ExtendedAxiosRequestConfig = AxiosRequestConfig & {
  sent?: boolean;
};

export type ErrorData = ApiErrorResponse;

type HandleErrorByStatusType = WithConfig & {
  status: number;
  data: ErrorData;
};

type HandleTokenRefreshType = WithConfig;

export const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const accessToken = localStorage.getItem('accessToken');

  const newConfig = {
    ...config,
    headers: new AxiosHeaders(config.headers?.toJSON()),
  };

  if (accessToken) {
    newConfig.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return newConfig;
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;

  console.log(`[API] ${method?.toUpperCase()} ${url} | Response ${status}`);
  return response;
};

export const onError = async (error: AxiosError): Promise<unknown> => {
  const { config, response } = error;
  if (!config || !response) throw error;

  if ((config as ExtendedAxiosRequestConfig).sent) throw error;
  (config as ExtendedAxiosRequestConfig).sent = true;

  const { status, data } = response;
  if (!isErrorData(data)) throw error;

  return handleErrorByStatus({ status, data, config });
};

const handleErrorByStatus = async ({
  status,
  data,
  config,
}: HandleErrorByStatusType) => {
  if (status === 401 && isTokenExpiredMessage(data)) {
    return handleTokenRefresh({ config });
  }

  if (
    status === 401 &&
    (isTokenWrong(data) ||
      isRefreshExpired(data) ||
      data.message === 'Unauthorized')
  ) {
    return handleInvalidToken();
  }

  throw createError(data);
};

const handleTokenRefresh = async ({
  config,
}: HandleTokenRefreshType): Promise<unknown> => {
  try {
    await postRefreshToken();
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      authClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
      const updatedConfig = updateConfig(config, accessToken);

      return authClient(updatedConfig);
    }
  } catch {
    handleAuthFailure();
  }

  return true;
};

const updateConfig = (
  config: ConfigWithHeaders,
  accessToken: string,
): ConfigWithHeaders => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const handleInvalidToken = () => {
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  if (window.location.pathname !== '/sign-in') {
    window.location.replace(ROUTE_PATH.signIn);
  }
};

const handleAuthFailure = () => {
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  window.location.replace(ROUTE_PATH.signIn);
};

const createError = (data: ErrorData) => {
  return new RequestError({
    name: data.code.toString(),
    timestamp: data.timestamp,
    status: data.status,
    code: data.code,
    message: data.message,
    path: data.path,
    stack: data.stack,
    errorHandlingType: ERROR_HANDLING[data.code] ?? 'errorBoundary',
  });
};
