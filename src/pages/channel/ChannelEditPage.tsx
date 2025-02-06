import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import useModal from '@src/hooks/useModal';
import useLoaderData from '@src/hooks/useRoaderData';
import useToast from '@src/hooks/useToast';
import { useCategory } from '@src/hooks/query/category';
import {
  useDeleteChannel,
  useGetServerChannel,
  usePatchChannel,
} from '@src/hooks/query/channel';
import { dialogState, categoryIdState } from '@src/states/atoms';
import { encodeId } from '@src/utils/formatters';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import Fieldset from '@src/components/common/Fieldset';
import Section from '@src/components/common/Section';
import DeleteConfirmDialog from '@src/components/common/modal/DeleteConfirmDialog';
import Button from '@src/components/common/button/Button';
import UnderlineButton from '@src/components/common/button/UnderlineButton';
import TextField from '@src/components/common/input/TextField';
import Dropdown from '@src/components/common/input/Dropdown';

const findItemByKey = <T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K],
): T | null => {
  return items.find((item) => item[key] === value) ?? null;
};

const ChannelEditPage = () => {
  const { openModal: openDialog, closeModal: closeDialog } = useModal(dialogState);
  const addToast = useToast();

  const { id: serverId } = useLoaderData<{ id: string }>();
  const { channelId } = useParams<{ channelId: string }>();
  const categoryId = useRecoilValue(categoryIdState);
  const { categoryList = [] } = useCategory();
  const { channels } = useGetServerChannel();
  const { editChannel } = usePatchChannel();
  const { delChannel } = useDeleteChannel();

  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>(
    categoryId?.toString() ?? '0',
  );

  const currentCategory = useMemo(() => {
    if (!channels || !categoryId) return null;
    return findItemByKey(channels, 'categoryId', Number(categoryId));
  }, [channels, categoryId]);

  useEffect(() => {
    if (!channelId || !currentCategory) return;

    const channelInfo = findItemByKey(
      currentCategory.channels,
      'channelId',
      Number(channelId),
    );
    setName(channelInfo?.name ?? '');
  }, [currentCategory, channelId]);

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
          addToast('success', '수정 완료');
          window.location.replace(`/server/${encodeId(Number(serverId))}`);
        },
      },
    );
  };

  const handleClickDelete = () => {
    delChannel.mutate(Number(channelId), {
      onSuccess: () => {
        closeDialog();
        addToast('success', '삭제 완료');
        window.location.replace(`/server/${encodeId(Number(serverId))}`);
      },
    });
  };

  return (
    <>
      <Header text='모임 편집하기' headerType='back' />
      <main>
        <Form className='scroll-area'>
          <Fieldset title='모임 분류'>
            <Section>
              <Dropdown
                name='모임 분류'
                placeholder='모임 분류를 선택해주세요.'
                options={categoryList.map((it) =>
                  it.name === 'DEFAULT'
                    ? { id: Number(it.categoryId), text: '기본' }
                    : { id: Number(it.categoryId), text: it.name },
                )}
                value={category}
                setValue={setCategory}
                required
                disabled={currentCategory?.name === 'DEFAULT'}
              />
            </Section>
          </Fieldset>
          <Fieldset title='모임 이름'>
            <Section>
              <TextField
                as='input'
                name='모임 이름'
                placeholder='채널 이름을 입력하세요.'
                maxLength={20}
                required
                value={name}
                setValue={setName}
              />
            </Section>
          </Fieldset>
        </Form>
        <Container>
          <Button disabled={!name || !category} onClick={handleClickEdit}>
            수정하기
          </Button>
          {!(currentCategory?.name === 'DEFAULT') && (
            <UnderlineButton
              size='small'
              text='모임 삭제하기'
              onClick={() =>
                openDialog(
                  <DeleteConfirmDialog
                    closeDialog={closeDialog}
                    onClickDelete={handleClickDelete}
                  />,
                )
              }
            />
          )}
        </Container>
      </main>
    </>
  );
};

export default ChannelEditPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[10]};
  padding-bottom: -0.625rem;

  width: 100%;
`;
