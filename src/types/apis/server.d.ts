import { ServerMember } from '@src/types/domain/member';

export type Server = {
  serverId: number;
  name: string;
  serverImg: string | null;
  ownerNickname: string;
  memberCount: number;
  createdAt: string; // (ISO 형식)
  description: string;
  isOwner: boolean;
};

export interface ServerMembersResponse {
  members: ServerMember[];
}
