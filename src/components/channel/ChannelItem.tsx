import styled from 'styled-components';
import useDialog from '@src/hooks/useDialog';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '@src/utils/formatters';
import { ReactComponent as Hash } from '@src/assets/icons/hash.svg';
import { ReactComponent as Voice } from '@src/assets/icons/voice.svg';
import { ReactComponent as Run } from '@src/assets/icons/run.svg';
import { ReactComponent as Edit } from '@src/assets/icons/edit.svg';
import { ReactComponent as Delete } from '@src/assets/icons/trash.svg';
import DeleteConfirmModal from '@src/components/common/DeleteConfirmModal';

interface Props {
  color?: string;
  type: string;
  children: React.ReactNode;
}

const ChannelItem = ({ color = 'grey', type, children }: Props) => {
  const serverId = 1;
  const climbingId = 2;
  const channelId = 1;
  const navigate = useNavigate();
  const { openDialog, closeDialog } = useDialog();
  const iconMapping: { [key: string]: React.ReactNode } = {
    text: <Hash />,
    voice: <Voice />,
    run: <Run />,
  };
  const handleNavigateChannel: { [key: string]: () => void } = {
    text: () => navigate(`/server/${encodeId(serverId)}/${channelId}`),
    run: () => navigate(`/climbing/${encodeId(climbingId)}`),
  };
  const handleClickEdit = () => {
    navigate(`/server/${encodeId(serverId)}/${channelId}/edit`);
  };

  return (
    <SItem $color={color}>
      <Wrapper onClick={handleNavigateChannel[type]}>
        {iconMapping[type]} {children}
      </Wrapper>
      {type === 'run' ? (
        <Delete
          onClick={() =>
            openDialog(
              <DeleteConfirmModal
                closeDialog={closeDialog}
                onClickDelete={closeDialog}
              />,
            )
          }
        />
      ) : (
        <Edit width='20px' height='20px' onClick={handleClickEdit} />
      )}
    </SItem>
  );
};

export default ChannelItem;

const SItem = styled.div<{ $color: string }>`
  display: flex;
  justify-content: space-between;

  padding: 0.625rem;

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme, $color }) =>
    $color === 'black' ? theme.colors.black100 : theme.colors.black200};
`;
const Wrapper = styled.div`
  display: flex;
  gap: 0.625rem;

  &:hover {
    color: ${({ theme }) => theme.colors.black100};
    background-color: ${({ theme }) => theme.colors.neonGreen};
    cursor: pointer;
  }
`;
