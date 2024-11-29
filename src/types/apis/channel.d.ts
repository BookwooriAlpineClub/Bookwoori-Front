export type Channel = {
  type: 'chat' | 'voice';
  channelId: number;
  name: string;
};

export type Message = {
  id: string;
  channelId: number;
  memberId: number;
  content: string;
  createdAt: string;
};
