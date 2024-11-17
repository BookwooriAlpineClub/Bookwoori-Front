import styled from 'styled-components';
import { useState } from 'react';
import Button from '@src/components/common/Button';
import { ReactComponent as Calendar } from '@src/assets/icons/md_insert_invitation.svg';
import { ReactComponent as Group } from '@src/assets/icons/md_group.svg';
import { ReactComponent as Book } from '@src/assets/icons/md_book.svg';
import { ReactComponent as Walk } from '@src/assets/icons/md_directions_walk.svg';
import { ReactComponent as Edit } from '@src/assets/icons/edit.svg';
import { ReactComponent as Check } from '@src/assets/icons/md_check.svg';

interface BookInfo {
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
  itemPage: number;
  description: string;
  isbn13: string;
  cover: string;
}

interface ClimbingEvent {
  climbingId: number;
  status: 'READY' | 'ONGOING' | 'FINISHED';
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  memberCount: number;
  isJoined: boolean;
  isOwner: boolean;
  bookInfo: BookInfo;
}

const RecruitClimbingItem = ({ item }: { item: ClimbingEvent }) => {
  const [isJoined, setIsJoined] = useState<boolean>(item.isJoined);
  const formatDate = (date: string) => {
    return date.split('-').join('.').concat('.');
  };

  const handleClickJoin = () => {
    setIsJoined((prev) => !prev);
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
          <SImg />
          <SGroupButton>
            <Group /> {item.memberCount}
          </SGroupButton>
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
      {item.isOwner ? (
        <SButton $color={item.isOwner}>
          <SEdit />
          편집하기
        </SButton>
      ) : (
        <SButton $color={isJoined} onClick={handleClickJoin}>
          {isJoined && <SCheck />}
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
const SImg = styled.image`
  width: 1.25rem;
  height: 1.25rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.black200};
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
