import { useState, useCallback, useRef } from 'react';

type UseLongPressProps = {
  onLongPress: (event: React.MouseEvent | React.TouchEvent) => void;
  delay?: number;
};

const useLongPress = ({ onLongPress, delay = 500 }: UseLongPressProps) => {
  const isLongPressTriggered = useRef(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startPress = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      isLongPressTriggered.current = false;
      const timeout = setTimeout(() => {
        isLongPressTriggered.current = true;
        onLongPress(event);
      }, delay);
      setTimer(timeout);
    },
    [onLongPress, delay],
  );

  const clearPress = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  }, [timer]);

  return {
    onMouseDown: startPress,
    onMouseUp: clearPress,
    onMouseLeave: clearPress,
    onTouchStart: startPress,
    onTouchEnd: clearPress,
  };
};

export default useLongPress;
