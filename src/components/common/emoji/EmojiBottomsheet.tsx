import styled from 'styled-components';
import { useState } from 'react';
import useCopyToClipboard from '@src/hooks/useCopyToClipboard';
import IconButton from '@src/components/common/button/IconButton';

const EmojiBottomsheet = ({
  emoji = [],
  content,
}: {
  emoji?: string[];
  content: string;
}) => {
  const emojiList = ['👍', '🫶', '☺️', '😢', '🤔'];
  const { handleCopy } = useCopyToClipboard(content);
  const [clickedEmoji, setClickedEmoji] = useState<string[]>(emoji);

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
      <IconButton type='copyMessage' onClick={handleCopy} />
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
