import EmojiItem from '@src/components/common/emoji/EmojiItem';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '@src/assets/icons/hi_face_smile.svg';
import { EmojiType } from '@src/constants/constants';
import { usePutEmojiOnReview } from '@src/hooks/query/climbing';
import useLoaderData from '@src/hooks/useRoaderData';

interface EmojiListProps {
  reviewId: number;
  emojis: {
    emoji: keyof typeof EmojiType;
    emojiCount: number;
  }[];
  onAddClick?: () => void;
}

const EmojiList = ({ reviewId, emojis, onAddClick }: EmojiListProps) => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { putEmoji } = usePutEmojiOnReview(climbingId, reviewId);

  const handleEmojiClick = (emoji: keyof typeof EmojiType) => {
    putEmoji.mutate(emoji);
  };
  const handleEmojiLongPress = () => {
    alert('open 참여자 리스트');
  };

  return (
    <ListContainer>
      {emojis.map((item, index) => (
        <EmojiItem
          key={index}
          emoji={item.emoji}
          // initialIsSelected={item.initialIsSelected}
          count={item.emojiCount}
          onClick={() => handleEmojiClick(item.emoji)}
          onLongPress={handleEmojiLongPress}
        />
      ))}
      {onAddClick && (
        <EmojiItem
          emoji={<AddIcon />}
          onClick={onAddClick}
          initialIsSelected={false}
        />
      )}
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
