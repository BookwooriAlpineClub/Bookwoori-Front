import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

interface Props {
  name: string;
  readOnly?: boolean;
  value?: number;
  setValue?: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  itemPage: number;
}

const PageField = ({
  name = '독서 현황',
  readOnly = false,
  value,
  setValue,
  currentPage,
  itemPage,
}: Props) => {
  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      let data = event.currentTarget.value;

      data = data.replace(/[^0-9]/gi, ''); // 숫자 외 모든 문자 제거
      data = data.slice(0, -1); // 마지막 숫자 삭제
      const num = Number(data);

      setValue?.(num);
    }
  };
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    let data = event.currentTarget.value;

    data = data.replace(/[^0-9]/gi, ''); // 숫자 외 모든 문자 제거
    const num = Math.min(Number(data), itemPage); // 최댓값 유효성 검증

    setValue?.(num);
  };

  return (
    <Container>
      <Input
        type='tel'
        name={name}
        placeholder={`${currentPage}쪽`}
        required
        readOnly={readOnly}
        value={`${value}쪽`}
        onKeyDown={handleKeydown}
        onInput={handleInput}
      />
      <Body>/</Body>
      <ItemPage>{itemPage}쪽</ItemPage>
    </Container>
  );
};

export default PageField;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: ${({ theme }) => theme.gap[10]};
`;
const Input = styled.input`
  text-align: center;

  width: 100%;

  background-color: transparent;

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral400};
  }
`;
const Body = styled.span`
  ${({ theme }) => theme.fonts.body}
  ${NoSelect}
`;
const ItemPage = styled(Body)`
  text-align: center;

  width: 100%;
`;
