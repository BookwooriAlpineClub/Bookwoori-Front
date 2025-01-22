/*
Toast 컴포넌트 사용법

1. useToast 훅을 불러온다.
import useToast from '@src/hooks/useToast';
const addToast = useToast();

2. addToast 함수로 추가한다.
addToast({ content: '토스트 내용' }); // kind 생략 시 기본값 'default'
addToast({ content: '토스트 내용', kind: 'error' }); // 디자인에 따라 추후 kind가 삭제될 수 있습니다.
*/

import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { toastState } from '@src/states/atoms';
import { NoSelect } from '@src/styles/mixins';
import { ReactComponent as IcnInfo } from '@src/assets/icons/toast_info.svg';
import { ReactComponent as IcnSuccess } from '@src/assets/icons/toast_success.svg';
import { ReactComponent as IcnError } from '@src/assets/icons/toast_error.svg';

const Toast = () => {
  const toasts = useRecoilValue(toastState);
  const icon = {
    info: <IcnInfo />,
    success: <IcnSuccess />,
    error: <IcnError />,
  };

  return createPortal(
    <List>
      {toasts &&
        toasts.map(({ id, kind, content }) => (
          <Item key={id} role='alert'>
            {icon[kind]}
            {content}
          </Item>
        ))}
    </List>,
    document.getElementById('toast') as HTMLElement,
  );
};

export default Toast;

const List = styled.ul`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Item = styled.li`
  min-width: 260px; // 추후 수정: 디자인 작업 중
  padding: 0.25rem 0.9375rem; // 추후 수정: 디자인 작업 중

  border-radius: 0.25rem; // 추후 수정: 디자인 작업 중
  background-color: ${({ theme }) =>
    theme.colors.overlay}; // 추후 수정: 디자인 작업 중

  ${({ theme }) => theme.fonts.body} // 추후 수정: 디자인 작업 중
  color: ${({ theme }) => theme.colors.neutral0}; // 추후 수정: 디자인 작업 중
  text-align: center;
  white-space: pre-line; // 개행문자 처리

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  animation: fadeOut 2.5s ease 2s forwards;

  ${NoSelect}
`;
