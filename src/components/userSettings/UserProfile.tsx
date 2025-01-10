import styled from 'styled-components';
import UserProfilImg from '@src/components/userSettings/UserProfileImg';
import useMember from '@src/hooks/query/useMember';

const UserProfile = ({ memberId }: { memberId?: number }) => {
  const { profileData: data } = useMember(memberId);

  return (
    <SLayout>
      <UserProfilImg
        profile={data?.profileImg ?? undefined}
        background={data?.backgroundImg ?? undefined}
      />
      <SContainer>
        <SNickname>{data?.nickname}</SNickname>
        <SMountain>
          {data?.level}번째, {data?.mountain} 등산가
        </SMountain>
        <SBox>
          <SWrapper>
            <SNicknameBlue>{data?.height}</SNicknameBlue>
            <SCaption>지나온 길(m)</SCaption>
          </SWrapper>
          <SLine />
          <SWrapper>
            <SNicknameBlue>{data?.totalPage}</SNicknameBlue>
            <SCaption>읽어낸 책(p)</SCaption>
          </SWrapper>
        </SBox>
      </SContainer>
    </SLayout>
  );
};

export default UserProfile;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  width: 100%;
  padding: 0 0 1.25rem;

  border-radius: 1.875rem;
  background-color: ${({ theme }) => theme.colors.neutral0};

  text-align: center;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  width: 100%;
`;
const SNickname = styled.label`
  ${({ theme }) => theme.fonts.nickname};
  color: ${({ theme }) => theme.colors.neutral950};
  cursor: default;
`;
const SMountain = styled.label`
  ${({ theme }) => theme.fonts.mountain};
  color: ${({ theme }) => theme.colors.blue500};
  cursor: default;
`;
const SBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1.25rem 3.125rem;
  margin-top: 0.3125rem;
`;
const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;
const SNicknameBlue = styled.label`
  ${({ theme }) => theme.fonts.nickname};
  color: ${({ theme }) => theme.colors.blue500};
  cursor: default;
`;
const SCaption = styled.label`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral950};
  cursor: default;
`;
const SLine = styled.div`
  width: 0.0938rem;
  height: 2.1875rem;
  background-color: ${({ theme }) => theme.colors.blue100};
`;
