import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface InputFieldProps<T = string> {
  type?: 'text' | 'password' | 'email' | 'number';
  value: T;
  placeholder?: string;
  maxLength?: number;
  onChange: (
    event: ChangeEvent<HTMLInputElement>, // eslint-disable-line no-unused-vars
  ) => void;
}

const InputField = <T extends string>({
  type = 'text',
  value,
  maxLength,
  placeholder = '',
  onChange,
}: InputFieldProps<T>) => {
  return (
    <InputContainer>
      <Input
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
      />
      {maxLength && (
        <CharacterCount>
          {value.length}/{maxLength}
        </CharacterCount>
      )}
    </InputContainer>
  );
};

export default InputField;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 0.88rem 0.62rem;
  border-radius: 0.31rem;
`;

const Input = styled.input`
  width: 80%;
  color: ${({ theme }) => theme.colors.neutral950};
  font-family: ${({ theme }) => theme.fonts.body};

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.neutral400};
  }
`;

const CharacterCount = styled.span`
  color: ${({ theme }) => theme.colors.neutral400};
  font-family: ${({ theme }) => theme.fonts.body};
`;
