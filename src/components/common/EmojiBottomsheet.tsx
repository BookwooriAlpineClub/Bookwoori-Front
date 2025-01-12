import styled from 'styled-components';
// import { ReactComponent as Edit } from '@src/assets/icons/edit.svg';
import { ReactComponent as Copy } from '@src/assets/icons/copy.svg';
// import { ReactComponent as Delete } from '@src/assets/icons/trash.svg';
import { useState } from 'react';
import useCopyToClipboard from '@src/hooks/useCopyToClipboard';

const EmojiBottomsheet = ({
  emoji = [],
  content,
}: {
  emoji?: string[];
  content: string;
}) => {
  // const emojis = {
  //   THUMBS_UP: '👍',
  //   HEART: '🫶',
  //   SMILING_FACE: '☺️',
  //   SAD: '😢',
  //   HMM: '🤔',
  // };
  const emojiList = ['👍', '🫶', '☺️', '😢', '🤔'];
  const { handleCopy } = useCopyToClipboard(content);
  const [clickedEmoji, setClickedEmoji] = useState<string[]>(emoji);
  const buttonData = [
    // { icon: <Edit width='20px' height='20px' />, label: '수정하기' },
    { icon: <Copy />, label: '글자 복사하기', onClick: handleCopy },
    // { icon: <Delete />, label: '삭제하기' },
  ];

  const handleClickEmoji = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const clicked = e.currentTarget.textContent;
    if (!clicked) return;
    if (clickedEmoji?.includes(clicked)) {
      setClickedEmoji((prev) => [...prev].filter((it) => it !== clicked));
      return;
    }

    setClickedEmoji((prev) => [...prev, clicked]);
  };

  return (
    <Layout>
      <Container>
        {emojiList.map((it) => (
          <Emoji
            key={it}
            isClicked={clickedEmoji.includes(it)}
            onClick={handleClickEmoji}
          >
            {it}
          </Emoji>
        ))}
      </Container>
      {buttonData.map(({ icon, label, onClick }) => (
        <Button key={label} type='button' onClick={onClick}>
          <Icon>{icon}</Icon>
          {label}
        </Button>
      ))}
    </Layout>
  );
};

export default EmojiBottomsheet;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  margin: 1.44rem 1.25rem 1.25rem 1.25rem;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Emoji = styled.button<{ isClicked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.125rem;
  height: 3.125rem;

  border-radius: 50%;
  background-color: ${({ theme, isClicked }) =>
    isClicked ? theme.colors.blue100 : theme.colors.neutral0};

  font-size: 1.5rem;
`;
const Button = styled.button`
  display: flex;
  gap: 0.625rem;

  width: 100%;
  padding: 1.0625rem 0.9375rem;

  border-radius: 6.1875rem;
  background-color: ${({ theme }) => theme.colors.neutral0};

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};
`;
const Icon = styled.span`
  color: ${({ theme }) => theme.colors.blue500};
`;
