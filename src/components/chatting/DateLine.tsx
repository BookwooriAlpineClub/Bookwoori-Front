import styled from 'styled-components';

const DateLine = ({ date }: { date: string }) => {
  const [year, month, day] = date.split('-');
  
  return (
    <SLayout>
      <SLine />
      <SLabel>
        {year}년 {month}월 {day}일
      </SLabel>
      <SLine />
    </SLayout>
  );
};

export default DateLine;

const SLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;

  padding: 0 0.9375rem;
`;
const SLine = styled.div`
  width: 100%;
  height: 0.0625rem;
  background-color: ${({ theme }) => theme.colors.black200};
`;
const SLabel = styled.label`
  max-width: 5.9375rem;
  width: 100%;

  ${({ theme }) => theme.fonts.caption};
  text-align: center;
  color: ${({ theme }) => theme.colors.black200};
`;
