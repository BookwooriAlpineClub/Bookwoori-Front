import styled from 'styled-components';
import { NoSelect } from '@src/styles/mixins';

interface Props {
  as: 'input' | 'textarea';
  name: string;
  placeholder: string;
  maxLength: number;
  required: boolean;
  disabled?: boolean;
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * @props as - 'input'은 input[type='text'] 태그, 'textarea'는 textarea 태그를 사용합니다.
 * @props maxLength - 입력 가능한 최대 글자 수를 제한합니다. -1로 설정 시 제한이 없으며 글자 수를 표시하지 않습니다.
 */
const InputText = ({
  as,
  name,
  placeholder,
  maxLength,
  required,
  disabled,
  value,
  setValue,
}: Props) => {
  return (
    <>
      <Input
        as={as}
        type='text'
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      {limit >= 0 && (
        <Limit>
          {value ? value.length : 0}/{limit}
        </Limit>
      )}
    </>
  );
};

export default InputText;

const Input = styled.input<{ as: string }>`
  width: 100%;
  height: ${({ as }) => (as === 'input' ? '1.25rem' : '8.75rem')};

  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.neutral950};

  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral400};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.neutral200};

    color: ${({ theme }) => theme.colors.neutral400};
  }
`;
const Limit = styled.span`
  position: absolute;
  bottom: 0.885rem;
  right: 0.625rem;

  color: ${({ theme }) => theme.colors.neutral400};
  ${({ theme }) => theme.fonts.body};

  ${NoSelect}
`;
