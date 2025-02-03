import { ReactElement, useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { EmojiType } from '@src/constants/constants';

export interface EmojiItemProps {
  emoji: keyof typeof EmojiType | ReactElement;
  initialIsSelected?: boolean;
  count?: number;
  onClick: () => void;
  onLongPress?: () => void;
}

const LONG_PRESS_DURATION = 500;

const EmojiItem = ({
  emoji,
  initialIsSelected: isSelected = true,
  count = -1,
  onClick,
  onLongPress,
}: EmojiItemProps) => {
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [animationDirection, setAnimationDirection] = useState<
    'up' | 'down' | null
  >(null);
  const [isLongPress, setIsLongPress] = useState(false);

  if (typeof emoji !== 'string') {
    return (
      <Item isSelected={false} onClick={onClick}>
        <Emoji>{emoji}</Emoji>
      </Item>
    );
  }

  const handleClick = async () => {
    if (isLongPress) {
      setIsLongPress(false);
      return;
    }
    onClick();
  };

  const handleMouseDown = useCallback(() => {
    if (count > 0 && onLongPress) {
      pressTimerRef.current = setTimeout(() => {
        setIsLongPress(true);
        onLongPress();
      }, LONG_PRESS_DURATION);
    }
  }, [count, onLongPress]);

  const handleMouseUp = useCallback(() => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
      setIsLongPress(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (animationDirection) {
      const timer = setTimeout(() => setAnimationDirection(null), 200); // 애니메이션 지속 시간과 동일
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [animationDirection]);

  const apiEmojiKey: keyof typeof EmojiType = emoji;
  return count ? (
    <Item
      isSelected={isSelected}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onClick={handleClick}
    >
      <Emoji>{EmojiType[apiEmojiKey].value}</Emoji>
      {count > 0 && (
        <Count animationDirection={animationDirection}>{count}</Count>
      )}
    </Item>
  ) : null;
};
export default EmojiItem;

// Styled Components
const Item = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.neutral600};
  padding: ${({ theme }) => theme.padding[4]} ${({ theme }) => theme.padding[6]};
  gap: ${({ theme }) => theme.gap[2]};
  width: fit-content;
  border: ${({ isSelected, theme }) =>
    isSelected
      ? `0.05rem solid ${theme.colors.blue500}`
      : `0.05rem solid ${theme.colors.neutral200}`};
  border-radius: ${({ theme }) => theme.rounded[24]};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.blue100 : theme.colors.neutral0};
  transition: 50ms ease-in;
  user-select: none;

  &:active {
    background-color: ${({ isSelected, theme }) =>
      isSelected ? 'none' : theme.colors.neutral50};
  }
`;

const Emoji = styled.div`
  width: 0.9rem;
  height: 0.9rem;
`;

const Count = styled.span<{ animationDirection: 'up' | 'down' | null }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.5rem;
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
