import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

export const EmojiType = {
  GOOD: 'good',
  HEART: 'heart',
  SMILE: 'smile',
  CRY: 'cry',
  THINK: 'think',
} as const;

export type EmojiTypeType = (typeof EmojiType)[keyof typeof EmojiType];

interface EmojiItemProps {
  emoji: EmojiTypeType;
  initialIsSelected: boolean;
  count?: number;
  onClick: () => void;
  onLongPress?: () => void;
}

const LONG_PRESS_DURATION = 500;

const EmojiItem = ({
  emoji,
  initialIsSelected,
  count = -1,
  onClick,
  onLongPress,
}: EmojiItemProps) => {
  let pressTimer: NodeJS.Timeout;
  const [emojiState, setEmojiState] = useState({
    isSelected: initialIsSelected,
    count,
  });
  const [animationDirection, setAnimationDirection] = useState<
    'up' | 'down' | null
  >(null);

  const handleClick = async () => {
    if (count === -1) {
      onClick();
      return;
    }
    setEmojiState((prev) => {
      const newState = {
        isSelected: !prev.isSelected,
        count: prev.isSelected ? prev.count - 1 : prev.count + 1,
      };

      setAnimationDirection(newState.isSelected ? 'up' : 'down');
      return newState;
    });

    onClick();
  };

  const handleMouseDown = useCallback(() => {
    if (count > 0 && onLongPress) {
      pressTimer = setTimeout(onLongPress, LONG_PRESS_DURATION);
    }
  }, [count, onLongPress]);

  const handleMouseUp = useCallback(() => {
    clearTimeout(pressTimer);
  }, []);

  useEffect(() => {
    if (animationDirection) {
      const timer = setTimeout(() => setAnimationDirection(null), 200); // 애니메이션 지속 시간과 동일
      return () => clearTimeout(timer);
    }
  }, [animationDirection]);

  return (
    emojiState.count && (
      <Item
        isSelected={emojiState.isSelected}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
      >
        <span>{emoji}</span>
        {emojiState.count > 0 && (
          <Count animationDirection={animationDirection}>
            {emojiState.count}
          </Count>
        )}
      </Item>
    )
  );
};
export default EmojiItem;

// Styled Components
const Item = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fonts.caption}
  padding: ${({ theme }) => theme.padding[4]} ${({ theme }) =>
    theme.padding[8]};
  gap: ${({ theme }) => theme.gap[4]};
  width: fit-content;
  border: ${({ isSelected, theme }) =>
    isSelected
      ? `0.05rem solid ${theme.colors.blue500}`
      : '0.05rem solid transparent'};
  border-radius: ${({ theme }) => theme.rounded[16]};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blue100 : theme.colors.neutral0};
  transition: 50ms ease-in;
  user-select: none;

  &:hover {
    border: ${({ isSelected, theme }) =>
      isSelected
        ? `0.05rem solid ${theme.colors.blue500}`
        : `0.05rem solid ${theme.colors.neutral200}`};
  }

  &:active {
    background-color: ${({ isSelected, theme }) =>
      isSelected ? 'none' : theme.colors.neutral50};
  }
`;

const Count = styled.span<{ animationDirection: 'up' | 'down' | null }>`
  display: inline-block;
  position: relative;
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;

  ${({ animationDirection }) =>
    animationDirection === 'up' &&
    `
    transform: translateY(-3px);
    opacity: 1;
  `}

  ${({ animationDirection }) =>
    animationDirection === 'down' &&
    `
    transform: translateY(3px);
    opacity: 1;
  `}

  ${({ animationDirection }) =>
    animationDirection === null &&
    `
    transform: translateY(0);
    opacity: 1;
  `}
`;
