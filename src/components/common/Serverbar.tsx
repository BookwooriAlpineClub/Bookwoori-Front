import type { ModalTransition } from '@src/types/modal';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { serverbarState, currentServerIdState } from '@src/states/atoms';
import { ROUTE_PATH } from '@src/constants/routePath';
import { decodeIdParam } from '@src/utils/formatters';
import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import useServerbar from '@src/hooks/useServerbar';
import useServer from '@src/hooks/query/useServer';
import styled from 'styled-components';
import Scrim from '@src/components/common/Scrim';
import { ReactComponent as IcnLibrary } from '@src/assets/icons/library.svg';
import { ReactComponent as IcnBell } from '@src/assets/icons/bell.svg';
import { ReactComponent as IcnChat } from '@src/assets/icons/chat.svg';
import { ReactComponent as IcnSettings } from '@src/assets/icons/settings.svg';
import { ReactComponent as IcnPlus } from '@src/assets/icons/plus.svg';

type buttonConfig = {
  name: string;
  link: string;
  icon: React.ReactElement;
  className: string;
};

/**
 * Serverbar 컴포넌트 사용법
 *
 * 0. Serverbar 컴포넌트를 추가한다.
 * 1. useServerbar 훅을 불러온다.
 * 2. openServerbar()로 연다.
 *
 * @example
 * <Serverbar />
 *
 * import useServerbar from '@src/hooks/useServerbar';
 * const { openServerbar } = useServerbar();
 *
 * openServerbar();
 */
const Serverbar = () => {
  const { closeServerbar } = useServerbar();
  const navigate = useNavigate();
  const encodedNavigate = useEncodedNavigate();
  const { serverId: params } = useParams<{ serverId: string }>();
  const location = useLocation();

  const { isOpen, transition } = useRecoilValue(serverbarState);
  const setCurrentServerId = useSetRecoilState(currentServerIdState);

  let decodedServerId: number = -1;
  if (location.pathname.includes('/server')) {
    decodedServerId = decodeIdParam(params);
  }
  setCurrentServerId(decodedServerId);

  const { serverList } = useServer();
  const isNotiRead = true; // 나중에 수정
  const isChatRead = true; // 나중에 수정

  const buttonConfigs: buttonConfig[] = [
    {
      name: '서재',
      link: ROUTE_PATH.library,
      icon: <IcnLibrary />,
      className: 'neongreen',
    },
    {
      name: '알림',
      link: ROUTE_PATH.notification,
      icon: <IcnBell />,
      className: isNotiRead ? 'neongreen' : 'neongreen new',
    },
    {
      name: '채팅',
      link: ROUTE_PATH.dm,
      icon: <IcnChat />,
      className: isChatRead ? 'neongreen' : 'neongreen new',
    },
    {
      name: '계정 설정',
      link: ROUTE_PATH.setting,
      icon: <IcnSettings />,
      className: 'neongreen',
    },
    {
      name: '서버 추가',
      link: ROUTE_PATH.addServer,
      icon: <IcnPlus />,
      className: 'blue',
    },
  ];

  const handleMyClick = (link: string) => {
    navigate(link);
    closeServerbar();
  };
  const handleServerClick = (id: number) => {
    encodedNavigate('/server', id);
    closeServerbar();
  };

  return (
    <Scrim isOpen={isOpen} transition={transition} closeModal={closeServerbar}>
      <Container
        onClick={(event) => event.stopPropagation()}
        $transition={transition}
      >
        <Fieldset>
          {buttonConfigs.map(({ name, link, icon, className }) => (
            <>
              <SButton key={name} className={className}>
                <input
                  type='radio'
                  name='serverbar'
                  onClick={() => handleMyClick(link)}
                  checked={window.location.pathname === link}
                />
                {icon}
              </SButton>
              {(name === '서재' || name === '계정 설정') && <Hr />}
            </>
          ))}
          {serverList.length > 0 &&
            serverList.map(({ serverId, serverImg }) => (
              <ImageButton key={serverId} $img={serverImg || ''}>
                <input
                  type='radio'
                  name='serverbar'
                  onChange={() => handleServerClick(serverId)}
                  checked={decodedServerId === serverId}
                />
              </ImageButton>
            ))}
        </Fieldset>
      </Container>
    </Scrim>
  );
};

export default Serverbar;

const Container = styled.section<{ $transition: ModalTransition }>`
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(
    ${({ $transition }) => ($transition === 'open' ? 0 : '-100%')}
  );
  transition: transform 0.3s ease;

  display: flex;
  justify-content: center;

  height: 100%;

  background-color: ${({ theme }) => theme.colors.white};
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.62rem;

  padding: 1.25rem 0.94rem;

  overflow-y: scroll;
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
  flex-shrink: 0;

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
  background-color: ${({ theme }) => theme.colors.blue300};
  background-image: url(${({ $img }) => $img});
  background-repeat: no-repeat;
  background-size: cover;
`;
