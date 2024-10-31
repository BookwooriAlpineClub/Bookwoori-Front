import styled, { css } from 'styled-components';
import { ReactComponent as Hash } from '@src/assets/icons/hash.svg';
import { ReactComponent as Voice } from '@src/assets/icons/voice.svg';
import { ReactComponent as Run } from '@src/assets/icons/run.svg';

interface Props {
  color?: string;
  type: string;
  children: React.ReactNode;
}

const ChannelItem = ({ color = 'black', type, children }: Props) => {
  const iconMapping: { [key: string]: React.ReactNode } = {
    text: <SHash $color={color} />,
    voice: <SVoice $color={color} />,
    run: <SRun $color={color} />,
  };

  return (
    <SItem $color={color}>
      {iconMapping[type]} {children}
    </SItem>
  );
};

export default ChannelItem;

const SItem = styled.div<{ $color: string }>`
  display: flex;
  gap: 0.625rem;

  padding: 0 0.625rem;

  color: ${({ theme, $color }) =>
    $color === 'grey' ? theme.colors.black200 : theme.colors.black100};
`;
const iconStyle = css<{ $color: string }>`
  fill: ${({ theme, $color }) =>
    $color === 'grey' ? theme.colors.black200 : theme.colors.black100};
`;
const SHash = styled(Hash)<{ $color: string }>`
  ${iconStyle}
`;
const SVoice = styled(Voice)<{ $color: string }>`
  ${iconStyle}
`;
const SRun = styled(Run)<{ $color: string }>`
  ${iconStyle}
`;
