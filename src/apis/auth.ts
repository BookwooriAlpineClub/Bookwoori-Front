import { AxiosError } from 'axios';
import client from '@src/apis/client';
import authClient from './authClient';

const postLogout = async () => {
  try {
    await authClient.post('auth/logout');
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

const postRefreshToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const res = await client.post(
      'auth/token',
      {
        refreshToken,
      },
      { withCredentials: true },
    );
    localStorage.setItem('accessToken', res.data.accessToken);
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.message);
    }
  }
};

const deleteAccount = async () => {
  try {
    await authClient.patch('auth/delete');
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};

export { postLogout, postRefreshToken, deleteAccount };
