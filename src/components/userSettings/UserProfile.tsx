import styled from 'styled-components';
import Background from '@src/assets/images/userSettings/background.png';
import Profile from '@src/assets/images/userSettings/profile_example.png';

const UserProfile = () => {
  return (
    <SLayout>
      <SImages>
        <SBackgroundImg src={Background} />
        <SProfileImg src={Profile} />
      </SImages>
      <SContainer>
        <SNickname>내별명</SNickname>
        <SMountain>0번째, ㅇㅇ산 등산가</SMountain>
        <SBox>
          <SWrapper>
            <SNicknameBlue>999</SNicknameBlue>
            <SCaption>지나온 길(m)</SCaption>
          </SWrapper>
          <SLine />
          <SWrapper>
            <SNicknameBlue>9999</SNicknameBlue>
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

  width: 20.9375rem;
  padding: 0 0 1.25rem;

  border-radius: 1.875rem;
  background-color: ${({ theme }) => theme.colors.white};

  text-align: center;
`;
const SImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;
const SBackgroundImg = styled.img`
  width: 100%;
  height: 10.4688rem;

  border-radius: 1.875rem 1.875rem 0 0;

  object-fit: cover;
`;
const SProfileImg = styled.img`
  margin-top: -3.125rem;
  width: 6.25rem;
  height: 6.25rem;

  border-radius: 50%;

  object-fit: contain;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  width: 100%;
`;
const SNickname = styled.label`
  ${({ theme }) => theme.fonts.nickname};
  color: ${({ theme }) => theme.colors.black100};
`;
const SMountain = styled.label`
  ${({ theme }) => theme.fonts.mountain};
  color: ${({ theme }) => theme.colors.blue100};
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
  color: ${({ theme }) => theme.colors.blue100};
`;
const SCaption = styled.label`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black100};
`;
const SLine = styled.div`
  width: 0.0938rem;
  height: 2.1875rem;
  background-color: ${({ theme }) => theme.colors.blue300};
`;
