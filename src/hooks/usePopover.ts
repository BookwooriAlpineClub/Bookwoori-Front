// usePopover.ts
import { useState, useRef, useEffect, useCallback } from 'react';

interface UsePopoverReturn {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  togglePopover: () => void;
  popoverRef: React.RefObject<HTMLDivElement>;
}

const usePopover = (): UsePopoverReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const openPopover = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closePopover = useCallback(() => {
    setIsOpen(false);
  }, []);

  const togglePopover = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // 외부 클릭 시 Popover를 닫도록 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // popoverRef가 현재 존재하고, 클릭한 대상이 popover 내부가 아니라면 닫기 처리
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // 컴포넌트 unmount 혹은 isOpen 변경 시 cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closePopover]);

  return { isOpen, openPopover, closePopover, togglePopover, popoverRef };
};

export default usePopover;
