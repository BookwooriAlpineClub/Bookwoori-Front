import styled from 'styled-components';

type ExpItemType = {
  name: string;
  reason: string;
  amount: number;
  exp: number;
  type: string;
  createdAt: string;
};

type ExpListProps = {
  date: string;
  list: ExpItemType[];
};

const ExpList = ({ date, list }: ExpListProps) => {
  return (
    <SLayout>
      <SLabel>{date}</SLabel>
      <SContainer>
        {list.map((it, idx) => (
          <>
            {idx !== 0 && <SLine />}
            <SBox key={it.createdAt}>
              <SWrapper>
                <SCaption>{it.name}</SCaption>
                <SCaption>{it.exp}</SCaption>
              </SWrapper>
              <SWrapper>
                <SBody $color={false}>{it.reason}</SBody>
                <SBody $color>{it.amount}m</SBody>
              </SWrapper>
            </SBox>
          </>
        ))}
      </SContainer>
    </SLayout>
  );
};

export default ExpList;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
const SLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.blue100};
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  padding: 0.9375rem;
  border-radius: 1.25rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const SLine = styled.hr`
  height: 0.0938rem;
  background: ${({ theme }) => theme.colors.black300};
`;
const SBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const SWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SCaption = styled.label`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.black200};
`;
const SBody = styled.label<{ $color: boolean | undefined }>`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme, $color }) =>
    $color ? theme.colors.blue100 : theme.colors.black100};
`;
