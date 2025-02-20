import type Book from '@src/types/book';
import type { GetBookListRes } from '@src/types/apis/book';
import { useState } from 'react';
import { useGetBookList } from '@src/hooks/query/book';
import styled from 'styled-components';
import BookListItem from '@src/components/library/BookListItem';
import { ReactComponent as IcnSearch } from '@src/assets/icons/md_outline_search.svg';

type BookReturnData = Pick<Book, 'isbn13' | 'title'>;
interface Props {
  setValue: React.Dispatch<React.SetStateAction<BookReturnData>>;
  closeBottomsheet: () => void;
}

const SearchBottomsheet = ({ setValue, closeBottomsheet }: Props) => {
  const [keyword, setKeyword] = useState<string>('');

  // API 요청
  const { data: bookList } = useGetBookList(keyword);
  const data: GetBookListRes = bookList as GetBookListRes;

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지 (기본 기능 비활성화)
    event.preventDefault();

    // 제출 데이터 가져오기
    const formdata = new FormData(event.currentTarget);
    const input: string = (formdata.get('keyword') ?? '') as string;

    // 쿼리 업데이트
    setKeyword(input);
  };
  const handleItemClick = (item: BookReturnData): void => {
    setValue?.(item);
    closeBottomsheet?.();
  };

  return (
    <Container>
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
                <button
                  key={item.isbn13}
                  type='button'
                  onClick={() => {
                    handleItemClick({
                      title: item.title,
                      isbn13: item.isbn13,
                    });
                  }}
                >
                  <BookListItem {...item} />
                </button>
              ))}
            </Ul>
          ) : (
            <strong>검색 결과가 없어요.</strong>
          )}
        </Main>
      )}
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
  gap: ${({ theme }) => theme.gap[16]};

  width: 100%;
  padding: ${({ theme }) => theme.padding[16]};
`;
const Main = styled.main`
  overflow-y: scroll;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.gap[6]};

  width: 19.375rem;
  height: 2.5rem;
  padding: ${({ theme }) => theme.padding[12]};

  border-radius: ${({ theme }) => theme.rounded[24]};
  background-color: ${({ theme }) => theme.colors.blue100};

  color: ${({ theme }) => theme.colors.blue500};
`;
const Input = styled.input`
  width: 100%;

  background-color: transparent;

  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.neutral950};
  text-overflow: ellipsis;

  &::placeholder {
    color: ${({ theme }) => theme.colors.blue300};
  }
`;
const Ul = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap[16]};
`;
