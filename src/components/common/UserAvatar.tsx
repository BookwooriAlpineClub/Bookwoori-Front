import styled from 'styled-components';

interface ProfileCircleProps {
  profileImg: string;
  nickname: string | undefined;
  status?: 'FINISHED' | 'FAILED';
}

const UserAvatar = ({
  profileImg,
  nickname = '',
  status = 'FAILED',
}: ProfileCircleProps) => {
  return (
    <ProfileContainer status={status}>
      {profileImg ? (
        <img src={profileImg} alt='profile' />
      ) : (
        <span>{nickname.substring(0, 2)}</span>
      )}
    </ProfileContainer>
  );
};

export default UserAvatar;

const ProfileContainer = styled.div<{ status?: 'FINISHED' | 'FAILED' }>`
  display: flex;
  flex-shrink: 0;

  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  justify-content: center;
  align-items: center;

  border: ${({ status, theme }) =>
    status === 'FINISHED'
      ? `0.1rem solid ${theme.colors.blue500}`
      : '0.1rem solid transparent'};

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
