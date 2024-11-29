import styled from 'styled-components';

const DateLine = ({ date }: { date: string }) => {
  return (
    <SLayout>
      <SLine />
      <SLabel>{date}</SLabel>
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
  max-width: 4.6875rem;
  width: 100%;

  ${({ theme }) => theme.fonts.caption};
  text-align: center;
  color: ${({ theme }) => theme.colors.black200};
`;
