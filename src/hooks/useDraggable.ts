import { Categories } from '@src/types/domain/channel';
import React, { useState, useCallback } from 'react';

const useDraggable = (
  channelListData: Pick<Categories, 'categoryId' | 'name'>[],
) => {
  const [list, setList] = useState(channelListData);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  // const [startX, setStartX] = useState(0);
  // const [startY, setStartY] = useState(0);
  // const [targetIdx, setTargetIdx] = useState<number | null>(null);

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
        const updatedList = [...prevList];
        const [movedItem] = updatedList.splice(draggingIdx, 1);
        updatedList.splice(idx, 0, movedItem);
        return updatedList;
      });

      setDraggingIdx(null);
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

  return { list, setList, handleDraggable };
};

export default useDraggable;
