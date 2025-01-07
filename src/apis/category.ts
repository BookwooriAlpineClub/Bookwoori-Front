import type {
  CategoryMoveReq,
  CategoryNameReq,
  CategoryReq,
} from '@src/types/apis/category';
import { authClient } from '@src/apis/index';

/* 카테고리 생성 */
export const postCategory = async <Res = void, Req = CategoryReq>(
  data: Req,
): Promise<Res> => {
  const res = await authClient.post('categories', data);
  return res.data;
};

/* 카테고리 이름 변경 */
export const patchCategory = async <Res = void, Req = CategoryNameReq>(
  categoryId: number,
  data: Req,
): Promise<Res> => {
  const res = await authClient.patch(`categories/${categoryId}/name`, data);
  return res.data;
};

/* 카테고리 삭제 */
export const deleteCategory = async (categoryId: number) => {
  const res = await authClient.delete(`categories/${categoryId}`);
  return res.data;
};

/* 카테고리 위치 변경 */
export const patchCategoryMove = async <Res = void, Req = CategoryMoveReq>(
  categoryId: number,
  data: Req,
): Promise<Res> => {
  const res = await authClient.patch(`categories/${categoryId}/locate`, data);
  return res.data;
};
