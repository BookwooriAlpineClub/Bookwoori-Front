import styled, { css, keyframes } from 'styled-components';

interface PopoverProps {
  children: React.ReactNode;
  className?: string;
  placement?: 'top' | 'bottom';
  offset?: number;
}

const Popover = ({
  children,
  className,
  placement = 'bottom',
  offset = 8,
}: PopoverProps) => {
  return (
    <PopoverContainer
      className={className}
      placement={placement}
      offset={offset}
    >
      {children}
    </PopoverContainer>
  );
};
export default Popover;

const slideDown = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const PopoverContainer = styled.div<Pick<PopoverProps, 'placement' | 'offset'>>`
  position: absolute;
  z-index: 300;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: ${({ theme }) => theme.rounded[4]};
  max-height: 20rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: block;
    width: 0.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.neutral200};
    border-radius: 0.2rem;
  }

  ${({ placement, offset }) =>
    placement === 'top'
      ? css`
          bottom: 100%;
          margin-bottom: ${offset}px;
          animation: ${slideUp} 0.3s ease-out;
        `
      : css`
          top: 100%;
          margin-top: ${offset}px;
          animation: ${slideDown} 0.3s ease-out;
        `}
`;
