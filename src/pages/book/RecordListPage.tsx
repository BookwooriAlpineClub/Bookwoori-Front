import type Record from '@src/types/record';
import useRecord from '@src/hooks/query/useRecord';
import { useState } from 'react';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import Header from '@src/components/common/Header';
import SegmentedButton from '@src/components/common/SegmentedButton';
import Li from '@src/components/book/RecordListItem';

const RecordListPage = () => {
  const [status, setStatus] = useState<Record['status']>('READING');
  const configs: {
    value: Record['status'];
    label: '읽고 싶어요' | '읽고 있어요' | '다 읽었어요';
  }[] = [
    { value: 'WISH', label: '읽고 싶어요' },
    { value: 'READING', label: '읽고 있어요' },
    { value: 'FINISHED', label: '다 읽었어요' },
  ];

  const { recordList: data } = useRecord({ status });

  return (
    <Container>
      <Header text='책 기록' headerType='back' />
      <SegmentedButton<Record['status']>
        config={configs}
        onSegmentChange={setStatus}
        defaultValue='READING'
      />
      <main>
        {data.length !== 0 ? (
          <Ul>
            {data.map((item) => (
              <Li key={item.isbn13} {...item} />
            ))}
          </Ul>
        ) : (
          <strong>책을 저장해 주세요.</strong>
        )}
      </main>
    </Container>
  );
};

export default RecordListPage;

const Container = styled(NoDataTextLayout)`
  gap: ${({ theme }) => theme.gap[16]};

  main {
    overflow-y: auto;
  }
`;
const Ul = styled.ul`
  display: flex;
  flex-flow: row wrap;
  gap: ${({ theme }) => `${theme.gap[16]} ${theme.gap[12]}`};

  margin-bottom: 1.25rem;

  overflow-y: scroll;
`;
