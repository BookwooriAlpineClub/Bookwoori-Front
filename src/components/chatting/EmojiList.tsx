import styled from 'styled-components';
import EmojiItem from '@src/components/common/EmojiItem';
import { Reactions } from '@src/types/chat';
import { EmojiType } from '@src/constants/constants';
import { reactHandler } from '@src/apis/chat';

const EmojiList = ({ reactions, id }: { reactions: Reactions; id: string }) => {
  console.log('reactions', reactions);

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
      {Object.entries(reactions).map(([reaction, detail]) => {
        return (
          <>
            <EmojiItem
              key={reaction}
              initialIsSelected={false}
              emoji={reaction as keyof typeof EmojiType}
              count={detail.count}
              onClick={() => handleEmojiClick(reaction)}
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
