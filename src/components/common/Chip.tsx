import styled from 'styled-components';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string | number;
  className?: string;
}

const Chip = ({ Icon, text, className }: Props) => {
  return (
    <Wrapper className={className}>
      <Icon width={12} height={12} />
      <Span>{text}</Span>
    </Wrapper>
  );
};

export default Chip;

const Wrapper = styled.mark`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.125rem;

  padding: 0.125rem 0.375rem;

  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.colors.blue100};

  color: ${({ theme }) => theme.colors.blue500};
`;
const Span = styled.span`
  align-self: end;

  margin-right: 0.12rem;

  ${({ theme }) => theme.fonts.caption}
`;
