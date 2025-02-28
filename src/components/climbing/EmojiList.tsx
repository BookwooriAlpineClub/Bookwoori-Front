import EmojiItem from '@src/components/common/EmojiItem';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '@src/assets/icons/hi_face_smile.svg';
import { EmojiType } from '@src/constants/constants';
import { usePutEmojiOnReview } from '@src/hooks/query/climbing';
import useLoaderData from '@src/hooks/useRoaderData';
import useModal from '@src/hooks/useModal';
import { bottomsheetState } from '@src/states/atoms';
import EmojiMemberListBottomSheet from '@src/components/climbing/EmojiMemberListBottomSheet';

interface EmojiListProps {
  reviewId: number;
  emojis: {
    emoji: keyof typeof EmojiType;
    emojiCount: number;
    isClicked: boolean;
  }[];
  onAddClick?: () => void;
}

const EmojiList = ({ reviewId, emojis, onAddClick }: EmojiListProps) => {
  const { id: climbingId } = useLoaderData<{ id: number }>();
  const { putEmoji } = usePutEmojiOnReview(climbingId, reviewId);
  const { openModal } = useModal(bottomsheetState);
  const handleEmojiClick = (emoji: keyof typeof EmojiType) => {
    putEmoji.mutate(emoji);
  };

  const handleEmojiLongPress = (emoji: string) => {
    openModal(
      <EmojiMemberListBottomSheet
        clickedEmoji={emoji}
        reviewId={reviewId}
        climbingId={climbingId}
      />,
    );
  };

  return (
    <ListContainer>
      {emojis.map((item) => (
        <EmojiItem
          key={item.emoji}
          emoji={item.emoji}
          initialIsSelected={item.isClicked}
          count={item.emojiCount}
          onClick={() => handleEmojiClick(item.emoji)}
          onLongPress={() => handleEmojiLongPress(item.emoji)}
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
