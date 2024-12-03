import { postCategory } from '@src/apis/category';
import Button from '@src/components/common/Button';
import Header from '@src/components/common/Header';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';
import { currentServerIdState } from '@src/states/atoms';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const CategoryAddPage = () => {
  const id = useRecoilValue(currentServerIdState);
  const [value, setValue] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const navigate = useEncodedNavigation();

  const mutation = useMutation({
    mutationFn: () => postCategory({ serverId: id, name: value }),
    onSuccess: () => {
      navigate('/server', id, { replace: true });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setLength(e.target.value.length);
  };

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <SLayout>
      <Header text='분류 추가하기' headerType='back' />
      <SContainer>
        <SBox>
          <SLabel>분류 이름</SLabel>
          <SWrapper>
            <SInput
              type='text'
              placeholder='분류 이름을 입력하세요.'
              value={value}
              onChange={handleChangeValue}
            />
            <SSmallLabel>{length}/10</SSmallLabel>
          </SWrapper>
        </SBox>
        <Button disabled={!(value && length <= 10)} onClick={handleSubmit}>
          추가하기
        </Button>
      </SContainer>
    </SLayout>
  );
};

export default CategoryAddPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100svh;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 100%;
  padding: 0.9063rem 1.25rem 2.5625rem;
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
