import styled from 'styled-components';
import { ReactComponent as IcnSpinner } from '@src/assets/icons/spinner.svg';

const Spinner = () => {
  return <AnimatedSpinner />;
};

export default Spinner;

const AnimatedSpinner = styled(IcnSpinner).attrs({ width: 24, height: 24 })`
  color: ${({ theme }) => theme.colors.blue300};

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
