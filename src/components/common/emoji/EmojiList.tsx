import EmojiItem from '@src/components/common/EmojiItem';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from '@src/assets/icons/hi_face_smile.svg';
import { EmojiTypeType } from '@src/constants/constants';

interface EmojiListProps {
  emojis: {
    emoji: EmojiTypeType;
    initialIsSelected: boolean;
    count?: number;
  }[];
  onAddClick: boolean;
}

const EmojiList = ({ emojis, onAddClick }: EmojiListProps) => {
  const handleEmojiClick = () => {};
  const handleEmojiLongPress = () => {};

  const handleAddClick = () => {};

  return (
    <ListContainer>
      {emojis.map((item, index) => (
        <EmojiItem
          key={index}
          emoji={item.emoji}
          initialIsSelected={item.initialIsSelected}
          count={item.count}
          onClick={handleEmojiClick}
          onLongPress={handleEmojiLongPress}
        />
      ))}
      {onAddClick && (
        <EmojiItem
          emoji={<AddIcon />}
          onClick={handleAddClick}
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
  padding: ${({ theme }) => theme.padding[4]};
  background-color: ${({ theme }) => theme.colors.neutral50};
  border-radius: ${({ theme }) => theme.rounded[4]};
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
