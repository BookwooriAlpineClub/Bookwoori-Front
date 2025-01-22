import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ERROR_MESSAGES } from '@src/constants/constants';
import { errorState } from '@src/states/atoms';
import { isRequestedError } from '@src/utils/validators';
import { RequestErrorType } from '@src/errors/RequestError';

const isDefinedError = (error: RequestErrorType) => {
  return ERROR_MESSAGES[error.code] !== undefined;
};

const ErrorCatcher = ({ children }: React.PropsWithChildren) => {
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    if (!error) return;

    if (!isRequestedError(error) || !isDefinedError(error)) throw error;

    if (error.errorHandlingType.type === 'confirm') {
      // confirm으로 처리
      alert(`confirm: ${ERROR_MESSAGES[error.code]}`);
      setError(null);
      return;
    }

    // toast로 처리
    alert(`toast: ${ERROR_MESSAGES[error.code]}`);
    setError(null);
  }, [error]);

  return children;
};

export default ErrorCatcher;
