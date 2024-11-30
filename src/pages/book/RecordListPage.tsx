import type { Record } from '@src/types/apis/record';
import { useState } from 'react';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import Header from '@src/components/common/Header';

const RecordListPage = () => {
  const [status, setStatus] = useState<Record['readingStatus']>('READING');
  const data: Record[] = [];

  return (
    <NoDataTextLayout>
      <Header text='책 기록' headerType='back' />
      <fieldset name='status'>
        <input
          name='status'
          type='radio'
          value='읽고 싶어요'
          onChange={() => setStatus('WISH')}
        />
        <input
          name='status'
          type='radio'
          value='읽고 있어요'
          defaultChecked
          onChange={() => setStatus('READING')}
        />
        <input
          name='status'
          type='radio'
          value='다 읽었어요'
          onChange={() => setStatus('FINISHED')}
        />
        <div />
      </fieldset>
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

const Ul = styled.ul`
  display: flex;
  flex-flow: row wrap;
  gap: 1.5rem 0.75rem;
`;
