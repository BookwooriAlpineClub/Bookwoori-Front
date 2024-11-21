import client from '@src/apis/client';
import authClient from '@src/apis/authClient';
import { onRequest, onResponse } from './interceptor';

client.interceptors.response.use(onResponse);

authClient.interceptors.request.use(onRequest);
authClient.interceptors.response.use(onResponse);

export { client, authClient };
