import { Channel } from "@src/types/channel.d";

export interface Category {
  categoryId: string;
  name: string;
  channels: Channel[];
};