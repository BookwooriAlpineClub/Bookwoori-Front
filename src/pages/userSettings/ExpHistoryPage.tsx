import Header from '@src/components/common/Header';
import ExpList from '@src/components/userSettings/ExpList';
import styled from 'styled-components';

type ExpItemType = {
  name: string;
  reason: string;
  amount: number;
  exp: number;
  type: string;
  createdAt: string;
};

type ExpListType = {
  [key: string]: ExpItemType[];
};

const expList: ExpListType[] = [
  {
    '10.10.': [
      {
        name: '책이름',
        reason: '감상평을 기록했어요.',
        amount: 3,
        exp: 7.5,
        type: '적립',
        createdAt: '2023-07-27 02:09:15.456',
      },
    ],
  },
  {
    '10.12.': [
      {
        name: '책',
        reason: '별점 작성',
        amount: 3,
        exp: 7.5,
        type: '적립',
        createdAt: '2023-07-27 02:09:15.456',
      },
      {
        name: '책이름',
        reason: '별점 작성',
        amount: 3,
        exp: 7.5,
        type: '적립',
        createdAt: '2023-07-27 02:09:15.456',
      },
      {
        name: '책이름',
        reason: '별점 작성',
        amount: 3,
        exp: 7.5,
        type: '적립',
        createdAt: '2023-07-27 02:09:15.456',
      },
    ],
  },
  {
    '10.13.': [
      {
        name: '책이름',
        reason: '별점 작성',
        amount: 3,
        exp: 7.5,
        type: '적립',
        createdAt: '2023-07-27 02:09:15.456',
      },
      {
        name: '책이름',
        reason: '별점 작성',
        amount: 3,
        exp: 7.5,
        type: '적립',
        createdAt: '2023-07-27 02:09:15.456',
      },
    ],
  },
];

const ExpHistoryPage = () => {
  return (
    <>
      <Header text='지나온 길 보기' headerType='back' />
      <SLayout>
        {expList.map((item) => {
          const keys = Object.keys(item);
          return keys.map((key) => (
            <ExpList key={`${item}-${key}`} date={key} list={item[key]} />
          ));
        })}
      </SLayout>
    </>
  );
};

export default ExpHistoryPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  padding: 0.9375rem 1.25rem 2.5rem;
`;
