import styled from 'styled-components';

const ClimbAddList = () => {
  return (
    <SLayout>
      <SBox>
        <SLabel>모임 이름</SLabel>
        <SWrapper>
          <SInput type='text' placeholder='모임 이름을 입력하세요.' />
          <SSmallLabel>10</SSmallLabel>
        </SWrapper>
      </SBox>
      <SBox>
        <SLabel>등반할 책</SLabel>
        <SWrapper>
          <SInput type='text' placeholder='책 제목을 입력하세요.' />
          <SSmallLabel>10</SSmallLabel>
        </SWrapper>
      </SBox>
      <SBox>
        <SLabel>등반 시기</SLabel>
        <SWrapper>
          <SInput type='date' placeholder='기간을 선택하세요.' />
        </SWrapper>
      </SBox>
      <SBox>
        <SLabel>등반할 책</SLabel>
        <SWrapper>
          <SInput type='text' placeholder='책 제목을 입력하세요.' />
          <SSmallLabel>10</SSmallLabel>
        </SWrapper>
      </SBox>
    </SLayout>
  );
};

export default ClimbAddList;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  width: 100%;
`;
const SLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;
const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.875rem 0.625rem;

  border-radius: 0.3125rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const SInput = styled.input`
  width: 100%;

  ${({ theme }) => theme.fonts.body};
`;
const SSmallLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black200};
`;
