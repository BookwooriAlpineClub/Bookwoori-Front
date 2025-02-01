import styled from 'styled-components';
import { EmojiType } from '@src/constants/constants';
import {
  useGetReviewEmojis,
  usePutEmojiOnReview,
} from '@src/hooks/query/climbing';
import { useState } from 'react';

const EmojiBottomSheet = ({
  climbingId,
  reviewId,
}: {
  climbingId: number;
  reviewId: number;
}) => {
  const emojiKeys = Object.keys(EmojiType) as Array<keyof typeof EmojiType>;
  const { getEmojis } = useGetReviewEmojis({ climbingId, reviewId });
  const emojiStatus = getEmojis.data;
  console.log(emojiStatus);

  type EmojiKey = keyof typeof EmojiType;
  const initialClickedState: Record<EmojiKey, boolean> = {
    GOOD: false,
    HEART: false,
    SMILE: false,
    CRY: false,
    THINK: false,
  };
  const [clickedEmojis, setClickedEmojis] =
    useState<Record<EmojiKey, boolean>>(initialClickedState);
  const { putEmoji } = usePutEmojiOnReview(climbingId, reviewId);

  const handleEmojiClick = (emoji: EmojiKey) => {
    putEmoji.mutate(emoji);
    setClickedEmojis((prev) => ({
      ...prev,
      [emoji]: true,
    }));
  };

  return (
    <Layout>
      <Container>
        {emojiKeys.map((key) => (
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

  font-size: 1.5rem;
`;
