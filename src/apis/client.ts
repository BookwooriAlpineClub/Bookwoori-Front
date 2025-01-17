import axios, { AxiosInstance } from 'axios';
import { apiUrl } from '@src/constants/env';

const client: AxiosInstance = axios.create({
  baseURL: apiUrl,
});

export default client;
