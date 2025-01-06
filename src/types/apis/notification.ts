import type Device from '@src/types/device';

type Success = {
  isSuccess: boolean;
  code: number;
  message: string;
};

// 기기 등록 조회
type ResDeviceQuery = Success & {
  result: Device;
};

// 기기 등록 추가
type ResDeviceAdd = Success;
type ReqDeviceAdd = Omit<Device, 'status'>;

// 기기 등록 삭제
type ResDeviceDelete = Success;

// 푸시 알림 pub/sub

// 안 읽은 알림 pub/sub

// 알림 목록 조회

// 알림 isRead 수정

export type { ResDeviceQuery, ResDeviceAdd, ReqDeviceAdd, ResDeviceDelete };
