import styled from 'styled-components';
import { ROUTE_PATH } from '@src/constants/routePath';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Plus } from '@src/assets/icons/hi_outline_plus.svg';
import RecruitClimbingItem from '@src/components/climbing/RecruitClimbingItem';
import useClimbingRecruit from '@src/hooks/query/useClimbingRecruit';
import { decodeIdParam } from '@src/utils/formatters';

const RecruitClimbingBottomSheet = ({
  closeBottomSheet,
}: {
  closeBottomSheet: () => void;
}) => {
  const { serverId: id } = useParams<{ serverId: string }>();
  let serverId = id;
  if (!id) {
    console.error('바텀시트 서버 아이디 못 읽어옴');
    serverId = '임시id';
  }
  const { data = [] } = useClimbingRecruit(decodeIdParam(serverId));
  const navigate = useNavigate();

  const handleClick = () => {
    closeBottomSheet();
    navigate(ROUTE_PATH.climbingCreate);
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
