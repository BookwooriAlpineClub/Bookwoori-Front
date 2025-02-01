import type Record from '@src/types/record';
import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import { ReactComponent as IcnWish } from '@src/assets/icons/md_book.svg';
import { ReactComponent as IcnReading } from '@src/assets/icons/md_auto_stories.svg';
import { ReactComponent as IcnFinished } from '@src/assets/icons/done.svg';

const radioConfigs: {
  value: Record['status'];
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
}[] = [
  { value: 'WISH', Icon: IcnWish, text: '읽고 싶어요' },
  { value: 'READING', Icon: IcnReading, text: '읽고 있어요' },
  { value: 'FINISHED', Icon: IcnFinished, text: '다 읽었어요' },
];

interface Props {
  name: string;
  setValue: React.Dispatch<React.SetStateAction<Record['status']>>;
  status: Record['status'];
}

const InputStatus = ({ name, setValue, status }: Props) => {
  return (
    <Container>
      {radioConfigs.map(({ value, Icon, text }) => (
        <Label key={value}>
          <div>
            <Icon width={20} height={20} />
          </div>
          {text}
          <input
            name={name}
            type='radio'
            value={value}
            required
            defaultChecked={value === status}
            onChange={(e) => {
              setValue(e.target.value as Record['status']);
            }}
          />
        </Label>
      ))}
    </Container>
  );
};

export default InputStatus;

const Container = styled.fieldset`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  width: 18.75rem;
  margin: 0 auto;
`;
const Label = styled.label`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: ${({ theme }) => theme.gap[10]};

  flex-shrink: 0;

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral400};

  ${NoSelect};

  div {
    display: flex;
    padding: ${({ theme }) => theme.padding[12]};

    border-radius: ${({ theme }) => theme.rounded[8]};
    background-color: ${({ theme }) => theme.colors.neutral50};
  }

  &:has(input[type='radio']:checked) {
    color: ${({ theme }) => theme.colors.blue500};

    div {
      background-color: ${({ theme }) => theme.colors.blue100};
    }
  }
`;
