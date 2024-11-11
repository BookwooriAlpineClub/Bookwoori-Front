import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { serverListState } from '@src/states/atoms'; // 추후 삭제
import { serverbarSelector } from '@src/states/selectors';
import useServerbar from '@src/hooks/useServerbar';
import styled from 'styled-components';
import Scrim from '@src/components/common/Scrim';
import { ReactComponent as IcnLibrary } from '@src/assets/icons/library.svg';
import { ReactComponent as IcnBell } from '@src/assets/icons/bell.svg';
import { ReactComponent as IcnChat } from '@src/assets/icons/chat.svg';
import { ReactComponent as IcnSettings } from '@src/assets/icons/settings.svg';
import { ReactComponent as IcnPlus } from '@src/assets/icons/plus.svg';

const mockNoti = false;
const mockChat = true;
const mockServerList: Server[] = [
  {
    serverId: 12,
    name: '공동체A',
    serverImg:
      'https://bookwoori-image-bucket.s3.ap-northeast-2.amazonaws.com/server/0f4a8a00-3d79-48b2-8d41-80570fa3c1af_elemental-movie-v2-1536x864.jpg',
  },
  {
    serverId: 13,
    name: '공동체B',
    serverImg:
      'https://bookwoori-image-bucket.s3.ap-northeast-2.amazonaws.com/server/ba314415-34e5-4ccb-ab89-57dead2f79ae_WIN_20240518_16_18_46_Pro.jpg',
  },
];

type buttonConfig = {
  name: string;
  link: string;
  icon: React.ReactElement;
  className: string;
};

const Serverbar = () => {
  const setServerList = useSetRecoilState(serverListState); // 추후 삭제
  const { content, isOpen, transition } = useRecoilValue(serverbarSelector);
  const { closeServerbar } = useServerbar();
  const navigate = useNavigate();

  const [isNotiRead, setIsNotiRead] = useState<boolean>(true);
  const [isChatRead, setIsChatRead] = useState<boolean>(true);

  const buttonConfigs: buttonConfig[] = [
    {
      name: '서재',
      link: 'library',
      icon: <IcnLibrary />,
      className: 'neongreen',
    },
    {
      name: '알림',
      link: 'notifications',
      icon: <IcnBell />,
      className: isNotiRead ? 'neongreen' : 'neongreen new',
    },
    {
      name: '채팅',
      link: 'chatting',
      icon: <IcnChat />,
      className: isChatRead ? 'neongreen' : 'neongreen new',
    },
    {
      name: '계정 설정',
      link: 'settings',
      icon: <IcnSettings />,
      className: 'neongreen',
    },
    {
      name: '서버 추가',
      link: 'server',
      icon: <IcnPlus />,
      className: 'blue',
    },
  ];

  function handleClick(link: string) {
    navigate(link);
    closeServerbar();
  }

  useEffect(() => {
    setServerList(mockServerList); // 추후 삭제

    const dataNoti: boolean = mockNoti; // 알림 isRead fetch
    const dataChat: boolean = mockChat; // 채팅 isRead fetch

    setIsNotiRead(dataNoti);
    setIsChatRead(dataChat);
  }, []);

  return (
    <Scrim isOpen={isOpen} transition={transition} closeModal={closeServerbar}>
      <Layout
        onClick={(event) => event.stopPropagation()}
        $transition={transition}
      >
        <Fieldset>
          {buttonConfigs.map((item) => (
            <>
              <SButton key={item.name} className={item.className}>
                <input
                  type='radio'
                  name='serverbar'
                  onClick={() => handleClick(`/${item.link}`)}
                  checked={window.location.pathname === `/${item.link}`}
                />
                {item.icon}
              </SButton>
              {(item.name === '서재' || item.name === '계정 설정') && <Hr />}
            </>
          ))}
          {content.length !== 0 &&
            content.map((item) => (
              <ImageButton key={item.serverId} $img={item.serverImg}>
                <input
                  type='radio'
                  name='serverbar'
                  onChange={() => handleClick(`/${item.serverId}`)}
                  checked={window.location.pathname === `/${item.serverId}`}
                />
              </ImageButton>
            ))}
        </Fieldset>
      </Layout>
    </Scrim>
  );
};

export default Serverbar;

const Layout = styled.section<{ $transition: ModalTransition }>`
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(
    ${({ $transition }) => ($transition === 'open' ? 0 : '-100%')}
  );
  transition: transform 0.3s ease;

  display: flex;
  justify-content: center;

  width: 5rem;
  height: 100%;
  padding: 1.25rem 0;

  background-color: ${({ theme }) => theme.colors.white};
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.62rem;
`;
const Hr = styled.hr`
  width: 2.1875rem;
  margin: 0 auto;

  border: 1.5px solid ${({ theme }) => theme.colors.blue300};
`;
const SButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.125rem;
  height: 3.125rem;

  border-radius: 50%;

  &:has(input[type='radio']:checked) {
    border-radius: 20px;
  }

  &.neongreen {
    background-color: ${({ theme }) => theme.colors.black300};
    color: ${({ theme }) => theme.colors.black200};

    &:has(input[type='radio']:checked) {
      background-color: ${({ theme }) => theme.colors.neonGreen};
      color: ${({ theme }) => theme.colors.black100};
    }
  }

  &.new {
    position: relative;

    &::after {
      content: '';

      position: absolute;
      top: 0;
      right: 0;

      width: 0.5rem;
      height: 0.5rem;

      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.blue100};
    }
  }

  &.blue {
    background-color: ${({ theme }) => theme.colors.blue200};
    color: ${({ theme }) => theme.colors.white};
  }
`;
const ImageButton = styled(SButton)<{ $img: string }>`
  background-image: url(${({ $img }) => $img});
  background-repeat: no-repeat;
  background-size: cover;
`;
