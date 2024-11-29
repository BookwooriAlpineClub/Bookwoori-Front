import { patchMemo } from '@src/apis/climbingTemp';
import { MemoReq } from '@src/types/domain/climbingTemp';
import { useMutation } from '@tanstack/react-query';

const useClimbingProgress = (climbingId: number) => {
  const editMemo = useMutation({
    mutationKey: ['patchMemo'],
    mutationFn: (body: MemoReq) => patchMemo(climbingId, body),
  });

  return {
    editMemo,
  };
};

export default useClimbingProgress;
