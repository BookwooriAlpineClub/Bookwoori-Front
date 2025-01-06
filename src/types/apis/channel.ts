import { Channel, ChannelMessage } from '@src/types/channel';

export type ChannelPostRequest = Channel;

export interface ChannelPatchRequest {
  categoryId: number;
  name: string;
}

export interface ChannelMessagesResponse {
  messages: ChannelMessage[];
}