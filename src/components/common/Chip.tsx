import styled from 'styled-components';

interface Props {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string | number;
}

const Chip = ({ Icon, text }: Props) => {
  return (
    <Wrapper>
      <Icon width={12} height={12} />
      {text}
    </Wrapper>
  );
};

export default Chip;

const Wrapper = styled.mark`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.125rem;

  padding: 0.125rem 0.5rem 0.125rem 0.375rem;

  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.colors.blue300};

  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.blue100};
`;
