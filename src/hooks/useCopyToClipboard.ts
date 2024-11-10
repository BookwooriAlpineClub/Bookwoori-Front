/*
복사하고 싶은 string을 인자로 받아서 클립보드에 복사하는 기능을 하는 hook입니다.
isCopied : 복사가 완료되면 true, 1초 후 false로 변경됩니다.
handleCopy : 클립보드에 복사하는 함수입니다. 버튼의 onClick, onChange 등에 사용하면 됩니다.
 */

import { useState } from 'react';

const useCopyToClipboard = (copyText: string) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsCopied(false);
    }
  };

  return { isCopied, handleCopy };
};

export default useCopyToClipboard;
