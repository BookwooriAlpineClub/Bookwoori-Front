import { useState } from 'react';

const usePopover = <T extends HTMLElement>() => {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);

  const openPopover = (event: React.MouseEvent<T>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closePopover = (event: React.MouseEvent<T>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  return {
    anchorEl,
    isOpen,
    openPopover,
    closePopover,
  };
};

export default usePopover;
