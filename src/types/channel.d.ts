import { Payload, Reactions } from "@src/types/chat.d";

export interface Channel {
  type: 'chat' | 'voice';
  categoryId: number;
  name: string;
}

export interface ChannelMessage extends Payload {
  parentId?: string;
  parentContent?: string;
  reactions?: Reactions;
};