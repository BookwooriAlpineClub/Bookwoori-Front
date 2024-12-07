import { ServerMember } from '@src/types/domain/member';

export type Server = {
  serverId: number;
  name: string;
  serverImg: string | null;
  ownerNickname: string;
  memberCount: number;
  createdAt: string;
  description: string;
  isOwner: boolean;
};
export type ServerListItem = Pick<Server, 'serverId' | 'name' | 'serverImg'>;
export interface ServerMembersResponse {
  members: ServerMember[];
}
