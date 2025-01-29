import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { errorState } from '@src/states/atoms';
import { isRequestedError } from '@src/utils/validators';

const handledErrors = new WeakSet<Error>();

const QueryClientBoundary = ({ children }: React.PropsWithChildren) => {
  const setErrorState = useSetRecoilState(errorState);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: (error) => {
          // 처리된 에러는 throw하지 않음
          return !handledErrors.has(error);
        },
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error: Error) => {
        // 에러 바운더리로 처리가 필요한 경우 return
        if (
          isRequestedError(error) &&
          error.errorHandlingType === 'errorBoundary'
        ) {
          return;
        }

        setErrorState(error);
        handledErrors.add(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        setErrorState(error);
        handledErrors.add(error);
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientBoundary;
