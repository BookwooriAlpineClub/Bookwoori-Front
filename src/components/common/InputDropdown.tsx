import styled from 'styled-components';
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
      <Input
        name={title}
        value={value}
        required={required}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value='' disabled>
          {placeholder}
        </option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Input>
    </Fieldset>
  );
};

export default InputDropdown;

const Input = styled.select<{ value: string }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.black100 : theme.colors.black200};
  ${({ theme }) => theme.fonts.body};
`;
