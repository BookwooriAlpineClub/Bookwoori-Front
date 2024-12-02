export type Channel = {
  type: 'chat' | 'voice' | '';
  categoryId: number;
  name: string;
};
export type Message = {
  id: string;
  channelId: number;
  memberId: number;
  content: string;
  createdAt: string;
};
