import type { BookListItem } from '@src/types/apis/book.d';
import { useState } from 'react';
import useBook from '@src/hooks/query/useBook';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import BookinfoItem from '@src/components/book/BookinfoItem';
import { ReactComponent as IcnSearch } from '@src/assets/icons/md_outline_search.svg';

interface Props {
  setValue: React.Dispatch<
    React.SetStateAction<Pick<BookListItem, 'title' | 'isbn13'>>
  >;
  closeBottomsheet: () => void;
}

const SearchBottomsheet = ({ setValue, closeBottomsheet }: Props) => {
  const [keyword, setKeyword] = useState<string>('');

  // API 요청
  const { bookList } = useBook({ keyword });
  const data: BookListItem[] = bookList as BookListItem[];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지 (기본 기능 비활성화)
    event.preventDefault();

    // 제출 데이터 가져오기
    const formdata = new FormData(event.currentTarget);
    const input: string = (formdata.get('keyword') ?? '') as string;

    // 쿼리 업데이트
    setKeyword(input);
  };
  const handleItemClick = (
    item: Pick<BookListItem, 'title' | 'isbn13'>,
  ): void => {
    setValue?.(item);
    closeBottomsheet?.();
  };

  return (
    <Container>
      <NoDataTextLayout>
        <Header>
          <Form onSubmit={handleFormSubmit}>
            <IcnSearch width={20} height={20} />
            <Input
              type='text'
              name='keyword'
              placeholder='책 제목, 작가를 검색해 보세요.'
            />
          </Form>
        </Header>
        {keyword && (
          <Main>
            {data.length !== 0 ? (
              <Ul>
                {data.map((item) => (
                  <BookinfoItem
                    key={item.isbn13}
                    {...item}
                    onClick={() =>
                      handleItemClick({
                        title: item.title,
                        isbn13: item.isbn13,
                      })
                    }
                  />
                ))}
              </Ul>
            ) : (
              <strong>검색 결과가 없어요.</strong>
            )}
          </Main>
        )}
      </NoDataTextLayout>
    </Container>
  );
};

export default SearchBottomsheet;

const Container = styled.div`
  width: 23.4375rem;
  height: 23.4375rem;
  margin: 1.44rem auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.875rem;

  width: 100%;
  padding: 0.9375rem;
`;
const Main = styled.main`
  overflow-y: scroll;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  width: 19.375rem;
  height: 2.5rem;
  padding: 0.75rem;

  border-radius: 1.875rem;
  background-color: ${({ theme }) => theme.colors.blue300};

  color: ${({ theme }) => theme.colors.blue100};
`;
const Input = styled.input`
  width: 100%;

  background-color: transparent;

  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.black100};
  text-overflow: ellipsis;

  &::placeholder {
    color: ${({ theme }) => theme.colors.blue200};
  }
`;
const Ul = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 1.25rem;
`;
