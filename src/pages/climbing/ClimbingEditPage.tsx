import { useEffect, useState } from 'react';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';
import useModal from '@src/hooks/useModal';
import useLoaderData from '@src/hooks/useRoaderData';
import useToast from '@src/hooks/useToast';
import {
  useDeleteClimbing,
  useGetClimbing,
  usePatchClimbing,
} from '@src/hooks/query/climbing';
import { dialogState } from '@src/states/atoms';
import { encodeId, formatDate } from '@src/utils/formatters';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import Fieldset from '@src/components/common/Fieldset';
import Section from '@src/components/common/Section';
import DeleteConfirmDialog from '@src/components/common/modal/DeleteConfirmDialog';
import Button from '@src/components/common/button/Button';
import UnderlineButton from '@src/components/common/button/UnderlineButton';
import TextField from '@src/components/common/input/TextField';
import Datepicker, { type Period } from '@src/components/common/input/Datepicker';

const ClimbingEditPage = () => {
  const navigate = useEncodedNavigation();
  const addToast = useToast();
  const { openModal: openDialog, closeModal: closeDialog } = useModal(dialogState);

  const serverId = sessionStorage.getItem('currentServer');
  const { id: climbingId } = useLoaderData<{ id: string }>();

  const { climbingInfo: readyClimbingInfo } = useGetClimbing(
    Number(climbingId),
  );
  const { editClimbing } = usePatchClimbing();
  const { delClimbing } = useDeleteClimbing();

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
      <main>
        <Form className='scroll-area'>
          <Fieldset title='등반 이름'>
            <Section>
              <TextField
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
              <TextField
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
              <Datepicker
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
              <TextField
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
        </Form>
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
                <DeleteConfirmDialog
                  closeDialog={closeDialog}
                  onClickDelete={handleClickDelete}
                />,
              )
            }
          />
        </Container>
      </main>
    </>
  );
};

export default ClimbingEditPage;

const Form = styled.form`
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
