import styled from 'styled-components';

interface UnderlineButtonType {
  text: string;
  onClick: () => void;
  size?: 'small';
}

const UnderlineButton = ({ text, onClick, size }: UnderlineButtonType) => {
  return (
    <Button size={size} onClick={onClick}>
      {text}
    </Button>
  );
};

export default UnderlineButton;

const Button = styled.button<{ size?: 'small' }>`
  ${({ theme, size }) => size && theme.fonts.caption};
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.neutral400};
`;
