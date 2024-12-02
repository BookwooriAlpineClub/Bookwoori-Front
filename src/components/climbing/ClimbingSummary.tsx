import styled from 'styled-components';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';

interface ClimbingSummaryProps {
  startDate?: string;
  endDate?: string;
  memberCount?: number;
}

const ClimbingSummary = ({
  startDate = '2024-00-00',
  endDate = '2025-00-00',
  memberCount = 6,
}: ClimbingSummaryProps) => {
  const dDay = 100;
  return (
    <Container>
      <DateInfo>
        <StyledCalendarIcon />
        <DateText>
          {startDate} - {endDate},
        </DateText>
        <HighlightText>{`D-${dDay}`}</HighlightText>
      </DateInfo>
      <MemberInfo>
        <StyledGroupIcon />
        <MemberCount>{memberCount}</MemberCount>
      </MemberInfo>
    </Container>
  );
};

export default ClimbingSummary;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.625rem;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const DateText = styled.span`
  color: ${({ theme }) => theme.colors.black200};
  ${({ theme }) => theme.fonts.caption}
`;

const HighlightText = styled.span`
  color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.fonts.caption}
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black300};
  ${({ theme }) => theme.fonts.caption}

  border-radius: 0.725rem;
  padding: 0.1875rem 0.525rem;
  justify-content: center;
  gap: 0.25rem;
`;

const MemberCount = styled.span``;

const StyledCalendarIcon = styled(CalendarIcon)`
  color: ${({ theme }) => theme.colors.blue100};
  font-size: 1.0625rem;
`;

const StyledGroupIcon = styled(GroupIcon)`
  color: ${({ theme }) => theme.colors.black100};
  font-size: 0.75rem;
`;
