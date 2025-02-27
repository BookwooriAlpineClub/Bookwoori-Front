import styled from 'styled-components';
import { EmojiType } from '@src/constants/constants';
import { usePutEmojiOnReview } from '@src/hooks/query/climbing';
import { useEffect, useState } from 'react';

const EmojiBottomSheet = ({
  climbingId,
  reviewId,
  emojis,
}: {
  climbingId: number;
  reviewId: number;
  emojis: {
    emoji: keyof typeof EmojiType;
    emojiCount: number;
    isClicked: boolean;
  }[];
}) => {
  const emojiList = Object.keys(EmojiType) as Array<keyof typeof EmojiType>;

  type EmojiKey = keyof typeof EmojiType;
  const initialClickedState: Record<EmojiKey, boolean> = {
    THUMBS_UP: false,
    THINKING_FACE: false,
    CRYING_FACE: false,
    HEART_HANDS: false,
    SMILING_FACE: false,
  };
  const [clickedEmojis, setClickedEmojis] =
    useState<Record<EmojiKey, boolean>>(initialClickedState);
  const { putEmoji } = usePutEmojiOnReview(climbingId, reviewId);

  useEffect(() => {
    const updatedClickedEmojis = { ...initialClickedState };

    emojis.forEach((item) => {
      if (item.isClicked && item.emoji in updatedClickedEmojis) {
        updatedClickedEmojis[item.emoji as EmojiKey] = true;
      }
    });
    setClickedEmojis(updatedClickedEmojis);
  }, []);

  const handleEmojiClick = (emoji: EmojiKey) => {
    putEmoji.mutate(emoji);
    setClickedEmojis((prev) => ({
      ...prev,
      [emoji]: !prev[emoji],
    }));
  };

  return (
    <Layout>
      <Container>
        {emojiList.map((key) => (
          <Emoji
            key={key}
            isClicked={clickedEmojis[key]}
            onClick={() => handleEmojiClick(key)}
          >
            {EmojiType[key].value}
          </Emoji>
        ))}
      </Container>
    </Layout>
  );
};
export default EmojiBottomSheet;

// Styled Components
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
  border: ${({ theme, isClicked }) =>
    isClicked
      ? `0.05rem solid ${theme.colors.blue500}`
      : `0.05rem solid transparent`};

  font-size: 1.5rem;
`;
