import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

export type Period = {
  start: string;
  end: string;
};
interface Props extends Omit<InputProps, 'placeholder'> {
  type: 'date' | 'period';
  min?: string;
  max?: string;
  disabled?: 'start' | 'end' | 'default';
  value: Period;
  setValue: React.Dispatch<React.SetStateAction<Period>>;
}

const InputDatepicker = ({
  title,
  type,
  min,
  max,
  required,
  disabled = 'default',
  value,
  setValue,
}: Props) => {
  return (
    <fieldset>
      <Legend>{title}</Legend>
      <Layout>
        <Input
          name={title}
          value={value.start}
          min={min}
          max={value.end}
          pattern='\d{4}-\d{2}-\d{2}'
          required={required}
          disabled={disabled === 'start'}
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
              disabled={disabled === 'end'}
              onChange={(e) =>
                setValue((prev) => ({ ...prev, end: e.target.value }))
              }
            />
          </>
        )}
      </Layout>
    </fieldset>
  );
};

export default InputDatepicker;

const Layout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
`;
const Legend = styled.legend`
  margin-bottom: 0.63rem;

  color: ${({ theme }) => theme.colors.black100};
  ${({ theme }) => theme.fonts.body};
`;
const Input = styled.input.attrs({ type: 'date' })<{ value: string }>`
  width: 100%;
  padding: 0.9375rem;
  border-radius: 0.9375rem;

  text-align: center;
  color: ${({ value, theme }) =>
    value ? theme.colors.black100 : theme.colors.black200};
  ${({ theme }) => theme.fonts.body};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.black400};
    color: ${({ theme }) => theme.colors.black200};
  }
`;
const Span = styled.span`
  ${NoSelect}
`;
