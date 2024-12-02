import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import Fieldset from '@src/components/book/Fieldset';

export type Period = {
  start: string;
  end: string;
};
interface Props {
  readingStatus: 'WISH' | 'READING' | 'FINISHED';
  readOnly: boolean;
  value: Period;
  setValue: React.Dispatch<React.SetStateAction<Period>>;
}

const InputPeriod = ({ readingStatus, readOnly, value, setValue }: Props) => {
  const title: string = '독서 기간';

  return (
    <Fieldset title={title}>
      <Container>
        <Input
          name={title}
          value={value.start}
          max={value.end}
          pattern='\d{4}-\d{2}-\d{2}'
          required
          readOnly={readOnly}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, start: e.target.value }))
          }
        />
        <Hyphen>-</Hyphen>
        {readingStatus === 'FINISHED' ? (
          <Input
            name={title}
            value={value.end}
            min={value.start}
            pattern='\d{4}-\d{2}-\d{2}'
            required
            readOnly={readOnly}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, end: e.target.value }))
            }
          />
        ) : (
          <Text>독서 중</Text>
        )}
      </Container>
    </Fieldset>
  );
};

export default InputPeriod;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 0.25rem;

  padding: 0.75rem 1rem;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.white};

  &:has(input:read-only) {
    background-color: transparent;
  }
`;
const Input = styled.input.attrs({ type: 'date' })<{ value: string }>`
  text-align: center;

  width: 100%;

  background-color: transparent;

  ${({ theme }) => theme.fonts.body};
  color: ${({ value, theme }) =>
    value ? theme.colors.black100 : theme.colors.black200};
`;
const Hyphen = styled.span`
  ${({ theme }) => theme.fonts.body}
  ${NoSelect}
`;
const Text = styled(Hyphen)`
  text-align: center;

  width: 100%;
`;
