import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '@src/apis/auth';
import { ROUTE_PATH } from '@src/constants/routePath';

export const useDeleteAccount = () => {
  const delAccount = useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => window.location.replace(ROUTE_PATH.root),
  });

  return { delAccount };
};
