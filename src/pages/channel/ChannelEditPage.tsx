import styled from 'styled-components';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useCategory from '@src/hooks/query/useCategory';
import useChannel from '@src/hooks/query/useChannel';
import useDialog from '@src/hooks/useDialog';
import useLoaderData from '@src/hooks/useRoaderData';
import useToast from '@src/hooks/useToast';
import { encodeId } from '@src/utils/formatters';
import Header from '@src/components/common/Header';
import Button from '@src/components/common/button/Button';
import TextField from '@src/components/common/input/TextField';
import Dropdown from '@src/components/common/input/Dropdown';
import ButtonBackground from '@src/components/common/ButtonBackground';
import DeleteConfirmModal from '@src/components/common/modal/DeleteConfirmModal';
import UnderlineButton from '@src/components/common/button/UnderlineButton';

const ChannelEditPage = () => {
  const { id: serverId } = useLoaderData<{ id: string }>();
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const { categoryId } = location.state || {};
  const { categoryList = [] } = useCategory(Number(serverId));
  const { channels, editChannel, delChannel } = useChannel(Number(serverId));
  const [findChannel] = useState(
    channels?.filter((it) => it.categoryId === categoryId)[0],
  );
  const [findName] = useState(
    findChannel?.channels.filter((it) => it.channelId === Number(channelId)),
  );
  const [name, setName] = useState<string>(findName?.[0].name ?? '');
  const [category, setCategory] = useState<string>(categoryId);
  const { openDialog, closeDialog } = useDialog();
  const addToast = useToast();

  const handleClickEdit = () => {
    editChannel.mutate(
      {
        channelId: Number(channelId),
        body: {
          categoryId: Number(category),
          name,
        },
      },
      {
        onSuccess: () => {
          addToast({ content: '수정 완료' });
          window.location.replace(`/server/${encodeId(Number(serverId))}`);
        },
      },
    );
  };

  const handleClickDelete = () => {
    delChannel.mutate(Number(channelId), {
      onSuccess: () => {
        closeDialog();
        addToast({ content: '삭제 완료' });
        window.location.replace(`/server/${encodeId(Number(serverId))}`);
      },
    });
  };

  return (
    <>
      <Header text='모임 편집하기' headerType='back' />
      <SLayout>
        <Dropdown
          title='모임 분류'
          placeholder='모임 분류를 선택해주세요.'
          items={
            findChannel?.name === 'DEFAULT'
              ? categoryList.map((it) =>
                  it.name === 'DEFAULT' ? { ...it, name: '기본' } : it,
                )
              : categoryList.filter((it) => it.name !== 'DEFAULT')
          }
          value={category}
          setValue={setCategory}
          required
          disabled={findChannel?.name === 'DEFAULT'}
        />
        <TextField
          title='모임 이름'
          placeholder='채널 이름을 입력하세요.'
          type='short'
          limit={20}
          required
          value={name}
          setValue={setName}
        />
      </SLayout>
      <ButtonBackground color='transparent'>
        <Container>
          <Button disabled={!name || !category} onClick={handleClickEdit}>
            수정하기
          </Button>
          {!(findChannel?.name === 'DEFAULT') && (
            <UnderlineButton
              size='small'
              text='모임 삭제하기'
              onClick={() =>
                openDialog(
                  <DeleteConfirmModal
                    closeDialog={closeDialog}
                    onClickDelete={handleClickDelete}
                  />,
                )
              }
            />
          )}
        </Container>
      </ButtonBackground>
    </>
  );
};

export default ChannelEditPage;

const SLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: 100%;
  padding: 1.875rem 1.25rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding-bottom: -0.625rem;

  width: 100%;
`;
