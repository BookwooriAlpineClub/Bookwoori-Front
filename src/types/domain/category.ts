import { Categories } from "@src/types/domain/channel";

export interface CategoryRequest {
  serverId: number;
  name: string;
}

export interface CategoryNameRequest {
  name: string;
}

export interface CategoryMoveRequest {
  beforeCategoryId: number;
}

export interface CategoriesRes {
  categories: Categories[];
}