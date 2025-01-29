import styled from 'styled-components';

type TagColor = 'lime' | 'blue' | 'neutral';
interface Props {
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string | number;
  color: TagColor;
  className?: string;
}

const Tag = ({ Icon, text, color, className }: Props) => {
  return (
    <Wrapper className={className} color={color}>
      {Icon && <Icon width={12} height={12} />}
      <span>{text}</span>
    </Wrapper>
  );
};

export default Tag;

const Wrapper = styled.mark<{ color: TagColor }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: ${({ theme }) => theme.gap[2]};

  width: fit-content;
  height: fit-content;
  padding: ${({ theme }) => `${theme.padding[4]} ${theme.padding[8]}`};

  border-radius: 50%;

  ${({ theme }) => theme.fonts.caption};

  ${({ color, theme }) => {
    switch (color) {
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
