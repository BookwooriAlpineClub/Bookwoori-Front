import React, { useState } from 'react';

const usePopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closePopover = (event: React.MouseEvent<HTMLElement>) => {
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
