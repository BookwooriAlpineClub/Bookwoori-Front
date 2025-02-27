import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import useModal from '@src/hooks/useModal';
import { communityDrawerState, dialogState } from '@src/states/atoms';
import styled from 'styled-components';
import UserProfile from '@src/components/common/UserProfile';
import SubButton from '@src/components/common/button/SubButton';
import { ReactComponent as Chatting } from '@src/assets/icons/md_outline_chat_bubble.svg';
import { ReactComponent as Hiking } from '@src/assets/icons/md_outline_auto_stories.svg';
import { ReactComponent as Setting } from '@src/assets/icons/bi_user_plus.svg';
import { useGetProfile } from '@src/hooks/query/member';
import Spinner from '@src/components/common/Spinner';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';

const buttons = {
  hiking: {
    icon: <Hiking style={{ width: '1.1rem' }} />,
    label: '서재 보기',
    width: '40%',
  },
  message: {
    icon: <Chatting style={{ width: '1.1rem' }} />,
    label: '문자 하기',
    width: '40%',
  },
  setting: {
    icon: <Setting style={{ width: '1.1rem' }} />,
    label: '설정 보기',
    width: '40%',
  },
};

const ProfileModal = ({ memberId }: { memberId: number }) => {
  const navigateEncode = useEncodedNavigation();
  const navigate = useNavigate();
  const { closeModal: closeDialog } = useModal(dialogState);
  const { closeModal: closeCommunityDrawer } = useModal(communityDrawerState);
  const { profileData } = useGetProfile(memberId);

  if (!profileData) return <Spinner />;
  const handleClickHiking = () => {
    closeCommunityDrawer();
    closeDialog();
    if (profileData.isMine) navigate(ROUTE_PATH.library);
    else navigateEncode(ROUTE_PATH.library, memberId);
  };

  const handleClickMessage = () => {
    closeCommunityDrawer();
    closeDialog();
    if (profileData.isMine) {
      navigate(ROUTE_PATH.setting);
    } else navigateEncode(ROUTE_PATH.dmChat, memberId);
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
        {profileData.isMine ? (
          <SubButton {...buttons.setting} onClick={handleClickMessage} />
        ) : (
          <SubButton
            {...buttons.message}
            onClick={handleClickMessage}
            width='40%'
          />
        )}
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
