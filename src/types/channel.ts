import { Payload, Reactions } from "@src/types/chat";

export interface Channel {
  type: 'chat' | 'voice';
  channelId: number;
  name: string;
}

export interface ChannelMessage extends Payload {
  parentId?: string;
  parentContent?: string;
  reactions?: Reactions;
};