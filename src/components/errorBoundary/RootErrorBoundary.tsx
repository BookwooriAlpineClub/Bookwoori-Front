import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '@src/pages/fallback/ErrorPage';

type StrictPropsWithChildren<P = unknown> = P & {
  children: React.ReactNode;
};

const RootErrorBoundary = ({ children }: StrictPropsWithChildren) => {
  return <ErrorBoundary fallback={<ErrorPage />}>{children}</ErrorBoundary>;
};

export default RootErrorBoundary;
