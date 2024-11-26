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
