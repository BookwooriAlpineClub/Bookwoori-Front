import type { Category } from '@src/types/category';
import { useState, useCallback, useEffect } from 'react';

const updateList = (
  prevList: Category[],
  movedItem: Category,
  targetIdx: number,
) => {
  const updatedList = prevList.filter(
    (it) => it.categoryId !== movedItem.categoryId,
  );

  const findIdx = updatedList.findIndex((it) => it.categoryId === targetIdx);
  return [
    ...updatedList.slice(0, findIdx + 1),
    movedItem,
    ...updatedList.slice(findIdx + 1),
  ];
};

const useDraggable = (categoryListData: Category[]) => {
  const [beforeIdx, setBeforeIdx] = useState<number>(-1);
  const [list, setList] = useState<Category[]>();
  const [draggingIdx, setDraggingIdx] = useState<number>(-1);

  useEffect(() => {
    setList((prevList) => {
      if (JSON.stringify(prevList) === JSON.stringify(categoryListData)) {
        return prevList;
      }
      return categoryListData;
    });
  }, [categoryListData]);

  const handleOnDragStart = (e: React.DragEvent, idx: number) => {
    const dragEvent = e as React.DragEvent;

    dragEvent.dataTransfer.effectAllowed = 'move';
    setDraggingIdx(idx);
  };

  const handleOnDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleOnDrop = useCallback(
    (idx: number) => {
      if (idx === -1 || draggingIdx === idx || draggingIdx === null) return;

      setList((prevList) => {
        if (!prevList) return prevList;

        const movedItem = prevList.find((it) => it.categoryId === draggingIdx);
        if (!movedItem) return prevList;

        return updateList(prevList, movedItem, beforeIdx);
      });

      setBeforeIdx(idx);
    },
    [draggingIdx, beforeIdx],
  );

  const handleDraggable = (idx: number) => {
    return {
      draggable: true,
      onDragStart: (e: React.DragEvent) => handleOnDragStart(e, idx),
      onDragOver: handleOnDragOver,
      onDrop: () => handleOnDrop(idx),
    };
  };

  return {
    categoryId: draggingIdx,
    beforeIdx,
    list,
    setList,
    handleDraggable,
  };
};

export default useDraggable;
