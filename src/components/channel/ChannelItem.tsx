import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryIdState, currentServerIdState } from '@src/states/atoms';
import { encodeId } from '@src/utils/formatters';
import { ReactComponent as Hash } from '@src/assets/icons/bi_hash.svg';
import { ReactComponent as Voice } from '@src/assets/icons/hi_outline_volume_up.svg';
import { ReactComponent as Run } from '@src/assets/icons/bi_run.svg';
import { ReactComponent as Edit } from '@src/assets/icons/hi_outline_pencil.svg';

interface Props {
  type: string;
  children: React.ReactNode;
  channelId: number;
  categoryId?: number;
}

const Icons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  CHAT: Hash,
  VOICE: Voice,
  CLIMB: Run,
};

const ChannelItem = ({ type, channelId, categoryId, children }: Props) => {
  const navigate = useNavigate();
  const serverId = useRecoilValue(currentServerIdState);
  const setCategoryId = useSetRecoilState(categoryIdState);
  const Icon = Icons[type];

  const handleNavigateChannel: { [key: string]: () => void } = {
    CHAT: () => navigate(`/server/${encodeId(serverId)}/${channelId}`),
    CLIMB: () => navigate(`/climbing/${encodeId(channelId)}`),
  };

  const handleClickEdit = () => {
    setCategoryId(categoryId);
    navigate(`/server/${encodeId(serverId)}/${channelId}/edit`);
  };

  return (
    <Item>
      <Wrapper onClick={handleNavigateChannel[type]}>
        <Icon width={20} height={20} />
        {children}
      </Wrapper>
      {type !== 'CLIMB' && (
        <Edit
          style={{ cursor: 'pointer' }}
          width={20}
          height={20}
          onClick={handleClickEdit}
        />
      )}
    </Item>
  );
};

export default ChannelItem;

const Item = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.625rem;

  color: ${({ theme }) => theme.colors.neutral400};
`;
const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap[10]};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral950};
    background-color: ${({ theme }) => theme.colors.lime300};
    cursor: pointer;
  }
`;
