export type Categories = {
  categoryId: string;
  name: string;
  channels: ChannelItem[];
};

export type ChannelItem = {
  type: 'chat' | 'voice';
  channelId: number;
  name: string;
};

export type ChannelMessage = {
  parentId?: string;
  parentContent?: string;
  channelId: number;
  content: string;
  createdAt: string;
  id: string;
  memberId: number;
  reactions?: [];
};

export interface ChannelMessagesRes {
  messages: ChannelMessage[];
}
