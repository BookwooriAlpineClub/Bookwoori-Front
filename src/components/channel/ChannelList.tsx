import styled from 'styled-components';
import type { ClimbingInfo } from '@src/types/climbing';
import type { Channel } from '@src/types/channel';
import Item from '@src/components/channel/ChannelItem';

interface ChannelListProps {
  channels?: Channel[];
  climbs?: ClimbingInfo[];
  categoryId?: number;
}

const ChannelList = ({ channels, climbs, categoryId }: ChannelListProps) => {
  return (
    <Layout>
      {channels &&
        channels.map((it) => (
          <Item
            key={it.channelId}
            channelId={it.channelId}
            categoryId={categoryId as number}
            type={it.type}
          >
            {it.name}
          </Item>
        ))}
      {climbs &&
        climbs.map((it) => (
          <Item key={it.climbingId} channelId={it.climbingId} type='CLIMB'>
            {it.name}
          </Item>
        ))}
    </Layout>
  );
};

export default ChannelList;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[6]};
`;
