import styled from 'styled-components';
import { ReactComponent as Edit } from '@src/assets/icons/edit.svg';
import { ReactComponent as Copy } from '@src/assets/icons/copy.svg';
import { ReactComponent as Delete } from '@src/assets/icons/trash.svg';
import { useState } from 'react';

const ChatMenu = ({ emoji }: { emoji?: string }) => {
  const emojiList = ['👍', '🫶', '☺️', '😢', '🤔'];
  const [clickedEmoji, setClickedEmoji] = useState<string | undefined>(emoji);
  const buttonData = [
    { icon: <Edit width='20px' height='20px' />, label: '수정하기' },
    { icon: <Copy />, label: '글자 복사하기' },
    { icon: <Delete />, label: '삭제하기' },
  ];

  const handleClickEmoji = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const clicked = e.currentTarget.textContent;
    if (!clicked) return;
    if (clicked === clickedEmoji) {
      setClickedEmoji('');
      return;
    }

    setClickedEmoji(clicked);
  };

  return (
    <SLayout>
      <SContainer>
        {emojiList.map((it) => (
          <SEmoji
            key={it}
            isClicked={clickedEmoji === it}
            onClick={handleClickEmoji}
          >
            {it}
          </SEmoji>
        ))}
      </SContainer>
      {buttonData.map(({ icon, label }) => (
        <SButton key={label} type='button'>
          <Icon>{icon}</Icon>
          {label}
        </SButton>
      ))}
    </SLayout>
  );
};

export default ChatMenu;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  width: 100%;
`;
const SContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SEmoji = styled.button<{ isClicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.125rem;
  height: 3.125rem;

  border-radius: 50%;
  background-color: ${({ theme, isClicked }) =>
    isClicked ? theme.colors.blue300 : theme.colors.white};

  font-size: 1.5rem;
`;
const SButton = styled.button`
  display: flex;
  gap: 0.625rem;

  width: 100%;
  padding: 1.0625rem 0.9375rem;

  border-radius: 6.1875rem;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;
const Icon = styled.span`
  color: ${({ theme }) => theme.colors.blue100};
`;
