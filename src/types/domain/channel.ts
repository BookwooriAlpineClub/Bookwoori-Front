import { Channel } from '@src/types/apis/channel.d';

export type Categories = {
  categoryId: string;
  name: string;
  channels: Channel[];
};