import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import Fieldset from '@src/components/library/Fieldset';

export type Period = {
  start: string;
  end: string;
};
interface Props {
  name: string;
  readOnly?: boolean;
  value: Period;
  setValue?: React.Dispatch<React.SetStateAction<Period>>;
  readingStatus: 'WISH' | 'READING' | 'FINISHED';
}

const InputPeriod = ({
  name = '독서 기간',
  readOnly = false,
  value,
  setValue,
  readingStatus,
}: Props) => {
  return (
    <Fieldset title={name}>
      <Container>
        <Input
          name={name}
          value={value.start}
          max={value.end}
          pattern='\d{4}-\d{2}-\d{2}'
          required
          readOnly={readOnly}
          onChange={(e) => {
            setValue?.((prev: Period) => ({ ...prev, start: e.target.value }));
          }}
        />
        <Hyphen>-</Hyphen>
        {readingStatus === 'FINISHED' ? (
          <Input
            name={name}
            value={value.end}
            min={value.start}
            pattern='\d{4}-\d{2}-\d{2}'
            required
            readOnly={readOnly}
            onChange={(e) => {
              setValue?.((prev: Period) => ({ ...prev, end: e.target.value }));
            }}
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
  background-color: ${({ theme }) => theme.colors.neutral0};

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
    value ? theme.colors.neutral950 : theme.colors.neutral400};
`;
const Hyphen = styled.span`
  ${({ theme }) => theme.fonts.body}
  ${NoSelect}
`;
const Text = styled(Hyphen)`
  text-align: center;

  width: 100%;
`;
