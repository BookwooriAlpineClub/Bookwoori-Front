import client from '@src/apis/client';
import authClient from '@src/apis/authClient';

export const postLogout = async <Res = void>(): Promise<Res> => {
  const res = await authClient.post('auth/logout');
  return res.data;
};

export const postRefreshToken = async <Res = void>(): Promise<Res> => {
  const res = await client.post('auth/token', { withCredentials: true });
  if (res.data) {
    localStorage.setItem('accessToken', res.data.accessToken);
  }

  return res.data;
};

export const deleteAccount = async <Res = void>(): Promise<Res> => {
  const res = await authClient.patch('auth/delete');
  return res.data;
};
