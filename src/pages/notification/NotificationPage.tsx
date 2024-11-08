import { useEffect, useState } from 'react';
import { formatTimeGap } from '@src/utils/formatters';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import BadgeListItem, { type BadgeListItemProps } from '@src/components/common/BadgeListItem';

const mock: Omit<BadgeListItemProps, 'type'>[] = [
  {
    imgUrl: '/',
    caption: 'AAA공동체 - BBB모임',
    time: '2024-11-08 02:05:00',
    message: 'OO님이 나를 언급했어요.',
    isRead: false,
  },
  {
    imgUrl: '/',
    caption: 'AAA공동체 - BBB모임',
    time: '2024-11-08 02:04:30',
    message: 'OO님이 나를 언급했어요.',
    isRead: false,
  },
  {
    imgUrl: '/',
    caption: 'AAA공동체 - BBB모임',
    time: '2024-11-08 01:50:59',
    message: 'OO님이 나를 언급했어요.',
    isRead: false,
  },
  {
    imgUrl: '/',
    caption: 'AAA공동체 - BBB모임',
    time: '2024-11-08 01:00:00',
    message: 'OO님이 나를 언급했어요.',
    isRead: false,
  },
  {
    imgUrl: '/',
    caption: 'AAA공동체 - BBB모임',
    time: '2024-10-21 01:00:00',
    message: 'OO님이 나를 언급했어요.',
    isRead: false,
  },
  {
    imgUrl: '/',
    caption: 'CCC공동체 - DDD모임',
    time: '2024-09-07 23:00:00',
    message: '등반 모임 생성이 완료됐어요.',
    isRead: true,
  },
  {
    imgUrl: '/',
    caption: 'EEE공동체 - FFF모임',
    time: '2020-11-07 00:00:00',
    message: 'OO님이 내 감상평에 반응을 남겼어요.',
    isRead: true,
  },
];

const NotificationPage = () => {
  const [notiList, setNotiList] = useState<Omit<BadgeListItemProps, 'type'>[]>([]);

  useEffect(() => {
    const data = mock; // 데이터 fetch
    setNotiList(
      data.map((item) => {
        const time = formatTimeGap(new Date(), new Date(item.time));
        return { ...item, time };
      }),
    );
  }, []);

  return (
    <Layout>
      <Header text='알림' headerType='hamburger' />
        {notiList.map((item) => (
            <BadgeListItem type='notice' {...item} />
        ))}
      <Ol>
      </Ol>
    </Layout>
  );
};

export default NotificationPage;

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
const Ol = styled.ol`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.62rem;

  margin: 0.94rem 5%;
`;
