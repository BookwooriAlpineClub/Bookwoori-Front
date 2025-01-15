import type { AxiosResponse } from 'axios';
// import type Notification from '@src/types/notification';
import type {
  GetDeviceRes,
  PostDeviceRes,
  PostDeviceReq,
  DeleteDeviceRes,
} from '@src/types/apis/notification';
import { authClient } from '@src/apis/index';

/**
 * 기기 등록 조회
 */
export const getDevice = async <Res = GetDeviceRes>(): Promise<Res> => {
  const response = await authClient.get<Res>(`/notification/devices`);
  return response.data;
};
/**
 * 기기 등록 추가
 */
export const postDevice = async <Res = PostDeviceRes, Req = PostDeviceReq>(
  body: Req,
): Promise<Res> => {
  const response = await authClient.post<Res, AxiosResponse<Res>, Req>(
    `/notification/devices`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};
/**
 * 기기 등록 삭제
 */
export const deleteDevice = async <Res = DeleteDeviceRes>(): Promise<Res> => {
  const response = await authClient.delete<Res>(`/notification/devices`);
  return response.data;
};
/**
 * 푸시 알림 pub/sub
 */
export {};
/**
 * 안 읽은 알림 pub/sub
 */
export {};
/**
 * 알림 목록 조회
 */
export {};
/**
 * 알림 isRead 수정
 */
export {};
