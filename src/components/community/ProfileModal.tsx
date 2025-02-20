import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import useModal from '@src/hooks/useModal';
import { communityDrawerState, dialogState } from '@src/states/atoms';
import styled from 'styled-components';
import UserProfile from '@src/components/common/UserProfile';
import SubButton from '@src/components/common/button/SubButton';
import { ReactComponent as Chatting } from '@src/assets/icons/md_outline_chat_bubble.svg';
import { ReactComponent as Hiking } from '@src/assets/icons/md_outline_auto_stories.svg';

const buttons = {
  hiking: {
    icon: <Hiking style={{ width: '1.1rem' }} />,
    label: '서재 보기',
  },
  message: {
    icon: <Chatting style={{ width: '1.1rem' }} />,
    label: '문자 하기',
  },
};

const ProfileModal = ({ memberId }: { memberId: number }) => {
  const navigate = useNavigate();
  const { closeModal: closeDialog } = useModal(dialogState);
  const { closeModal: closeCommunityDrawer } = useModal(communityDrawerState);

  const handleClickHiking = () => {
    closeCommunityDrawer();
    closeDialog();
    navigate(`${ROUTE_PATH.library}/${memberId}`);
  };

  const handleclickMessage = () => {
    closeCommunityDrawer();
    closeDialog();
    navigate(`${ROUTE_PATH.dmChat}/${memberId}`);
  };

  return (
    <ModalContainer>
      <UserProfile memberId={memberId} />
      <ButtonContainer>
        <SubButton
          {...buttons.hiking}
          onClick={handleClickHiking}
          width='40%'
        />
        <SubButton
          {...buttons.message}
          onClick={handleclickMessage}
          width='40%'
        />
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
