import styled from 'styled-components';
import { Exp } from '@src/types/user';
import { ExpType } from '@src/constants/constants';
import ExpandableList from '@src/components/common/ExpandableList';

type ExpListProps = {
  date: string;
  list: Exp[];
};

const ExpList = ({ date, list }: ExpListProps) => {
  return (
    <Layout>
      <Label>{date}</Label>
      <ExpandableList
        items={list}
        renderItem={(it) => (
          <Box key={it.expLogId}>
            <Wrapper>
              <Caption>{it.title}</Caption>
              <Caption>{it.height}</Caption>
            </Wrapper>
            <Wrapper>
              <Body $color={false}>{ExpType[it.expType]}</Body>
              <Body $color>{it.amount}m</Body>
            </Wrapper>
          </Box>
        )}
      />
    </Layout>
  );
};

export default ExpList;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
const Label = styled.label`
  color: ${({ theme }) => theme.colors.blue500};
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Caption = styled.label`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.neutral400};
`;
const Body = styled.label<{ $color: boolean | undefined }>`
  color: ${({ theme, $color }) =>
    $color ? theme.colors.blue500 : theme.colors.neutral950};
`;
