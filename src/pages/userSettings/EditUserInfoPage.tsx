import styled from 'styled-components';
import { useRef, useState } from 'react';
import UserProfilImg from '@src/components/userSettings/UserProfileImg';
import Button from '@src/components/common/Button';
import Header from '@src/components/common/Header';

const EditUserInfoPage = () => {
  const [value, setValue] = useState<string>('내별명');
  const [length, setLength] = useState<number>(0);
  const ref = useRef(value);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    const targetLength = e.target.value.length;

    if (targetLength > 20) {
      setValue(targetValue.slice(0, 20));
      setLength(20);
      return;
    }
    setValue(targetValue);
    setLength(targetLength);
  };

  return (
    <>
      <Header text='인물 정보 수정하기' headerType='back' />
      <SLayout>
        <SContainer>
          <UserProfilImg edit />
          <SBox>
            <SLabel>별명</SLabel>
            <SWrapper>
              <SInput
                type='text'
                placeholder='별명을 입력하세요.'
                value={value}
                onChange={handleChangeValue}
                $color={ref.current === value}
              />
              <SSmallLabel>{length}/10</SSmallLabel>
            </SWrapper>
          </SBox>
        </SContainer>
        <Button disabled={!(value && length <= 10 && ref.current !== value)}>
          수정하기
        </Button>
      </SLayout>
    </>
  );
};

export default EditUserInfoPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 1.875rem 1.25rem 2.5625rem;
  height: calc(100% - 4.375rem);
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: 100%;
`;

const SBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
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
  background: ${({ theme }) => theme.colors.white};
`;

const SInput = styled.input<{ $color: boolean }>`
  width: 100%;

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme, $color }) =>
    $color ? theme.colors.black100 : theme.colors.blue100};
`;

const SSmallLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black200};
`;
