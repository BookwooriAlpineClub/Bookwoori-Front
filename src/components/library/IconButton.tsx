import styled from 'styled-components';

interface IconButtonProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  onClick?: () => void;
}

const IconButton = ({ Icon, text, onClick }: IconButtonProps) => {
  return (
    <ButtonContainer onClick={onClick}>
      <Icon width={21} height={21} />
      <span>{text}</span>
    </ButtonContainer>
  );
};

export default IconButton;

const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex: 1;
  padding: 0.75rem;
  ${({ theme }) => theme.fonts.mountain};
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: 4.125rem;
  gap: 0.3rem;
`;
