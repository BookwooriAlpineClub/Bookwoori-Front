import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import icnCheck from '@src/assets/icons/check_circle.svg';

interface Props<ValueType> {
  title: string;
  items: {
    value: ValueType;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    text: string;
    disabled?: boolean;
  }[];
  defaultValue?: ValueType;
  required: boolean;
  disabled: boolean;
  setValue: React.Dispatch<React.SetStateAction<ValueType>>;
}

/**
 * @typeDef {Array<Object>} items
 * @property {ValueType} value - 데이터
 * @property {React.FC<React.SVGProps<SVGSVGElement>>} icon - 좌측 svg 아이콘
 * @property {string} text - 중앙 텍스트
 * @property {boolean} disabled - 선택지 비활성화 여부
 */
const InputRadio = <ValueType extends string>({
  title,
  items,
  defaultValue,
  required,
  disabled,
  setValue,
}: Props<ValueType>) => {
  return (
    <Container>
      {items.map((item) => (
        <Label key={item.value}>
          <Wrapper>
            <item.Icon width={20} height={20} />
            {item.text}
          </Wrapper>
          <Input
            name={title}
            value={item.value}
            required={required}
            onChange={(e) => setValue(e.target.value as ValueType)}
            disabled={disabled || item.disabled}
            defaultChecked={defaultValue ? defaultValue === item.value : false}
          />
        </Label>
      ))}
    </Container>
  );
};

export default InputRadio;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: ${({ theme }) => theme.gap.6};

  padding: ${({ theme }) => theme.padding.16};

  border-radius: ${({ theme }) => theme.rounded.16};
  background-color: ${({ theme }) => theme.colors.neutral0};

  &:not(:has(input:enabled)) {
    background-color: ${({ theme }) => theme.colors.neutral200};
  }
`;
const Label = styled.label`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 0.63rem;

  border-radius: 0.9375rem;
  background: none;

  color: ${({ theme }) => theme.colors.neutral400};

  ${NoSelect}

  &:has(input[type='radio']:checked) {
    background-color: ${({ theme }) => theme.colors.blue100};

    color: ${({ theme }) => theme.colors.neutral950};
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 0.62rem;
`;
const Input = styled.input.attrs({ type: 'radio' })`
  width: 1.0625rem;
  height: 1.0625rem;
  margin: 0.09rem;

  border-radius: 50%;
  background: ${({ theme }) => theme.colors.neutral50};

  &:checked {
    background: url(${icnCheck}) no-repeat;
  }
`;
