import styled from 'styled-components';
import type { ClimbingInfo } from '@src/types/domain/climbingTemp';
import type { Channel } from '@src/types/channel';
import Item from '@src/components/channel/ChannelItem';

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
          <Item
            key={it.channelId}
            channelId={it.channelId}
            categoryId={categoryId ?? -1}
            color={color}
            type={it.type}
          >
            {it.name}
          </Item>
        ))}
      {climbs &&
        climbs.map((it) => (
          <Item
            key={it.climbingId}
            channelId={it.climbingId}
            color={color}
            type='CLIMB'
          >
            {it.name}
          </Item>
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
