import styled from 'styled-components';
import { useState } from 'react';
import { ReactComponent as IcnHash } from '@src/assets/icons/hash.svg';
import { ReactComponent as IcnVoice } from '@src/assets/icons/voice.svg';
import { ReactComponent as IcnRun } from '@src/assets/icons/run.svg';
import Header from '@src/components/common/Header';
import InputRadio from '@src/components/common/InputRadio';
import InputDropdown from '@src/components/common/InputDropdown';
import InputText from '@src/components/common/InputText';
import InputDatepicker from '@src/components/common/InputDatepicker';
import Button from '@src/components/common/Button';

const dummy: string[] = ['선택지1', '선택지2', '선택지3', '선택지4'];

const ChannelAddPage = () => {
  const [kind, setKind] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [book, setBook] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  function isBtnDisabled(): boolean {
    if (kind === '문자' || kind === '전화') return !(kind && category && name);
    if (kind === '등반') return !(kind && name && book && date && description);
    return true;
  }

  return (
    <Layout>
      <Header text='모임 추가하기' headerType='back' />
      <Form id='channel-add-form'>
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
        {kind === '문자' ||
          (kind === '전화' && (
            <InputDropdown
              title='모임 분류'
              placeholder='분류 선택'
              items={dummy}
              required
              value={category}
              setValue={setCategory}
            />
          ))}
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
            <InputText // 검색 페이지 이동
              title='등반할 책'
              placeholder='책 제목을 입력하세요.'
              type='short'
              limit={-1}
              required
              setValue={setBook}
            />
            <InputDatepicker
              title='등반 시기'
              placeholder='기간을 선택하세요.'
              min={new Date()
                .toLocaleDateString('ko-KR', {
                  timeZone: undefined,
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
                .replace(/(\d{4}). (\d{2}). (\d{2})./, '$1-$2-$3')}
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
      <SButton type='submit' form='channel-add-form' disabled={isBtnDisabled()}>
        추가하기
      </SButton>
    </Layout>
  );
};

export default ChannelAddPage;

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;

  overflow: scroll;

  margin: 0.91rem 5%;
`;
const SButton = styled(Button)`
  margin: 0 auto 2.56rem;
`;
