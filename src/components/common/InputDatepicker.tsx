import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

export type Period = {
  start: string;
  end: string;
};
interface Props {
  title: string;
  type: 'date' | 'period';
  min?: string;
  max?: string;
  required: boolean;
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
    <Container>
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
    </Container>
  );
};

export default InputDatepicker;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
`;
const Input = styled.input.attrs({ type: 'date' })<{ value: string }>`
  width: 100%;
  padding: ${({ theme }) => theme.padding[16]};
  border-radius: ${({ theme }) => theme.rounded[16]};

  text-align: center;
  color: ${({ value, theme }) =>
    value ? theme.colors.neutral950 : theme.colors.neutral400};
  ${({ theme }) => theme.fonts.body};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral200};
    color: ${({ theme }) => theme.colors.neutral400};
  }
`;
const Span = styled.span`
  ${NoSelect}
`;
