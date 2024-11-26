import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as IcnSearch } from '@src/assets/icons/md_outline_search.svg';
import { ReactComponent as IcnClose } from '@src/assets/icons/ck_close.svg';

const SearchPage = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState<string>('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지 (기본 기능 비활성화)
    event.preventDefault();

    // 제출된 데이터 가져오기
    const formdata = new FormData(event.currentTarget);
    const input: string = (formdata.get('keyword') ?? '') as string;
    setKeyword(input);

    // 쿼리스트링 추가 및 삭제
    if (input) navigate({ search: `?${createSearchParams({ keyword: input })}` }, { replace: true });
    else navigate({ search: '' }, { replace: true });
  };
  const handleButtonClick = () => {
    navigate({ search: '' }, { replace: true }); // 앞으로가기 대비
    navigate(-1);
  };

  return (
    <>
      <Header>
        <Form onSubmit={handleFormSubmit}>
          <IcnSearch width={20} height={20} />
          <Input
            type='text'
            name='keyword'
            placeholder='책 제목, 작가를 검색해 보세요.'
          />
        </Form>
        <Button type='button' onClick={handleButtonClick}>
          <IcnClose width={20} height={20} />
        </Button>
      </Header>
      {keyword}
    </>
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

  background-color: ${({ theme }) => theme.colors.white};
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
const Button = styled.button`
  font: unset;
  line-height: 0;
  color: ${({ theme }) => theme.colors.blue100};
`;
