import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const client: AxiosInstance = axios.create({
  baseURL: apiUrl,
});

const authClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const accessToken = localStorage.getItem('accessToken');
  const newConfig = { ...config };

  if (!newConfig.headers) {
    newConfig.headers = new AxiosHeaders();
  }

  if (accessToken) {
    newConfig.headers = new AxiosHeaders({
      ...config.headers.toJSON(),
      Authorization: `Bearer ${accessToken}`,
    });
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

export { client, authClient };
