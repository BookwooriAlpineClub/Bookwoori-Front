import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { currentServerIdState } from '@src/states/atoms';
import type { Climbing } from '@src/types/climbing';
import { usePutParticipate } from '@src/hooks/query/climbing';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';
import usePopover from '@src/hooks/usePopover';
import { formatDateWithHyphen } from '@src/utils/formatters';
import { ROUTE_PATH } from '@src/constants/routePath';
import Popover from '@src/components/common/Popover';
import ParticipantList from '@src/components/climbing/ParticipantList';
import Button from '@src/components/common/button/Button';
import { ReactComponent as Calendar } from '@src/assets/icons/md_insert_invitation.svg';
import { ReactComponent as Group } from '@src/assets/icons/md_group.svg';
import { ReactComponent as Book } from '@src/assets/icons/md_book.svg';
import { ReactComponent as Walk } from '@src/assets/icons/md_directions_walk.svg';
import { ReactComponent as Edit } from '@src/assets/icons/hi_outline_pencil.svg';
import { ReactComponent as Check } from '@src/assets/icons/md_check.svg';

const RecruitClimbingItem = ({
  item,
  closeBottomSheet,
}: {
  item: Climbing;
  closeBottomSheet: () => void;
}) => {
  const navigate = useEncodedNavigation();
  const serverId = useRecoilValue(currentServerIdState);
  const { participateClimbing } = usePutParticipate(item.climbingId);
  const { anchorEl, isOpen, openPopover, closePopover } = usePopover();

  const handleClickEdit = () => {
    closeBottomSheet();
    sessionStorage.setItem('currentServer', serverId.toString());
    navigate(ROUTE_PATH.climbingEdit, item.climbingId);
  };

  const handleClickJoin = () => {
    participateClimbing.mutate();
  };

  return (
    <Layout>
      <Container>
        <Wrapper>
          <Calendar />
          <Caption>
            {formatDateWithHyphen(item.startDate)} -
            {formatDateWithHyphen(item.endDate)}
          </Caption>
        </Wrapper>
        <Wrapper>
          <GroupButton onClick={openPopover}>
            <Group /> {item.memberCount}
          </GroupButton>
          <Popover anchorEl={anchorEl} isOpen={isOpen} onClose={closePopover}>
            <ParticipantList climbingId={item.climbingId} />
          </Popover>
        </Wrapper>
      </Container>
      <Content>
        <Title>{item.name}</Title>
        <ContentWrapper>
          <Book width={16} height={16} />
          <Body>
            {item.bookInfo.author}, 《{item.bookInfo.title}》,{' '}
            {item.bookInfo.itemPage}p
          </Body>
        </ContentWrapper>
        <ContentWrapper>
          <Walk />
          <Body>{item.description}</Body>
        </ContentWrapper>
      </Content>
      {item.isOWner ? (
        <SButton $color={item.isOWner} onClick={handleClickEdit}>
          <Edit width={12} height={12} />
          편집하기
        </SButton>
      ) : (
        <SButton $color={item.isJoined} onClick={handleClickJoin}>
          {item.isJoined && <Check width={12} height={12} />}
          참여하기
        </SButton>
      )}
    </Layout>
  );
};

export default RecruitClimbingItem;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.gap[12]};

  padding: 1.25rem 0.9375rem;
  border-radius: ${({ theme }) => theme.rounded[16]};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: ${({ theme }) => theme.gap[6]};

  color: ${({ theme }) => theme.colors.blue500};
`;
const Caption = styled.span`
  width: 100%;

  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral400};
`;
const GroupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.gap[4]};

  width: 2.25rem;
  height: 1.5625rem;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.colors.neutral50};

  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral950};
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.gap[10]};

  width: 100%;
`;
const Title = styled.label`
  ${({ theme }) => theme.fonts.body};
`;
const ContentWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.gap[6]};

  color: ${({ theme }) => theme.colors.neutral400};
`;
const Body = styled.label`
  width: 100%;

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral400};
`;
const SButton = styled(Button)<{ $color: boolean }>`
  gap: ${({ theme }) => theme.gap[4]};
  padding: 0.6875rem 0;
  font-size: 0.75rem;

  color: ${({ theme, $color }) =>
    $color ? theme.colors.blue300 : theme.colors.neutral0};
  background-color: ${({ theme, $color }) =>
    $color ? theme.colors.blue100 : theme.colors.blue500};
`;
