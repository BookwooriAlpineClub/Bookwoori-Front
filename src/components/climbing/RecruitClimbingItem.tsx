import styled from 'styled-components';
import { ClimbingRecruitItem } from '@src/types/domain/climbingTemp';
import { ROUTE_PATH } from '@src/constants/routePath';
import useEncodedNavigation from '@src/hooks/useEncodedNavigate';
import useClimbingRecruit from '@src/hooks/query/useClimbingRecruit';
import usePopover from '@src/hooks/usePopover';
import useLoaderData from '@src/hooks/useRoaderData';
import Popover from '@src/components/common/Popover';
import ParticipantList from '@src/components/climbing/ParticipantList';
import Button from '@src/components/common/Button';
import { ReactComponent as Calendar } from '@src/assets/icons/md_insert_invitation.svg';
import { ReactComponent as Group } from '@src/assets/icons/md_group.svg';
import { ReactComponent as Book } from '@src/assets/icons/md_book.svg';
import { ReactComponent as Walk } from '@src/assets/icons/md_directions_walk.svg';
import { ReactComponent as Edit } from '@src/assets/icons/edit.svg';
import { ReactComponent as Check } from '@src/assets/icons/md_check.svg';

const RecruitClimbingItem = ({
  item,
  closeBottomSheet,
}: {
  item: ClimbingRecruitItem;
  closeBottomSheet: () => void;
}) => {
  const { id: serverId } = useLoaderData<{ id: string }>() || {};
  const { participateClimbing } = useClimbingRecruit(
    Number(serverId),
    item.climbingId,
  );
  const { anchorEl, isOpen, openPopover, closePopover } = usePopover();
  const navigate = useEncodedNavigation();

  const formatDate = (date: string) => {
    return date.split('-').join('.').concat('.');
  };

  const handleClickEdit = () => {
    closeBottomSheet();
    navigate(ROUTE_PATH.climbingEdit, item.climbingId);
  };

  const handleClickJoin = () => {
    participateClimbing.mutate();
  };

  return (
    <SLayout>
      <SContainer>
        <SWrapper>
          <SCalendar />
          <SCaption>
            {formatDate(item.startDate)} - {formatDate(item.endDate)}
          </SCaption>
        </SWrapper>
        <SWrapper>
          <SGroupButton onClick={openPopover}>
            <Group /> {item.memberCount}
          </SGroupButton>
          <Popover anchorEl={anchorEl} isOpen={isOpen} onClose={closePopover}>
            <ParticipantList climbingId={item.climbingId} />
          </Popover>
        </SWrapper>
      </SContainer>
      <SContent>
        <STitle>{item.name}</STitle>
        <SContentWrapper>
          <SBook />
          <SBody>
            {item.bookInfo.author}, 《{item.bookInfo.title}》,{' '}
            {item.bookInfo.itemPage}p
          </SBody>
        </SContentWrapper>
        <SContentWrapper>
          <SWalk />
          <SBody>{item.description}</SBody>
        </SContentWrapper>
      </SContent>
      {item.isOWner ? (
        <SButton $color={item.isOWner} onClick={handleClickEdit}>
          <SEdit />
          편집하기
        </SButton>
      ) : (
        <SButton $color={item.isJoined} onClick={handleClickJoin}>
          {item.isJoined && <SCheck />}
          참여하기
        </SButton>
      )}
    </SLayout>
  );
};

export default RecruitClimbingItem;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  padding: 1.25rem 0.9375rem;
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const SContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;
const SWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 0.3125rem;
`;
const SCalendar = styled(Calendar)`
  fill: ${({ theme }) => theme.colors.blue100};
`;
const SCaption = styled.span`
  width: 100%;

  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black200};
`;
const SGroupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  width: 2.25rem;
  height: 1.5625rem;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.colors.black300};

  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black100};
`;
const SContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  width: 100%;
`;
const STitle = styled.label`
  ${({ theme }) => theme.fonts.body};
`;
const SContentWrapper = styled.div`
  display: flex;
  gap: 0.3125rem;
`;
const SBook = styled(Book)`
  fill: ${({ theme }) => theme.colors.black200};
`;
const SBody = styled.label`
  width: 100%;

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black200};
`;
const SWalk = styled(Walk)`
  fill: ${({ theme }) => theme.colors.black200};
`;
const SButton = styled(Button)<{ $color: boolean }>`
  gap: 0.25rem;
  padding: 0.6875rem 0;
  font-size: 0.75rem;

  color: ${({ theme, $color }) =>
    $color ? theme.colors.blue200 : theme.colors.white};
  background-color: ${({ theme, $color }) =>
    $color ? theme.colors.blue300 : theme.colors.blue100};
`;
const SEdit = styled(Edit)`
  width: 12px;
  height: 12px;
`;
const SCheck = styled(Check)`
  width: 12px;
  height: 12px;
`;
