import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import NotiItem, { type NotiItemType } from '@src/components/notification/NotiItem';

const mock: NotiItemType[] = [
  {
    id: 3,
    createdAt: '2024-10-21 01:00:00',
    server: 'AAA공동체 - BBB모임',
    serverImg: '/',
    content: 'OO님이 나를 언급했어요.',
    isRead: false,
    link: '/3',
  },
  {
    id: 2,
    createdAt: '2024-09-07 23:00:00',
    server: 'CCC공동체 - DDD모임',
    serverImg: '/',
    content: '등반 모임 생성이 완료됐어요.',
    isRead: true,
    link: '/2',
  },
  {
    id: 1,
    createdAt: '2020-11-07 00:00:00',
    server: 'EEE공동체 - FFF모임',
    serverImg: '/',
    content: 'OO님이 내 감상평에 반응을 남겼어요.',
    isRead: true,
    link: '/1',
  },
];

const NotificationPage = () => {
  const [notiList, setNotiList] = useState<NotiItemType[]>([]);

  useEffect(() => {
    const data: NotiItemType[] = mock; // 데이터 fetch (정렬된 데이터 수신 가정)
    setNotiList(data);
  }, []);

  return (
    <>
      <Header text='알림' headerType='hamburger' />
      <main>
        {notiList.length > 0 ? (
          <Ol>
            {notiList.map((item) => (
              <NotiItem key={item.id} {...item} />
            ))}
          </Ol>
        ) : (
          <strong>알림이 없어요.</strong>
        )}
      </main>
    </>
  );
};

export default NotificationPage;

const Ol = styled.ol`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.62rem;
`;
