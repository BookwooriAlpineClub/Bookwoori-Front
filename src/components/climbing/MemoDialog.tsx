import styled from 'styled-components';
import SubButton from '@src/components/common/SubButton';
import { useState } from 'react';

type MemoDialogProps = {
  memo: string;
  closeDialog: () => void;
};

const MemoDialog = ({ memo, closeDialog }: MemoDialogProps) => {
  const [value, setValue] = useState<string>(memo);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      setValue(e.target.value.slice(0, 10));
      return;
    }
    setValue(e.target.value);
  };

  return (
    <DialogLayout>
      <InputContainer>
        <Span>내 메모</Span>
        <InputWrapper>
          <Input
            placeholder='메모를 입력하세요.'
            value={value}
            onChange={handleOnChange}
            maxLength={10}
          />
          <Counter>{value?.length}/10</Counter>
        </InputWrapper>
      </InputContainer>
      <ButtonContainer>
        <SubButton label='삭제하기' onClick={closeDialog} width='39vw' />
        <SubButton label='수정하기' width='39vw' />
      </ButtonContainer>
    </DialogLayout>
  );
};

export default MemoDialog;

const DialogLayout = styled.div`
  width: 80vw;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;
  padding: 2.5rem 1.5rem;

  border-radius: 1.875rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const Span = styled.span`
  color: ${({ theme }) => theme.colors.black100};
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  position: relative;
`;
const Input = styled.input`
  padding: 0 0.625rem;
  width: 100%;
  height: 2.5rem;

  border-radius: 1.875rem;

  ${({ theme }) => theme.fonts.body};
  background-color: ${({ theme }) => theme.colors.black300};
`;
const Counter = styled.span`
  position: absolute;
  right: 0.625rem;

  color: ${({ theme }) => theme.colors.black200};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 0.9375rem;
`;
