import styled from 'styled-components';

interface BookButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const BookButton = ({ icon, text, onClick }: BookButtonProps) => {
  return (
    <ButtonContainer onClick={onClick}>
      <IconContainer>{icon}</IconContainer>
      <span>{text}</span>
    </ButtonContainer>
  );
};

export default BookButton;

const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  padding: 0.75rem;
  ${({ theme }) => theme.fonts.mountain};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4.125rem;
  gap: 0.3rem;
`;

const IconContainer = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
