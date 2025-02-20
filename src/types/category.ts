import { Channel } from "@src/types/channel";

export interface Category {
  categoryId: number;
  name: string;
  channels: Channel[];
};