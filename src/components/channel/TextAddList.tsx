import styled from 'styled-components';

interface props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  length: number;
  setLength: React.Dispatch<React.SetStateAction<number>>;
}

const TextAddList = ({ value, setValue, length, setLength }: props) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setLength(e.target.value.length);
  };

  return (
    <SLayout>
      <SBox>
        <SLabel>모임 분류</SLabel>
      </SBox>
      <SBox>
        <SLabel>모임 이름</SLabel>
        <SWrapper>
          <SInput
            type='text'
            placeholder='모임 이름을 입력하세요.'
            value={value}
            onChange={handleChangeValue}
          />
          <SSmallLabel>{length}/20</SSmallLabel>
        </SWrapper>
      </SBox>
    </SLayout>
  );
};

export default TextAddList;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
const SBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  width: 100%;
`;
const SLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;
const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.875rem 0.625rem;

  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const SInput = styled.input`
  width: 100%;

  ${({ theme }) => theme.fonts.body};
`;
const SSmallLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black200};
`;
