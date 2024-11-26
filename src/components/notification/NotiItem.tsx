import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTimeGap } from '@src/utils/formatters';
import BadgeListItem from '@src/components/common/BadgeListItem';

export type NotiItemType = {
  id: number;
  createdAt: string;
  server: string;
  serverImg: string;
  content: string;
  isRead: boolean;
  link: string;
};

const NotiItem = ({
  createdAt,
  server,
  serverImg,
  content,
  isRead,
  link,
}: Omit<NotiItemType, 'id'>) => {
  const navigate = useNavigate();
  const [isNotiRead, setIsNotiRead] = useState<boolean>(isRead);

  function handleNavigate() {
    navigate(link);
  }
  function handleClick() {
    setIsNotiRead(true);
    // isNotiRead 서버 PATCH
    handleNavigate();
  }

  return (
    <BadgeListItem
      type='notice'
      imgUrl={serverImg}
      caption={server}
      time={formatTimeGap(new Date(), new Date(createdAt))}
      message={content}
      isRead={isNotiRead}
      onClick={isNotiRead ? handleNavigate : handleClick}
    />
  );
};

export default NotiItem;
