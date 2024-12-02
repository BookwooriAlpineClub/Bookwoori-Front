import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';
import { Categories } from '@src/types/domain/channel';
import Fieldset from '@src/components/common/Fieldset';

interface Props extends InputProps {
  items: Pick<Categories, 'categoryId' | 'name'>[];
  value: string;
  disabled?: boolean;
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
    <Fieldset title={title}>
      <Layout>
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
      </Layout>
    </Fieldset>
  );
};

export default InputDropdown;

const Layout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  cursor: pointer;
`;
const Input = styled.select<{ value: string }>`
  color: ${({ value, theme }) =>
    value ? theme.colors.black100 : theme.colors.black200};
  ${({ theme }) => theme.fonts.body};
`;
const Option = styled.option`
  ${NoSelect}
`;
