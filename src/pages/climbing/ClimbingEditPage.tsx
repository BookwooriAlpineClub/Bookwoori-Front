import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useClimbingRecruit from '@src/hooks/query/useClimbingRecruit';
import useLoaderData from '@src/hooks/useRoaderData';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';
import useToast from '@src/hooks/useToast';
import { encodeId, formatDate } from '@src/utils/formatters';
import Button from '@src/components/common/Button';
import ButtonBackground from '@src/components/common/ButtonBackground';
import Header from '@src/components/common/Header';
import InputDatepicker, {
  Period,
} from '@src/components/common/InputDatepicker';
import InputText from '@src/components/common/InputText';
import useDialog from '@src/hooks/useDialog';
import DeleteConfirmModal from '@src/components/common/DeleteConfirmModal';

const ClimbingEditPage = () => {
  const serverId = sessionStorage.getItem('currentServer') ?? '-1';
  // const serverId = 3; // 전역 서버 정보 필요
  const { id: climbingId } = useLoaderData<{ id: string }>();
  const { readyClimbingInfo, editClimbing, delClimbing } = useClimbingRecruit(
    Number(serverId),
    Number(climbingId),
  );
  const [climbingName, setClimbingName] = useState<string>(
    readyClimbingInfo?.name ?? '',
  );
  const [bookTitle, setBookTitle] = useState<string>(
    readyClimbingInfo?.bookInfo.title ?? '',
  );
  const [date, setDate] = useState<Period>({
    start: readyClimbingInfo?.startDate ?? '',
    end: readyClimbingInfo?.endDate ?? '',
  });
  const [description, setDescription] = useState<string>(
    readyClimbingInfo?.description ?? '',
  );
  const { openDialog, closeDialog } = useDialog();

  const navigate = useEncodedNavigation();
  const addToast = useToast();
  const handleClickEdit = () => {
    const data = {
      name: climbingName ?? '',
      description,
      startDate: date.start,
      endDate: date.end,
    };
    editClimbing.mutate(data, {
      onSuccess: () => {
        addToast({ content: '수정 완료' });
        console.log(serverId);
        window.location.replace(`/server/${encodeId(Number(serverId))}`);
      },
    });
  };

  const handleClickDelete = () => {
    delClimbing.mutate(Number(climbingId), {
      onSuccess: () => {
        closeDialog();
        addToast({ content: '삭제 완료' });
        navigate('/server', Number(serverId), { replace: true });
      },
    });
  };

  useEffect(() => {
    setClimbingName(readyClimbingInfo?.name ?? '');
    setBookTitle(readyClimbingInfo?.bookInfo.title ?? '');
    setDate({
      start: readyClimbingInfo?.startDate ?? '',
      end: readyClimbingInfo?.endDate ?? '',
    });
    setDescription(readyClimbingInfo?.description ?? '');
  }, [readyClimbingInfo]);

  return (
    <>
      <SHeader text='등반 편집하기' headerType='back' />
      <SLayout>
        <InputText
          title='등반 이름'
          placeholder='등반 이름을 입력하세요.'
          type='short'
          limit={20}
          required
          value={climbingName}
          setValue={setClimbingName}
        />
        <InputText
          title='책 제목'
          placeholder='책 제목을 입력하세요.'
          type='short'
          limit={-1}
          required
          value={bookTitle}
          setValue={setBookTitle}
          disabled
        />
        <InputDatepicker
          title='등반 시기'
          type='period'
          min={formatDate(new Date())}
          required
          disabled='start'
          value={date}
          setValue={setDate}
        />
        <InputText
          title='등반 설명'
          placeholder='사람들에게 등반에 대해 알려주세요.'
          type='long'
          limit={150}
          required
          value={description}
          setValue={setDescription}
        />
      </SLayout>
      <ButtonBackground color='transparent'>
        <Container>
          <Button
            disabled={!climbingName || !description || !date.end}
            onClick={handleClickEdit}
          >
            편집하기
          </Button>
          <TextButton
            onClick={() =>
              openDialog(
                <DeleteConfirmModal
                  closeDialog={closeDialog}
                  onClickDelete={handleClickDelete}
                />,
              )
            }
          >
            모임 삭제하기
          </TextButton>
        </Container>
      </ButtonBackground>
    </>
  );
};

export default ClimbingEditPage;

const SHeader = styled(Header)`
  z-index: 2;
`;
const SLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  padding: 1.875rem 1.25rem;
`;
const TextButton = styled.button`
  margin-bottom: -0.625rem;

  ${({ theme }) => theme.fonts.caption};
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.black200};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  width: 100%;
`;
