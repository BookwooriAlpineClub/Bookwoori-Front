import type { ModalTransition } from '@src/types/modal';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { globalNavigationDrawerState, currentServerIdState } from '@src/states/atoms';
import { ROUTE_PATH } from '@src/constants/routePath';
import { decodeIdParam } from '@src/utils/formatters';
import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import useGlobalNavigationDrawer from '@src/hooks/useGlobalNavigationDrawer';
import useServer from '@src/hooks/query/useServer';
import styled from 'styled-components';
import Scrim from '@src/components/common/modal/Scrim';
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
 * 컴포넌트 사용법
 *
 * 0. GlobalNavigationDrawer 컴포넌트를 추가한다.
 * 1. useGlobalNavigationDrawer 훅을 불러온다.
 * 2. openGlobalNavigationDrawer()로 연다.
 *
 * @example
 * <GlobalNavigationDrawer />
 *
 * import useGlobalNavigationDrawer from '@src/hooks/useGlobalNavigationDrawer';
 * const { openGlobalNavigationDrawer } = useGlobalNavigationDrawer();
 *
 * openGlobalNavigationDrawer();
 */
const GlobalNavigationDrawer = () => {
  const { closeGlobalNavigationDrawer } = useGlobalNavigationDrawer();
  const navigate = useNavigate();
  const encodedNavigate = useEncodedNavigate();
  const { serverId: params } = useParams<{ serverId: string }>();
  const location = useLocation();

  const { isOpen, transition } = useRecoilValue(globalNavigationDrawerState);
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
    closeGlobalNavigationDrawer();
  };
  const handleServerClick = (id: number) => {
    encodedNavigate('/server', id);
    closeGlobalNavigationDrawer();
  };

  return (
    <Scrim
      isOpen={isOpen}
      transition={transition}
      closeModal={closeGlobalNavigationDrawer}
    >
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
                  name='GlobalNavigationDrawer'
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
                  name='GlobalNavigationDrawer'
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

export default GlobalNavigationDrawer;

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

  background-color: ${({ theme }) => theme.colors.neutral0};
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

  border: 1.5px solid ${({ theme }) => theme.colors.blue100};
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
    background-color: ${({ theme }) => theme.colors.neutral50};
    color: ${({ theme }) => theme.colors.neutral400};

    &:has(input[type='radio']:checked) {
      background-color: ${({ theme }) => theme.colors.lime300};
      color: ${({ theme }) => theme.colors.neutral950};
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
      border: 1px solid ${({ theme }) => theme.colors.neutral0};
      background-color: ${({ theme }) => theme.colors.blue500};
    }
  }

  &.blue {
    background-color: ${({ theme }) => theme.colors.blue300};
    color: ${({ theme }) => theme.colors.neutral0};
  }
`;
const ImageButton = styled(SButton)<{ $img: string }>`
  background-color: ${({ theme }) => theme.colors.blue100};
  background-image: url(${({ $img }) => $img});
  background-repeat: no-repeat;
  background-size: cover;
`;
