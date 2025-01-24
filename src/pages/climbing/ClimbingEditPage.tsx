import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useLoaderData from '@src/hooks/useRoaderData';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';
import useToast from '@src/hooks/useToast';
import useDialog from '@src/hooks/useDialog';
import {
  useDeleteClimbing,
  useGetClimbing,
  usePatchClimbing,
} from '@src/hooks/query/climbing';
import { encodeId, formatDate } from '@src/utils/formatters';
import Button from '@src/components/common/Button';
import ButtonBackground from '@src/components/common/ButtonBackground';
import Header from '@src/components/common/Header';
import InputDatepicker, {
  Period,
} from '@src/components/common/InputDatepicker';
import InputText from '@src/components/common/InputText';
import DeleteConfirmModal from '@src/components/common/DeleteConfirmModal';
import UnderlineButton from '@src/components/common/UnderlineButton';
import Section from '@src/components/common/Section';
import Fieldset from '@src/components/common/Fieldset';

const ClimbingEditPage = () => {
  const navigate = useEncodedNavigation();
  const addToast = useToast();
  const { openDialog, closeDialog } = useDialog();

  const serverId = sessionStorage.getItem('currentServer');
  const { id: climbingId } = useLoaderData<{ id: string }>();

  const { climbingInfo: readyClimbingInfo } = useGetClimbing(Number(climbingId));
  const { editClimbing } = usePatchClimbing(Number(serverId));
  const { delClimbing } = useDeleteClimbing(Number(serverId));

  const [climbingName, setClimbingName] = useState<string>('');
  const [bookTitle, setBookTitle] = useState<string>('');
  const [date, setDate] = useState<Period>({
    start: '',
    end: '',
  });
  const [description, setDescription] = useState<string>('');

  const handleClickEdit = () => {
    const data = {
      name: climbingName,
      description,
      startDate: date.start,
      endDate: date.end,
    };

    editClimbing.mutate(
      { climbingId: Number(climbingId), body: data },
      {
        onSuccess: () => {
          addToast('success', '수정 완료');
          window.location.replace(`/server/${encodeId(Number(serverId))}`);
        },
      },
    );
  };

  const handleClickDelete = () => {
    delClimbing.mutate(Number(climbingId), {
      onSuccess: () => {
        closeDialog();
        addToast('success', '삭제 완료');
        navigate('/server', Number(serverId), { replace: true });
      },
    });
  };

  useEffect(() => {
    if (readyClimbingInfo) {
      setClimbingName(readyClimbingInfo.name);
      setBookTitle(readyClimbingInfo.bookInfo.title);
      setDate({
        start: readyClimbingInfo.startDate,
        end: readyClimbingInfo.endDate,
      });
      setDescription(readyClimbingInfo.description);
    }
  }, [readyClimbingInfo]);

  return (
    <>
      <Header text='등반 편집하기' headerType='back' />
      <Layout>
        <Fieldset title='등반 이름'>
          <Section>
            <InputText
              as='input'
              name='등반 이름'
              placeholder='등반 이름을 입력하세요.'
              maxLength={20}
              required
              value={climbingName}
              setValue={setClimbingName}
            />
          </Section>
        </Fieldset>
        <Fieldset title='책 제목'>
          <Section>
            <InputText
              as='input'
              name='책 제목'
              placeholder='책 제목을 입력하세요.'
              maxLength={-1}
              required
              value={bookTitle}
              setValue={setBookTitle}
              disabled
            />
          </Section>
        </Fieldset>
        <Fieldset title='등반 시기'>
          <Section>
            <InputDatepicker
              name='등반 시기'
              type='period'
              min={formatDate(new Date())}
              required
              disabled='start'
              value={date}
              setValue={setDate}
            />
          </Section>
        </Fieldset>
        <Fieldset title='등반 설명'>
          <Section>
            <InputText
              as='textarea'
              name='등반 설명'
              placeholder='사람들에게 등반에 대해 알려주세요.'
              maxLength={150}
              required
              value={description}
              setValue={setDescription}
            />
          </Section>
        </Fieldset>
      </Layout>
      <ButtonBackground color='transparent'>
        <Container>
          <Button
            disabled={!climbingName || !description || !date.end}
            onClick={handleClickEdit}
          >
            편집하기
          </Button>
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
        </Container>
      </ButtonBackground>
    </>
  );
};

export default ClimbingEditPage;

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

  width: 100%;
`;
