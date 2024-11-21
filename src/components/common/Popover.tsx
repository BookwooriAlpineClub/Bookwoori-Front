import MuiPopover from '@mui/material/Popover';

interface PopOverProps {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

const Popover = ({ anchorEl, isOpen, onClose, children }: PopOverProps) => {
  return (
    <MuiPopover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {children}
    </MuiPopover>
  );
};

export default Popover;
