import { Category } from "@src/types/category";

export interface CategoryReq {
  serverId: number;
  name: string;
}

export interface CategoryNameReq {
  name: string;
}

export interface CategoryMoveReq {
  beforeCategoryId: number;
}

export interface CategoryRes {
  categories: Category[];
}