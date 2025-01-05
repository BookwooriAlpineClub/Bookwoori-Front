import { Category } from "@src/types/category.d";

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

export interface CategoryResponse {
  categories: Category[];
}