import styled from 'styled-components';
import { ReactComponent as ArrowRightIcon } from '@src/assets/icons/fi_arrow_right.svg';

interface AddCommunityButtonProps {
  name: string;
  onClick: () => void;
}

const AddCommunityButton = ({ name, onClick }: AddCommunityButtonProps) => {
  return (
    <ButtonContainer onClick={onClick}>
      <TextWrapper>{name}</TextWrapper>
      <IconWrapper>
        <ArrowRightIcon />
      </IconWrapper>
    </ButtonContainer>
  );
};
export default AddCommunityButton;

const ButtonContainer = styled.button`
  display: flex;
  padding: 1.875rem 0.9375rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  transition:
    background-color 0.3s,
    border 0.01s;

  &:hover,
  &:focus,
  &:active {
    background-color: ${({ theme }) => theme.colors.blue300};
    border: 1px solid ${({ theme }) => theme.colors.blue100};
  }

  // 버튼 active 상태에서 browser 기본 효과 제거
  -webkit-tap-highlight-color: transparent;
`;

const TextWrapper = styled.span`
  ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.black100};
  width: fit-content;
`;

const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.black200}; // icon 색상
`;
