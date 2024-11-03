import styled from 'styled-components';
import Fieldset from '@src/components/common/Fieldset';

interface Props extends InputProps {
  min?: string;
  max?: string;
  value: string;
}

const InputDatepicker = ({
  title,
  placeholder,
  min,
  max,
  required,
  value,
  setValue,
}: Props) => {
  return (
    <Fieldset title={title}>
      <Input
        name={title}
        placeholder={placeholder}
        value={value}
        min={min}
        max={max}
        pattern='\d{4}-\d{2}-\d{2}'
        required={required}
        onChange={(e) => setValue(e.target.value)}
      />
    </Fieldset>
  );
};

export default InputDatepicker;

const Input = styled.input.attrs({ type: 'date' })<{ value: string }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.black100 : theme.colors.black200};
  ${({ theme }) => theme.fonts.body};
`;
