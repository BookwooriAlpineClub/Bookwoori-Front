import styled from 'styled-components';
import { useGetExp } from '@src/hooks/query/member';
import { groupExpByDate } from '@src/utils/formatters';
import Header from '@src/components/common/Header';
import ExpList from '@src/components/userSettings/ExpList';

const ExpHistoryPage = () => {
  const { data = [] } = useGetExp();

  return (
    <>
      <Header text='지나온 길 보기' headerType='back' />
      <Main>
        {groupExpByDate(data).map((item) => {
          const keys = Object.keys(item)
            .map((date) => ({
              original: date,
              parsed: new Date(
                date.replace(/\.\s/g, '-').slice(0, -1),
              ).getTime(),
            }))
            .sort((a, b) => a.parsed - b.parsed);
          return keys.map((key) => (
            <ExpList
              key={`${item}-${key}`}
              date={key.original.slice(6)}
              list={item[key.original]}
            />
          ));
        })}
      </Main>
    </>
  );
};

export default ExpHistoryPage;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  padding: 0 1.25rem 2.5rem;
`;
