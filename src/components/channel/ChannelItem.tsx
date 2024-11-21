import styled, { css } from 'styled-components';
import { ReactComponent as Hash } from '@src/assets/icons/hash.svg';
import { ReactComponent as Voice } from '@src/assets/icons/voice.svg';
import { ReactComponent as Run } from '@src/assets/icons/run.svg';
import { useState } from 'react';

interface Props {
  color?: string;
  type: string;
  children: React.ReactNode;
}

const ChannelItem = ({ color = 'grey', type, children }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const iconMapping: { [key: string]: React.ReactNode } = {
    text: <SHash $color={color} $isHovering={isHovering} />,
    voice: <SVoice $color={color} $isHovering={isHovering} />,
    run: <SRun $color={color} $isHovering={isHovering} />,
  };

  const handleMouseOver = () => {
    if (color === 'none') return;
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <SItem
      $color={color}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {iconMapping[type]} {children}
    </SItem>
  );
};

export default ChannelItem;

const SItem = styled.button<{ $color: string }>`
  display: flex;
  gap: 0.625rem;

  padding: 0 0.625rem;

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme, $color }) =>
    $color === 'black' ? theme.colors.black100 : theme.colors.black200};

  ${({ $color, theme }) =>
    $color !== 'none' &&
    `
      &:hover {
        padding: 0.625rem;
        border-radius: 0.9375rem;
        background-color: ${theme.colors.neonGreen};
        color: ${theme.colors.black100};
        cursor: pointer;
      }
    `}
`;

interface StyleProps {
  $color: string;
  $isHovering: boolean;
}

const iconStyle = css<StyleProps>`
  fill: ${({ theme, $color, $isHovering }) =>
    $color === 'black' || $isHovering
      ? theme.colors.black100
      : theme.colors.black200};
`;
const SHash = styled(Hash)<StyleProps>`
  ${iconStyle}
`;
const SVoice = styled(Voice)<StyleProps>`
  ${iconStyle}
`;
const SRun = styled(Run)<StyleProps>`
  ${iconStyle}
`;
