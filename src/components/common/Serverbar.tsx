import type Modal from '@src/types/modal';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ROUTE_PATH } from '@src/constants/routePath';
import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import useModal from '@src/hooks/useModal';
import { useGetServerList } from '@src/hooks/query/server';
import { serverbarState, currentServerIdState } from '@src/states/atoms';
import { decodeIdParam } from '@src/utils/formatters';
import styled from 'styled-components';
import Scrim from '@src/components/common/Scrim';
import { ReactComponent as IcnLibrary } from '@src/assets/icons/md_outline_auto_stories.svg';
import { ReactComponent as IcnBell } from '@src/assets/icons/fi_bell.svg';
import { ReactComponent as IcnChat } from '@src/assets/icons/md_outline_chat_bubble_outline.svg';
import { ReactComponent as IcnSettings } from '@src/assets/icons/fi_settings.svg';
import { ReactComponent as IcnPlus } from '@src/assets/icons/hi_outline_plus.svg';

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
  const location = useLocation();
  const { serverId: params } = useParams<{ serverId: string }>();
  const { isOpen, transition } = useRecoilValue(serverbarState);
  const { data: serverList } = useGetServerList();
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

  const navigate = useNavigate();
  const encodedNavigate = useEncodedNavigate();
  const setCurrentServerId = useSetRecoilState(currentServerIdState);
  const { closeModal: closeServerbar } = useModal(serverbarState);
  const handleMyClick = (link: string) => {
    navigate(link);
    closeServerbar();
  };
  const handleServerClick = (id: number) => {
    encodedNavigate('/server', id);
    closeServerbar();
  };

  let decodedServerId: number = -1;
  if (location.pathname.includes('/server')) {
    decodedServerId = decodeIdParam(params);
  }
  setCurrentServerId(decodedServerId);

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

const Container = styled.section<{ $transition: Modal['transition'] }>`
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
  gap: ${({ theme }) => theme.gap[10]};

  padding: ${({ theme }) => `${theme.padding[24]} ${theme.padding[16]}`};

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
    border-radius: ${({ theme }) => theme.rounded[24]};
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
