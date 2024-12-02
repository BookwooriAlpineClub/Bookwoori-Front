import type { Categories } from '@src/types/domain/channel';
import type { BookListItem } from '@src/types/apis/book.d';
import { useState } from 'react';
import useLoaderData from '@src/hooks/useRoaderData';
import useCategory from '@src/hooks/query/useCategory';
import useChannel from '@src/hooks/query/useChannel';
import useClimbing from '@src/hooks/query/useClimbing';
import { formatDate, encodeId } from '@src/utils/formatters';
import useBottomsheet from '@src/hooks/useBottomsheet';
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
import { ReactComponent as IcnHash } from '@src/assets/icons/hash.svg';
import { ReactComponent as IcnVoice } from '@src/assets/icons/voice.svg';
import { ReactComponent as IcnRun } from '@src/assets/icons/run.svg';

const ChannelAddPage = () => {
  const { openBottomsheet, closeBottomsheet } = useBottomsheet();
  const { id: serverId } = useLoaderData<{ id: string }>();
  const { categoryList } = useCategory(Number(serverId));
  const { createChannel } = useChannel();
  const { createClimbing } = useClimbing();

  const [kind, setKind] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [book, setBook] = useState<Pick<BookListItem, 'title' | 'isbn13'>>({
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
    if (kind === '문자' || kind === '전화') return !(kind && category && name);
    if (kind === '등반') return !(kind && name && book && date && description);
    return true;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (kind === '문자' || kind === '전화') {
      const type = kind === '문자' ? 'chat' : 'voice';

      createChannel.mutate(
        {
          body: {
            categoryId: Number(category),
            name,
            type,
          },
        },
        {
          onSuccess() {
            window.location.replace(`/server/${encodeId(Number(serverId))}`);
          },
        },
      );
    } else {
      createClimbing.mutate(
        {
          body: {
            serverId: Number(serverId),
            name,
            isbn: book.isbn13,
            description,
            startDate: date.start,
            endDate: date.end,
          },
        },
        {
          onSuccess() {
            window.location.replace(`/server/${encodeId(Number(serverId))}`);
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
            title='모임 유형'
            items={[
              { text: '문자', icon: <IcnHash /> },
              { text: '전화', icon: <IcnVoice /> },
              { text: '등반', icon: <IcnRun /> },
            ]}
            required
            setValue={setKind}
          />
          {(kind === '문자' || kind === '전화') && (
            <InputDropdown
              title='모임 분류'
              placeholder='분류 선택'
              items={categoryList as Pick<Categories, 'categoryId' | 'name'>[]}
              required
              value={category}
              setValue={setCategory}
            />
          )}
          {kind !== '' && (
            <InputText
              title='모임 이름'
              placeholder='모임 이름을 입력하세요.'
              type='short'
              limit={20}
              required
              value={name}
              setValue={setName}
            />
          )}
          {kind === '등반' && (
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
                title='등반 기간'
                type='period'
                min={formatDate(calcTomorrow())}
                required
                value={date}
                setValue={setDate}
              />
              <InputText
                title='등반 설명'
                placeholder='사람들에게 등반에 대해 알려주세요.'
                type='long'
                limit={150}
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
  color: ${({ theme }) => theme.colors.black100};

  cursor: pointer;

  &::placeholder {
    color: ${({ theme }) => theme.colors.black200};
  }
`;
