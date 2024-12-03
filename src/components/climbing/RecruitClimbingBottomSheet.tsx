import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Plus } from '@src/assets/icons/hi_outline_plus.svg';
import RecruitClimbingItem from '@src/components/climbing/RecruitClimbingItem';
import useClimbingRecruit from '@src/hooks/query/useClimbingRecruit';
import { encodeId } from '@src/utils/formatters';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';

const RecruitClimbingBottomSheet = ({
  closeBottomSheet,
}: {
  closeBottomSheet: () => void;
}) => {
  // const { serverId } = useParams<{ serverId: string }>();
  // const decodedServerId = decodeIdParam(serverId);
  const serverId = useRecoilValue(currentServerIdState);
  const { data = [] } = useClimbingRecruit(serverId);
  const navigate = useNavigate();

  const handleClick = () => {
    closeBottomSheet();
    navigate(`/server/${encodeId(serverId)}/create/channel?kind=climb`);
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
            <RecruitClimbingItem
              key={it.climbingId}
              item={it}
              closeBottomSheet={closeBottomSheet}
            />
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

  padding: 1.25rem 1.25rem 0.625rem;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  height: 80vh;
  padding: 0 0.9375rem;
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
