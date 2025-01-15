import type { GetDeviceRes, PostDeviceReq } from '@src/types/apis/notification';
import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  getDevice,
  postDevice,
  deleteDevice as delDevice,
} from '@src/apis/notification';

/**
 * 기기 등록 조회
 */
export const useGetDevice = () => {
  const { data } = useQuery<GetDeviceRes, AxiosError>({
    queryKey: ['getDevice'],
    queryFn: () => getDevice(),
  });
  return data;
};
/**
 * 기기 등록 추가
 */
export const usePostDevice = () => {
  const createDevice = useMutation({
    mutationFn: ({ body }: { body: PostDeviceReq }) => postDevice(body),
  });
  return createDevice;
};
/**
 * 기기 등록 삭제
 */
export const useDeleteDevice = () => {
  const deleteDevice = useMutation({
    mutationFn: () => delDevice(),
  });
  return deleteDevice;
};
