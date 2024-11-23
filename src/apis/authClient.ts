import axios, { AxiosInstance } from 'axios';
import { apiUrl } from '@src/constants/apiUrl';

const authClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default authClient;
