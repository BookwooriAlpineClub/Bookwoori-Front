import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import Fieldset from '@src/components/common/Fieldset';
import icnCheck from '@src/assets/icons/check_circle.svg';

interface Props extends Omit<InputProps, 'placeholder'> {
  items: { text: string; icon: React.ReactElement }[];
}

/**
 * @prop items
 * @ text - 중앙 텍스트
 * @ icon - 좌측 svg 아이콘
 */
const InputRadio = ({ title, items, required, setValue }: Props) => {
  return (
    <Fieldset title={title}>
      <Layout>
        {items.map(({ text, icon }) => (
          <Label key={text}>
            <Container>
              {icon}
              {text}
            </Container>
            <Input
              name={title}
              value={text}
              required={required}
              onChange={(e) => setValue(e.target.value)}
            />
          </Label>
        ))}
      </Layout>
    </Fieldset>
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
