import styled from 'styled-components';

const DateLine = ({ date }: { date: string }) => {
  const [year, month, day] = date.split('-');

  return (
    <Layout>
      <Line />
      <Label>
        {year}년 {month}월 {day}일
      </Label>
      <Line />
    </Layout>
  );
};

export default DateLine;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.gap[8]};

  padding: 0 0.9375rem;
`;
const Line = styled.div`
  width: 100%;
  height: 0.0625rem;
  background-color: ${({ theme }) => theme.colors.neutral400};
`;
const Label = styled.label`
  max-width: 5.9375rem;
  width: 100%;

  ${({ theme }) => theme.fonts.caption};
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral400};

  cursor: default;
`;
