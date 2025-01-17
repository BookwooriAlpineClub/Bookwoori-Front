import styled from 'styled-components';
import { useState } from 'react';

interface EmojiListComponentProps {
  reviewEmojiList: { emoji: string; emojiCount: number }[];
}

const EmojiList = ({ reviewEmojiList }: EmojiListComponentProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>(
    reviewEmojiList[0].emoji,
  );

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
  };
  return (
    <>
      <EmojiListContainer>
        {reviewEmojiList.map((emojiItem) => (
          <EmojiButton
            key={emojiItem.emoji}
            onClick={() => handleEmojiClick(emojiItem.emoji)}
            isSelected={selectedEmoji === emojiItem.emoji}
          >
            <EmojiTypography>{emojiItem.emoji}</EmojiTypography>
            <EmojiTypography>{emojiItem.emojiCount}</EmojiTypography>
          </EmojiButton>
        ))}
      </EmojiListContainer>
      {selectedEmoji && (
        <EmojiMemberListContainer>{selectedEmoji}</EmojiMemberListContainer>
      )}
    </>
  );
};

export default EmojiList;

const EmojiListContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.neutral200};
`;

const EmojiButton = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.225rem 0.625rem;
  gap: 0.325rem;
  background-color: ${({ theme }) => theme.colors.neutral50};
  border-radius: 0.5rem;
  border: ${({ isSelected, theme }) =>
    isSelected
      ? `0.1rem solid ${theme.colors.blue300}`
      : '0.1rem solid transparent'};
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral0};
`;

const EmojiTypography = styled.span`
  ${({ theme }) => theme.fonts.header};
  color: ${({ theme }) => theme.colors.neutral950};
`;

const EmojiMemberListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.neutral0};

  padding: 1rem;
  height: 15rem;
`;
