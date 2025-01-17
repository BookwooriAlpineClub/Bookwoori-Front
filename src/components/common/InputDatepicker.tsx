import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

interface Period {
  start: string;
  end: string;
}
interface Props {
  type: 'date' | 'period';
  name: string;
  min?: string;
  max?: string;
  required: boolean;
  disabled?: true | 'start' | 'end';
  value: Period;
  setValue: React.Dispatch<React.SetStateAction<Period>>;
}

const InputDatepicker = ({
  type,
  name,
  min,
  max,
  required,
  disabled,
  value,
  setValue,
}: Props) => {
  return (
    <Container>
      <Input
        name={name}
        value={value.start}
        min={min}
        max={value.end}
        pattern='\d{4}-\d{2}-\d{2}'
        required={required}
        disabled={disabled === true || disabled === 'start'}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, start: e.target.value }))
        }
      />
      {type === 'period' && (
        <>
          <Span>-</Span>
          <Input
            name={name}
            value={value.end}
            min={value.start}
            max={max}
            pattern='\d{4}-\d{2}-\d{2}'
            required={required}
            disabled={disabled === true || disabled === 'end'}
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
export type { Period };

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
`;
const Input = styled.input.attrs({ type: 'date' })<{ value: string }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.rounded[8]};

  ${({ theme }) => theme.fonts.body};
  color: ${({ value, theme }) =>
    value ? theme.colors.neutral950 : theme.colors.neutral400};
  text-align: center;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral200};

    color: ${({ theme }) => theme.colors.neutral400};
  }
`;
const Span = styled.span`
  padding: 0 ${({ theme }) => theme.padding[12]};

  ${NoSelect}
`;
