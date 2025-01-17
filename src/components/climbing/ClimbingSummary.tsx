import styled from 'styled-components';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';

interface ClimbingSummaryProps {
  startDate?: string;
  endDate?: string;
  memberCount?: number;
}

function calculateDday(endDate: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const end = new Date(endDate);

  // 유효한 날짜인지 확인
  if (Number.isNaN(end.getTime())) {
    return '유효하지 않은 날짜입니다.';
  }

  // 두 날짜 간의 차이 계산 (밀리초 단위)
  const diffInMilliseconds = end.getTime() - today.getTime();

  // 밀리초를 일 단위로 변환
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  // 결과 반환
  if (diffInDays > 0) {
    return `D - ${diffInDays}`;
  }
  if (diffInDays === 0) {
    return 'D - Day';
  }
  return `D + ${Math.abs(diffInDays)}`; // 종료 날짜가 과거인 경우
}

const ClimbingSummary = ({
  startDate = '2024-00-00',
  endDate = '2025-00-00',
  memberCount = 6,
}: ClimbingSummaryProps) => {
  const dDay = calculateDday(endDate);
  return (
    <Container>
      <DateInfo>
        <StyledCalendarIcon />
        <DateText>${`${startDate} - ${endDate}, `}</DateText>
        <HighlightText>{`${dDay}`}</HighlightText>
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
  color: ${({ theme }) => theme.colors.neutral400};
  ${({ theme }) => theme.fonts.caption}
`;

const HighlightText = styled.span`
  color: ${({ theme }) => theme.colors.blue500};
  font-weight: 1000;
  font-size: 0.6875rem;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.fonts.caption}

  border-radius: 0.725rem;
  padding: 0.1875rem 0.525rem;
  justify-content: center;
  gap: 0.25rem;
`;

const MemberCount = styled.span``;

const StyledCalendarIcon = styled(CalendarIcon)`
  color: ${({ theme }) => theme.colors.blue500};
  font-size: 1.0625rem;
`;

const StyledGroupIcon = styled(GroupIcon)`
  color: ${({ theme }) => theme.colors.neutral950};
  font-size: 0.75rem;
`;
