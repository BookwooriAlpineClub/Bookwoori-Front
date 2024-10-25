/*
Toast 컴포넌트 사용법

1. useToast 훅을 불러온다.
import useToast from '@src/hooks/useToast';
const addToast = useToast();

2. addToast 함수를 통해 토스트를 추가한다.
addToast({ content: '토스트 내용' }); // category 생략 시 기본값 'default'
addToast({ content: '토스트 내용', category: 'error' }); // 디자인에 따라 추후 category가 삭제될 수 있습니다.
*/

import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { toastState } from '@src/states/atoms';

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
  min-width: 260px; // 추후 수정: 디자인 작업 중
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
