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
