import styled from 'styled-components';
import EmojiItem from '@src/components/common/emoji/EmojiItem';
import { Reactions } from '@src/types/chat';
import { EmojiType } from '@src/constants/constants';
import { reactHandler } from '@src/apis/chat';

const EmojiList = ({ reactions, id }: { reactions: Reactions; id: string }) => {
  const emojiMapping: Record<string, keyof typeof EmojiType> = {
    thumbs_up: 'GOOD',
    heart_hands: 'HEART',
    smiling_face: 'SMILE',
    crying_face: 'CRY',
    thinking_face: 'THINK',
  };

  const handleEmojiClick = async (emoji: string) => {
    try {
      await reactHandler(
        {
          id,
          emoji,
          action: 'remove',
        },
        '/pub/direct/react',
      );
    } catch (error) {
      console.error('Failed to remove reaction:', error);
    }
  };

  return (
    <ListContainer>
      {Object.entries(reactions).map(([reactionKey, detail]) => {
        const mappedEmoji = emojiMapping[reactionKey.toLowerCase()];
        return (
          <>
            <EmojiItem
              key={reactionKey}
              initialIsSelected={false}
              emoji={mappedEmoji}
              count={detail.count}
              onClick={() => handleEmojiClick(reactionKey)}
            />
          </>
        );
      })}
    </ListContainer>
  );
};

export default EmojiList;

// Styled Components
const ListContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gap[4]};
  border-radius: ${({ theme }) => theme.rounded[4]};
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
