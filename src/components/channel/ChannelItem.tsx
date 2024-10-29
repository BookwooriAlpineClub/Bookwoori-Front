import styled, { css } from 'styled-components';
import { ReactComponent as Hash } from '@src/assets/icons/hash.svg';
import { ReactComponent as Voice } from '@src/assets/icons/voice.svg';
import { ReactComponent as Run } from '@src/assets/icons/run.svg';

interface Props {
  type: string;
  children: React.ReactNode;
}

const ChannelItem = ({ type, children }: Props) => {
  const iconMapping: { [key: string]: React.ReactNode } = {
    text: <SHash />,
    voice: <SVoice />,
    run: <SRun />,
  };

  return (
    <SItem>
      {iconMapping[type]} {children}
    </SItem>
  );
};

export default ChannelItem;

const SItem = styled.div`
  display: flex;
  gap: 0.625rem;

  padding: 0 0.625rem;
`;
const iconStyle = css`
  fill: ${({ theme }) => theme.colors.black100};
`;
const SHash = styled(Hash)`
  ${iconStyle}
`;
const SVoice = styled(Voice)`
  ${iconStyle}
`;
const SRun = styled(Run)`
  ${iconStyle}
`;
