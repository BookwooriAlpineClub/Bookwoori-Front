import { Channel } from "@src/types/channel";

export interface Category {
  categoryId: string;
  name: string;
  channels: Channel[];
};