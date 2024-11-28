import styled from 'styled-components';
import { Channel } from '@src/types/apis/channel.d';
import ChannelItem from './ChannelItem';

interface ChannelListProps {
  color?: string;
  channels: Channel[];
  categoryId: number;
}

const ChannelList = ({ color, channels, categoryId }: ChannelListProps) => {
  return (
    <SLayout>
      {channels.map((it) => (
        <ChannelItem
          key={it.channelId}
          channelId={it.channelId}
          categoryId={categoryId}
          color={color}
          type={it.type}
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
