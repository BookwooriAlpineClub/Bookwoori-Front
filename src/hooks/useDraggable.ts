import type { Category } from '@src/types/category';
import React, { useState, useCallback, useEffect } from 'react';

const useDraggable = (categoryListData: Category[]) => {
  const [beforeIdx, setBeforeIdx] = useState<number>(-1);
  const [list, setList] = useState<Category[]>();
  const [draggingIdx, setDraggingIdx] = useState<number>(-1);
  // const [startX, setStartX] = useState(0);
  // const [startY, setStartY] = useState(0);
  // const [targetIdx, setTargetIdx] = useState<number | null>(null);

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

        const updatedList = prevList.filter(
          (it) => it.categoryId !== movedItem.categoryId,
        );

        const findIdx = updatedList.findIndex((it) => it.categoryId === idx);
        return [
          ...updatedList.slice(0, findIdx + 1),
          movedItem,
          ...updatedList.slice(findIdx + 1),
        ];
      });

      setBeforeIdx(idx);
    },
    [draggingIdx],
  );

  // const handleTouchStart = (e: React.TouchEvent, idx: number) => {
  //   e.preventDefault();

  //   setStartX(e.changedTouches[0].pageX);
  //   setStartY(e.changedTouches[0].pageY);

  //   setTargetIdx(idx);
  // };

  // const handleTouchMove = useCallback((e: React.TouchEvent) => {
  //   e.preventDefault();

  //   const touch = e.touches[0];
  //   const target = document.elementFromPoint(touch.clientX, touch.clientY);
  //   const dropIdx = Number(target?.getAttribute('data-idx'));

  //   if (!Number.isNaN(dropIdx)) {
  //     setTargetIdx(dropIdx);
  //   }
  // }, []);

  // const handleTouchEnd = (e: React.TouchEvent, idx: number) => {
  //   e.preventDefault();

  //   const distanceX = startX - e.changedTouches[0].pageX;
  //   const distanceY = startY - e.changedTouches[0].pageY;
  //   const vector = Math.abs(distanceY / distanceX);

  //   if (targetIdx === idx || targetIdx === null) return;

  //   if (vector > 2) {
  //     setList((prevList) => {
  //       const updatedList = [...prevList];
  //       const [movedItem] = updatedList.splice(targetIdx, 1);
  //       updatedList.splice(idx, 0, movedItem);
  //       return updatedList;
  //     });

  //     setTargetIdx(null);
  //   }
  // };

  const handleDraggable = (idx: number) => {
    // if ('ontouchstart' in window) {
    //   return {
    //     onTouchStart: handleTouchStart,
    //     onTouchMove: handleTouchMove,
    //     onTouchEnd: (e: React.TouchEvent) => handleTouchEnd(e, idx),
    //   };
    // }
    return {
      draggable: true,
      onDragStart: (e: React.DragEvent) => handleOnDragStart(e, idx),
      onDrop: () => handleOnDrop(idx),
      onDragOver: handleOnDragOver,
    };
  };

  return { categoryId: draggingIdx, beforeIdx, list, setList, handleDraggable };
};

export default useDraggable;
