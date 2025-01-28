import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { categoryIdState } from '@src/states/atoms';
import { useCategory } from '@src/hooks/query/category';
import useModal from '@src/hooks/useModal';
import useLoaderData from '@src/hooks/useRoaderData';
import useToast from '@src/hooks/useToast';
import { encodeId } from '@src/utils/formatters';
import Header from '@src/components/common/Header';
import Button from '@src/components/common/Button';
import InputText from '@src/components/common/InputText';
import InputDropdown from '@src/components/common/InputDropdown';
import ButtonBackground from '@src/components/common/ButtonBackground';
import DeleteConfirmModal from '@src/components/common/DeleteConfirmModal';
import UnderlineButton from '@src/components/common/UnderlineButton';
import {
  useDeleteChannel,
  useGetServerChannel,
  usePatchChannel,
} from '@src/hooks/query/channel';
import Section from '@src/components/common/Section';
import Fieldset from '@src/components/common/Fieldset';

const findItemByKey = <T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K],
): T | null => {
  return items.find((item) => item[key] === value) ?? null;
};

const ChannelEditPage = async () => {
  const { openModal: openDialog, closeModal: closeDialog } =
    await useModal('dialog');
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
      <Layout>
        <Fieldset title='모임 분류'>
          <Section>
            <InputDropdown
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
            <InputText
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
      </Layout>
      <ButtonBackground color='transparent'>
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

const Layout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: 100%;
  padding: 1.875rem 1.25rem;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[10]};
  padding-bottom: -0.625rem;

  width: 100%;
`;
