import styled from 'styled-components';
import { Channel } from '@src/types/apis/channel.d';
import { ClimbingInfo } from '@src/types/domain/climbingTemp';
import ChannelItem from './ChannelItem';

interface ChannelListProps {
  color?: string;
  channels?: Channel[];
  climbs?: ClimbingInfo[];
  categoryId?: number;
}

const ChannelList = ({
  color,
  channels,
  climbs,
  categoryId,
}: ChannelListProps) => {
  return (
    <SLayout>
      {channels &&
        channels.map((it) => (
          <ChannelItem
            key={it.channelId}
            channelId={it.channelId}
            categoryId={categoryId ?? -1}
            color={color}
            type={it.type}
          >
            {it.name}
          </ChannelItem>
        ))}
      {climbs &&
        climbs.map((it) => (
          <ChannelItem
            key={it.climbingId}
            channelId={it.climbingId}
            color={color}
            type='CLIMB'
          >
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
  gap: 0.3125rem;

  ${({ theme }) => theme.fonts.body}
`;
