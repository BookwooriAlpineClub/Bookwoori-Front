import type Book from '@src/types/book';
import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useEncodedNavigate from '@src/hooks/useEncodedNavigate';
import useModal from '@src/hooks/useModal';
import { useCategory } from '@src/hooks/query/category';
import { usePostChannel } from '@src/hooks/query/channel';
import { usePostClimbing } from '@src/hooks/query/climbing';
import { bottomsheetState } from '@src/states/atoms';
import { formatDate, decodeIdParam } from '@src/utils/formatters';
import { calcDate } from '@src/utils/helpers';
import styled from 'styled-components';
import Header from '@src/components/common/Header';
import Fieldset from '@src/components/common/Fieldset';
import Section from '@src/components/common/Section';
import Button from '@src/components/common/button/Button';
import RadioField from '@src/components/common/input/RadioField';
import Dropdown from '@src/components/common/input/Dropdown';
import TextField from '@src/components/common/input/TextField';
import Datepicker, {
  type Period,
} from '@src/components/common/input/Datepicker';
import SearchBottomsheet from '@src/components/channel/SearchBottomsheet';
import { ReactComponent as IcnHash } from '@src/assets/icons/bi_hash.svg';
import { ReactComponent as IcnVoice } from '@src/assets/icons/hi_outline_volume_up.svg';
import { ReactComponent as IcnRun } from '@src/assets/icons/bi_run.svg';

const ChannelAddPage = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const decodedServerId = decodeIdParam(serverId);
  const location = useLocation();
  const defaultKind = new URLSearchParams(location.search).get('kind') || '';
  const { categoryList } = useCategory();
  const { createChannel } = usePostChannel();
  const { createClimbing } = usePostClimbing();

  const [kind, setKind] = useState<string>(defaultKind);
  const [category, setCategory] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [book, setBook] = useState<Pick<Book, 'title' | 'isbn13'>>({
    title: '',
    isbn13: '',
  });
  const [date, setDate] = useState<Period>({ start: '', end: '' });
  const [description, setDescription] = useState<string>('');

  const navigate = useEncodedNavigate();
  const { openModal: openBottomsheet, closeModal: closeBottomsheet } =
    useModal(bottomsheetState);
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
          serverId: Number(decodedServerId),
          name,
          isbn: book.isbn13,
          description,
          startDate: date.start,
          endDate: date.end,
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
    <>
      <Header text='모임 추가하기' headerType='back' />
      <main>
        <Form
          id='channel-add-form'
          className='scroll-area'
          onSubmit={handleFormSubmit}
        >
          <Fieldset title='모임 유형'>
            <Section>
              <RadioField
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
            </Section>
          </Fieldset>
          {(kind === 'chat' || kind === 'voice') && (
            <Fieldset title='모임 분류'>
              <Section>
                <Dropdown
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
              </Section>
            </Fieldset>
          )}
          {!!kind && (
            <Fieldset title='모임 이름'>
              <Section>
                <TextField
                  as='input'
                  name='모임 이름'
                  placeholder='모임 이름을 입력하세요.'
                  maxLength={20}
                  required
                  value={name}
                  setValue={setName}
                />
              </Section>
            </Fieldset>
          )}
          {kind === 'climb' && (
            <>
              <Fieldset title='등반할 책'>
                <Section>
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
                </Section>
              </Fieldset>
              <Fieldset title='등반 기간'>
                <Section>
                  <Datepicker
                    type='period'
                    name='등반 기간'
                    min={formatDate(calcDate(new Date(), 1), '$1-$2-$3')}
                    mustPeriod
                    required
                    value={date}
                    setValue={setDate}
                  />
                </Section>
              </Fieldset>
              <Fieldset title='등반 설명'>
                <Section>
                  <TextField
                    as='textarea'
                    name='등반 설명'
                    placeholder='사람들에게 등반에 대해 알려주세요.'
                    maxLength={150}
                    required
                    value={description}
                    setValue={setDescription}
                  />
                </Section>
              </Fieldset>
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
      </main>
    </>
  );
};

export default ChannelAddPage;

const Form = styled.form`
  gap: 1.25rem;
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
