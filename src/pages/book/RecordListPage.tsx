import type { Record } from '@src/types/apis/record';
import { useState } from 'react';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import Header from '@src/components/common/Header';

type Radio = Pick<Record, 'readingStatus'> & {
  text: '읽고 싶어요' | '읽고 있어요' | '다 읽었어요';
};

const RecordListPage = () => {
  const [status, setStatus] = useState<Record['readingStatus']>('READING');
  const radioList: Radio[] = [
    { readingStatus: 'WISH', text: '읽고 싶어요' },
    { readingStatus: 'READING', text: '읽고 있어요' },
    { readingStatus: 'FINISHED', text: '다 읽었어요' },
  ];

  const data: Record[] = [];

  return (
    <NoDataTextLayout>
      <Header text='책 기록' headerType='back' />
      <Fieldset name='status'>
        {radioList.map(({ readingStatus, text }) => (
          <Label key={readingStatus}>
            {text}
            <input
              name='status'
              type='radio'
              value={readingStatus}
              onChange={(e) => setStatus(e.target.value as Record['readingStatus'])}
              defaultChecked={readingStatus === 'READING'}
            />
          </Label>
        ))}
        <Background status={status} />
      </Fieldset>
      <main>
        {data.length !== 0 ? (
          <Ul>
            {data.map((item) => (
              <li key={item.recordId}>{item.bookInfo.title}</li>
            ))}
          </Ul>
        ) : (
          <strong>책을 저장해 주세요.</strong>
        )}
      </main>
    </NoDataTextLayout>
  );
};

export default RecordListPage;

const Fieldset = styled.fieldset`
  position: relative;

  display: flex;

  width: 22.0625rem;
  height: 2.8125rem;
  margin: 0 auto;

  border: ${({ theme }) => theme.colors.white} 0.25rem solid;
  border-radius: 62.4375rem;
  background-color: ${({ theme }) => theme.colors.white};

  overflow: hidden;
`;
const Label = styled.label`
  position: relative;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 33.3%;
  height: 100%;

  ${({ theme }) => theme.fonts.mountain}
  color: ${({ theme }) => theme.colors.blue200};

  &:has(input[type='radio']:checked) {
    color: ${({ theme }) => theme.colors.white};
  }

  transition: color 0.3s ease-out;
`;
const Background = styled.div<{ status: Record['readingStatus'] }>`
  position: absolute;
  left: ${({ status }) => {
    switch (status) {
      case 'WISH':
        return '0';
      case 'READING':
        return '33.3%';
      case 'FINISHED':
        return '66.8%';
      default:
        return '33.3%';
    }
  }};
  z-index: 1;

  width: 33.3%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.blue100};

  transition: left 0.3s ease-out;
`;
const Ul = styled.ul`
  display: flex;
  flex-flow: row wrap;
  gap: 1.5rem 0.75rem;
`;
