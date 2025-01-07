import type { BasePayload } from '@src/types/chat';

export interface Channel {
  type: 'chat' | 'voice';
  channelId: number;
  name: string;
}

export interface ChannelMessage extends BasePayload {
  channelId: number;
}
