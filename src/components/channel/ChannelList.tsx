import styled from 'styled-components';
import ChannelItem from './ChannelItem';

interface ClimbingChannel {
  climbingId: number;
  name: string;
  type: 'text' | 'voice' | 'run';
}

interface Props {
  color?: string;
  list: ClimbingChannel[];
}

const ChannelList = ({ color, list }: Props) => {
  return (
    <SLayout>
      {list.map((it) => (
        <ChannelItem key={it.climbingId} color={color} type={it.type}>
          {it.name}
        </ChannelItem>
      ))}
    </SLayout>
  );
};

export default ChannelList;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  ${({ theme }) => theme.fonts.body}
`;
