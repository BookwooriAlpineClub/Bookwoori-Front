import Button from '@src/components/common/Button';
import ButtonBackground from '@src/components/common/ButtonBackground';
import Header from '@src/components/common/Header';
import InputDatepicker, {
  Period,
} from '@src/components/common/InputDatepicker';
import InputText from '@src/components/common/InputText';
import { formatDate } from '@src/utils/formatters';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ClimbingEditItemType {
  name: string;
  bookTitle: string;
  startDate: string;
  endDate: string;
  memo: string;
}

// 모집 중인 클라이밍 채널 목록을 전역 저장하고 거기서 뽑아올 예정
const mockItem: ClimbingEditItemType = {
  name: '채널 제목',
  bookTitle: '책제목',
  startDate: '2023-07-27',
  endDate: '2023-07-27',
  memo: '채널 메모입니다.',
};

const ClimbingEditPage = () => {
  const [climbingName, setClimbingName] = useState<string>('');
  const [bookTitle, setBookTitle] = useState<string>('');
  const [date, setDate] = useState<Period>({
    start: '2024-11-11',
    end: '2024-11-16',
  });
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    setClimbingName(mockItem.name);
    setBookTitle(mockItem.bookTitle);
    setDate({ start: mockItem.startDate, end: mockItem.endDate });
    setDescription(mockItem.memo);
  }, []);

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
        <Button disabled={!climbingName || !description || !date.end}>
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
