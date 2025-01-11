import styled from 'styled-components';

interface Props {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string | number;
  className?: string;
}

const Tag = ({ Icon, text, className }: Props) => {
  return (
    <Wrapper className={className}>
      {Icon && <Icon width={12} height={12} />}
      <span>{text}</span>
    </Wrapper>
  );
};

export default Tag;

const Wrapper = styled.mark`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: ${({ theme }) => theme.gap.2};

  width: fit-content;
  height: fit-content;
  padding: ${({ theme }) => `${theme.padding.4} ${theme.padding.8}`};

  border-radius: ${({ theme }) => theme.rounded.24};
  background-color: ${({ theme }) => theme.colors.blue100};

  ${({ theme }) => theme.fonts.caption}
  color: ${({ theme }) => theme.colors.blue500};
`;
