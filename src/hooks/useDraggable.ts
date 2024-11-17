import { useState, useCallback } from 'react';

const useDraggable = (
  channelListData: { name: string; children: React.ReactNode }[],
) => {
  const [list, setList] = useState(channelListData);

  const handleOnDrop = useCallback(
    (e: React.DragEvent, idx: number) => {
      e.preventDefault();

      if (idx === -1) return;
      const sourceIdx = Number(e.dataTransfer.getData('idx'));

      const updatedList = [...list];
      const [movedItem] = updatedList.splice(sourceIdx, 1);
      updatedList.splice(idx, 0, movedItem);

      setList(updatedList);
    },
    [list],
  );

  const handleOnDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDraggable = (idx: number) => ({
    isDraggable: true,
    onDrop: (e: React.DragEvent) => handleOnDrop(e, idx),
    onDragOver: handleOnDragOver,
  });

  return { list, setList, handleDraggable };
};

export default useDraggable;
