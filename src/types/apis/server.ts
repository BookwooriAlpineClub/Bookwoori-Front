import type { Server, ServerMember } from '@src/types/server';

export interface PostServerReq extends Pick<Server, 'name' | 'description'> {
  serverImg: File | null;
}

export interface GetServersRes {
  servers: Array<Pick<Server, 'name' | 'serverImg'> & { serverId: number }>;
}

export interface GetServerOneRes extends Server {
  isOwner: boolean;
}

export interface GetInviteCodeRes {
  inviteCode: string;
}

export interface PatchServerOneReq
  extends Pick<Server, 'name' | 'description'> {}

export interface PatchServerImgReq {
  serverImg: File;
}

export interface GetServerInfoInviteCodeReq {
  inviteCode: string;
}

export interface GetServerInfoInviteCodeRes extends Server {}

export interface GetServerMembersRes {
  members: ServerMember[];
}

export interface PatchServerMemberRoleReq {
  serverId: number;
}
