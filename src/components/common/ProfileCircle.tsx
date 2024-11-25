import styled from 'styled-components';
import { Avatar } from '@mui/material';

interface ProfileCircleProps {
  profileImg: string | null;
  status?: 'FINISHED' | 'FAILED';
}

const ProfileCircle = ({
  profileImg,
  status = 'FAILED',
}: ProfileCircleProps) => {
  return (
    <ProfileContainer status={status}>
      {profileImg ? (
        <ProfileImage src={profileImg} alt='profile' />
      ) : (
        <StyledAvatar>jj</StyledAvatar>
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div<{ status: 'FINISHED' | 'FAILED' }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.black400};
  display: flex;
  justify-content: center;
  align-items: center;

  border: ${({ status }) =>
    status === 'FINISHED' ? '2px solid #4CAF50' : '2px solid #F44336'};
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const StyledAvatar = styled(Avatar)`
  font-size: 1rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.black400};
`;

export default ProfileCircle;
