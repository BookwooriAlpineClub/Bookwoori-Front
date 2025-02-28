import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ERROR_MESSAGES } from '@src/constants/constants';
import { errorState } from '@src/states/atoms';
import { isRequestedError } from '@src/utils/validators';
import { RequestErrorType } from '@src/errors/RequestError';
import useToast from '@src/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '@src/pages/fallback/LoadingPage';

const isDefinedError = (error: RequestErrorType) => {
  return ERROR_MESSAGES[error.code] !== undefined;
};

const ErrorCatcher = ({ children }: React.PropsWithChildren) => {
  const [error, setError] = useRecoilState(errorState);
  const addToast = useToast();

  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (!error) return;

    if (!isRequestedError(error) || !isDefinedError(error)) throw error;

    if (error.errorHandlingType !== 'toast') return;

    addToast('error', `${ERROR_MESSAGES[error.code]}`);
    if (error.code === 2001) {
      setShouldNavigate(true);
      const timer = setTimeout(() => {
        navigate(-1);
      }, 500);
      return () => clearTimeout(timer);
    }
    setError(null);
  }, [error, navigate]);

  if (shouldNavigate) return <LoadingPage />;

  return <>{children}</>;
};

export default ErrorCatcher;
