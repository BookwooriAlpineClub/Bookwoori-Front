import styled from 'styled-components';
import { useState } from 'react';
import useDialog from '@src/hooks/useDialog';
import Header from '@src/components/common/Header';
import Button from '@src/components/common/Button';
import InputText from '@src/components/common/InputText';
import InputDropdown from '@src/components/common/InputDropdown';
import ButtonBackground from '@src/components/common/ButtonBackground';
import DeleteConfirmModal from '@src/components/channel/DeleteConfirmModal';

const categoryList = ['분류1', '분류2'];

const ChannelEditPage = () => {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const { openDialog, closeDialog } = useDialog();

  return (
    <>
      <Header text='모임 편집하기' headerType='back' />
      <SLayout>
        <InputDropdown
          title='모임 분류'
          placeholder='모임 분류를 선택해주세요.'
          items={categoryList}
          value={category}
          setValue={setCategory}
          required
        />
        <InputText
          title='모임 이름'
          placeholder='채널 이름을 입력하세요.'
          type='short'
          limit={20}
          required
          value={name}
          setValue={setName}
        />
      </SLayout>
      <ButtonBackground>
        <Container>
          <Button disabled={!name || !category}>수정하기</Button>
          <TextButton
            onClick={() =>
              openDialog(<DeleteConfirmModal closeDialog={closeDialog} />)
            }
          >
            모임 삭제하기
          </TextButton>
        </Container>
      </ButtonBackground>
    </>
  );
};

export default ChannelEditPage;

const SLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  padding: 1.875rem 1.25rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;
const TextButton = styled.button`
  margin-bottom: -0.625rem;

  ${({ theme }) => theme.fonts.caption};
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.black200};
`;
