import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { usePostCategory } from '@src/hooks/query/category';
import { currentServerIdState } from '@src/states/atoms';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';
import Button from '@src/components/common/button/Button';
import Fieldset from '@src/components/common/Fieldset';
import Header from '@src/components/common/Header';
import TextField from '@src/components/common/input/TextField';
import Section from '@src/components/common/Section';

const CategoryAddPage = () => {
  const id = useRecoilValue(currentServerIdState);
  const [value, setValue] = useState<string>('');
  const navigate = useEncodedNavigation();

  const { createCategory } = usePostCategory();

  const handleSubmit = () => {
    createCategory.mutate(value, {
      onSuccess: () => navigate('/server', id, { replace: true }),
    });
  };

  return (
    <>
      <Header text='분류 추가하기' headerType='back' />
      <Main>
        <Box className='scroll-area'>
          <Fieldset title='분류 이름'>
            <Section>
              <TextField
                name='category'
                as='input'
                placeholder='분류 이름을 입력하세요.'
                value={value}
                setValue={setValue}
                maxLength={10}
              />
            </Section>
          </Fieldset>
        </Box>
        <Button
          disabled={!(value && value.length <= 10)}
          onClick={handleSubmit}
        >
          추가하기
        </Button>
      </Main>
    </>
  );
};

export default CategoryAddPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  width: 100%;
`;
