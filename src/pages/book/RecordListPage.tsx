import type { Record } from '@src/types/apis/record';
import { useState } from 'react';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import Header from '@src/components/common/Header';
import RecordListItem from '@src/components/book/RecordListItem';

const mock: RecordListItem[] = [
  {
    recordId: 1,
    memberId: 3,
    readingStatus: 'WISH',
    star: -1,
    currentPage: 0,
    maxPage: 0,
    bookInfo: {
      title: '채식주의자 (리마스터판) - 2024 노벨문학상 수상작가',
      author: '한강 (지은이)',
      publisher: '창비',
      pubYear: '2022',
      itemPage: 276,
      description:
        '2016년 인터내셔널 부커상을 수상하며 한국문학의 입지를 한단계 확장시킨 한강의 장편소설. 상처받은 영혼의 고통과 식물적 상상력의 강렬한 결합을 정교한 구성과 흡인력 있는 문체로 보여주며 섬뜩한 아름다움의 미학을 한강만의 방식으로 완성한 역작이다.',
      isbn13: '9788936434595',
      cover:
        'https://image.aladin.co.kr/product/29137/2/coversum/8936434594_2.jpg',
    },
  },
  {
    recordId: 2,
    memberId: 3,
    readingStatus: 'READING',
    star: -1,
    currentPage: 100,
    maxPage: 0,
    bookInfo: {
      title: '채식주의자 (리마스터판) - 2024 노벨문학상 수상작가',
      author: '한강 (지은이)',
      publisher: '창비',
      pubYear: '2022',
      itemPage: 276,
      description:
        '2016년 인터내셔널 부커상을 수상하며 한국문학의 입지를 한단계 확장시킨 한강의 장편소설. 상처받은 영혼의 고통과 식물적 상상력의 강렬한 결합을 정교한 구성과 흡인력 있는 문체로 보여주며 섬뜩한 아름다움의 미학을 한강만의 방식으로 완성한 역작이다.',
      isbn13: '9788936434595',
      cover:
        'https://image.aladin.co.kr/product/29137/2/coversum/8936434594_2.jpg',
    },
  },
  {
    recordId: 3,
    memberId: 3,
    readingStatus: 'READING',
    star: -1,
    currentPage: 100,
    maxPage: 0,
    bookInfo: {
      title: '책 이름. 아주 길고 긴 책 이름. 책 이름이 너무 길어서 생략됨.',
      author:
        '작가 이름. 아주 길고 긴 작가 이름. 작가 이름이 너무 길어서 생략됨.',
      publisher: '출판사 이름',
      pubYear: '2023',
      itemPage: 203,
      description: '책 소개',
      isbn13: '',
      cover: '',
    },
  },
  {
    recordId: 4,
    memberId: 3,
    readingStatus: 'READING',
    star: -1,
    currentPage: 100,
    maxPage: 0,
    bookInfo: {
      title: '디 에센셜 한강 (무선 보급판) - 2024 노벨문학상 수상작가',
      author: '한강 (지은이)',
      publisher: '문학동네',
      pubYear: '2023',
      itemPage: 364,
      description:
        '작가의 핵심 작품들을 큐레이팅하여 한 권으로 엮은 스페셜 에디션 ‘디 에센셜The essential’. 문학동네에서 출시하는 디 에센셜 한국작가 편은 ‘센세이션’이라는 키워드 아래, 독자들에게 강렬한 독서 경험을 선사하며 한국문학에 센세이션을 일으킨 작가를 선정한다. 첫번째 작가는 한강이다.',
      isbn13: '',
      cover:
        'https://image.aladin.co.kr/product/31784/0/coversum/8954693466_2.jpg',
    },
  },
  {
    recordId: 5,
    memberId: 3,
    readingStatus: 'FINISHED',
    star: 3,
    currentPage: 0,
    maxPage: 0,
    bookInfo: {
      title: '누가 내 머리에 똥 쌌어?',
      author: '베르너 홀츠바르트 (글), 볼프 에를브루흐 (그림)',
      publisher: '사계절',
      pubYear: '2002',
      itemPage: 20,
      description:
        '어느 날, 두더지는 기분 좋게 땅 위로 올라왔다가 그만 똥세례를 받는다. 화가 난 두더지는 누가 자기 머리 위에 똥을 쌌는지 알아내려고 길을 나선다. 하지만, 만나는 동물마다 자신의 똥을 직접 보여주면서, 자신이 범인이 아니라고 한다. 그러는 과정에서 두더지는 정육점집 개 한스가 자신의 머리 위에 똥을 쌌다는 것을 알게 된다.',
      isbn13: '',
      cover:
        'https://image.aladin.co.kr/product/3/34/cover500/8971968419_2.jpg',
    },
  },
  {
    recordId: 6,
    memberId: 3,
    readingStatus: 'FINISHED',
    star: 5,
    currentPage: 0,
    maxPage: 0,
    bookInfo: {
      title: '흰 - 2024 노벨문학상 수상작가, 한강 소설',
      author: '한강 (지은이), 최진혁 (사진)',
      publisher: '문학동네',
      pubYear: '2018',
      itemPage: 196,
      description:
        '2018년 봄, 한강 작가의 소설 &lt;흰&gt;을 새롭게 선보인다. 이 년 전 오월에 세상에 나와 빛의 겹겹 오라기로 둘러싸인 적 있던 그 &lt;흰&gt;에 새 옷을 입히게 된 건 소설 발간에 즈음해 행했던 작가의 퍼포먼스가 글과 함께 배었으면 하는 바람에서였다.',
      isbn13: '',
      cover:
        'https://image.aladin.co.kr/product/14322/3/coversum/8954651135_3.jpg',
    },
  },
];

type RecordListItem = Omit<Record, 'startDate' | 'endDate' | 'reviewContent'>;
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

  const data: RecordListItem[] = mock;

  return (
    <Container>
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
              <RecordListItem key={item.recordId} {...item} />
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

  margin-bottom: 1.25rem;

  overflow-y: scroll;
`;
