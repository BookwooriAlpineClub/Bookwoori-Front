import styled from 'styled-components';
import { ReactComponent as IcnLoading } from '@src/assets/icons/loading.svg';

const Spinner = () => {
  return <Loading />;
};

export default Spinner;

const Loading = styled(IcnLoading)`
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: spin 1.3s ease infinite;
`;
