import styled from 'styled-components';
import UserProfilImg from '@src/components/userSettings/UserProfileImg';
import Button from '@src/components/common/Button';

const EditUserInfoPage = () => {
  return (
    <SLayout>
      <SContainer>
        <UserProfilImg />
        <SBox>
          <SLabel>별명</SLabel>
          <SWrapper>
            <SInput type='text' placeholder='별명을 입력하세요.' />
            <SSmallLabel>4/10</SSmallLabel>
          </SWrapper>
        </SBox>
      </SContainer>
      <Button>수정하기</Button>
    </SLayout>
  );
};

export default EditUserInfoPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 1.875rem 1.25rem 2.5625rem;
  height: 100%;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const SLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.875rem 0.625rem;
`;

const SInput = styled.input`
  width: 100%;

  border-radius: 0.3125rem;
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;

const SSmallLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black200};
`;
