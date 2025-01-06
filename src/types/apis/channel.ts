import { ChannelMessage } from '@src/types/channel';

export interface ChannelPostReq {
  type: 'chat' | 'voice';
  categoryId: number;
  name: string;
}

export interface ChannelPatchReq {
  categoryId: number;
  name: string;
}

export interface ChannelMessagesRes {
  messages: ChannelMessage[];
}
