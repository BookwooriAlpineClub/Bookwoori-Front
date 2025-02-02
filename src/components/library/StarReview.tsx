import type Record from '@src/types/record';
import styled from 'styled-components';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

interface Props {
  starReview: NonNullable<Record['starReview']>;
}

const StarReview = ({ starReview }: Props) => {
  return (
    <Container>
      {Array.from({ length: 5 }, (_, index) =>
        index < starReview ? (
          <IcnStarBlue key={index} />
        ) : (
          <IcnStarGray key={index} />
        ),
      )}
    </Container>
  );
};

export default StarReview;

const Container = styled.div`
  display: flex;
  gap: 0;
`;
const IcnStarBlue = styled(IcnStar).attrs({ width: 20, height: 20 })`
  color: ${({ theme }) => theme.colors.blue500};
`;
const IcnStarGray = styled(IcnStar).attrs({ width: 20, height: 20 })`
  color: ${({ theme }) => theme.colors.neutral400};
`;
