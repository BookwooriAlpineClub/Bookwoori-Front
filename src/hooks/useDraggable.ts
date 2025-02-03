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
  const [touchStartIdx, setTouchStartIdx] = useState<number>(-1);

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

  const handleTouchStart = (idx: number) => {
    setTouchStartIdx(idx);
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];

      if (!list) return;
      const target = list.find((item) => {
        const element = document.querySelector(
          `[data-idx="${item.categoryId}"]`,
        );
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        );
      });

      if (target) {
        setBeforeIdx(target.categoryId);
      }
    },
    [list],
  );

  const handleTouchEnd = useCallback(() => {
    if (
      touchStartIdx === null ||
      beforeIdx === -1 ||
      touchStartIdx === beforeIdx
    )
      return;

    setList((prevList) => {
      if (!prevList) return prevList;

      const movedItem = prevList.find((it) => it.categoryId === touchStartIdx);
      if (!movedItem) return prevList;

      return updateList(prevList, movedItem, beforeIdx);
    });
  }, [touchStartIdx, beforeIdx]);

  const handleDraggable = (idx: number) => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return {
        onTouchStart: () => handleTouchStart(idx),
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
      };
    }
    return {
      draggable: true,
      onDragStart: (e: React.DragEvent) => handleOnDragStart(e, idx),
      onDragOver: handleOnDragOver,
      onDrop: () => handleOnDrop(idx),
    };
  };

  return {
    categoryId: window.matchMedia('(pointer: coarse)').matches
      ? touchStartIdx
      : draggingIdx,
    beforeIdx,
    list,
    handleDraggable,
  };
};

export default useDraggable;
