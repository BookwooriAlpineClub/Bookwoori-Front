import type Device from '@src/types/device';

interface Success {
  isSuccess: boolean;
  code: number;
  message: string;
}
/**
 * 기기 등록 조회
 */
export interface GetDeviceRes extends Success {
  result: Device;
}
/**
 * 기기 등록 추가
 */
export type PostDeviceRes = Success;
/**
 * 기기 등록 삭제
 */
export type DeleteDeviceRes = Success;
