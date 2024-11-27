import styled from 'styled-components';
import { useState } from 'react';
import useClimbingRecruit from '@src/hooks/query/useClimbingRecruit';
import useLoaderData from '@src/hooks/useRoaderData';
import { formatDate } from '@src/utils/formatters';
import Button from '@src/components/common/Button';
import ButtonBackground from '@src/components/common/ButtonBackground';
import Header from '@src/components/common/Header';
import InputDatepicker, {
  Period,
} from '@src/components/common/InputDatepicker';
import InputText from '@src/components/common/InputText';

const ClimbingEditPage = () => {
  const serverId = 2;
  const { id: climbingId } = useLoaderData<{ id: string }>();
  const { readyClimbingInfo, editClimbing } = useClimbingRecruit(
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

  const handleClickEdit = () => {
    const data = {
      name: climbingName,
      'description': description,
      startTime: date.start,
      endTime: date.end,
    };
    editClimbing.mutate(data);
  };

  return (
    <>
      <SHeader text='채널 편집하기' headerType='back' />
      <SLayout>
        <InputText
          title='채널 이름'
          placeholder='채널 이름을 입력하세요.'
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
      <ButtonBackground>
        <Button
          disabled={!climbingName || !description || !date.end}
          onClick={handleClickEdit}
        >
          편집하기
        </Button>
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
