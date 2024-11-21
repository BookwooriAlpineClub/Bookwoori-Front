import axios, { AxiosInstance } from 'axios';
import apiUrl from '@src/constants/apiUrl';

const client: AxiosInstance = axios.create({
  baseURL: apiUrl,
});

export default client;
