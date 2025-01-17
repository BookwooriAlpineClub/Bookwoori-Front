import axios, { AxiosInstance } from 'axios';
import { apiUrl } from '@src/constants/env';

const authClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default authClient;
