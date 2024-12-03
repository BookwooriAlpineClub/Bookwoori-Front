import type { RecordListItem } from '@src/types/apis/record';
import { useState } from 'react';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import Header from '@src/components/common/Header';
import Li from '@src/components/book/RecordListItem';

const mock: RecordListItem[] = [
  {
    recordId: 1,
    memberId: 3,
    readingStatus: 'WISH',
    currentPage: 0,
    maxPage: 0,
    star: -1,
    reviewContent: '',
    bookInfo: {
      title: '채식주의자 (리마스터판) - 2024 노벨문학상 수상작가',
      author: '한강 (지은이)',
      publisher: '창비',
      pubDate: '2022',
      itemPage: 276,
      description:
        '2016년 인터내셔널 부커상을 수상하며 한국문학의 입지를 한단계 확장시킨 한강의 장편소설. 상처받은 영혼의 고통과 식물적 상상력의 강렬한 결합을 정교한 구성과 흡인력 있는 문체로 보여주며 섬뜩한 아름다움의 미학을 한강만의 방식으로 완성한 역작이다.',
      isbn13: '9788936434595',
      cover:
        'https://image.aladin.co.kr/product/29137/2/coversum/8936434594_2.jpg',
    },
  },
];

const RecordListPage = () => {
  const [status, setStatus] =
    useState<RecordListItem['readingStatus']>('READING');
  const radioConfigs: {
    readingStatus: RecordListItem['readingStatus'];
    text: '읽고 싶어요' | '읽고 있어요' | '다 읽었어요';
  }[] = [
    { readingStatus: 'WISH', text: '읽고 싶어요' },
    { readingStatus: 'READING', text: '읽고 있어요' },
    { readingStatus: 'FINISHED', text: '다 읽었어요' },
  ];

  const data: RecordListItem[] = mock;

  return (
    <Container>
      <Header text='책 기록' headerType='back' />
      <Fieldset name='status'>
        {radioConfigs.map(({ readingStatus, text }) => (
          <Label key={readingStatus}>
            {text}
            <input
              name='status'
              type='radio'
              value={readingStatus}
              onChange={(e) =>
                setStatus(e.target.value as RecordListItem['readingStatus'])
              }
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
              <Li key={item.recordId} {...item} />
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
  gap: 1.25rem;

  main {
    padding: 0 5%;
    overflow-y: auto;
  }
`;
const Fieldset = styled.fieldset`
  position: relative;

  display: flex;

  width: 22.0625rem;
  height: 2.8125rem;
  margin: 0 auto;
  flex-shrink: 0;

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
const Background = styled.div<{ status: RecordListItem['readingStatus'] }>`
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

  margin-bottom: 1.25rem;

  overflow-y: scroll;
`;
