// import type { AxiosError } from 'axios';
// import type { GetDeviceRes, PostDeviceReq } from '@src/types/apis/notification';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import { getDevice, postDevice, deleteDevice } from '@src/apis/notification';

const useGetDevice = () => {
  // return useQuery<GetDeviceRes, AxiosError>({
  //   queryKey: ['getDevice'],
  //   queryFn: () => getDevice(),
  // });
};
const usePostDevice = () => {
  // return useMutation({
  //   mutationFn: ({ body }: { body: PostDeviceReq }) => postDevice(body),
  // });
};
const useDeleteDevice = () => {
  // return useMutation({
  //   mutationFn: () => deleteDevice(),
  // });
};

export { useGetDevice, usePostDevice, useDeleteDevice };
