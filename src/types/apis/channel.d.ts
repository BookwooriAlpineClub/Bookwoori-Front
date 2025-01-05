import { Channel, ChannelMessage } from '@src/types/channel.d';

export type ChannelPostRequest = Channel;

export interface ChannelPatchRequest {
  categoryId: number;
  name: string;
}

export interface ChannelMessagesRes {
  messages: ChannelMessage[];
}