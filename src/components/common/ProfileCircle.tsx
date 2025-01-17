import styled from 'styled-components';

interface ProfileCircleProps {
  profileImg: string;
  nickname: string | undefined;
  status?: 'FINISHED' | 'FAILED';
}

const ProfileCircle = ({
  profileImg,
  nickname = '',
  status = 'FAILED',
}: ProfileCircleProps) => {
  return (
    <ProfileContainer status={status}>
      {profileImg ? (
        <ProfileImage src={profileImg} alt='profile' />
      ) : (
        <span>{nickname.substring(0, 2)}</span>
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div<{ status?: 'FINISHED' | 'FAILED' }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neutral200};
  display: flex;
  justify-content: center;
  align-items: center;

  border: ${({ status }) =>
    status === 'FINISHED' ? '1px solid #4CAF50' : '1px solid transparent'};
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export default ProfileCircle;
