import UserProfile from '@src/components/common/UserProfile';
import styled from 'styled-components';
import SubButton from '@src/components/common/SubButton';
import { ReactComponent as Chatting } from '@src/assets/icons/md_outline_chat_bubble.svg';
import { ReactComponent as Hiking } from '@src/assets/icons/md_outline_auto_stories.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import useDialog from '@src/hooks/useDialog';
import useSideBar from '@src/hooks/useSideBar';

const buttons = {
  hiking: {
    icon: <Hiking />,
    label: '등산 보기',
    width: '40%',
  },
  message: {
    icon: <Chatting />,
    label: '문자 하기',
    width: '40%',
  },
};

// type MessageRoom = {
//   messageRoomId: number;
//   memberId: number;
//   nickname: string;
//   profileImg: string | null;
//   recentMessage: string | null;
//   recentMessageTime: string | null;
// };

// function getMessageRoomIdByMemberId(
//   messageRooms: MessageRoom[],
//   memberId: number,
// ): number | null {
//   const room = messageRooms.find((room) => room.memberId === memberId);
//   return room ? room.messageRoomId : null; // 해당 memberId가 없으면 null 반환
// }

const ProfileModal = ({ memberId }: { memberId: number }) => {
  const navigate = useNavigate();
  const { closeDialog } = useDialog();
  const { closeSideBar } = useSideBar();

  const handleClickHiking = () => {
    navigate(`${ROUTE_PATH.library}/${memberId}`);
    closeDialog();
    closeSideBar();
  };

  const handleclickMessage = () => {
    // const roomId = getMessageRoomIdByMemberId(data.messageRooms, memberId);
    navigate(`${ROUTE_PATH.dmChat}/${memberId}`);
    closeDialog();
    closeSideBar();
  };

  return (
    <ModalContainer>
      <UserProfile memberId={memberId} />
      <ButtonContainer>
        <SubButton {...buttons.hiking} onClick={handleClickHiking} />
        <SubButton {...buttons.message} onClick={handleclickMessage} />
      </ButtonContainer>
    </ModalContainer>
  );
};

export default ProfileModal;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.97rem;
  width: calc(100% - 2.5rem);
  max-width: 35rem;
  min-width: 20rem;
  background: transparent;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  width: 100%;
`;
