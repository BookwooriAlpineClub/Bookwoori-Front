import styled from 'styled-components';
import Fieldset from '@src/components/common/Fieldset';

interface Props extends Omit<InputProps, 'placeholder'> {
  min?: string;
  max?: string;
  value: string;
}

const InputDatepicker = ({
  title,
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
