import 'axios';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    sent?: boolean;
  }
}