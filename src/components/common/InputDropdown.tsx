import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import Fieldset from '@src/components/common/Fieldset';

interface Props extends InputProps {
  items: string[];
  value: string;
}

const InputDropdown = ({
  title,
  placeholder,
  items,
  required,
  value,
  setValue,
}: Props) => {
  return (
    <Fieldset title={title}>
      <Container>
        <Input
          name={title}
          value={value}
          required={required}
          onChange={(e) => setValue(e.target.value)}
        >
          <Option value='' disabled>
            {placeholder}
          </Option>
          {items.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Input>
      </Container>
    </Fieldset>
  );
};

export default InputDropdown;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
const Input = styled.select<{ value: string }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.black100 : theme.colors.black200};
  ${({ theme }) => theme.fonts.body};
`;
const Option = styled.option`
  ${NoSelect}
`;
