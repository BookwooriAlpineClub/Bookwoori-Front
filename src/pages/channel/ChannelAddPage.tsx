import Button from '@src/components/common/Button';
import Header from '@src/components/common/Header';
import styled, { css } from 'styled-components';
import { ReactComponent as Hash } from '@src/assets/icons/hash.svg';
import { ReactComponent as Voice } from '@src/assets/icons/voice.svg';
import { ReactComponent as Run } from '@src/assets/icons/run.svg';
import { ReactComponent as Check } from '@src/assets/icons/check_circle.svg';
import { useState } from 'react';
import TextAddList from '@src/components/channel/TextAddList';
import ClimbAddList from '@src/components/channel/ClimbAddList';

type Types = {
  text: string;
  icon: React.ReactNode;
};

const ChannelAddPage = () => {
  const [checked, setChecked] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [length, setLength] = useState<number>(0);
  const types: Types[] = [
    { text: '문자', icon: <SHash $checked={checked === '문자'} /> },
    { text: '전화', icon: <SVoice $checked={checked === '전화'} /> },
    { text: '등반', icon: <SRun $checked={checked === '등반'} /> },
  ];

  const handleRadio = (type: string) => {
    setChecked(type);
  };

  return (
    <SLayout>
      <Header text='모임 추가하기' headerType='back' />
      <SContainer>
        <SBox>
          <SRadio>
            <SLabel>모임 유형</SLabel>
            <SRadioBox>
              {types.map(({ text, icon }) => (
                <label key={text} htmlFor={text}>
                  <SItemWrapper $checked={checked === text}>
                    <SItem $checked={checked === text}>
                      {icon} {text}
                    </SItem>
                    {checked === text ? <Check /> : <SCircle />}
                    <input
                      id={text}
                      type='radio'
                      name='types'
                      value={text}
                      checked={checked === text}
                      onChange={() => handleRadio(text)}
                    />
                  </SItemWrapper>
                </label>
              ))}
            </SRadioBox>
          </SRadio>
          {checked === '문자' && (
            <TextAddList
              value={value}
              setValue={setValue}
              length={length}
              setLength={setLength}
            />
          )}
          {checked === '전화' && (
            <TextAddList
              value={value}
              setValue={setValue}
              length={length}
              setLength={setLength}
            />
          )}
          {checked === '등반' && <ClimbAddList />}
        </SBox>
        <Button>추가하기</Button>
      </SContainer>
    </SLayout>
  );
};

export default ChannelAddPage;

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100svh;
`;
const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;

  height: 100%;
  padding: 0.9063rem 1.25rem 2.5625rem;
`;
const SBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: 100%;
`;
const SRadio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;
const SLabel = styled.label`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
`;
const SRadioBox = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 5px;

  padding: 0.9375rem;

  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const SItemWrapper = styled.div<{ $checked: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.625rem;

  border-radius: 0.9375rem;
  background-color: ${({ theme, $checked }) =>
    $checked && theme.colors.blue300};
  input {
    display: none;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  cursor: pointer;
`;
const SItem = styled.div<{ $checked: boolean }>`
  display: flex;
  gap: 5px;

  color: ${({ theme, $checked }) =>
    $checked ? theme.colors.black100 : theme.colors.black200};
`;
const SCircle = styled.div`
  width: 1.0625rem;
  height: 1.0625rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.black300};
`;
const fillColor = css<{ $checked: boolean }>`
  fill: ${({ theme, $checked }) =>
    $checked ? theme.colors.black100 : theme.colors.black200};
`;
const SHash = styled(Hash)<{ $checked: boolean }>`
  ${fillColor}
`;
const SVoice = styled(Voice)<{ $checked: boolean }>`
  ${fillColor}
`;
const SRun = styled(Run)<{ $checked: boolean }>`
  ${fillColor}
`;
