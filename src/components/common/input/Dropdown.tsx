import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

interface Props {
  name: string;
  placeholder: string;
  options: {
    id: number;
    text: string;
  }[];
  required?: boolean;
  disabled?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({
  name,
  placeholder,
  options,
  required,
  disabled,
  value,
  setValue,
}: Props) => {
  return (
    <Container>
      <Input
        name={name}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
      >
        <Option value='' disabled>
          {placeholder}
        </Option>
        {options.map(({ id, text }) => (
          <Option key={id} value={id}>
            {text}
          </Option>
        ))}
      </Input>
    </Container>
  );
};

export default Dropdown;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;

  cursor: pointer;
`;
const Input = styled.select<{ value: string }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.neutral950 : theme.colors.neutral400};
  ${({ theme }) => theme.fonts.body};
`;
const Option = styled.option`
  ${NoSelect}
`;
