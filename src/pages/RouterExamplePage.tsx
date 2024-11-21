import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import { ROUTE_PATH } from '@src/constants/routePath';

const RouterExamplePage = () => {
  const navigate = useEncodedNavigate();
  const PARAM_ID = 100000;

  const handleNavigate = () => {
    navigate(ROUTE_PATH.example, PARAM_ID);
  };

  return (
    <>
      <h1>RouterExamplePage</h1>
      <button type='button' onClick={handleNavigate}>
        navigate to {PARAM_ID}
      </button>
    </>
  );
};

export default RouterExamplePage;
