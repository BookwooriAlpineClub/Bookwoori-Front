import { ChannelMessage } from '@src/types/channel';

export interface ChannelPostRequest {
  type: 'chat' | 'voice';
  categoryId: number;
  name: string;
}

export interface ChannelPatchRequest {
  categoryId: number;
  name: string;
}

export interface ChannelMessagesResponse {
  messages: ChannelMessage[];
}
