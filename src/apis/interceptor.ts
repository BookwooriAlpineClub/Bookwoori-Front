import {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ROUTE_PATH } from '@src/constants/routePath';
import { postRefreshToken } from '@src/apis/auth';
import authClient from '@src/apis/authClient';
import {
  isRefreshExpired,
  isTokenExpiredMessage,
  isTokenWrong,
} from '@src/utils/validators';

const onRequest = (
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

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;

  console.log(`[API] ${method?.toUpperCase()} ${url} | Response ${status}`);
  return response;
};

const onError = async (error: AxiosError) => {
  const { config, response } = error;
  if (!config || !response) return Promise.reject(error);

  if (config.sent) {
    return Promise.reject(error);
  }
  config.sent = true;

  const { status, data } = response;

  if (status === 401 && isTokenExpiredMessage(data)) {
    try {
      await postRefreshToken();

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        authClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
        config.headers.Authorization = `Bearer ${accessToken}`;
        return authClient(config);
      }
    } catch (e) {
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      window.location.replace(ROUTE_PATH.signIn);
      return Promise.reject(e);
    }
  }

  if (status === 401 && (isTokenWrong(data) || isRefreshExpired(data))) {
    if (window.location.pathname === '/sign-in') {
      return Promise.reject(error);
    }
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    window.location.replace(ROUTE_PATH.signIn);
    return Promise.reject(error);
  }

  return Promise.reject(error);
};

export { onRequest, onResponse, onError };
