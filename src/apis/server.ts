import { AxiosResponse } from 'axios';
import { authClient } from '@src/apis/index';
import { Server } from '@src/types/apis/server.d';

const SERVER_BASE_URL = '/servers';
const buildServerUrl = (path: string | number = '') =>
  `${SERVER_BASE_URL}${path}`;

export const postServer = async <
  Res = void,
  Req extends {
    name: string;
    description: string;
    serverImg: File | null;
  } = Pick<Server, 'name' | 'description'> & {
    serverImg: File | null;
  },
>(
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('description', body.description);
  if (body.serverImg) {
    formData.append('serverImg', body.serverImg);
  }

  const response = await authClient.post<Res, AxiosResponse<Res>>(
    buildServerUrl(),
    formData,
    { headers: { 'Content-Type': 'multipart/form-data', ...headers } },
  );
  return response.data;
};

export const getServers = async <
  Res = Pick<Server, 'name' | 'serverImg' | 'serverId'>,
>(
  headers?: Record<string, string>,
): Promise<Res[]> => {
  const response = await authClient.get<Res[], AxiosResponse<Res[]>>(
    buildServerUrl(),
    { headers },
  );
  return response.data;
};

export const getServerOne = async <Res = Omit<Server, 'serverId'>>(
  serverId: number,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildServerUrl(serverId),
    { headers },
  );
  return response.data;
};

export const patchServerOne = async <
  Res = void,
  Req = Pick<Server, 'name' | 'description'>,
>(
  serverId: number,
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.patch<Res, AxiosResponse<Res>>(
    buildServerUrl(serverId),
    body,
    { headers },
  );
  return response.data;
};

export const patchServerImg = async <
  Res = void,
  Req extends { serverImg: File } = { serverImg: File },
>(
  serverId: number,
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const formData = new FormData();
  formData.append('serverImg', body.serverImg);

  const response = await authClient.patch<Res, AxiosResponse<Res>>(
    buildServerUrl(serverId),
    formData,
    { headers: { 'Content-Type': 'multipart/form-data', ...headers } },
  );
  return response.data;
};

export const deleteServerOne = async <Res = void>(
  serverId: number,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.delete<Res, AxiosResponse<Res>>(
    buildServerUrl(serverId),
    { headers },
  );
  return response.data;
};

export const getServerByCode = async <Res = Server>(
  inviteCode: string,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildServerUrl(`/code/${inviteCode}`),
    { headers },
  );
  return response.data;
};

export const postServerJoinByCode = async <Res = void>(
  inviteCode: string,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.post<Res, AxiosResponse<Res>>(
    buildServerUrl(`/join/${inviteCode}`),
    { headers },
  );
  return response.data;
};

export const getServerCode = async <Res = { inviteCode: string }>(
  serverId: number,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildServerUrl(`/code/${serverId}`),
    { headers },
  );
  return response.data;
};

export const getServerMembers = async <Res = []>(
  serverId: number,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildServerUrl(`/${serverId}/members`),
    { headers },
  );
  return response.data;
};

export const patchServerOwner = async <Res = void, Req = { memberId: number }>(
  serverId: number,
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.patch<Res, AxiosResponse<Res>>(
    buildServerUrl(`/${serverId}/members`),
    body,
    { headers },
  );
  return response.data;
};

export const deleteServerMember = async <Res = void, Req = void>(
  serverId: number,
  body: Req,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.delete<Res, AxiosResponse<Res>>(
    buildServerUrl(`/${serverId}/members`),
    { data: body, headers },
  );
  return response.data;
};

export const getServerChannels = async <Res = []>(
  serverId: number,
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildServerUrl(`/${serverId}/channels`),
    { headers },
  );
  return response.data;
};

export const getServerClimbing = async <Res = []>(
  serverId: number,
  headers?: Record<string, string>,
  query?: 'ready' | 'me',
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildServerUrl(`/${serverId}/climbing/${query || ''}`),
    { headers },
  );
  return response.data;
};
