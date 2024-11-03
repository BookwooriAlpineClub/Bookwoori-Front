import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import Fieldset from '@src/components/common/Fieldset';

export type Period = {
  start: string;
  end: string;
};
interface Props extends Omit<InputProps, 'placeholder'> {
  type: 'date' | 'period';
  min?: string;
  max?: string;
  value: Period;
  setValue: React.Dispatch<React.SetStateAction<Period>>;
}

const InputDatepicker = ({
  title,
  type,
  min,
  max,
  required,
  value,
  setValue,
}: Props) => {
  return (
    <Fieldset title={title}>
      <Container>
        <Input
          name={title}
          value={value.start}
          min={min}
          max={value.end}
          pattern='\d{4}-\d{2}-\d{2}'
          required={required}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, start: e.target.value }))
          }
        />
        {type === 'period' && (
          <>
            <Span>-</Span>
            <Input
              name={title}
              value={value.end}
              min={value.start}
              max={max}
              pattern='\d{4}-\d{2}-\d{2}'
              required={required}
              onChange={(e) =>
                setValue((prev) => ({ ...prev, end: e.target.value }))
              }
            />
          </>
        )}
      </Container>
    </Fieldset>
  );
};

export default InputDatepicker;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
`;
const Input = styled.input.attrs({ type: 'date' })<{ value: string }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.black100 : theme.colors.black200};
  ${({ theme }) => theme.fonts.body};
`;
const Span = styled.span`
  ${NoSelect}
`;
