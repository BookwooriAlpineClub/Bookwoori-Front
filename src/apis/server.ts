import { AxiosResponse } from 'axios';
import { authClient } from '@src/apis/index';
import {
  PostServerReq,
  GetServerOneRes,
  PatchServerOneReq,
  PatchServerImgReq,
  GetServerInfoInviteCodeRes,
  GetServerMembersRes,
  PatchServerMemberRoleReq,
  GetServersRes,
  GetInviteCodeRes,
} from '@src/types/apis/server';

const SERVER_BASE_URL = '/servers';
const buildServerUrl = (path: string = '') => `${SERVER_BASE_URL}${path}`;

export const postServer = async (
  body: PostServerReq,
  headers?: Record<string, string>,
): Promise<{ serverId: number }> => {
  const formData = new FormData();
  formData.append('name', body.name);
  formData.append('description', body.description);
  if (body.serverImg) {
    formData.append('serverImg', body.serverImg);
  }
  const response = await authClient.post<{ serverId: number }>(
    buildServerUrl(),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
    },
  );
  return response.data;
};

export const postServerJoinByCode = async (
  inviteCode: string,
): Promise<{ serverId: number }> => {
  const response = await authClient.post<{ serverId: number }>(
    buildServerUrl(`/code/${inviteCode}`),
  );
  return response.data;
};

export const getServers = async <Res = GetServersRes>(
  headers?: Record<string, string>,
): Promise<Res> => {
  const response = await authClient.get<Res>(buildServerUrl(), { headers });
  return response.data;
};

export const getServerOne = async (
  serverId: number,
): Promise<GetServerOneRes> => {
  const response = await authClient.get<GetServerOneRes>(
    buildServerUrl(`/${serverId}`),
  );
  return response.data;
};

export const patchServerOne = async (
  serverId: number,
  body: PatchServerOneReq,
): Promise<void> => {
  const response = await authClient.patch<void>(
    buildServerUrl(`/${serverId}`),
    body,
  );
  return response.data;
};

export const patchServerImg = async (
  serverId: number,
  body: PatchServerImgReq,
  headers?: Record<string, string>,
): Promise<void> => {
  const formData = new FormData();
  formData.append('serverImg', body.serverImg);

  const response = await authClient.patch(
    buildServerUrl(`/${serverId}`),
    formData,
    { headers: { 'Content-Type': 'multipart/form-data', ...headers } },
  );
  return response.data;
};

export const deleteServerOne = async (
  serverId: number,
  headers?: Record<string, string>,
): Promise<void> => {
  const response = await authClient.delete(buildServerUrl(`/${serverId}`), {
    headers,
  });
  return response.data;
};

export const getServerByCode = async (
  inviteCode: string,
): Promise<GetServerInfoInviteCodeRes> => {
  const response = await authClient.get<GetServerInfoInviteCodeRes>(
    buildServerUrl(`/code/${inviteCode}`),
  );
  return response.data;
};

export const getServerMembers = async (
  serverId: number,
): Promise<GetServerMembersRes> => {
  const response = await authClient.get<GetServerMembersRes>(
    buildServerUrl(`/${serverId}/members`),
  );
  return response.data;
};

export const patchServerOwner = async (
  serverId: number,
  body: PatchServerMemberRoleReq,
  headers?: Record<string, string>,
): Promise<void> => {
  const response = await authClient.patch(
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
    buildServerUrl(`/${serverId}/categories`),
    { headers },
  );
  return response.data;
};

export const getServerClimbing = async <Res = []>(
  serverId: number,
  headers?: Record<string, string>,
  query?: '/ready' | '/me',
): Promise<Res> => {
  const response = await authClient.get<Res, AxiosResponse<Res>>(
    buildServerUrl(`/${serverId}/climbs${query || ''}`),
    { headers },
  );
  return response.data;
};

export const postServerInvitationCode = async (
  serverId: number,
): Promise<GetInviteCodeRes> => {
  const response = await authClient.post<GetInviteCodeRes>(
    buildServerUrl(`/code/${serverId}`),
  );
  return response.data;
};
