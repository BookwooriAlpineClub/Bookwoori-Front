import styled from 'styled-components';
import Fieldset from '@src/components/common/Fieldset';

interface Props extends InputProps {
  type: 'short' | 'long';
  limit: number;
  value?: string;
}

/**
 * @props type - 'short'는 input[type='text'] 태그, 'long'은 textarea 태그를 사용합니다.
 * @props limit - 입력 가능한 최대 글자 수를 제한합니다. -1로 설정 시 제한이 없으며 글자 수를 표시하지 않습니다.
 */
const InputText = ({
  title,
  placeholder,
  type,
  limit,
  required,
  value,
  setValue,
}: Props) => {
  return (
    <Fieldset title={title}>
      <Input
        as={type === 'short' ? 'input' : 'textarea'}
        name={title}
        placeholder={placeholder}
        maxLength={limit}
        required={required}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
      {limit >= 0 && (
        <Limit>
          {value ? value.length : 0}/{limit}
        </Limit>
      )}
    </Fieldset>
  );
};

export default InputText;

const Input = styled.input.attrs({ type: 'text' })<{ as: string }>`
  width: 100%;
  height: ${({ as }) => (as === 'input' ? '1.25rem' : '8.75rem')};

  color: ${({ theme }) => theme.colors.black100};
  ${({ theme }) => theme.fonts.body};

  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.black200};
  }
`;
const Limit = styled.span`
  position: absolute;
  bottom: 0.875rem;
  right: 0.625rem;

  color: ${({ theme }) => theme.colors.black200};
  ${({ theme }) => theme.fonts.body};

  // 드래그 및 선택 금지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
