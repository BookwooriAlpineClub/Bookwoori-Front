import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import icnCheck from '@src/assets/icons/check_circle.svg';

interface Props {
  title: string;
  items: {
    value: 'chat' | 'voice' | 'climb';
    icon: React.ReactElement;
    isRadioDisabled?: boolean;
  }[];
  defaultValue?: 'chat' | 'voice' | 'climb' | null;
  required: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * @prop items
 * @ text - 중앙 텍스트
 * @ icon - 좌측 svg 아이콘
 */
const InputRadio = ({
  title,
  items,
  defaultValue,
  required,
  setValue,
}: Props) => {
  const text: {
    [key: string]: string;
  } = {
    chat: '문자',
    voice: '전화',
    climb: '등반',
  };

  return (
    <Layout>
      {items.map(({ value, icon, isRadioDisabled }) => (
        <Label key={text[value]}>
          <Container>
            {icon}
            {text[value]}
          </Container>
          <Input
            name={title}
            value={value}
            required={required}
            onChange={(e) => setValue(e.target.value)}
            disabled={isRadioDisabled}
            defaultChecked={defaultValue ? defaultValue === value : false}
          />
        </Label>
      ))}
    </Layout>
  );
};

export default InputRadio;

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.3125rem;
`;
const Label = styled.label`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 0.63rem;

  border-radius: 0.9375rem;
  background: none;

  color: ${({ theme }) => theme.colors.black200};

  &:has(input[type='radio']:checked) {
    background-color: ${({ theme }) => theme.colors.blue300};

    color: ${({ theme }) => theme.colors.black100};
  }
`;
const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 0.62rem;

  ${NoSelect}
`;
const Input = styled.input.attrs({ type: 'radio' })`
  width: 1.0625rem;
  height: 1.0625rem;
  margin: 0.09rem;

  border-radius: 50%;
  background: ${({ theme }) => theme.colors.black300};

  &:checked {
    background: url(${icnCheck}) no-repeat;
  }
`;
