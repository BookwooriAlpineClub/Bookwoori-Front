import styled from 'styled-components';

type TagColor = 'lime' | 'blue' | 'neutral';
interface Props {
  color: TagColor;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  text?: string | number;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Tag = ({ color, Icon, text, onClick, className, children }: Props) => {
  return (
    <Wrapper className={className} onClick={onClick} $color={color}>
      {Icon && <Icon width={12} height={12} />}
      <span>{text}</span>
      {children}
    </Wrapper>
  );
};

export default Tag;

const Wrapper = styled.mark<{ $color: TagColor }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: ${({ theme }) => theme.gap[2]};

  width: fit-content;
  height: fit-content;
  padding: ${({ theme }) => `${theme.padding[4]} ${theme.padding[8]}`};

  border-radius: 6.1875rem;

  ${({ theme }) => theme.fonts.caption};

  ${({ $color, theme }) => {
    switch ($color) {
      case 'lime':
        return `
          background-color: ${theme.colors.lime100};
          color: ${theme.colors.lime300};
        `;
      case 'neutral':
        return `
          background-color: ${theme.colors.neutral200};
          color: ${theme.colors.neutral950};
        `;
      case 'blue':
      default:
        return `
          background-color: ${theme.colors.blue100};
          color: ${theme.colors.blue500};
        `;
    }
  }}
`;
