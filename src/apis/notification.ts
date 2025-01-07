import type { AxiosResponse } from 'axios';
import type Notification from '@src/types/notification';
import type {
  DeviceQueryRes,
  DeviceAddRes,
  DeviceAddReq,
  DeviceDeleteRes,
} from '@src/types/apis/notification';
import { authClient } from '@src/apis/index';

/**
 * 알림 구독
 * @ 백엔드 구현 미완료
 */
export const getNotification = async <Res>(): Promise<Res> => {
  const response = await authClient.get<Res>(`/notification`);
  return response.data;
};

/**
 * 알림 리스트 조회
 * @ 백엔드 구현 미완료
 */
export const getNotificationList = async <
  Res = Notification[],
>(): Promise<Res> => {
  const response = await authClient.get<Res>(`/notification`);
  return response.data;
};

/**
 * 알림 읽기
 * @ 백엔드 구현 미완료
 */
export const patchNotification = async <
  Res = void,
  Req = Pick<Notification, 'isRead'>,
>(
  id: number,
  body: Req,
): Promise<Res> => {
  const response = await authClient.patch<Res, AxiosResponse<Res>, Req>(
    `/notification/${id}`,
    body,
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data;
};
