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
export type PostDeviceReq = Omit<Device, 'status'>;
/**
 * 기기 등록 삭제
 */
export type DeleteDeviceRes = Success;
/**
 * 푸시 알림 pub/sub
 */
// 백엔드 개발 중
/**
 * 안 읽은 알림 pub/sub
 */
// 백엔드 개발 중
/**
 * 알림 목록 조회
 */
// 백엔드 개발 중
/**
 * 알림 isRead 수정
 */
// 백엔드 개발 중
