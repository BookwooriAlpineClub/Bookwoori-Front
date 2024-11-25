import styled from 'styled-components';
import { ReactComponent as Plus } from '@src/assets/icons/hi_outline_plus.svg';
import RecruitClimbingItem from '@src/components/climbing/RecruitClimbingItem';
import useClimbingRecruit from '@src/hooks/query/useClimbingRecruit';

const RecruitClimbingBottomSheet = () => {
  const serverId = 2;
  const { data = [] } = useClimbingRecruit(serverId);

  const handleClick = () => {
    // 클라이밍 추가 페이지 이동
  };

  return (
    <>
      <SWrapper>
        <span>모집 중인 등반</span>
        <button type='button' onClick={handleClick}>
          <SPlus />
        </button>
      </SWrapper>
      <SContainer>
        {data.length > 0 ? (
          data.map((it) => (
            <RecruitClimbingItem key={it.climbingId} item={it} />
          ))
        ) : (
          <Wrapper>
            <Span>아직 모집 중인 등반이 없습니다.</Span>
          </Wrapper>
        )}
      </SContainer>
    </>
  );
};

export default RecruitClimbingBottomSheet;

const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.625rem 0;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  height: 80vh;
  overflow: scroll;
`;
const SPlus = styled(Plus)`
  fill: ${({ theme }) => theme.colors.black100};
`;
const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;
`;
const Span = styled.span`
  margin: auto;
  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.black200};
`;
