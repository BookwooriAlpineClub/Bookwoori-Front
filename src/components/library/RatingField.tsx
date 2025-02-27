import styled from 'styled-components';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

interface Props {
  required?: boolean;
  readOnly?: boolean;
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
}

const RatingField = ({ required, readOnly, num, setNum }: Props) => {
  return (
    <Container>
      {Array.from({ length: 5 }, (_, index) => (
        <label key={index}>
          {index < num ? <IcnStarBlue /> : <IcnStarGray />}
          <input
            name='star'
            type='radio'
            value={index + 1}
            required={required}
            readOnly={readOnly}
            onChange={(e) => setNum?.(Number(e.target.value))}
          />
        </label>
      ))}
    </Container>
  );
};

export default RatingField;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: ${({ theme }) => theme.gap[6]};
`;
const IcnStarBlue = styled(IcnStar).attrs({ width: 40, height: 40 })`
  color: ${({ theme }) => theme.colors.blue500};
`;
const IcnStarGray = styled(IcnStar).attrs({ width: 40, height: 40 })`
  color: ${({ theme }) => theme.colors.neutral400};
`;
