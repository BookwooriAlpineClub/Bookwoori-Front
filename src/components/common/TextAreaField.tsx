import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface TextAreaFieldProps {
  value: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
  cols?: number;
  resize?: 'none' | 'vertical';
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement>, // eslint-disable-line no-unused-vars
  ) => void;
}

const TextAreaField = ({
  value,
  placeholder = '',
  maxLength,
  rows,
  cols,
  resize = 'none',
  onChange,
}: TextAreaFieldProps) => {
  return (
    <TextAreaContainer>
      <TextArea
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        cols={cols}
        style={{ resize }}
        onChange={onChange}
      />
      {maxLength && (
        <CharacterCount>
          {value.length}/{maxLength}
        </CharacterCount>
      )}
    </TextAreaContainer>
  );
};

export default TextAreaField;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.88rem 0.62rem;
  padding-right: 0.42rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.31rem;
  position: relative;
`;

const TextArea = styled.textarea`
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.black100};
  font-family: ${({ theme }) => theme.fonts.body};
  background-color: ${({ theme }) => theme.colors.white};

  &::placeholder {
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.black200};
  }

  &::-webkit-scrollbar {
    display: block; // 스크롤바 강제 표시
    width: 0.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.black200};
    border-radius: 0.2rem;
  }
`;

const CharacterCount = styled.span`
  color: ${({ theme }) => theme.colors.black200};
  font-family: ${({ theme }) => theme.fonts.body};
  position: absolute;
  bottom: 0.88rem;
  right: 0.62rem;
`;
