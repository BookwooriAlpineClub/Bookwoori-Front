import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import client from '@src/apis/client';
import authClient from '@src/apis/authClient';

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

client.interceptors.response.use(onResponse);

authClient.interceptors.request.use(onRequest);
authClient.interceptors.response.use(onResponse);
