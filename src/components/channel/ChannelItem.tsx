import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { encodeId } from '@src/utils/formatters';
import useLoaderData from '@src/hooks/useRoaderData';
import { ReactComponent as Hash } from '@src/assets/icons/hash.svg';
import { ReactComponent as Voice } from '@src/assets/icons/voice.svg';
import { ReactComponent as Run } from '@src/assets/icons/run.svg';
import { ReactComponent as Edit } from '@src/assets/icons/edit.svg';

interface Props {
  color?: string;
  type: string;
  children: React.ReactNode;
  channelId: number;
  categoryId?: number;
}

const ChannelItem = ({
  color = 'grey',
  type,
  channelId,
  categoryId,
  children,
}: Props) => {
  const { id: serverId } = useLoaderData<{ id: number }>();
  const navigate = useNavigate();
  // const { openDialog, closeDialog } = useDialog();
  const iconMapping: { [key: string]: React.ReactNode } = {
    CHAT: <Hash />,
    VOICE: <Voice />,
    CLIMB: <Run />,
  };
  const handleNavigateChannel: { [key: string]: () => void } = {
    CHAT: () => navigate(`/server/${encodeId(serverId)}/${channelId}`),
    CLIMB: () =>
      navigate(`/climbing/${encodeId(channelId)}`, { state: { children } }),
  };
  const handleClickEdit = () => {
    navigate(`/server/${encodeId(serverId)}/${channelId}/edit`, {
      state: { categoryId },
    });
  };

  // 클라이밍 삭제 없음
  // const handleClickDelete = () => {};

  return (
    <SItem $color={color}>
      <Wrapper onClick={handleNavigateChannel[type]}>
        {iconMapping[type]} {children}
      </Wrapper>
      {/* // <Delete
        //   onClick={() =>
        //     openDialog(
        //       <DeleteConfirmModal
        //         closeDialog={closeDialog}
        //         onClickDelete={handleClickDelete}
        //       />,
        //     )
        //   }
        // /> */}
      {type !== 'CLIMB' && (
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
