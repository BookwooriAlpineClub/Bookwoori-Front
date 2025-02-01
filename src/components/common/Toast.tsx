/*
컴포넌트 사용법

1. useToast 훅을 불러온다.
import useToast from '@src/hooks/useToast';
const addToast = useToast();

2. addToast 함수로 추가한다.
addToast({ kind: 'error', content: '토스트 내용' });
*/

import type ToastType from '@src/types/toast';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { toastState } from '@src/states/atoms';
import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import { ReactComponent as IcnInfo } from '@src/assets/icons/toast_info.svg';
import { ReactComponent as IcnSuccess } from '@src/assets/icons/toast_success.svg';
import { ReactComponent as IcnError } from '@src/assets/icons/toast_error.svg';

const IconConfig: Record<
  ToastType['kind'],
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  info: IcnInfo,
  success: IcnSuccess,
  error: IcnError,
};

const Toast = () => {
  const toasts = useRecoilValue(toastState);

  return createPortal(
    <List>
      {toasts &&
        toasts.map(({ id, kind, content }) => {
          const Icon = IconConfig[kind];
          return (
            <Item key={id} role='alert'>
              <Icon width={20} height={20} />
              {content}
            </Item>
          );
        })}
    </List>,
    document.getElementById('toast') as HTMLElement,
  );
};

export default Toast;

const List = styled.ul`
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[12]};
  align-items: center;

  ${NoSelect}
`;
const Item = styled.li`
  display: flex;
  flex-flow: row nowrap;
  gap: ${({ theme }) => theme.gap[8]};
  align-items: center;

  width: fit-content;
  padding: ${({ theme }) => `${theme.padding[12]} ${theme.padding[16]}`};

  border-radius: ${({ theme }) => theme.rounded[16]};
  background-color: ${({ theme }) => theme.colors.neutral0};
  box-shadow: 0px 0px 16px 0px ${({ theme }) => theme.colors.overlay};

  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.neutral950};
  white-space: pre;

  @keyframes in {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes out {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-100%);
    }
  }
  animation:
    in 0.3s ease forwards,
    out 0.3s ease 2.3s forwards;
`;
