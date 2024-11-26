import styled from 'styled-components';

interface SubButtonProps {
  icon?: React.ReactNode;
  label: string;
  width?: string;
  onClick: () => void;
}

const SubButton = ({ icon, label, width, onClick }: SubButtonProps) => {
  return (
    <Button width={width} onClick={onClick}>
      {icon}
      {label}
    </Button>
  );
};

export default SubButton;

const Button = styled.button<{ width?: string }>`
  display: flex;
  padding: 0.5rem 0.9375rem;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem;
  width: ${({ width }) => width || 'calc(100% - 1.875rem)'};
  border-radius: 0.9375rem;
  background-color: ${({ theme }) => theme.colors.blue100};
  ${({ theme }) => theme.fonts.body}
  color: ${({ theme }) => theme.colors.white};
`;
