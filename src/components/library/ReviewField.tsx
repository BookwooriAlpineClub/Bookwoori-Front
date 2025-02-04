import styled from 'styled-components';
import TextField from '@src/components/common/input/TextField';
import { ReactComponent as IcnStar } from '@src/assets/icons/md_star.svg';

interface Props {
  readOnly?: boolean;
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  str: string;
  setStr: React.Dispatch<React.SetStateAction<string>>;
}

const ReviewField = ({ readOnly, num, setNum, str, setStr }: Props) => {
  return (
    <>
      <Star>
        {Array.from({ length: 5 }, (_, index) => (
          <label key={index}>
            {index < num ? <IcnStarBlue /> : <IcnStarGray />}
            <input
              name='star'
              type='radio'
              value={index + 1}
              required
              readOnly={readOnly}
              onChange={(e) => setNum?.(Number(e.target.value))}
            />
          </label>
        ))}
      </Star>
      <TextField
        as='textarea'
        name='content'
        placeholder='이 책은 어떠셨나요? 감상평을 적어주세요.'
        maxLength={-1}
        required
        value={str}
        setValue={setStr}
      />
    </>
  );
};

export default ReviewField;

const Star = styled.div`
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
