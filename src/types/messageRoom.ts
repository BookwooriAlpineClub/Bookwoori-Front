import type { BasePayload } from '@src/types/chat';

export interface MessageRoom {
  messageRoomId: number;
  memberId: number;
  nickname: string;
  profileImg: string;
  recentMessage: string;
  recentMessageTime: string;
}

export interface DM extends BasePayload {
  messageRoomId: number;
}
