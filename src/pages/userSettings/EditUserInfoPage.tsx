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
    setValue(e.target.value);
    setLength(e.target.value.length);
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
  height: 100%;
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
`;

const SInput = styled.input<{ $color: boolean }>`
  width: 100%;

  border-radius: 0.3125rem;
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme, $color }) =>
    $color ? theme.colors.black100 : theme.colors.blue100};
`;

const SSmallLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black200};
`;
