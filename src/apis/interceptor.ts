import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

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

export { onRequest, onResponse };
