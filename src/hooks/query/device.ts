import type { AxiosError } from 'axios';
import type Device from '@src/types/device';
import type { GetDeviceRes } from '@src/types/apis/device';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getDevice, postDevice, deleteDevice } from '@src/apis/device';

const useGetDevice = () => {
  return useQuery<GetDeviceRes, AxiosError>({
    queryKey: ['getDevice'],
    queryFn: () => getDevice(),
    initialData: {
      isSuccess: false,
      code: -1,
      message: '',
      result: {
        memberId: -1,
        platform: 'WEB',
        token: '',
        status: false,
      },
    },
  });
};
const usePostDevice = () => {
  return useMutation({
    mutationFn: (token: Device['token']) => postDevice(token),
  });
};
const useDeleteDevice = () => {
  return useMutation({
    mutationFn: () => deleteDevice(),
  });
};

export { useGetDevice, usePostDevice, useDeleteDevice };
