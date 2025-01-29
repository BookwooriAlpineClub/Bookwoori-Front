import type Book from '@src/types/book';
import type { Category } from '@src/types/category';
import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { formatDate, decodeIdParam } from '@src/utils/formatters';
import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import useBottomsheet from '@src/hooks/useBottomsheet';
import { useCategory } from '@src/hooks/query/category';
import useChannel from '@src/hooks/query/useChannel';
import useClimbing from '@src/hooks/query/useClimbing';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import Fieldset from '@src/components/common/Fieldset';
import InputRadio from '@src/components/common/InputRadio';
import InputDropdown from '@src/components/common/InputDropdown';
import InputText from '@src/components/common/InputText';
import InputDatepicker, {
  type Period,
} from '@src/components/common/InputDatepicker';
import Button from '@src/components/common/Button';
import SearchBottomsheet from '@src/components/channel/SearchBottomsheet';
import { ReactComponent as IcnHash } from '@src/assets/icons/bi_hash.svg';
import { ReactComponent as IcnVoice } from '@src/assets/icons/hi_outline_volume_up.svg';
import { ReactComponent as IcnRun } from '@src/assets/icons/bi_run.svg';

const ChannelAddPage = () => {
  const navigate = useEncodedNavigate();
  const { openBottomsheet, closeBottomsheet } = useBottomsheet();
  const { serverId } = useParams<{ serverId: string }>();
  const decodedServerId = decodeIdParam(serverId);
  const location = useLocation();
  const defaultKind = new URLSearchParams(location.search).get('kind') || '';

  const { categoryList = [] } = useCategory();
  const { createChannel } = useChannel();
  const { createClimbing } = useClimbing();

  const [kind, setKind] = useState<string>(defaultKind);
  const [category, setCategory] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [book, setBook] = useState<Pick<Book, 'title' | 'isbn13'>>({
    title: '',
    isbn13: '',
  });
  const [date, setDate] = useState<Period>({ start: '', end: '' });
  const [description, setDescription] = useState<string>('');

  const calcTomorrow = (): Date => {
    const day = new Date();
    day.setDate(day.getDate() + 1);
    return day;
  };
  const isBtnDisabled = (): boolean => {
    if (kind === 'chat' || kind === 'voice') return !(kind && category && name);
    if (kind === 'climb') return !(kind && name && book && date && description);
    return true;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (kind === 'chat' || kind === 'voice') {
      createChannel.mutate(
        {
          body: {
            categoryId: Number(category),
            name,
            type: kind,
          },
        },
        {
          onSuccess() {
            navigate('/server', Number(decodedServerId), { replace: true });
          },
        },
      );
    } else {
      createClimbing.mutate(
        {
          body: {
            serverId: Number(decodedServerId),
            name,
            isbn: book.isbn13,
            description,
            startDate: date.start,
            endDate: date.end,
          },
        },
        {
          onSuccess() {
            navigate('/server', Number(decodedServerId), { replace: true });
          },
        },
      );
    }
  };

  return (
    <Container>
      <Header text='모임 추가하기' headerType='back' />
      <Main>
        <Form id='channel-add-form' onSubmit={handleFormSubmit}>
          <InputRadio
            name='모임 유형'
            options={[
              { value: 'chat', Icon: IcnHash, text: '문자' },
              { value: 'voice', Icon: IcnVoice, text: '전화' },
              { value: 'climb', Icon: IcnRun, text: '등반' },
            ]}
            defaultValue={defaultKind}
            required
            setValue={setKind}
          />
          {(kind === 'chat' || kind === 'voice') && (
            <InputDropdown
              name='모임 분류'
              placeholder='분류 선택'
              options={categoryList.map((item) => ({
                id: item.categoryId,
                text: item.name,
              }))}
              required
              value={category}
              setValue={setCategory}
            />
          )}
          {!!kind && (
            <InputText
              as='input'
              name='모임 이름'
              placeholder='모임 이름을 입력하세요.'
              maxLength={20}
              required
              value={name}
              setValue={setName}
            />
          )}
          {kind === 'climb' && (
            <>
              <Fieldset title='등반할 책'>
                <InputSearch
                  name='등반할 책'
                  placeholder='책을 선택하세요.'
                  type='text'
                  value={book.title}
                  readOnly
                  required
                  onClick={() => {
                    openBottomsheet(
                      <SearchBottomsheet
                        setValue={setBook}
                        closeBottomsheet={closeBottomsheet}
                      />,
                    );
                  }}
                />
              </Fieldset>
              <InputDatepicker
                type='period'
                name='등반 기간'
                min={formatDate(calcTomorrow())}
                required
                value={date}
                setValue={setDate}
              />
              <InputText
                as='textarea'
                name='등반 설명'
                placeholder='사람들에게 등반에 대해 알려주세요.'
                maxLength={150}
                required
                value={description}
                setValue={setDescription}
              />
            </>
          )}
        </Form>
        <Button
          type='submit'
          form='channel-add-form'
          disabled={isBtnDisabled()}
        >
          추가하기
        </Button>
      </Main>
    </Container>
  );
};

export default ChannelAddPage;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;

  height: 100%;
`;
const Main = styled.main`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.91rem;

  flex-grow: 1;
  margin: 0.91rem 5% 2.56rem;

  overflow-y: auto;
`;
const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 1.25rem;

  flex-grow: 1;

  overflow-y: scroll;
`;
const InputSearch = styled.input`
  width: 100%;
  height: 1.25rem;

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};

  cursor: pointer;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral400};
  }
`;
