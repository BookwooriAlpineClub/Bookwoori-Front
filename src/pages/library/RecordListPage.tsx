import type Record from '@src/types/record';
import { useGetRecordList } from '@src/hooks/query/record';
import { useState } from 'react';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import SegmentedControl from '@src/components/common/SegmentedControl';
import Li from '@src/components/library/RecordListItem';

const segmentConfigs: {
  value: Record['status'];
  label: '읽고 싶어요' | '읽고 있어요' | '다 읽었어요';
}[] = [
  { value: 'WISH', label: '읽고 싶어요' },
  { value: 'READING', label: '읽고 있어요' },
  { value: 'FINISHED', label: '다 읽었어요' },
];

const RecordListPage = () => {
  const [status, setStatus] = useState<Record['status']>('READING');

  const { data: recordList } = useGetRecordList(status);

  return (
    <Container>
      <Header text='책 기록' headerType='back' />
      <SegmentedControl<Record['status']>
        config={segmentConfigs}
        onSegmentChange={setStatus}
        defaultValue='READING'
      />
      <main>
        {recordList.length > 0 ? (
          <Ul>
            {recordList.map((item) => (
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

const Container = styled.div`
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
