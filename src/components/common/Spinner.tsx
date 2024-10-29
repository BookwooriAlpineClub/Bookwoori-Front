import styled from 'styled-components';
import { ReactComponent as IcnSpinner } from '@src/assets/icons/spinner.svg';

const Spinner = () => {
  return <AnimatedSpinner />;
};

export default Spinner;

const AnimatedSpinner = styled(IcnSpinner)`
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
