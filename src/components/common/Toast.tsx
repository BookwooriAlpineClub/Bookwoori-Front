// Toast 컴포넌트 사용법
// 1. useToast 훅을 사용하세요.

import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { toastState } from '../../states/atoms';

const Toast = () => {
  const toasts = useRecoilValue(toastState);

  return createPortal(
    <List>
      {toasts &&
        toasts.map((item) => <Item key={item.id}>{item.content}</Item>)}
    </List>,
    document.getElementById('toast') as HTMLElement,
  );
};

export default Toast;

const List = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 900; // 최상위 레이어
  transform: translate(-50%, -50%);
`;

const Item = styled.article`
  min-width: 16.25rem; // 추후 수정: 디자인 작업 중
  padding: 0.25rem 0.9375rem; // 추후 수정: 디자인 작업 중

  border-radius: 0.25rem; // 추후 수정: 디자인 작업 중
  background-color: rgba(0, 0, 0, 0.7); // 추후 수정: theme.colors

  // 추후 수정: theme.fonts
  color: white; // 추후 수정: theme.colors
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

  // 드래그 및 선택 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
