import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Scrim from '@src/components/common/Scrim';
import Button from '@src/components/serverbar/Button';

const mockNoti = false;
const mockChat = true;

const ServerBar = () => {
  const [isNotiRead, setIsNotiRead] = useState<boolean>();
  const [isChatRead, setIsChatRead] = useState<boolean>();

  useEffect(() => {
    const dataNoti: boolean = mockNoti; // 알림 isRead fetch
    const dataChat: boolean = mockChat; // 채팅 isRead fetch

    setIsNotiRead(dataNoti);
    setIsChatRead(dataChat);
  }, []);

  return (
    <Scrim isOpen={} transition={} closeModal={}>
      <Layout>
        <Fieldset>
          <Button name='서재'>아이콘</Button>
          <Hr />
          <BadgeButton name='알림' isRead={isNotiRead}>
            아이콘
          </BadgeButton>
          <BadgeButton name='채팅' isRead={isChatRead}>
            아이콘
          </BadgeButton>
          <Button name='계정 설정'>아이콘</Button>
          <Hr />
          <BlueButton name='서버 추가'>아이콘</BlueButton>
          <ImageButton name='서버'>아이콘</ImageButton>
        </Fieldset>
      </Layout>
    </Scrim>
  );
};

export default ServerBar;

const Layout = styled.section<{ $transition: ModalTransition }>`
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(
    ${({ $transition }) => ($transition === 'open' ? 0 : '-100%')}
  );
  transition: transform 0.3s ease;

  width: 21%;
  height: 100%;
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.62rem;

  margin: 1.25rem auto;
`;
const Hr = styled.hr`
  border: 1.5px solid ${({ theme }) => theme.colors.blue300};
`;
const NeongreenButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.black300};
  color: ${({ theme }) => theme.colors.black200};

  &:checked {
    background-color: ${({ theme }) => theme.colors.neonGreen};
    color: ${({ theme }) => theme.colors.black100};
  }
`;
const BadgeButton = styled(NeongreenButton)`
  &:not([isRead])::after {
    width: 0.5rem;
    height: 0.5rem;

    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.blue100};
  }
`;
const BlueButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.blue200};
  color: ${({ theme }) => theme.colors.white};
`;
const ImageButton = styled(Button)`
  background-image: url();
`;
