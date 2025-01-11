import type { BookListitemQueryRes } from '@src/types/apis/book';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { ROUTE_PATH } from '@src/constants/routePath';
import useBook from '@src/hooks/query/useBook';
import styled from 'styled-components';
import { NoDataTextLayout } from '@src/styles/mixins';
import BookinfoItem from '@src/components/book/BookinfoItem';
import { ReactComponent as IcnSearch } from '@src/assets/icons/md_outline_search.svg';
import { ReactComponent as IcnClose } from '@src/assets/icons/ck_close.svg';

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyword: string = new URLSearchParams(location.search).get('keyword') ?? '';

  // API 요청
  const { bookList } = useBook({ keyword });
  const data: BookListItem[] = bookList ?? [];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지 (기본 기능 비활성화)
    event.preventDefault();

    // 제출 데이터 가져오기
    const formdata = new FormData(event.currentTarget);
    const input: string = (formdata.get('keyword') ?? '') as string;

    // 쿼리 파라미터 업데이트
    navigate(
      { search: input ? `?${createSearchParams({ keyword: input })}` : '' },
      { replace: true },
    );
  };
  const handleButtonClick = () => {
    navigate(-1);
  };
  const handleItemClick = (isbn13: string): void => {
    navigate(`${ROUTE_PATH.libraryBookSearch}/${isbn13}`);
  };

  return (
    <NoDataTextLayout>
      <Header>
        <Form onSubmit={handleFormSubmit}>
          <IcnSearch width={20} height={20} />
          <Input
            name='keyword'
            type='search'
            placeholder='책 제목, 작가를 검색해 보세요.'
          />
        </Form>
        <Button type='button' onClick={handleButtonClick}>
          <IcnClose width={20} height={20} />
        </Button>
      </Header>
      {keyword && (
        <main>
          {data.length !== 0 ? (
            <Ul>
              {data.map((item) => (
                <BookinfoItem
                  key={item.isbn13}
                  {...item}
                  onClick={() => handleItemClick(item.isbn13)}
                />
              ))}
            </Ul>
          ) : (
            <strong>검색 결과가 없어요.</strong>
          )}
        </main>
      )}
    </NoDataTextLayout>
  );
};

export default SearchPage;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.875rem;

  width: 100%;
  padding: 0.9375rem;

  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  width: 19.375rem;
  height: 2.5rem;
  padding: 0.75rem;

  border-radius: 1.875rem;
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
const Button = styled.button`
  font: unset;
  line-height: 0;
  color: ${({ theme }) => theme.colors.blue500};
`;
const Ul = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 1.25rem;
`;
