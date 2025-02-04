import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { encodeId } from '@src/utils/formatters';
import { currentServerIdState } from '@src/states/atoms';
import RecruitClimbingItem from '@src/components/climbing/RecruitClimbingItem';
import { useGetClimbingRecruitList } from '@src/hooks/query/climbing';
import { ReactComponent as Plus } from '@src/assets/icons/hi_outline_plus.svg';

const RecruitClimbingBottomSheet = ({
  closeBottomSheet,
}: {
  closeBottomSheet: () => void;
}) => {
  const navigate = useNavigate();
  const serverId = useRecoilValue(currentServerIdState);
  const { data = [] } = useGetClimbingRecruitList();

  const handleClick = () => {
    closeBottomSheet();
    navigate(`/server/${encodeId(serverId)}/create/channel?kind=climb`);
  };

  return (
    <>
      <Wrapper>
        <span>모집 중인 등반</span>
        <button type='button' onClick={handleClick}>
          <Plus width={20} height={20} />
        </button>
      </Wrapper>
      <Container>
        {data.length > 0 ? (
          data.map((it) => (
            <RecruitClimbingItem
              key={it.climbingId}
              item={it}
              closeBottomSheet={closeBottomSheet}
            />
          ))
        ) : (
          <NoDataWrapper>
            <Span>아직 모집 중인 등반이 없습니다.</Span>
          </NoDataWrapper>
        )}
      </Container>
    </>
  );
};

export default RecruitClimbingBottomSheet;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.25rem 1.25rem 0.625rem;

  color: ${({ theme }) => theme.colors.neutral950};
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[12]};

  height: 80vh;
  padding: 0 0.9375rem;
  overflow: scroll;
`;
const NoDataWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;
`;
const Span = styled.span`
  margin: auto;

  color: ${({ theme }) => theme.colors.neutral400};
`;
