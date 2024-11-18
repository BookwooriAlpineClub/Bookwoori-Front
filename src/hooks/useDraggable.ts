import { useState, useCallback } from 'react';

const useDraggable = (
  channelListData: { name: string; children: React.ReactNode }[],
) => {
  const [list, setList] = useState(channelListData);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  const handleOnDragStart = (
    e: React.DragEvent | React.TouchEvent,
    idx: number,
  ) => {
    if (e.type === 'dragstart') {
      const dragEvent = e as React.DragEvent;

      dragEvent.dataTransfer.effectAllowed = 'move';
      dragEvent.dataTransfer.setData('idx', String(idx));
    } else if (e.type === 'touchstart') {
      setDraggingIdx(idx);
    }
  };

  const handleOnDrop = useCallback(
    (e: React.DragEvent | TouchEvent, idx: number) => {
      e.preventDefault();

      if (idx === -1 || draggingIdx === idx || draggingIdx === null) return;
      // const sourceIdx = Number(e.dataTransfer.getData('idx'));

      const updatedList = [...list];
      const [movedItem] = updatedList.splice(draggingIdx, 1);
      updatedList.splice(idx, 0, movedItem);

      setList(updatedList);
      setDraggingIdx(null);
    },
    [draggingIdx, list],
  );

  const handleOnDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleTouchStart = useCallback((idx: number) => () => {
    setDraggingIdx(idx);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    const dropIdx = Number(target?.getAttribute('data-idx'));

    if (!Number.isNaN(dropIdx)) {
      handleOnDrop(e.nativeEvent as TouchEvent, dropIdx);
    }
  }, [handleOnDrop]);

  const handleTouchEnd = useCallback(() => {
    setDraggingIdx(null);
  }, []);

  const handleDraggable = (idx: number) => {
    if ('ontouchstart' in window) {
      return {
        onTouchStart: handleTouchStart(idx),
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        'data-idx': idx,
      };
    }
    return {
      isDraggable: true,
      onDragStart: (e: React.DragEvent) => handleOnDragStart(e, idx),
      onDrop: (e: React.DragEvent) => handleOnDrop(e, idx),
      onDragOver: handleOnDragOver,
      'data-idx': idx,
    };
  };

  return { list, setList, handleDraggable };
};

export default useDraggable;
