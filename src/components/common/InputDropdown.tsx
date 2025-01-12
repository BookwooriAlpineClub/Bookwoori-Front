import type { Category } from '@src/types/category';
import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

interface Props {
  title: string;
  placeholder: string;
  items: Pick<Category, 'categoryId' | 'name'>[];
  required: boolean;
  disabled?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputDropdown = ({
  title,
  placeholder,
  items,
  required,
  disabled = false,
  value,
  setValue,
}: Props) => {
  return (
    <Container>
      <Input
        name={title}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
      >
        <Option value='' disabled>
          {placeholder}
        </Option>
        {items.map((item) => (
          <Option key={item.categoryId} value={item.categoryId}>
            {item.name}
          </Option>
        ))}
      </Input>
    </Container>
  );
};

export default InputDropdown;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;

  cursor: pointer;
`;
const Input = styled.select<{ value: string }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.neutral950 : theme.colors.neutral400};
  ${({ theme }) => theme.fonts.body};
`;
const Option = styled.option`
  ${NoSelect}
`;
