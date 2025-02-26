import type Device from '@src/types/device';
import type {
  GetDeviceRes,
  PostDeviceRes,
  DeleteDeviceRes,
} from '@src/types/apis/device';
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
export const postDevice = async <Res = PostDeviceRes>(
  token: Device['token'],
): Promise<Res> => {
  const platform: Device['platform'] = 'WEB';
  const response = await authClient.post<Res>(
    `/notification/devices/${platform}?token=${token}`,
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
