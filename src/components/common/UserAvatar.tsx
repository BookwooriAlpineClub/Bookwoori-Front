import styled from 'styled-components';

interface ProfileCircleProps {
  profileImg: string | null;
  nickname: string | undefined;
  status?: 'FINISHED' | 'FAILED';
  size?: string;
}

const UserAvatar = ({
  profileImg,
  nickname = '',
  status = 'FAILED',
  size = '3rem',
}: ProfileCircleProps) => {
  return (
    <ProfileContainer status={status} size={size}>
      {profileImg ? (
        <img src={profileImg} alt='profile' />
      ) : (
        <span>{nickname.substring(0, 2)}</span>
      )}
    </ProfileContainer>
  );
};

export default UserAvatar;

const ProfileContainer = styled.div<{
  status?: 'FINISHED' | 'FAILED';
  size: string;
}>`
  display: flex;
  flex-shrink: 0;

  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  border: ${({ status, theme }) =>
    status === 'FINISHED' ? `0.1rem solid ${theme.colors.blue500}` : 'null'};

  background-color: ${({ theme }) => theme.colors.blue100};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  span {
    color: ${({ theme }) => theme.colors.blue900};
  }
`;
