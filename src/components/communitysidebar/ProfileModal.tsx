import UserProfile from '@src/components/userSettings/UserProfile';
import styled from 'styled-components';
import SubButton from '@src/components/common/SubButton';
import { ReactComponent as Chatting } from '@src/assets/icons/md_outline_chat_bubble.svg';
import { ReactComponent as Hiking } from '@src/assets/icons/md_outline_auto_stories.svg';

interface ProfileModalProps {
  nickname: string;
  mountain: string;
  meter: number;
  pages: number;
}

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

const ProfileModal = (data: ProfileModalProps) => (
  <ModalContainer>
    <UserProfile data={data} />
    <ButtonContainer>
      <SubButton {...buttons.hiking} />
      <SubButton {...buttons.message} />
    </ButtonContainer>
  </ModalContainer>
);

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
