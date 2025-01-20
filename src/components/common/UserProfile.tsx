import styled from 'styled-components';
import { useGetProfile } from '@src/hooks/query/member';
import UserProfilImg from '@src/components/userSettings/UserProfileImg';

const UserProfile = ({ memberId }: { memberId: number | 'me' }) => {
  const { profileData } = useGetProfile(memberId);

  return (
    <Layout>
      <UserProfilImg
        profile={profileData?.profileImg ?? undefined}
        background={profileData?.backgroundImg ?? undefined}
      />
      <Container>
        <Nickname>{profileData?.nickname}</Nickname>
        <Mountain>
          {profileData?.level ?? 0}번째, {profileData?.mountain} 등산가
        </Mountain>
        <Box>
          <Wrapper>
            <NicknameBlue>{profileData?.height ?? 0}</NicknameBlue>
            <Caption>지나온 길(m)</Caption>
          </Wrapper>
          <Line />
          <Wrapper>
            <NicknameBlue>{profileData?.totalPage ?? 0}</NicknameBlue>
            <Caption>읽어낸 책(p)</Caption>
          </Wrapper>
        </Box>
      </Container>
    </Layout>
  );
};

export default UserProfile;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.gap[10]};

  width: 100%;
  padding: 0 0 1.25rem;

  border-radius: 1.875rem;
  background-color: ${({ theme }) => theme.colors.neutral0};

  text-align: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  width: 100%;
`;
const Nickname = styled.label`
  ${({ theme }) => theme.fonts.nickname};
  color: ${({ theme }) => theme.colors.neutral950};
  cursor: default;
`;
const Mountain = styled.label`
  ${({ theme }) => theme.fonts.mountain};
  color: ${({ theme }) => theme.colors.blue500};
  cursor: default;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1.25rem 3.125rem;
  margin-top: 0.3125rem;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[6]};
`;
const NicknameBlue = styled.label`
  ${({ theme }) => theme.fonts.nickname};
  color: ${({ theme }) => theme.colors.blue500};
  cursor: default;
`;
const Caption = styled.label`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral950};
  cursor: default;
`;
const Line = styled.div`
  width: 0.0938rem;
  height: 2.1875rem;
  background-color: ${({ theme }) => theme.colors.blue100};
`;
